import config from '../../../config';
import request from 'request';
import queryBuilder from '../../../libs/overpass-query-builder';
import xmljsonParser from '../../../libs/xmljson';
import googleCaja from 'google-caja';
import osmToGeojson from 'osmtogeojson';
import turf from '@turf/turf';
import geoJSONParser from "../../../libs/geojson-parser";
import statsCalculator from "../../../libs/statscalculator";
import proc from 'proc-utils';
import capitalize from 'capitalize';
import fs from 'fs';

var sanitize = googleCaja.sanitize;
var overpassConfig = config.overpass;

export default {

	collect: (req, res, next) => {

		req.collects = {};
		var fields = ['type', 'filters', 'ward', 'variables', 'log'];

		fields.forEach((field) => {
			if (typeof req.body[field] !== 'undefined' || typeof req.query[field] !== 'undefined') {
				req.collects[field] = JSON.parse(sanitize(JSON.stringify(req.body[field] || req.query[field])));
			}

		})

		next();

	},

	required: (req, res, next) => {

		var err = proc.utils.required(req.collects, ['type']);
		if (err) return next(err);

		next();
	},

	fetch: (req, res, next) => {

		if (!config.useSnapshot) {
			var json = {
				requestConfig: {
					dataType: overpassConfig.dataType,
					timeout: overpassConfig.timeout
				},
				tags: {
					'amenity': req.collects.type
				},
				featureTypes: overpassConfig.include
			}

			// if (req.collects.ward) json['ward'] = req.collects.ward;

			// if (req.collects.filters) json.tags = Object.assign(json.tags, req.collects.filters)

			var overPassQueryBuilder = new queryBuilder({
				json: json
			});

			var query = overPassQueryBuilder.build({metaOn:req.metaDataOn});

			console.log(' EXECUTING QUERY <<< ', query, '>>>>>');

			var requestConfig = {
				timeout: overpassConfig.timeout * 1000
			}

			request(overpassConfig.baseUrl + query, requestConfig, (err, response) => {

				if (err) return next(err);

				if (response && response.statusCode) {

					try {
						var geojsonResponse = osmToGeojson(JSON.parse(response.body));
					} catch (e) {

						req.cdata = {
							success: 0,
							message: response.body
						}
						return next();
					}

					geojsonResponse.features.forEach((feature) => {
						if (feature.geometry.type === "Polygon") {
							feature.geometry = turf.centroid(feature).geometry;
						}
					})

					req.cdata = {
						success: 1,
						geojson: geojsonResponse,
						message: 'Features fetched successfully !'
					}

					req.unfilteredFeatures = geojsonResponse.features;

				} else {
					req.cdata = {
						success: 0,
						message: "Something went wrong !"
					}
				}

				return next();


			})
		} else {

			try {
				var geojsonResponse = JSON.parse(fs.readFileSync(`./snapshots/${req.collects.type}.json`, 'utf8'));
				req.unfilteredFeatures = geojsonResponse.features;
			} catch (e) {
				req.cdata = {
					success: 0,
					message: e
				}
				return next(e);
			}
			req.cdata = {
				success: 1,
				geojson: geojsonResponse,
				message: 'Features fetched successfully !'
			};
			return next();

		}

	},

	within: (req, res, next) => {

		if (req.cdata.geojson && req.cdata.geojson) {
			var features = req.cdata.geojson.features;
			var geojsonparser = new geoJSONParser('pokhara-geojson');
			req.cdata.geojson.features = geojsonparser.isWithin(features);
		}

		return next();

	},

	tagWards: (req, res, next) => {
		var geojsonparser = new geoJSONParser('wards');
		req.cdata.geojson.features = geojsonparser.tagWardId(req.cdata.geojson.features);
		return next();
	},

	fiter: (req, res, next) => {

		var filters = req.collects.filters;
		var features = req.cdata.geojson.features;
		var filtered = [];
		var type = req.collects.type;
		var insights = config.statsIndicator[type];

		if (filters) {
			filtered = new statsCalculator(features, type, insights, filters).applyFilter();
			req.cdata.geojson.features = filtered;
			next();

		} else {
			next();
		}

	},

	log: (req, res, next) => {

		if (req.cdata.geojson && req.cdata.geojson.features && req.cdata.geojson.features.length && req.collects.log === "true") {
			req.cdata.geojson.features.forEach((feature) => {
				console.log('NAME', feature.properties.tags['name'] || feature.properties.tags['name:ne'] || feature.properties.tags['name:en']);
			})
		}

		return next();

	},

	constraints: (req, res, next) => {



		function trim(str) {
			var string = str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
			return string.toUpperCase();
		}

		// && !(req.collects.filters && Object.keys(req.collects.filters).length)
		// && req.cdata.geojson.features && req.cdata.geojson.features.length
		if (req.collects.type && config.amenities[req.collects.type] && config.amenities[req.collects.type].constraints && config.amenities[req.collects.type].constraints.length && req.cdata.geojson  ) {
			var constraintsFeed = {};

			config.amenities[req.collects.type].constraints.forEach((constraint) => {
				constraintsFeed[constraint['keyname']] = [];
				req.cdata.geojson.features.forEach((feature) => {
					if (feature.properties.tags && feature.properties.tags[constraint['constraint']]) {
						if (constraint.multiple) {
							feature.properties.tags[constraint['constraint']].split(',').forEach((eachtag) => {
								var trimmedValue = capitalize.words(trim(eachtag));
								if (constraintsFeed[constraint['keyname']].indexOf(trimmedValue) === -1 && trimmedValue.length) {
									constraintsFeed[constraint['keyname']].push(trimmedValue);
								}
							})
						} else {
							if (constraintsFeed[constraint['keyname']].indexOf(feature.properties.tags[constraint['constraint']]) === -1) {
								constraintsFeed[constraint['keyname']].push(feature.properties.tags[constraint['constraint']]);
							}
						}

					}
				})
				constraintsFeed[constraint['keyname']].sort();
			})


			req.cdata.constraints = constraintsFeed;


		}

		return next();

	},

	snapshot: (req, res, next) => {

		var createSnapShotsFor = ['school', 'bank', 'hospital'];

		function snapshotPromiseGenerator(snapshotFor) {
			
			return new Promise((resolve, reject) => {
				var json = {
					requestConfig: {
						dataType: overpassConfig.dataType,
						timeout: overpassConfig.timeout
					},
					tags: {
						'amenity': snapshotFor
					},
					featureTypes: overpassConfig.include
				}
				var overPassQueryBuilder = new queryBuilder({
					json: json
				});
				var query = overPassQueryBuilder.build();
				console.log(' EXECUTING QUERY <<< ', query, '>>>>>');
				var requestConfig = {
					timeout: overpassConfig.timeout * 1000
				}
				request(overpassConfig.baseUrl + query, requestConfig, (err, response) => {
					if (err) reject(err);
					if (response && response.statusCode) {
						try {
							var geojsonResponse = osmToGeojson(JSON.parse(response.body));
						} catch (e) {
							reject(e)
						}
						geojsonResponse.features.forEach((feature) => {
							if (feature.geometry.type === "Polygon") {
								feature.geometry = turf.centroid(feature).geometry;
							}
						})
						geojsonResponse.createdOn = new Date().getTime();
						var json = JSON.stringify(geojsonResponse);
						fs.writeFile(`./snapshots/${snapshotFor}.json`, json, 'utf8', (err, response) => {
							if (err) reject(err);
							resolve();
						});
					} else {
						reject("Something went wrong !");
					}

				})
			})
		}

		var snapshots = [];
		createSnapShotsFor.forEach((snapshotFor) => {
			snapshots.push(snapshotPromiseGenerator(snapshotFor));
		})
		Promise.all(snapshots)
			.then((response) => {
				req.cdata = {
					success: 1,
					message: `Snapshot created successfully`
				};
				return next();
			})
			.catch((err) => {
				req.cdata = {
					success: 0,
					message: err
				}
				return next();
			})
	}
}