import jsonFile from 'jsonfile';

import appRootPath from 'app-root-path';

var pokharaGeoJson = appRootPath + '/geojson-data/pokhara-geojson.json';

const geoJsonFile = jsonFile.readFileSync(pokharaGeoJson);

export default class geoJSONParser {


	parse() {

		const coordinates = geoJsonFile.features[0].geometry.coordinates[0][0];

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

		const coordinates = geoJsonFile.features[0].geometry.coordinates[0][0];
		
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
}