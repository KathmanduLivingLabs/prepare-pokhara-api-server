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

	calculate(prop, rangeMax) {

		var obj = {};
		obj.total = this.features.length;

		this.features.forEach((feature) => {
			for (var insight in this.insights) {

				var tagPresent = this.insights[insight] ? this.hasProperty(feature, this.insights[insight]["osmtags"]) : false;
				if (tagPresent) {
					if (obj[insight]) {
						var toNumber = Number(feature.properties.tags[tagPresent]);
						obj[insight] = Number.isInteger(toNumber) ? (obj[insight] + toNumber) : this.insights[insight].type === "value" ? (this.insights[insight].on === feature.properties.tags[tagPresent] ? obj[insight] + 1 : obj[insight] + 0) : obj[insight] + 1;
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
						obj[insight] = Number.isInteger(toNumber) ? toNumber : this.insights[insight].type === "value" ? (this.insights[insight].on === feature.properties.tags[tagPresent] ? 1 : 0) : 1;
					}
				} else {
					if (obj[insight] === undefined) {
						obj[insight] = 0;
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

				if (tagPresent) {
					var parseNum = Number(feature.properties.tags[tagPresent]);
					if (Number.isInteger(parseNum)) {
						if (!(parseNum >= this.filters[filter])) {
							passFilter = false;
						}
					} else {
						if (!(this.insights[filter]['type'] === "value" ?  feature.properties.tags[tagPresent] === this.insights[filter]['on'] : feature.properties.tags[tagPresent] === this.filters[filter])) {
							passFilter = false;
						}
					}
				} else {
					passFilter = false;
				}

			}
			if (passFilter) filtered.push(feature);
		});

		return filtered;

	}



}