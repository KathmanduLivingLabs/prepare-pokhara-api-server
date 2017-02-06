import config from '../../../config';
import geoJSONParser from "../../../libs/geojson-parser";
import statsCalculator from "../../../libs/statscalculator";

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

	compare: (req, res, next) => {

		req.stats.insights = {};

		req.stats.selection = (req.cdata.geojson.features && req.cdata.geojson.features.length) ? new statsCalculator(req.cdata.geojson.features, req.collects.type, config.statsIndicator[req.collects.type])
			.calculate('selection') : {}

		for (var metric in req.stats.overall) {

			if (!(req.stats.selection && req.stats.selection[metric])) {

				req.stats.selection[metric] = 0;
			}

			var relative = (req.stats.selection[metric] / req.stats.overall[metric]) * 100;
			req.stats.insights[metric] = relative > 0.5 ? Math.round(relative) : Math.round(relative * 100) / 100;

		}

		req.cdata.stats = req.stats;
		funsole.log(req.cdata, 'white', 'blue');

		next();

	}

}