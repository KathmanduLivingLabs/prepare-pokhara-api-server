import mw from '../../../libs/middleware';
import apiFeatures from './features';
import apiWards from './wards';
import apiMetrics from './metrics';
import validate from './validator';
import stats from './stats';
import auth from './auth';
import csvWorker from './csvworker';

module.exports = (router) => {

	/**
	 * @api {get} /api/v1/features Features 
	 * @apiName Features
	 * @apiGroup Fetch
	 *
	 *
	 * @apiParam {Varchar} type Type for feature to be fetched
	 * @apiParam {Varchar} ward Provide ward's relation id to fetch the data for specific ward only
	 * @apiParam {Object} variables Provide Variable values (like Bed Capacity) specific to type
	 * @apiParam {Object} filters Filter(s) to apply for the data
	 * @apiSuccessExample {json} Parameters Format - Hospital
	 *						{
	 *							"type":"hospital",
	 *							"ward" : "relation/6270328",
	 *							"filters" : {
	 *								"Emergency":"yes",
	 								"ICU" : "yes",
	 								"NICU" : "yes",
	 								"Ventilator" : "yes",
	 								"Xray" : "yes",
	 								"Operation Theatre" : "yes",
	 								"Ambulance" : "yes"
	 *							},
	 *							"variables" : {
	 *								"Bed Capacity" : {"high":750,"low":100}						
	 *							}
	 *						}
	 * @apiSuccessExample {json} Parameters Format - School
	 *						{
	 *							"type":"school",
	 *							"ward" : "relation/6270328",
	 *							"filters" : {
	 *								"Operator Type":["private","government","community","others"]
	 								
	 *							},
	 *							"variables" : {
	 *								"Students" : {"high":750,"low":100}				
	 *							}
	 *						}
	 * @apiSuccessExample {json} Parameters Format - Bank
	 *						{
	 *							"type":"bank",
	 *							"ward" : "relation/6272781",
	 *							"filters" : {
	 *								"Operator":"Prabhu Bank",
	 *								"ATM" : "yes",
	 								"NRB Class" : "development"
	 *								
	 *							}
	 *						}
	 * @apiSuccessExample {json} Parameters Format - ATM
	 *						{
	 *							"type":"atm",
	 *							"ward" : "relation/6275741",
	 *							"filters" : {
	 *								"Operator":"Laxmi Bank"
	 *								
	 *							}
	 *						}
	 * @apiSuccess {Integer} success Success status
	 * @apiSuccess {String} message Success message
	 * @apiSuccess {Object[]} geojson GeoJSON  data 
	 * @apiSuccessExample {json} Success-Response-Hospital
	 *  {
	 *       "success": 1,
	 *       "message": "Features fetched successfully !",
	 * 		"geojson" : {
	 *			"type" : "FeatureCollection",
	 *			"features" : [
	 *				{
	 *				        "type": "Feature",
	 *				        "id": "node/1343868939",
	 *				        "properties": {
	 *				          "type": "node",
	 *				          "id": 1343868939,
	 *				          "tags": {
	 *				            "amenity": "school",
	 *				            "name": "Fewa Seconday Boarding School",
	 *				            "name:ne": "फेवा उच्च मा. वि.",
	 *				            "operator:type": "government",
	 *				            "personnel:count": "17",
	 *				            "source": "DEO, Kaski",
	 *				            "student:count": "263"
	 *				          },
	 *				          "relations": [],
	 *				          "meta": {}
	 *				        },
	 *				        "geometry": {
	 *				          "type": "Point",
	 *				          "coordinates": [
	 *				            83.9581541,
	 *				            28.2143012
	 *				          ]
	 *				        }
	 *				      }
	 *
	 *			]
	 * 		},
	 *		"stats": {
	 *		     overall: 
	 *		      { total: 105,
	 *		        'Bed Capacity': 2641,
	 *		        ICU: 14,
	 *		        NICU: 6,
	 *		        Ventilator: 8,
	 *		        Xray: 10,
	 *		        Emergency: 20,
	 *		        'Operation Theatre': 10 
	 *			 },
	 *		     insights: 
	 *		      { total: '9.523809523809524%',
	 *		        'Bed Capacity': '76.63763725861416%',
	 *		        ICU: '71.42857142857143%',
	 *		        NICU: '66.66666666666666%',
	 *		        Ventilator: '75%',
	 *		        Xray: '70%',
	 *		        Emergency: '50%',
	 *		        'Operation Theatre': '100%' 
	 *			 },
	 *		     selection: 
	 *		      { total: 10,
	 *		        'Bed Capacity': 2024,
	 *		        ICU: 10,
	 *		        NICU: 4,
	 *		        Ventilator: 6,
	 *		        Xray: 7,
	 *		        Emergency: 10,
	 *		        'Operation Theatre': 10 
	 *			  } 
	 *		},
	 *		"initialMetrics" : {
	 *			"slider" : {
	 *				'Bed Capacity' : 750
 	 *			}
	 *		}
	 *	} 
	 *
	 *
	 *
	 * @apiSuccessExample {json} Success-Response-Bank
	 *   {
	 *       "success": 1,
	 *       "message": "Features fetched successfully !",
	 * 		 "geojson" : {
	 *			"type" : "FeatureCollection",
	 *			"features" : [
	 *				 {
	 *				         "type": "Feature",
	 *				         "id": "node/4599355485",
	 *				         "properties": {
	 *				           "type": "node",
	 *				           "id": 4599355485,
	 * 				           "tags": {
	 *				             "alt_name": "ATM",
	 *				             "amenity": "bank",
	 *				             "atm": "yes",
	 *				             "contact:email": "pokhara.ro@adbl.gov.np",
	 *				             "contact:fax": "521107",
	 *				             "contact:phone": "061-528445, 520458, 520156",
	 *				             "contact:website": "www.adbl.gov.np",
     *				             "name": "Agriculture Development Bank Limited",
	 *				             "operator": "Agriculture Development Bank Limited",
	 *				             "source": "2C Pokhara Field Data Collection"
	 *				           },
	 *				           "relations": [],
	 *				           "meta": {}
	 *				         },
	 *				         "geometry": {
	 *				           "type": "Point",
	 *				           "coordinates": [
	 *				             83.9868009,
     *				             28.21063
	 *				           ]
	 *				         }
	 *				}
	 *
	 *			]
	 * 		},
     *	 	"stats": {
	 *	 	     "overall": {
	 *	 	       "total": 191,
	 *	 	       "ATM": 90
	 *	 	     },
	 *	 	     "insights": {
	 *	 	       "total": 100,
	 *	 	       "ATM": 100
	 *	 	     },
	 *	 	     "selection": {
	 *	 	       "total": 191,
	 *	 	       "ATM": 90
	 *	 	     },
	 *			 "region" : {
	 *				"total" : 43,
	 *				"ATM" : 16
	 *			 },
	 *			 "regionInsights" : {
	 *				"total" : 37,
	 *				"ATM" : "100"
	 *			 }
	 *	 	   }
	 *		"initialMetrics" : {
	 *			"slider" : {
	 *				
	 *			}
	 *		},
	 *		"constraints" : {
	 *			"operator" : ["Laxmi Bank Ltd.","Agriculture Development Bank Limited"],
	 *			"network":["VISA","VISA ELECTRON"]
	 *		},
	 *		"nrb_class": [
	 *		      "a",
	 *		      "b",
	 *		      "co-operative",
	 *		      "commercial",
	 *		      "cooperative",
	 *		      "development",
	 *		      "finance companies",
	 *		      "micro finance"
	 *		]
     *
	 *	} 
	 *
	 *
	 *
	 * @apiDescription API that fetch features
	 * @apiVersion 1.0.0
	 */


	router.get('/api/v1/features',
		apiFeatures.collect,
		apiFeatures.required,
		validate.type,
		validate.filters,
		apiFeatures.fetch,
		apiFeatures.applyGrades,
		apiFeatures.within,
		stats.total,
		apiWards.filter,
		apiFeatures.fiter,
		stats.region,
		stats.compare,
		apiWards.polygon,
		apiFeatures.constraints,
		apiFeatures.applyPreservedTags,
		apiFeatures.tagWards,
		apiFeatures.log,
		mw.respond, mw.error);

	// router.get('/api/v1/test',apis.test,mw.respond,mw.error);

	/**
	    * @api {get} /api/v1/wards  Wards  
	    * @apiName Wards
	    * @apiGroup Fetch
	   
		* @apiSuccess {Integer} success Success status
		* @apiSuccess {String} message Success message
	    * @apiSuccess {Object[]} wards Wards Object
	    * @apiSuccessExample {json} Success-Response:
	    *
	    *	{
	    *	  "success": 1,
	    *	  "message": "Wards successfully fetched !",
	   	*	  "wards": [
		*   		      {
		*   		        "name": "Bagar",
		*   		        "number": "1",
		*   		        "osmID": "relation/6273322"
		*   		      }
	   	*	     ]
	   	*	}
		*	
	    *
	    * @apiDescription API that fetch wards list
	    * @apiVersion 1.0.0
	    */

	router.get('/api/v1/wards',
		apiMetrics.wards,
		mw.respond, mw.error);

	// router.get('/api/v1/metrics', apis.metrics, mw.respond, mw.error);



	router.put('/api/v1/features/info',
		apiFeatures.collect,
		auth.authenticate,
		mw.respond,
		mw.error
	)

	router.get('/template',function(req,res){
		console.log('YYAHHHA***')
	});


	router.post('/api/v1/snapshot/create',
		apiFeatures.collect,
		apiFeatures.snapshot,
		mw.respond,
		mw.error
	);

	/**
	    * @api {get} /api/v1/extracts/generate  Generate CSV / GeoJSON  
	    * @apiName Generate
	    * @apiGroup Extracts
	   
		* @apiSuccess {Integer} success Success status
	    * @apiSuccess {Object[]} link Extract link  Object
	    * @apiSuccessExample {json} Parameters Format - Hospital
	    *						{
	    *							"type":"hospital",
	    *							"ward" : "relation/6270328",
	    *							"filters" : {
	    *								"Emergency":"yes",
	    								"ICU" : "yes",
	    								"NICU" : "yes",
	    								"Ventilator" : "yes",
	    								"Xray" : "yes",
	    								"Operation Theatre" : "yes",
	    								"Ambulance" : "yes"
	    *							},
	    *							"variables" : {
	    *								"Bed Capacity" : {"high":750,"low":100}						
	    *							}
	    *						}

	    * @apiSuccessExample {json} Success-Response:
	    *
	    *	{
	    *	  "success": 1,
	   	*	  "csvlink" : "extracts/1495945856052.csv",
	   	* 	  "geojsonlink" : "extracts/1495945856052.json"
	   	*	}
		*	
	    *
	    * @apiDescription API that generates CSV / GeoJSON
	    * @apiVersion 1.0.0
	    */

	router.get('/api/v1/extracts/generate',
		apiFeatures.collect,
		apiFeatures.required,
		validate.type,
		validate.filters,
		apiFeatures.fetch,
		apiFeatures.applyGrades,
		apiFeatures.within,
		stats.total,
		apiWards.filter,
		apiFeatures.fiter,
		stats.region,
		stats.compare,
		apiWards.polygon,
		apiFeatures.constraints,
		apiFeatures.applyPreservedTags,
		apiFeatures.tagWards,
		apiFeatures.log,
		csvWorker.generate,
		mw.respond,
		mw.error

	);

}
