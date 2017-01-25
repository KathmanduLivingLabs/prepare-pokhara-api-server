import config from '../../../config'; 
import request from 'request';
import queryBuilder from '../../../libs/overpass-query-builder';

var overpassConfig = config.overpass;

export default {

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

		var overPassQueryBuilder = new queryBuilder({json :json});
		
		var query = overPassQueryBuilder.build();

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

