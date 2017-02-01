import jsonFile from 'jsonfile';

import appRootPath from 'app-root-path';

// var pokharaGeoJson = appRootPath + '/geojson-data/pokhara-geojson.json';

// const geoJsonFile = jsonFile.readFileSync(pokharaGeoJson);

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

	bBoxCalculator(coordinates) {
		const poly = {
			minLat: coordinates[0][1],
			minLng: coordinates[0][0],
			maxLat: coordinates[0][1],
			maxLng: coordinates[0][0]
		};

		coordinates.forEach((coordinate) => {

			if (poly.minLat > coordinate[1]) {
				poly.minLat = coordinate[1];
			}

			if (poly.minLng > coordinate[0]) {
				poly.minLng = coordinate[0];
			}

			if (poly.maxLat < coordinate[1]) {
				poly.maxLat = coordinate[1];
			}

			if (poly.maxLng < coordinate[0]) {
				poly.maxLng = coordinate[0];
			}
		})

		var bbox = "(" + poly.minLat + "," + poly.minLng + "," + poly.maxLat + "," + poly.maxLng + ")";
		// console.log('BOX', bbox)

		return bbox;


	}


	boundingBox() {

		const coordinates = this.geoJsonFile.features[0].geometry.coordinates[0][0];

		return this.bBoxCalculator(coordinates);
	}

	parseWards(referenceWard) {
		
		const features = this.geoJsonFile.features;
		var wardboundingBox;

		for (var featurecount = 0; featurecount < features.length; featurecount++) {
			var feature = features[featurecount];
			if (referenceWard === feature['properties']['name']) {
				wardboundingBox = this.bBoxCalculator(feature.geometry.coordinates[0]);
				break;
			}
		}

		return wardboundingBox;


	}
}