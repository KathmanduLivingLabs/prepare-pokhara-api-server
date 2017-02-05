import config from '../../../config';
import request from 'request';
import queryBuilder from '../../../libs/overpass-query-builder';
import xmljsonParser from '../../../libs/xmljson';
import googleCaja from 'google-caja';
import osmToGeojson from 'osmtogeojson';
import turf from '@turf/turf';
import geoJSONParser from "../../../libs/geojson-parser";
import statsCalculator from "../../../libs/statscalculator";

var sanitize = googleCaja.sanitize;

var overpassConfig = config.overpass;

export default {

	collect: (req, res, next) => {

		var fields = ['type', 'filters', 'ward'];
		req.collects = {};
		fields.forEach((field) => {
			req.collects[field] = (req.body[field] || req.query[field]);
		})
		if (req.collects.filters && typeof req.collects.filters !== 'object') req.collects.filters = JSON.parse(req.collects.filters);

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

	wards: (req, res, next) => {

		var parser = new geoJSONParser('wards-name');

		req.cdata = {
			success: 1,
			message: 'Wards successfully fetched !',
			wards: parser.getWards()
		}

		next();

	},

	filterWard: (req, res, next) => {

		if (req.collects.ward) {
			var features = req.cdata.geojson.features;
			var geojsonparser = new geoJSONParser('wards');
			req.cdata.geojson.features = geojsonparser.filterWards(features, req.collects.ward);
		}
		return next();

	},


	calculateTotalStat: (req, res, next) => {

		req.stats = {};

		var rangeMax = {};

		req.stats.overall = new statsCalculator(req.cdata.geojson.features, req.collects.type, config.statsIndicator[req.collects.type])
			.calculate('total',rangeMax);

		req.cdata.initialMetrics =  {
			silder : rangeMax
		}  // notice that we are passing the rangeMax as an object to the statCalculator function and finding the max value within. Since the value is referenced, it will be updated here as well !

		next();

	},

	applyFilter: (req, res, next) => {

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

	statCompare: (req, res, next) => {

		req.stats.insights = {};

		req.stats.selection = (req.cdata.geojson.features && req.cdata.geojson.features.length) ? new statsCalculator(req.cdata.geojson.features, req.collects.type, config.statsIndicator[req.collects.type])
			.calculate('selection') : {}

		for(var metric in req.stats.overall){

			if(!(req.stats.selection && req.stats.selection[metric])){

				req.stats.selection[metric] = 0 ;
			}

			req.stats.insights[metric] = Math.round((req.stats.selection[metric]/req.stats.overall[metric]) * 100) + "%";	
			
		}
		

		req.cdata.stats = req.stats;
		funsole.log(req.cdata,'white','blue');

		next();
	},

	metrics : (req,res,next)=>{
		
		var statsIndicators = config.statsIndicator;
		
		var metrics = {
			wards : new geoJSONParser('wards-name').getFile().wards
		};

		// metrics.indicators = {};
		// for(var statIndicator in  statsIndicators){
		// 	metrics.indicators[statIndicator] = [];
		// 	for(var tag in statsIndicators[statIndicator]){
		// 		metrics.indicators[statIndicator].push(tag);
		// 	}
		// }
		
		req.cdata = {
			success : 1,
			message : 'Metrics successfully fetched.',
			metrics : metrics
		}

		next();
		

	}
}