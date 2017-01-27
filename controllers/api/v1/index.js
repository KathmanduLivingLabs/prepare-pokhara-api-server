import mw from '../../../libs/middleware';
import apis from './apis';

module.exports = (router)=>{

	   /**
	    * @api {get} /api/v1/feature/fetch Fetch Features 
	    * @apiName Features
	    * @apiGroup Features
	    *
	    *
	    * @apiParam {Varchar} Type Type for feature to be fetched
	    * @apiParam {Object} Filter Filter(s) to apply for the data

		* @apiSuccess {Integer} success Success status
		* @apiSuccess {String} message Success message
	    * @apiSuccess {Object[]} features Features 
	    * @apiSuccessExample {json} Success-Response:
	    *  {
	    *       "success": 1,
	    *       "message": "Features fetched successfully !",
	    *       "features": {
		*				"version": 0.6,
		*		    	"generator": "Overpass API",
		*			    "osm3s": {
		*			      "timestamp_osm_base": "2017-01-25T06:18:02Z",
		*			      "copyright": "The data included in this document is from www.openstreetmap.org. The data is made available under ODbL."
		*			    },
		*			    elements : [
		*					{
       	*				        "type": "node",
    	*						"id": 1346572363,
    	*						"lat": 28.2205371,
    	*						"lon": 83.9868927,
    	*						"tags": {
    	*						         "amenity": "bank",
    	*						         "atm": "yes",
    	*						         "contact:phone": "523875, 523876, 536231, 536230",
    	*						         "name": "Standard Chartered Bank LTD.",
    	*						         "name:ne": "इस्टानडर्ड चाटार्ड बैंक",
    	*						         "operator": "Standard Chartered Bank",
    	*						         "website": "www.sc.com/np"
    	*						 }
		*					}
		*			   ]
	    *		}
	    *  }
	    *
	    * @apiDescription API that fetch features
	    * @apiVersion 1.0.0
	    */


	router.get('/api/v1/feature/fetch',apis.collect,apis.fetch,mw.respond,mw.error);

	router.get('/api/v1/test',apis.test,mw.respond,mw.error);

}