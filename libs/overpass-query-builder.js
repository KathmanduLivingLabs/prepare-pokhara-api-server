
import config from "../config";
import geoJSONParser from "./geojson-parser";

const amenities = config.amenities;

export default class queryBuilder {
	constructor(options){
		this.json = options.json;
		this.query = "";
		this.headGenerator = (query)=>{
			return `${query} [out:${this.json.requestConfig.dataType}][timeout:${this.json.requestConfig.timeout}]; `;
		};
		this.bodyGenerator = (query)=>{
			var filters = "";
			var tags = this.json.tags;
			const releveanttags = config.amenities[this.json.type].taggedon || {"amenity" : config.amenities[this.json.type].value } ;
			for (let releveanttag in releveanttags){
				const multipleAmenites = !config.amenities[this.json.type].taggedon ? amenities[this.json.type].value.split(",") : config.amenities[this.json.type].taggedon[releveanttag].value.split(",") ;
				multipleAmenites.forEach((eachamenity) => {
					filters = `${filters}["${releveanttag}"="${eachamenity}"] `;		
				});
			}
			// for (var tag in tags) {
			// 	if(!Number.isInteger(tags[tag])){
			// 		if(tag === "amenity"){
			// 			const multipleAmenites = amenities[tags[tag]].value.split(",");
			// 			multipleAmenites.forEach((eachamenity) => {
			// 				filters = `${filters}["${tag}"="${eachamenity}"] `;		
			// 			});
			// 		}else{
			// 			filters = `${filters}["${tag}"="${tag === "amenity" ? amenities[this.json.tags[tag]].value : tags[tag]}"] `;		
			// 		}
			// 	}else{
			// 		filters = `${filters}["${tag}"] `;
			// 	}
			// }
			let geojsonparser = this.json.ward !== undefined ? new geoJSONParser("wards") : new geoJSONParser("pokhara-geojson") ;
			let poly = this.json.ward !== undefined ? geojsonparser.parseWards(this.json.ward) : geojsonparser.boundingBox() ;
			query = query + "(";
			this.json.featureTypes.forEach(function(featureType) {
				filters.split(" ").filter(Boolean).forEach((filter)=>{
					query = query + featureType + filter + poly + ";";
				});
			});
			query = query + "); ";
			return query;
		};
		this.tailGenerator = (query,metaData)=>{
			var output = config.overpass.metaOn || (metaData && metaData.metaOn) ? "out meta;" : "out body;";
			return query + output +
				">; " +
				"out skel qt;";
		};
	}
	build(metaData) {
		this.query = this.headGenerator(this.query);
		this.query = this.bodyGenerator(this.query);
		this.query = this.tailGenerator(this.query,metaData);
		return this.query;
	}
}