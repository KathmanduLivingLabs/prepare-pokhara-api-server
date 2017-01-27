
import config from "../config";

const amenities = config.amenities;

const boundingCoordinates = config.boundingCoordinates;

export default class queryBuilder {

	constructor(options){

		this.json = options.json;
		this.query = "";

		this.headGenerator = (query)=>{
			return query + "[out:" + this.json.requestConfig.dataType + "][timeout:" + this.json.requestConfig.timeout + "]; ";
		}

		this.bodyGenerator = (query)=>{
			
			var filters = "";
			var tags = this.json.tags;
			for (var tag in tags) {
				console.log('****',tag,tags)
				if(!Number.isInteger(tags[tag])){
					filters = filters + '["' + tag + '"~"' + (tag === 'amenity' ? amenities[this.json.tags[tag]] : tags[tag]  ) + '"]';	
				}else{
					filters = filters + '["' + tag + '"]';	
				}
				
			}
			query = query + "(";
			this.json.featureTypes.forEach(function(featureType) {
				query = query + featureType + filters + boundingCoordinates + ";"
			})
			query = query + "); ";
			return query;
		}

		this.tailGenerator = (query)=>{
			return query + "out body;" +
				">; " +
				"out skel qt;"
		}
	}

	build() {


		this.query = this.headGenerator(this.query);
		this.query = this.bodyGenerator(this.query);
		this.query = this.tailGenerator(this.query);


		return this.query;

	}
}