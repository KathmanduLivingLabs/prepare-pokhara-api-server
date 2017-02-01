import mw from '../../../libs/middleware';
import apis from './apis';

module.exports = (router)=>{

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
		*								"operator":"private"
		*							}
	   	*						}
		* @apiSuccess {Integer} success Success status
		* @apiSuccess {String} message Success message
	    * @apiSuccess {Object[]} data GeoJSON formatted data 
	    * @apiSuccessExample {json} Success-Response
	    *  {
	    *       "success": 1,
	    *       "message": "Features fetched successfully !",
	    * 		"data" : {
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
	   	* 		}
	    *
	    * @apiDescription API that fetch features
	    * @apiVersion 1.0.0
	    */


	router.get('/api/v1/features',apis.collect,apis.fetch,mw.respond,mw.error);

	// router.get('/api/v1/test',apis.test,mw.respond,mw.error);

	   /**
	    * @api {get} /api/v1/wards Fetch Wards list 
	    * @apiName Wards
	    * @apiGroup Wards
	   
		* @apiSuccess {Integer} success Success status
		* @apiSuccess {String} message Success message
	    * @apiSuccess {Object[]} wards Wards Object
	    * @apiSuccessExample {json} Success-Response:
	    *
	    *	{
	    *	  "success": 1,
	    *	  "message": "Wards successfully fetched !",
	    *	  "wards": [
		*    	    {
        *		      "name": "Bagar",
		*    	      "number": "1",
		*    	      "osmID": "relation/6273322"
		*    	    },
		*    	    {
		*    	      "name": "Miruwa",
		*    	      "number": "2",
		*    	      "osmID": "relation/6273343"
		*    	    },
		*    	    {
		*    	      "name": "Nadipur",
		*    	      "number": "3",
		*    	      "osmID": "relation/6273323"
		*    	    }
	    *	    ]
	    * 	}
		*	
	    *
	    * @apiDescription API that fetch wards list
	    * @apiVersion 1.0.0
	    */

	router.get('/api/v1/wards',apis.wards,mw.respond,mw.error);

}