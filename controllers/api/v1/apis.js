var overPassQueryBuilder = require('../../../libs/overpass-query-builder');
var request = require('request');
var overpassConfig = require('../../../config').overpass;


module.exports = {

	fetch :  (req,res,next)=> {

		var json = {
			
			requestConfig: {
				dataType: overpassConfig.dataType,
				timeout: overpassConfig.timeout
			},
			tags: {
				amenity: req.params.featuretype
			},
			featureTypes: ['node']

		}

		var query = overPassQueryBuilder.build({json :json});

		request(overpassConfig.baseUrl+query,(err,response)=>{
			if(err) return next(err);

			req.cdata = {
				success : 1,
				features : JSON.parse(response.body),
				message : 'Features fetched successfully !'
			}

			next();


		})

	}
}