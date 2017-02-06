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
import _ from 'underscore';

var sanitize = googleCaja.sanitize;
var overpassConfig = config.overpass;

export default {

	collect: (req, res, next) => {

		req.collects = {};
		var fields = ['type', 'filters', 'ward', 'variables'];

		fields.forEach((field) => {
			if (typeof req.body[field] !== 'undefined' || typeof req.query[field] !== 'undefined') {
				req.collects[field] = JSON.parse(sanitize(JSON.stringify(req.body[field] || req.query[field])));
			}

		})

		var err = proc.utils.required(req.collects, ['type']);
		if (err) return next(err);

		next();


	},

	validate: (req, res, next) => {

		req.collects.filters = req.collects.filters ? (typeof req.collects.filters === 'object' ? req.collects.filters : JSON.parse(req.collects.filters)) : {};

		var variables = req.collects.variables ? (typeof req.collects.variables === 'object' ? req.collects.variables : JSON.parse(req.collects.variables)) : {};

		var validVariables = {};

		for (var variable in variables) {
			var value = variables[variable];
			if (Number(value) !== 0) {
				validVariables[variable] = value;
			}
		}

		Object.assign(req.collects.filters, validVariables);

		if(req.collects.filters && Object.keys(req.collects.filters).length){

			var applicableFilters = Object.keys(config.statsIndicator[req.collects.type]);
			var providedFilters = Object.keys(req.collects.filters);

			if(!(_.intersection(providedFilters,applicableFilters).length === providedFilters.length)){
				return next(new Error('Make sure filter parameters are valid for this type'));
			}


		}

		next();


	},

	fetch: (req, res, next) => {

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

		var query = overPassQueryBuilder.build();

		console.log(' EXECUTING QUERY >>>> ', query);

		request(overpassConfig.baseUrl + query, (err, response) => {

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

			} else {
				req.cdata = {
					success: 0,
					message: "Something went wrong !"
				}
			}

			return next();


		})

	},

	withinPokhara: (req, res, next) => {

		if (req.cdata.geojson && req.cdata.geojson) {
			var features = req.cdata.geojson.features;
			var geojsonparser = new geoJSONParser('pokhara-geojson');
			req.cdata.geojson.features = geojsonparser.isWithin(features);
		}
		
		return next();

	},

	totalStats: (req, res, next) => {

		req.stats = {};

		var rangeMax = {};

		req.stats.overall = new statsCalculator(req.cdata.geojson.features, req.collects.type, config.statsIndicator[req.collects.type])
			.calculate('total', rangeMax);

		req.cdata.initialMetrics = {
				slider: rangeMax
			} // notice that we are passing the rangeMax as an object to the statCalculator function and finding the max value within. Since the value is referenced, it will be updated here as well !

		next();

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

	compareStats: (req, res, next) => {

		req.stats.insights = {};

		req.stats.selection = (req.cdata.geojson.features && req.cdata.geojson.features.length) ? new statsCalculator(req.cdata.geojson.features, req.collects.type, config.statsIndicator[req.collects.type])
			.calculate('selection') : {}

		for (var metric in req.stats.overall) {
			
			if (!(req.stats.selection && req.stats.selection[metric])) {

				req.stats.selection[metric] = 0;
			}

			var relative = (req.stats.selection[metric] / req.stats.overall[metric]) * 100;
			req.stats.insights[metric] =   relative > 0.5 ? Math.round(relative) : Math.round(relative * 100) /100 ;

		}

		req.cdata.stats = req.stats;
		funsole.log(req.cdata, 'white', 'blue');

		next();
	}
}