import config from '../../../config';
import request from 'request';
import xmljsonParser from '../../../libs/xmljson';
export default {

	authenticate: (req, res, next) => {

		console.log('HEADERS', req.headers.authorization);

		// console.log('PRARA', req.body.roll)

		var xml = '<osm version="0.6" generator="CGImap 0.5.8 (27876 thorn-03.openstreetmap.org)" copyright="OpenStreetMap and contributors" attribution="http://www.openstreetmap.org/copyright" license="http://opendatacommons.org/licenses/odbl/1-0/">\
						 <node id="12345" changeset="99148" version="4" lat="58.4202102" lon="23.1211032">\
							  <tag k="natural" v="tree555"/>\
							  <tag k="amenity" v="testtree555"/>\
						 </node>\
					</osm>';


		// var xml = 	'<osm>\
		// 				  <changeset>\
		// 				    <tag k="created_by" v="API"/>\
		// 				    <tag k="comment" v="Testing on dev server "/>\
		// 				  </changeset>\
		// 			</osm>';



		// console.log(xml)
		var url = config.osmapi.devBaseUrl + '/api/0.6/node/12345';
		console.log("URLLLL****", url)
		request({
				url: url,
				method: 'PUT',
				headers: {
					"Authorization": req.headers.authorization,
					"Content-Type": "text/xml"
				},
				body: xml
			},
			function(error, response, body) {
				if (error) return next(error);
				console.log("***STATUS***", response.statusCode)
				console.log("***XML***", response.body)



				// var xmlResponse = response.body;
				// var parser = new xmljsonParser(xmlResponse).toJSON();
				// // var data = {
				// // 	version : parser.toJSON()['_v']['osm']['$']['version'],
				// // 	tags : parser.toJSON()['_v']['osm']['node'][0]['tag'][0]
				// // }

				// parser['_v']['osm']['node'][0]['tag'].forEach((tag)=>{
				// 	if(tag['$']['k'] === "amenity"){

				// 		tag['$']['v'] = "pagal";
				// 	}
				// })

				// parser['_v']['osm']['node'][0]['tag'].push({'$':{'k':'name','v':'rukh'}})


				// delete parser['_v']['osm']['node'][0]['$']['changeset'];
				// delete parser['_v']['osm']['node'][0]['$']['timestamp'];
				// delete parser['_v']['osm']['node'][0]['$']['user'];
				// delete parser['_v']['osm']['node'][0]['$']['uid'];
				// delete parser['_v']['osm']['node'][0]['$']['version'];

				// // parser['_v']['osm']['node'][0]['$']['version'] = Number(parser['_v']['osm']['node'][0]['$']['version'])+1;

				// var newParser = new xmljsonParser(parser['_v']).toXML();

				// console.log("***RESPONSE***",newParser)

				req.cdata = {
					success: 1,
					message: 'Done !'
				}
				next();
			}
		);

		// "Authorization" :  'OAuth oauth_consumer_key="WLwXbm6XFMG7WrVnE8enIF6GzyefYIN6oUJSxG65", oauth_nonce="JpCpod", oauth_signature="z9uFS7UpGxZJKJGE6XpR91AenDA%3D", oauth_signature_method="HMAC-SHA1",  oauth_token="CCrpTCeIDAf6ZHwLT7LH42Uv5tKYo0ZRCdehZmEL"',


	}

}