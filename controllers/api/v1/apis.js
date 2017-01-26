import config from '../../../config'; 
import request from 'request';
import queryBuilder from '../../../libs/overpass-query-builder';
import xmljsonParser from '../../../libs/xmljson';

var overpassConfig = config.overpass;

export default {

	fetch :  (req,res,next)=> {

	

		request(
		    {
		        url : "https://www.openstreetmap.org/api/0.6/user/details",
		        headers : {
		        	authorization:  req.headers.authorization
		        }
		    },
		    function (error, response, body) {
		        // Do more stuff with 'body' here
		        console.log("HELLO",response.body)
		        console.log(error)
		    }
		);

		// var json = {
			
		// 	requestConfig: {
		// 		dataType: overpassConfig.dataType,
		// 		timeout: overpassConfig.timeout
		// 	},
		// 	tags: {
		// 		amenity: req.params.featuretype
		// 	},
		// 	featureTypes: ['node']

		// }

		// var overPassQueryBuilder = new queryBuilder({json :json});
		
		// var query = overPassQueryBuilder.build();

		// request(overpassConfig.baseUrl+query,(err,response)=>{
		// 	if(err) return next(err);

		// 	req.cdata = {
		// 		success : 1,
		// 		features : JSON.parse(response.body),
		// 		message : 'Features fetched successfully !'
		// 	}

		// 	next();


		// })

	},

	test : (req,res,next)=>{


		var xml = '<osm version="0.6" generator="OpenStreetMap server">\
		  <user id="5084910" display_name="srvbhattarai" account_created="2017-01-06T07:34:24Z">\
		    <description></description>\
		    <contributor-terms agreed="true" pd="false"/>\
		    <roles>\
		    </roles>\
		    <changesets count="0"/>\
		    <traces count="0"/>\
		    <blocks>\
		      <received count="0" active="0"/>\
		    </blocks>\
		    <languages>\
		      <lang>en-US</lang>\
		      <lang>en</lang>\
		    </languages>\
		    <messages>\
		      <received count="0" unread="0"/>\
		      <sent count="0"/>\
		    </messages>\
		  </user>\
		</osm>'

		// var parser = new xmljsonParser(xml);

		// parser.toJSON()
		// 	.then((result)=>{
		// 		console.log('HUNCHA',result)
		// 	},(err)=>{
		// 		console.log('ERR',err);
		// 	})
		// 	.catch((err)=>{
		// 		console.log('CAUGHT ERR',err);
		// 	})

		var parser = new xmljsonParser({user : { '$' : { name : "srvbh" , roll :123} , address : 'kathmandu'  }  });

		console.log('XML',parser.toXML())

	}
}

