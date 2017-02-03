import mw from '../../../libs/middleware';
import apis from './apis';

module.exports = (router) => {

	/**
	 * @api {get} /api/v1/features Fetch Features 
	 * @apiName Features
	 * @apiGroup Features
	 *
	 *
	 * @apiParam {Varchar} type Type for feature to be fetched
	 * @apiParam {Varchar} ward Provide ward's relation id to fetch the data for specific ward only
	 * @apiParam {Object} filters Filter(s) to apply for the data
	 * @apiSuccessExample {json} Parameters Format 
	 *						{
	 *							"type":"hospital",
	 *							"ward" : "relation/6270328",
	 *							"filters" : {
	 *								"Emergency":"yes"
	 *							}
	 *						}
	 * @apiSuccess {Integer} success Success status
	 * @apiSuccess {String} message Success message
	 * @apiSuccess {Object[]} data GeoJSON formatted data 
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
	 *		"sliderMaxValue": { 
	 *			 'Bed Capacity': 750 
	 *		}
	 *	} 
	 *
	 *
	 * @apiDescription API that fetch features
	 * @apiVersion 1.0.0
	 */


	router.get('/api/v1/features', apis.collect, apis.fetch, apis.calculateTotalStat, apis.applyFilter, apis.filterWard, apis.statCompare, mw.respond, mw.error);

	// router.get('/api/v1/test',apis.test,mw.respond,mw.error);

	/**
	    * @api {get} /api/v1/metrics Fetch Metrics list 
	    * @apiName Metrics
	    * @apiGroup Metrics
	   
		* @apiSuccess {Integer} success Success status
		* @apiSuccess {String} message Success message
	    * @apiSuccess {Object[]} metrics Metrics Object
	    * @apiSuccessExample {json} Success-Response:
	    *
	    *	{
	    *	  "success": 1,
	    *	  "message": "Metrics successfully fetched !",
	   	*	  "metrics": {
	   	*	    "wards": [
		*   		      {
		*   		        "name": "Bagar",
		*   		        "number": "1",
		*   		        "osmID": "relation/6273322"
		*   		      }
	   	*	     ],
	   	*	     "indicators" :{
		*			  "hospital": [
		*			        "Bed Capacity",
		*			        "ICU",
		*			        "NICU",
		*			        "Ventilator",
		*			        "Xray",
		*			        "Emergency",
		*			        "Operation Theatre"
		*			      ],
		*		      "school": [
		*		        "Students"
		*		      ]
	   	*	     }
	    * 	}
		*	
	    *
	    * @apiDescription API that fetch static metrics 
	    * @apiVersion 1.0.0
	    */

	// router.get('/api/v1/wards',apis.wards,mw.respond,mw.error);

	router.get('/api/v1/metrics', apis.metrics, mw.respond, mw.error);

}