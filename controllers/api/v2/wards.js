import geoJSONParser from "../../../libs/geojson-parser";

export default {

	list: (req, res, next) => {
		let parser = new geoJSONParser("wards-name");
		req.cdata = {
			success: 1,
			message: "Wards successfully fetched !",
			wards: parser.getWards()
		};
		next();
	},

	filter: (req, res, next) => {
		if (req.collects.ward && req.collects.ward !== "*" ) {
			let features = req.cdata.geojson.features;
			let geojsonparser = new geoJSONParser("wards");
			req.cdata.geojson.features = geojsonparser.filterWards(features, req.collects.ward);
		}
		return next();
	},

	polygon : (req,res,next) => {
		if (req.collects.ward && req.collects.ward !== "*" ) {
			let wardGeojsonparser = new geoJSONParser("wards");
			req.cdata.wardGeojson = wardGeojsonparser.getWardPolygon(req.collects.ward);
		}
		return next();
	}

};