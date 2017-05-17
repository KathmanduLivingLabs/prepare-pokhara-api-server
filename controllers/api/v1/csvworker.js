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
		})

		json2csv({ data: features, fields: fields }, function(err, csv) {
		    res.setHeader('Content-disposition', 'attachment; filename=data.csv');
		    res.set('Content-Type', 'text/csv');
		    res.status(200).send(csv);
		});

	}
}