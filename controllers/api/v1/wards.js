import geoJSONParser from "../../../libs/geojson-parser";

export default {

	list: (req, res, next) => {

		var parser = new geoJSONParser('wards-name');

		req.cdata = {
			success: 1,
			message: 'Wards successfully fetched !',
			wards: parser.getWards()
		}

		next();

	},

	filter: (req, res, next) => {

		if (req.collects.ward && req.collects.ward !== '*' ) {
			var features = req.cdata.geojson.features;
			var geojsonparser = new geoJSONParser('wards');
			req.cdata.geojson.features = geojsonparser.filterWards(features, req.collects.ward);
		}
		return next();

	},

	polygon : (req,res,next) => {

		if (req.collects.ward && req.collects.ward !== '*' ) {
			
			var wardGeojsonparser = new geoJSONParser('wards');
			req.cdata.wardGeojson = wardGeojsonparser.getWardPolygon(req.collects.ward);
		}

		return next();

	}

}