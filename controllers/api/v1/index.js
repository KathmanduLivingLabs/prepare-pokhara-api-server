import mw from '../../../libs/middleware';
import apis from './apis';

module.exports = (router)=>{

	   /**
	    * @api {get} /api/v1/feature/fetch Fetch Features 
	    * @apiName Features
	    * @apiGroup Features
	    *
	    *
	    * @apiParam {Varchar} type Type for feature to be fetched
	    * @apiParam {Object} filters Filter(s) to apply for the data

		* @apiSuccess {Integer} success Success status
		* @apiSuccess {String} message Success message
	    * @apiSuccess {Object[]} data GeoJSON formatted data 
	    * @apiSuccessExample {json} Success-Response:
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


	router.get('/api/v1/feature/fetch',apis.collect,apis.fetch,mw.respond,mw.error);

	router.get('/api/v1/test',apis.test,mw.respond,mw.error);

}