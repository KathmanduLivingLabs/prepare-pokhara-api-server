import config from '../../../config';
import request from 'request';
import xmljsonParser from '../../../libs/xmljson';
export default {

	authenticate : (req,res,next)=>{

		console.log('HEADERS',req.headers.authorization);

		console.log('PRARA',req.body.roll)


		request(
		    {
		        url : config.osmapi.baseUrl +'/api/0.6/node/3629364319',
		        headers : {
		            "Authorization" : req.headers.authorization,
		            "Content-Type" : "application/x-www-form-urlencoded"
		        }
		    },
		    function (error, response, body) {
		        if(error) return next(error);
		        console.log("***XML***",response.body)
		        var xmlResponse = response.body;
		        var parser = new xmljsonParser(xmlResponse).toJSON();
		        // var data = {
		        // 	version : parser.toJSON()['_v']['osm']['$']['version'],
		        // 	tags : parser.toJSON()['_v']['osm']['node'][0]['tag'][0]
		        // }

		        parser['_v']['osm']['node'][0]['tag'].forEach((tag)=>{
		        	if(tag['$']['k'] === "amenity"){

		        		tag['$']['v'] = "pagal";
		        	}
		        })

		        parser['_v']['osm']['node'][0]['tag'].push({'$':{'k':'name','v':'rukh'}})


		        delete parser['_v']['osm']['node'][0]['$']['changeset'];
		        delete parser['_v']['osm']['node'][0]['$']['timestamp'];
		        delete parser['_v']['osm']['node'][0]['$']['user'];
		        delete parser['_v']['osm']['node'][0]['$']['uid'];
		        delete parser['_v']['osm']['node'][0]['$']['version'];

		        // parser['_v']['osm']['node'][0]['$']['version'] = Number(parser['_v']['osm']['node'][0]['$']['version'])+1;

		        var newParser = new xmljsonParser(parser['_v']).toXML();

		        console.log("***RESPONSE***",newParser)

		        req.cdata = {
		        	success : 1,
		        	message : 'Done !'
		        }
		        next();
		    }
		);

		// "Authorization" :  'OAuth oauth_consumer_key="WLwXbm6XFMG7WrVnE8enIF6GzyefYIN6oUJSxG65", oauth_nonce="JpCpod", oauth_signature="z9uFS7UpGxZJKJGE6XpR91AenDA%3D", oauth_signature_method="HMAC-SHA1",  oauth_token="CCrpTCeIDAf6ZHwLT7LH42Uv5tKYo0ZRCdehZmEL"',


	}

}