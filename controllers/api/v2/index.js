import mw from "../../../libs/middleware";
import apiFeatures from "./features";
import apiWards from "./wards";
import apiMetrics from "./metrics";
import validate from "./validator";
import stats from "./stats";
import auth from "./auth";
import csvWorker from "./csvworker";

import { Router } from "express";
let api = Router();

module.exports = () => {

	/**
	 * @api {get} /api/v2/features Features 
	 * @apiName Get feature
	 * @apiGroup Features
	 *
	 *
	 * @apiParam {Varchar} type Type for feature to be fetched
	 * @apiParam {Varchar} ward Provide ward's relation id to fetch the data for specific ward only

	 * @apiSuccessExample {json} Parameters Format
	 *						{
	 *							"type":"hospital",
	 *							"ward" : "relation/6270328"
	 *						}
	 
	  * @apiSuccessExample {json} Success-Response:
	  *
	  *		{
	  *	  		"success": 1,
	  *	  		"geometries" : {
	  *				"pois"" {}
	  *			},
	  *			"parameters" : {},
	  *			"insights" : {}
	  *		}
     *
     *
	 *
	 *
	 * @apiDescription API that fetch features
	 * @apiVersion 1.0.0
	 */


	api.get("/features",
		apiFeatures.collect,
		validate.type,
		apiFeatures.v2parameters,
		apiFeatures.required,
		validate.filters,
		apiFeatures.fetch,
		// apiFeatures.applyGrades,
		apiFeatures.within,
		stats.total,
		apiWards.filter,
		apiFeatures.fiter,
		stats.region,
		stats.compare,
		apiWards.polygon,
		// apiFeatures.constraints,
		// apiFeatures.applyPreservedTags,
		apiFeatures.tagWards,
		apiFeatures.log,
		apiFeatures.v2,
		mw.respond, mw.error);

	/**
	    * @api {get} /api/v2/features/download  Generate CSV / GeoJSON  
	    * @apiName Download
	    * @apiGroup Download
	   
		* @apiSuccess {Integer} success Success status
	    * @apiSuccess {Object[]} link Extract link  Object
	    * @apiSuccessExample {json} Parameters Format
	    *						{
	    *							"type":"hospital",
	    *							"ward" : "relation/6270328"
	    *						}

	    * @apiSuccessExample {json} Success-Response:
	    *
	    *	{
	    *	  "success": 1,
	   	*	  "csvlink" : "extracts/1495945856052.csv",// use this like - http://preparepokhara.org/extracts/1495945856052.csv
	   	* 	  "geojsonlink" : "extracts/1495945856052.json"
	   	*	}
		*	
	    *
	    * @apiDescription API that that generates CSV / GeoJSON download link
	    * @apiVersion 1.0.0
	    */

	api.get("/features/download",
		apiFeatures.collect,
		apiFeatures.v2parameters,
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
		apiFeatures.v2,
		csvWorker.generate,
		mw.respond,
		mw.error
	);

	/**
	    * @api {get} /api/v2/features/tags  Get all tags related to amenities
	    * @apiName Get all tags
	    * @apiGroup Features
	   
		* @apiSuccess {Integer} success Success status
	    * @apiSuccess {tags[]} object Tags object
	   

	    * @apiSuccessExample {json} Success-Response:
	    *
	    *	{
	    *	  "success": 1,
	   	*	  "tags" : tagsObject
	   	*	}
		*	
	    *
	    * @apiDescription API to get all tags related to amenities
	    * @apiVersion 1.0.0
	    */

	api.get("/features/tags",apiFeatures.tagsMapping,mw.respond,mw.error);

	/**
	    * @api {get} /api/v2/features/attractions  Get all tourist attraction places
	    * @apiName Get all tourist attraction places
	    * @apiGroup Features
	   
		* @apiSuccess {Integer} success Success status
	    * @apiSuccess {tags[]} object attractions object
	   

	    * @apiSuccessExample {json} Success-Response:
	    *
	    *	{
	    *	  "success": 1,
	   	*	  "attractions" : attractionsObject (View in REST Client)
	   	*	}
		*	
	    *
	    * @apiDescription API to get all tourist attraction places
	    * @apiVersion 1.0.0
	    */

	api.get("/features/attractions",apiFeatures.attractions,mw.respond,mw.error);

	/**
	    * @api {get} /api/v2/features/bulkdownload  Download all features data in bulk
	    * @apiName Download all features data in bulk
	    * @apiGroup Features
	   
		* @apiSuccess {Integer} success Success status
	    * @apiSuccess {tags[]} object attractions object
	   

	    * @apiSuccessExample {json} Success-Response:
	    *
	    *	{
	    *	  "success": 1,
	   	*	  "bulkResponse" : bulkResponse (View in REST Client)
	   	*	}
		*	
	    *
	    * @apiDescription API to download all features data in bulk
	    * @apiVersion 1.0.0
	    */

	api.get("/features/bulkdownload",apiFeatures.bulk,mw.respond,mw.error);

	return api;
};

