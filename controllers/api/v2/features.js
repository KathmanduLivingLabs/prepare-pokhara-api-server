import appRootPath from "app-root-path";
import config from "../../../config";
import configv2 from "../../../configv2";
import request from "request";
import queryBuilder from "../../../libs/overpass-query-builder";
import xmljsonParser from "../../../libs/xmljson";
import googleCaja from "google-caja";
import osmToGeojson from "osmtogeojson";
import turf from "@turf/turf";
import geoJSONParser from "../../../libs/geojson-parser";
import statsCalculator from "../../../libs/statscalculator";
import proc from "proc-utils";
import capitalize from "capitalize";
import fs from "fs";
import _ from "underscore";

let sanitize = googleCaja.sanitize;
let overpassConfig = config.overpass;

export default {

	collect: (req, res, next) => {

		req.collects = {};
		var fields = ["type", "filters", "ward", "variables", "log","takeSnapshot","snapshotKey"];
		fields.forEach((field) => {
			if (typeof req.body[field] !== "undefined" || typeof req.query[field] !== "undefined") {
				req.collects[field] = JSON.parse(sanitize(JSON.stringify(req.body[field] || req.query[field])));
			}
		});
		for (var parameter in req.collects) {
			if (req.collects[parameter] == "*") delete req.collects[parameter];
		}
		next();
	},

	v2parameters : (req,res,next) => {

		req.collects.filters = {};
		req.collects.variables = {};
		configv2.parameters[req.collects.type].forEach((parameter)=>{
			if (typeof req.body[parameter.parameter_name] !== "undefined" || typeof req.query[parameter.parameter_name] !== "undefined") {
				let collectedParameter =  JSON.parse(sanitize(JSON.stringify(req.body[parameter.parameter_name] || req.query[parameter.parameter_name])));
				if(parameter.type === "single-select"){
					req.collects[parameter.parameter_name] = collectedParameter;
				}else if(parameter.type === "range"){
					collectedParameter = JSON.parse(collectedParameter);
					req.collects.variables[[parameter.parameter_name]] = collectedParameter;
				}else if(parameter.type === "multi-select"){
					collectedParameter = JSON.parse(collectedParameter);
					parameter.options.forEach((option)=>{
						if(collectedParameter[option.value]){
							if(parameter.boolean){
								if(collectedParameter[option.value] == true){
									req.collects.filters[option.value] = "yes";
								}
							}else{
								if(!req.collects.filters[parameter.on]){
									req.collects.filters[parameter.on] = option.value;
								}else{
									req.collects.filters[parameter.on] = req.collects.filters[parameter.on] + "," + option.value;
								}
							}
						}
					});
				}
			}
		});
		console.log(">>",req.collects);
		req.reqCollects = JSON.parse(JSON.stringify(req.collects));
		return next();
	},

	required: (req, res, next) => {

		var err = proc.utils.required(req.collects, ["type"]);
		if (err) return next(err);
		next();
	},

	fetch: (req, res, next) => {

		if ((req.collects.takeSnapshot && req.collects.snapshotKey === config.snapshotKey) || !config.useSnapshotv2) {
			var json = {
				requestConfig: {
					dataType: overpassConfig.dataType,
					timeout: overpassConfig.timeout
				},
				tags: {
					"amenity": req.collects.type
				},
				featureTypes: overpassConfig.include,
				type : req.collects.type
			};
			var overPassQueryBuilder = new queryBuilder({
				json: json
			});
			var query = overPassQueryBuilder.build({metaOn:req.metaDataOn});
			console.log(" EXECUTING QUERY <<< ", query, ">>>>>");
			var requestConfig = {
				timeout: overpassConfig.timeout * 1000
			};
			request(overpassConfig.baseUrl + query, requestConfig, (err, response) => {
				if (err) return next(err);
				if (response && response.statusCode && response.body) {
					try {
						var geojsonResponse = osmToGeojson(JSON.parse(response.body));
					} catch (e) {
						req.cdata = {
							success: 0,
							message: response.body
						};
						return next();
					}
					if(geojsonResponse && geojsonResponse.features){
						geojsonResponse.features.forEach((feature) => {
							if (feature.geometry.type === "Polygon" || feature.geometry.type === "MultiPolygon") {
								feature.geometry = turf.centroid(feature).geometry;
							}
						});
							
						if(req.collects.takeSnapshot && req.collects.snapshotKey === config.snapshotKey){
							geojsonResponse.createdOn = new Date().getTime();
							fs.writeFile(`./newsnapshots/${req.collects.type}.json`, JSON.stringify(geojsonResponse), "utf8", (err, response) => {
								if (err) return next({
									success : 0,
									message : err
								});
								req.cdata = {
									success: 1,
									geojson: geojsonResponse,
									message: "Features fetched successfully !"
								};
								req.unfilteredFeatures = geojsonResponse.features;
								return next();								
							});
						}else{
							req.cdata = {
								success: 1,
								geojson: geojsonResponse,
								message: "Features fetched successfully !"
							};
							req.unfilteredFeatures = geojsonResponse.features;
							return next();
						}
					}else{
						return next({
							success: 0,
							message: "Something went wrong !"
						});
					}
				} else {
					return next({
						success: 0,
						message: "Something went wrong !"
					});
				}
			});
		} else {

			try {
				var geojsonResponse = JSON.parse(fs.readFileSync(`./newsnapshots/${req.collects.type}.json`, "utf8"));
				geojsonResponse.features.forEach((feature) => {
					if (feature.geometry.type === "Polygon" || feature.geometry.type === "MultiPolygon") {
						feature.geometry = turf.centroid(feature).geometry;
					}
				});
				req.unfilteredFeatures = geojsonResponse.features;
			} catch (e) {
				req.cdata = {
					success: 0,
					message: e
				};
				return next(e);
			}
			req.cdata = {
				success: 1,
				geojson: geojsonResponse,
				message: "Features fetched successfully !"
			};
			return next();
		}
	},

	within: (req, res, next) => {

		if (req.cdata.geojson && req.cdata.geojson) {
			var features = req.cdata.geojson.features;
			var geojsonparser = new geoJSONParser("pokhara-geojson");
			req.cdata.geojson.features = geojsonparser.isWithin(features);
		}
		return next();
	},

	tagWards: (req, res, next) => {
		var geojsonparser = new geoJSONParser("wards");
		req.cdata.geojson.features = geojsonparser.tagWardId(req.cdata.geojson.features);
		return next();
	},

	fiter: (req, res, next) => {

		var filters = req.collects.filters;
		var features = req.cdata.geojson.features;
		var filtered = [];
		var postFiltered = [];
		var type = req.collects.type;
		var insights = config.statsIndicator[type];

		if (filters && Object.keys(filters).length) {
			// var backupFeatures = {} ;
			// if( config.amenities[req.collects.type].postFilter &&  config.amenities[req.collects.type].postFilter.length ){
			// 	config.amenities[req.collects.type].postFilter.forEach(function(postFilterParam){
			// 		if(filters[postFilterParam]){
			// 			backupFeatures[postFilterParam] = filters[postFilterParam];  
			// 			delete filters[postFilterParam];	
			// 		}
			// 	});
			// }
			filtered = new statsCalculator(features, type, insights, filters).applyFilter(req.reqCollects);
			req.preFiltered = filtered;
			// if(backupFeatures && Object.keys(backupFeatures).length){
			// 	for(var backupFeature in backupFeatures){
			// 		filters[backupFeature] = backupFeatures[backupFeature];
			// 	}
			// 	postFiltered = new statsCalculator(features, type, insights, filters).applyFilter(req.reqCollects);
			// 	req.cdata.geojson.features = postFiltered;
			// }else{
			// 	req.cdata.geojson.features = filtered;
			// }
			req.cdata.geojson.features = filtered;
			return next();
		} else {
			req.preFiltered = features;
			return next();
		}

	},

	log: (req, res, next) => {

		if (req.cdata.geojson && req.cdata.geojson.features && req.cdata.geojson.features.length && req.collects.log === "true") {
			req.cdata.geojson.features.forEach((feature) => {
				console.log("NAME", feature.properties.tags["name"] || feature.properties.tags["name:ne"] || feature.properties.tags["name:en"]);
			});
		}

		return next();

	},

	constraints: (req, res, next) => {
		function trim(str) {
			var string = str.replace(/^\s\s*/, "").replace(/\s\s*$/, "");
			return string.toUpperCase();
		}
		// && !(req.collects.filters && Object.keys(req.collects.filters).length)
		// && req.cdata.geojson.features && req.cdata.geojson.features.length
		if (req.collects.type && config.amenities[req.collects.type] && config.amenities[req.collects.type].constraints && config.amenities[req.collects.type].constraints.length && req.cdata.geojson  ) {
			var constraintsFeed = {};
			config.amenities[req.collects.type].constraints.forEach((constraint) => {
				constraintsFeed[constraint["keyname"]] = [];
				req.preFiltered.forEach((feature) => {
					if (feature.properties.tags && feature.properties.tags[constraint["constraint"]]) {
						if (constraint.multiple) {
							feature.properties.tags[constraint["constraint"]].split(",").forEach((eachtag) => {
								var trimmedValue = capitalize.words(trim(eachtag));
								if (constraintsFeed[constraint["keyname"]].indexOf(trimmedValue) === -1 && trimmedValue.length) {
									constraintsFeed[constraint["keyname"]].push(trimmedValue);
								}
							});
						} else {
							if (constraintsFeed[constraint["keyname"]].indexOf(feature.properties.tags[constraint["constraint"]]) === -1) {
								constraintsFeed[constraint["keyname"]].push(feature.properties.tags[constraint["constraint"]]);
							}
						}

					}
				});
				constraintsFeed[constraint["keyname"]].sort();
			});
			req.cdata.constraints = constraintsFeed;
		}
		return next();
	},

	snapshot: (req, res, next) => {

		var createSnapShotsFor = ["school", "bank", "hospital"];

		function snapshotPromiseGenerator(snapshotFor) {
			
			return new Promise((resolve, reject) => {
				var json = {
					requestConfig: {
						dataType: overpassConfig.dataType,
						timeout: overpassConfig.timeout
					},
					tags: {
						"amenity": snapshotFor
					},
					featureTypes: overpassConfig.include
				};
				var overPassQueryBuilder = new queryBuilder({
					json: json
				});
				var query = overPassQueryBuilder.build();
				console.log(" EXECUTING QUERY <<< ", query, ">>>>>");
				var requestConfig = {
					timeout: overpassConfig.timeout * 1000
				};
				request(overpassConfig.baseUrl + query, requestConfig, (err, response) => {
					if (err) reject(err);
					if (response && response.statusCode) {
						try {
							var geojsonResponse = osmToGeojson(JSON.parse(response.body));
						} catch (e) {
							reject(e);
						}
						geojsonResponse.features.forEach((feature) => {
							if (feature.geometry.type === "Polygon") {
								feature.geometry = turf.centroid(feature).geometry;
							}
						});
						geojsonResponse.createdOn = new Date().getTime();
						var json = JSON.stringify(geojsonResponse);
						fs.writeFile(`./snapshots/${snapshotFor}.json`, json, "utf8", (err, response) => {
							if (err) reject(err);
							resolve();
						});
					} else {
						reject("Something went wrong !");
					}
				});
			});
		}

		var snapshots = [];
		createSnapShotsFor.forEach((snapshotFor) => {
			snapshots.push(snapshotPromiseGenerator(snapshotFor));
		});
		Promise.all(snapshots)
			.then((response) => {
				req.cdata = {
					success: 1,
					message: "Snapshot created successfully"
				};
				return next();
			})
			.catch((err) => {
				req.cdata = {
					success: 0,
					message: err
				};
				return next();
			});
	},	
	applyGrades : (req,res,next)=>{
		if(req.collects.type && config.amenities[req.collects.type].grades){
			req.preserveTags = [];
			req.cdata.geojson.features.forEach(function(feature){
				if(feature.properties.tags && Object.keys(feature.properties.tags).length){
					if(feature.properties.tags[config.amenities[req.collects.type].grades.on]){
						var classValue = feature.properties.tags[config.amenities[req.collects.type].grades.on];
						for(var grade in config.amenities[req.collects.type].grades.values){
							if(config.amenities[req.collects.type].grades.values[grade].indexOf(classValue) !== -1){
								req.preserveTags.push({
									id : feature.id,
									tags : JSON.parse(JSON.stringify(feature.properties.tags))
								});
								feature.properties.tags[config.amenities[req.collects.type].grades.on] = grade;
							}
						}
					}
				}
			});
			return next();
		}else{
			return next();
		}
	},

	applyPreservedTags : (req,res,next)=>{
		if(req.preserveTags && req.preserveTags.length){
			req.cdata.geojson.features.forEach(function(feature,index){
				req.preserveTags.forEach(function(preservedTag){
					if(preservedTag.id === feature.id){
						feature.properties.tags = JSON.parse(JSON.stringify(preservedTag.tags));
					}
				});
			});
			delete req.preserveTags;
			return next();
		}else{
			return next();
		}
	},

	v2 : (req,res,next) => {

		const insights = {};
		configv2.insightsKey[req.collects.type].forEach((insight,index)=>{
			insights[index+1] = {
				max_value :  req.cdata.stats.overall[insight.value],
				value :  req.cdata.stats.selection[insight.value],
				insight_title : insight.label
			};
		});

		const parameters = {};
		configv2.parameters[req.collects.type].forEach((parameter,index)=>{
			parameters[index+1] = parameter;
			if(parameter.type === "range"){
				parameters[index+1].range = {
					"step": parameter.step || 50,
					"max": req.cdata.initialMetrics.slider[parameter.parameter_name],
					"min": 0,
					"high": req.cdata.initialMetrics.slider[parameter.parameter_name],
					"low": 0
				};
			}else if(parameter.type === "single-select" && parameter.parameter_name === "ward") {
				const wards= new geoJSONParser("wards-name").getFile().wards.map((ward)=>{
					return {
						value : ward.osmID,
						label : `Ward ${ward.number}`
					};
				});
				parameters[index+1].options = [{
					"value": "*",
					"label": "All Wards"
				}].concat(wards);
			}
		});

		req.cdata = {
			success : 1,
			message : req.cdata.message,
			geometries : {
				pois : req.cdata.geojson,
				boundary : !req.collects.ward || req.collects.ward === "*" ? require("../../../geojson-data/pokhara-geojson.json").features[0] : _.findWhere(require("../../../geojson-data/wards.json").features,{
					id : req.collects.ward
				}),
				boundaryWithWards : !req.collects.ward || req.collects.ward === "*" ? require("../../../geojson-data/wards.json") : _.findWhere(require("../../../geojson-data/wards.json").features,{
					id : req.collects.ward
				})
			},
			parameters : parameters,
			insights : insights
		};

		//calculate centroid for boundary with wards
		if(req.cdata.geometries.boundaryWithWards && req.cdata.geometries.boundaryWithWards.features){
			req.cdata.geometries.boundaryWithWards.features.forEach((feature)=>{
				feature.centroid = turf.centroid(feature.geometry).geometry;
			});
		}

		req.cdata.filters = Object.keys(req.cdata.parameters).reduce((array,parameter)=>{
			array.push(req.cdata.parameters[parameter]);
			return array;
		},[]);

		return next();
	},

	tagsMapping : (req,res,next)=>{
		const rawTagMappings = require(appRootPath + `/tagmappings`).tagMapper;
		req.cdata = {
			success : 1,
			tags : Object.keys(rawTagMappings).map((type)=>{
				return {
					"amenity" : type,
					"tags" : rawTagMappings[type].filter((tag)=>{
						if(tag.isVisibleOnPopup === "TRUE") return tag;
					}).map((tag)=>{
						return {
							"tag" : tag.keyName,
							"database_schema_key" : tag.keyName.replace(/:/g , "_").replace(/-/g,""),
							"label" : tag.keyLabel
						};
					})
				};
			})
		};
		return next();
	},

	attractions : (req,res,next)=>{

		let placesOfAttractionsConfig = require(appRootPath + "/config-tourist-attractions").placesOfAttractionsConfig;
		placesOfAttractionsConfig = JSON.parse(JSON.stringify(placesOfAttractionsConfig));
		
		const bboxCoords = turf.bbox(require("../../../geojson-data/pokhara-geojson.json").features[0]);
		const bboxString = `(${bboxCoords[1]},${bboxCoords[0]},${bboxCoords[3]},${bboxCoords[2]})`;

		let queryString = `
			[out:json][timeout:25];
			(
		`;

		placesOfAttractionsConfig.forEach((places)=>{
			places.pois.forEach((poi)=>{
				queryString = queryString + `${poi.reference.type}(${poi.reference.id})${bboxString};`;
			});
		});

		queryString = queryString + `
			);
			out body;
			>;
			out skel qt;
		`;

		request(overpassConfig.baseUrl + queryString, null, (err, response) => {
			if (err) return next(err);
			if (response && response.statusCode && response.body) {
				let geojsonResponse;
				try {
					geojsonResponse = osmToGeojson(JSON.parse(response.body));
				} catch (e) {
					req.cdata = {
						success: 0,
						message: response.body
					};
					return next();
				}
				if(geojsonResponse && geojsonResponse.features){
					geojsonResponse.features.forEach((feature) => {
						if (feature.geometry.type === "Polygon") {
							feature.geometry = turf.centroid(feature).geometry;
						}
					});
					placesOfAttractionsConfig.forEach((placesOfAttraction)=>{
						placesOfAttraction.pois = {
							"type": "FeatureCollection",
							"features": placesOfAttraction.pois.map((poi)=>{
								const amenity = _.findWhere(geojsonResponse.features,{id : `${poi.reference.type}/${poi.reference.id}`});
								if(amenity) return Object.assign(amenity,{detail : poi.detail});
								return amenity;
							}).filter(Boolean)
						};
					});
					req.cdata = {
						success : 1,
						attractions : placesOfAttractionsConfig
					};
					return next();
				}else{
					return next({
						success: 0,
						message: "Something went wrong !"
					});
				}
			}else{
				return next({
					success: 0,
					message: "Something went wrong !"
				});
			}
		});
	},

	bulk : (req,res,next) => {

		const amenities = Object.keys(configv2.insightsKey);
		const bulkResponse = [];
		
		amenities.forEach((amenity)=>{
			bulkResponse.push({
				amenity,
				pois : require(appRootPath + `/newsnapshots/${amenity}.json`)
			})
		});

		req.cdata = {
			success : 1,
			bulkResponse
		};

		return next();

	}
};