import mw from '../../../libs/middleware';
import apiFeatures from './features';
import apiWards from './wards';
import apiMetrics from './metrics';
import validate from './validator';
import stats from './stats';

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
	 *								"Bed Capacity" : 30						
	 *							}
	 *						}
	 * @apiSuccessExample {json} Parameters Format - School
	 *						{
	 *							"type":"school",
	 *							"ward" : "relation/6270328",
	 *							"filters" : {
	 *								"Operator Type":"government",
	 								
	 *							},
	 *							"variables" : {
	 *								"Students" : 300				
	 *							}
	 *						}
	 * @apiSuccess {Integer} success Success status
	 * @apiSuccess {String} message Success message
	 * @apiSuccess {Object[]} geojson GeoJSON  data 
	 * @apiSuccessExample {json} Success-Response
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
	 * @apiDescription API that fetch features
	 * @apiVersion 1.0.0
	 */


	router.get('/api/v1/features',
		apiFeatures.collect,
		validate.type,
		validate.filters,
		apiFeatures.fetch,
		apiFeatures.within,
		stats.total,
		apiFeatures.fiter,
		apiWards.filter,
		stats.compare,
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

}