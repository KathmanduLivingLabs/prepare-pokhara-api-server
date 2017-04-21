import jsonFile from 'jsonfile';

import appRootPath from 'app-root-path';

import _ from 'underscore';

import turf from '@turf/turf';

export default class geoJSONParser {


	constructor(file) {
		var fileName = file || 'pokhara-geojson';
		this.pokharaGeoJson = appRootPath + '/geojson-data/' + fileName + '.json';
		this.geoJsonFile = jsonFile.readFileSync(this.pokharaGeoJson);
	}

	parse() {

		const coordinates = this.geoJsonFile.features[0].geometry.coordinates[0][0];

		var poly = "";

		coordinates.forEach((coordinate, index) => {

			var tempcor = [coordinate[1], coordinate[0]].join(' ');
			poly = poly + tempcor;

			if (index < coordinates.length - 1) {
				poly = poly + " ";
			}
		})

		var polyString = ('(poly:"' + poly + '")').toString();

		return polyString;

	}



	boundingBox() {


		var bboxCoords = turf.bbox(this.geoJsonFile);
		return `(${bboxCoords[1]},${bboxCoords[0]},${bboxCoords[3]},${bboxCoords[2]})`;



	}

	parseWards(referenceWard) {

		const features = this.geoJsonFile.features;

		return turf.bbox(_.filter(features, (feature) => {
			if (feature['properties']['@id'] === referenceWard) {
				return feature
			}
		})[0]);

	}

	getWards() {

		return this.geoJsonFile.wards;

	}

	filterWards(features, wardID) {
		var polyFeatures = this.geoJsonFile.features;
		var filtered = [];

		var wardPoly = _.findWhere(polyFeatures, {
			id: wardID
		});

		if (wardPoly) {
			features.forEach((feature) => {
				if (turf.inside(feature, wardPoly)) {
					filtered.push(feature);
				}
			})
		}



		return filtered;
	}

	isWithin(features) {

		var filtered = [];
		features.forEach((feature) => {
			if (turf.inside(feature, this.geoJsonFile.features[0])) {
				filtered.push(feature);
			}
		})

		return filtered;

	}

	tagWardId(features) {
		var wardsPolygon = this.geoJsonFile.features;
		features.forEach(function(feature) {
			for (var wardPolygon = 0; wardPolygon < wardsPolygon.length; wardPolygon++) {
				if (turf.inside(feature, wardsPolygon[wardPolygon])) {
					feature.wardId = wardsPolygon[wardPolygon].id;
					break;
				}
			}
		})
		return features;
	}

	hasProperty(obj, tags) {

		var tagExists = false;

		for (var tag = 0; tag < tags.length; tag++) {
			if (obj.properties.tags[tags[tag]]) {
				tagExists = tags[tag];
				break;
			}
		}
		return tagExists;

	}

	getFile() {
		
		var wardsGeojson =  jsonFile.readFileSync(appRootPath + '/geojson-data/wards.json');
		var wardsInfo = this.geoJsonFile;

		wardsInfo.wards.forEach(function(wardInfo){
			wardsGeojson.features.forEach(function(feature){
				if(feature.id === wardInfo.osmID){
					wardInfo.centroid = turf.centroid(feature).geometry.coordinates;
				}
			})
		})

		return wardsInfo;
	}


	getWardPolygon(referenceWard) {

		return _.filter(this.geoJsonFile.features, (feature) => {
			if (feature['properties']['@id'] === referenceWard) {
				return feature;
			}
		})[0];

	}
}