import config from '../../../config';
import request from 'request';
import queryBuilder from '../../../libs/overpass-query-builder';
import xmljsonParser from '../../../libs/xmljson';
import googleCaja from 'google-caja';
import osmToGeojson from 'osmtogeojson';
import turf from '@turf/turf';
import geoJSONParser from "../../../libs/geojson-parser";

var sanitize = googleCaja.sanitize;

var overpassConfig = config.overpass;

export default {

	collect: (req, res, next) => {

		var fields = ['type', 'filters', 'ward'];
		req.collects = {};
		fields.forEach((field) => {
			req.collects[field] = (req.body[field] || req.query[field]);
		})
		if (req.collects.filters && typeof req.collects.filters !== 'object') req.collects.filters = JSON.parse(req.collects.filters);

		next();
	},

	fetch: (req, res, next) => {


		// request(
		//     {
		//         url : "https://www.openstreetmap.org/api/0.6/user/details",
		//         headers : {
		//         	authorization:  req.headers.authorization
		//         }
		//     },
		//     function (error, response, body) {
		//         // Do more stuff with 'body' here
		//         console.log("HELLO",response.body)
		//         console.log(error)
		//     }
		// );

		var json = {
			requestConfig: {
				dataType: overpassConfig.dataType,
				timeout: overpassConfig.timeout
			},
			tags: {
				'amenity': req.collects.type
			},
			featureTypes: overpassConfig.include
		}

		// if (req.collects.ward) json['ward'] = req.collects.ward;

		if (req.collects.filters) json.tags = Object.assign(json.tags, req.collects.filters)

		var overPassQueryBuilder = new queryBuilder({
			json: json
		});

		var query = overPassQueryBuilder.build();

		console.log(' EXECUTING QUERY >>>> ', query);

		request(overpassConfig.baseUrl + query, (err, response) => {

			if (err) return next(err);

			if (response && response.statusCode) {

				try {
					var geojsonResponse = osmToGeojson(JSON.parse(response.body));
				} catch (e) {

					req.cdata = {
						success: 0,
						message: response.body
					}
					return next();
				}

				geojsonResponse.features.forEach((feature)=>{
					if(feature.geometry.type === "Polygon"){
						feature.geometry = turf.centroid(feature).geometry;
					}
				})
				req.cdata = {
					success: 1,
					geojson: geojsonResponse,
					message: 'Features fetched successfully !'
				}

			} else {
				req.cdata = {
					success: 0,
					message: "Something went wrong !"
				}
			}

			return next();


		})

	},

	test: (req, res, next) => {


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

		var parser = new xmljsonParser({
			user: {
				'$': {
					name: "srvbh",
					roll: 123
				},
				address: 'kathmandu'
			}
		});

		console.log('XML', parser.toXML())

	},


	wards : (req,res,next)=>{

		var parser = new geoJSONParser('wards-name');

		req.cdata= {
			success : 1,
			message : 'Wards successfully fetched !',
			wards : parser.getWards()
		}

		next();

	},

	filterWard : (req,res,next)=>{
		if (req.collects.ward){
			var features = req.cdata.geojson.features;
			var geojsonparser = new geoJSONParser('wards');
			req.cdata.geojson = geojsonparser.filterWards(features,req.collects.ward);
		}
		return next();
		
	},


	calculateTotalStat : (req,res,next)=>{

		req.stats = {
			total : {}
		};

		req.stats.total.features = req.cdata.geojson ? req.cdata.geojson.length : 0;
		

	}
}