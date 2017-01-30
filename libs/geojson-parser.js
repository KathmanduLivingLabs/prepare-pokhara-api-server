import jsonFile from 'jsonfile';

import appRootPath from 'app-root-path';

var pokharaGeoJson = appRootPath + '/geojson-data/pokhara-geojson.json';

const geoJsonFile = jsonFile.readFileSync(pokharaGeoJson);

export default class geoJSONParser {


	parse(){

		const coordinates = geoJsonFile.features[0].geometry.coordinates[0][0];
		
		var poly="";

		coordinates.forEach((coordinate,index)=>{

			var tempcor = [coordinate[1],coordinate[0]].join(' ');
			poly = poly + tempcor ;

			if(index<coordinates.length-1){
				poly = poly + " ";
			}
		})

		var polyString = ('(poly:"'+poly+'")').toString();

		return  polyString;

	}
}