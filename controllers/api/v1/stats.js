import config from '../../../config';
import geoJSONParser from "../../../libs/geojson-parser";
import statsCalculator from "../../../libs/statscalculator";

function compare(overall, selection, stat) {
	for (var metric in overall) {
		if (!(selection && selection[metric])) {
			selection[metric] = 0;
		}
		var relativeRegion = (selection[metric] / overall[metric]) * 100;
		stat[metric] = relativeRegion > 0.5 ? Math.round(relativeRegion) : Math.round(relativeRegion * 100) / 100;
	}

}

export default {

	total: (req, res, next) => {

		req.stats = {};

		var rangeMax = {};

		req.stats.overall = new statsCalculator(req.cdata.geojson.features, req.collects.type, config.statsIndicator[req.collects.type])
			.calculate('total', rangeMax);

		req.cdata.initialMetrics = {
				slider: rangeMax
			} // notice that we are passing the rangeMax as an object to the statCalculator function and finding the max value within. Since the value is referenced, it will be updated here as well !

		next();



	},

	region: (req, res, next) => {

		req.stats.region = new statsCalculator(req.cdata.geojson.features, req.collects.type, config.statsIndicator[req.collects.type])
			.calculate('region');

		req.stats.regionInsights = {};

		for (var metric in req.stats.overall) {


			if (req.stats.region[metric] === undefined) {
				req.stats.region[metric] = 0;
			}

			if (req.stats.region[metric] === 0 && req.stats.region['total'] === 0) {
				var relative = 0;
			} else {
				var relative = (req.stats.region[metric] / req.stats.region['total']) * 100;
			}

			req.stats.regionInsights[metric] = relative > 0.5 ? Math.round(relative) : Math.round(relative * 100) / 100;

		}


		next();
	},

	compare: (req, res, next) => {

		req.stats.insights = {};

		req.stats.selection = (req.cdata.geojson.features && req.cdata.geojson.features.length) ? new statsCalculator(req.cdata.geojson.features, req.collects.type, config.statsIndicator[req.collects.type])
			.calculate('selection') : {}

		var selectionStats = compare(req.stats.overall, req.stats.selection, req.stats.insights);

		// var regionStats = compare(req.stats.overall,req.stats.selection,req.stats.region,req.stats.regionInsights);


		req.cdata.stats = req.stats;
		funsole.log(req.cdata, 'white', 'blue');

		next();

	}

}