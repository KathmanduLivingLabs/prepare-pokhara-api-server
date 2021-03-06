import config from "../../../config";
import _ from "underscore";

export default {

	type: (req, res, next) => {

		var supportedAmenities = Object.keys(config.amenities);
		if (supportedAmenities.indexOf(req.collects.type) === -1) {
			return next(new Error("This type is not supported !"));
		}
		next();
	},

	filters: (req, res, next) => {
		
		try {
			req.collects.filters = req.collects.filters ? (typeof req.collects.filters === "object" ? req.collects.filters : JSON.parse(req.collects.filters)) : {};
			var variables = req.collects.variables ? (typeof req.collects.variables === "object" ? req.collects.variables : JSON.parse(req.collects.variables)) : {};
		}
		catch(e){
			return next(new Error("Error in parsing filters/variables param. It must be of type object"));
		}
		var validVariables = {};
		for (var variable in variables) {
			var value = variables[variable];
			if (Number(value) !== 0) {
				validVariables[variable] = value;
			}
		}
		Object.assign(req.collects.filters, validVariables);
		if (req.collects.filters && Object.keys(req.collects.filters).length) {
			var applicableFilters = Object.keys(config.statsIndicator[req.collects.type]);
			var providedFilters = Object.keys(req.collects.filters);
			if (!(_.intersection(providedFilters, applicableFilters).length === providedFilters.length)) {
				return next(new Error("Make sure filter parameters are valid for this type"));
			}
			for(var filter in req.collects.filters){
				if(typeof req.collects.filters[filter] !== "object"){
					if(req.collects.filters[filter] === "*"){
						delete req.collects.filters[filter];
					}
				}
			}
		}
		next();
	}

};