export default class statsCalculator {

	constructor(features, type, insights, filters) {

		this.features = features;
		this.type = type;
		this.insights = insights;
		this.filters = filters;

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

	matchAgainst(matches,string){
		var matched = false;
		string = string.toLowerCase();
		

		for(var match=0;match<matches.length;match++){
			
			var expr = new RegExp(matches[match]);

			if(expr.test(string) ){
				matched = true;
				break;
			}
		}
		
		return matched;

		// for(var match=0;match<matches.length;match++){
		// 	var expr = new RegExp(matches[match]);
		// 	if(expr.test(string) ){
		// 		matched = true;
		// 	}else{

		// 		if(matches.indexOf(string)  !== -1){
		// 			matched = true;
		// 		}else{
		// 			matched = false;
		// 		}
		// 	}
		// 	console.log('****',string,expr,matched)
		// }
		
		// return matched;

	}



	includesTag(objectParsed,tagPresent,others){

		var tagExists = false;

		for(var tag=0;tag<objectParsed.length;tag++){
			if((tagPresent.toLowerCase().includes(objectParsed[tag].toLowerCase())) || (others && others.length && objectParsed.indexOf("others") !== -1 && !this.matchAgainst(others,tagPresent))  ){
				tagExists = true;
				break;
			}
		}

		return tagExists;

	}

	calculate(prop, rangeMax) {

		var obj = {};
		obj.total = this.features.length;

		this.features.forEach((feature) => {
			for (var insight in this.insights) {

				if(!this.insights[insight].hidden){

					var tagPresent = this.insights[insight] ? this.hasProperty(feature, this.insights[insight]["osmtags"]) : false;
					if (tagPresent) {
						if (obj[insight]) {
							var toNumber = Number(feature.properties.tags[tagPresent]);
							obj[insight] = Number.isInteger(toNumber) ? (obj[insight] + toNumber) : this.insights[insight].type === "value" ? ( feature.properties.tags[tagPresent].toLowerCase().includes(this.insights[insight].on.toLowerCase()) ? obj[insight] + 1 : obj[insight] + 0) :  (feature.properties.tags[tagPresent] === "yes" ? obj[insight] + 1 : obj[insight] + 0 );
							if (Number.isInteger(toNumber) && prop === 'total' && this.insights[insight].type === "slider") {
								if (rangeMax[insight] !== undefined) {
									if (toNumber > rangeMax[insight]) {
										rangeMax[insight] = toNumber;
									}
								} else {
									rangeMax[insight] = toNumber;
								}

							}
						} else {
							var toNumber = Number(feature.properties.tags[tagPresent]);
							obj[insight] = Number.isInteger(toNumber) ? toNumber : this.insights[insight].type === "value" ? (feature.properties.tags[tagPresent].toLowerCase().includes(this.insights[insight].on.toLowerCase()) ? 1 : 0) : (feature.properties.tags[tagPresent] === "yes" ? 1 : 0);
						}
					} else {
						if (obj[insight] === undefined) {
							obj[insight] = 0;
						}
					}

				}

				
			}
		})

		return obj;

	}

	applyFilter() {

		var filtered = [];
		this.features.forEach((feature) => {
			var passFilter = true;
			for (var filter in this.filters) {
				var tagPresent = this.insights[filter] ? this.hasProperty(feature, this.insights[filter]["osmtags"]) : false;

				if(this.insights[filter]['object'] ){
					if(typeof this.filters[filter] === "object" ){
						var objectParsed = this.filters[filter];
					}else{
						var objectParsed = JSON.parse(this.filters[filter]);
					}
				}


				if (tagPresent) {
					var parseNum = Number(feature.properties.tags[tagPresent]);
					if (Number.isInteger(parseNum)) {
						if (!(parseNum >= this.filters[filter])) {
							passFilter = false;
						}
					} else {
						
						if (!(this.insights[filter]['type'] === "value" ?  feature.properties.tags[tagPresent].toLowerCase().includes(this.insights[filter]['on'].toLowerCase()) : this.insights[filter]['object'] ? this.includesTag(objectParsed,feature.properties.tags[tagPresent],this.insights[filter]["others"] )   :  feature.properties.tags[tagPresent].toLowerCase().includes(this.filters[filter].toLowerCase()) )) {
							passFilter = false;
						}
						
					}
				} else {
					if(this.insights[filter]["others"] && this.insights[filter]["others"].length && objectParsed.indexOf("others") !== -1){

					}else{
						passFilter = false;
					}
				}

			}
			if (passFilter) filtered.push(feature);
		});

		return filtered;

	}



}