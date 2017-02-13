import config from '../../../config';
import request from 'request';
export default {

	authenticate : (req,res,next)=>{

		console.log('HEADERS',req.headers.authorization);

		request(
		    {
		        url : config.osmapi.baseUrl +'/api/0.6/user/details ',
		        headers : {
		            "Authorization" : req.headers.authorization,
		            "Content-Type" : "application/x-www-form-urlencoded"
		        }
		    },
		    function (error, response, body) {
		        if(error) return next(error);
		        console.log("***RESPONSE***",response.body)
		    }
		);

		// "Authorization" :  'OAuth oauth_consumer_key="WLwXbm6XFMG7WrVnE8enIF6GzyefYIN6oUJSxG65", oauth_nonce="JpCpod", oauth_signature="z9uFS7UpGxZJKJGE6XpR91AenDA%3D", oauth_signature_method="HMAC-SHA1",  oauth_token="CCrpTCeIDAf6ZHwLT7LH42Uv5tKYo0ZRCdehZmEL"',


	}

}