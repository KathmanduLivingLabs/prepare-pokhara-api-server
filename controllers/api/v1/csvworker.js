import config from '../../../config';
import json2csv from 'json2csv';
import fs from 'fs';

export default {

	generate: (req, res, next) => {
		var fields = ['type', 'id','geometry','tags'];
		var features = [];
		req.cdata.geojson.features.forEach(function(feature){
			features.push({
				type : feature.type,
				id : feature.id,
				tags : JSON.stringify(feature.properties.tags),
				geometry : JSON.stringify([feature.geometry.coordinates[1],feature.geometry.coordinates[0]]) 
			})
		});
		var csv = json2csv({ data: features, fields: fields });
		var filename = new Date().getTime();
		fs.writeFile('./extracts/'+filename+'.csv', csv, function(err) {
		  if (err) {
		  	return res.json({
		  		success : 0,
		  		message : err
		  	})
		  }
		  var jsonObj = JSON.stringify(req.cdata);
		  fs.writeFile('./extracts/'+filename+'.json', jsonObj, 'utf8', function(err,jsonResponse){
		  	if (err) {
		  		return res.json({
		  			success : 0,
		  			message : err
		  		})
		  	}
		  	return res.json({
		  		success : 1,
		  		csvlink : 'extracts/'+filename+'.csv',
		  		geojsonlink : 'extracts/'+filename+'.json'
		  	})
		  });

		  
		});

	}
}