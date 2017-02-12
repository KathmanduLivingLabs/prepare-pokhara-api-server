import config from '../../../config';

export default {

	authenticate : (req,res,next)=>{

		console.log('HEADERS',req.headers.authorization);

		// request(
		//     {
		//         url : config.osmapi.baseUrlDev,
		//         headers : req.headers.authorization
		//     },
		//     function (error, response, body) {
		//         if(error) return next(error);
		//         console.log("***RESPONSE***",response.body)
		//     }
		// );

		// "Authorization" :  'OAuth oauth_consumer_key="WLwXbm6XFMG7WrVnE8enIF6GzyefYIN6oUJSxG65", oauth_nonce="JpCpod", oauth_signature="z9uFS7UpGxZJKJGE6XpR91AenDA%3D", oauth_signature_method="HMAC-SHA1",  oauth_token="CCrpTCeIDAf6ZHwLT7LH42Uv5tKYo0ZRCdehZmEL"',


	}

}