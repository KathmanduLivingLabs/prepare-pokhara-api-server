import config from '../../../config';
import json2csv from 'json2csv';
import fs from 'fs';

export default {
	metaDataOn : (req,res,next) =>{
		req.metaDataOn = true;
		return next();
	},

	generate: (req, res, next) => {
		var features = [];
		var availableTags = [];
		req.cdata.geojson.features.forEach(function(feature) {
			for (var tag in feature.properties.tags) {
				if (availableTags.indexOf(tag) === -1) {
					availableTags.push(tag);
				}
			}
		})
		var fields = ['user', 'uid', 'changeset','version','timestamp'].concat(availableTags.concat(['type', 'id', 'geometry']));
		req.cdata.geojson.features.forEach(function(feature) {
			var header = {};
			availableTags.forEach(function(availableTag) {
				header[availableTag] = feature.properties.tags[availableTag];
			})
			header.user = feature.properties.meta.user;
			header.uid = feature.properties.meta.uid;
			header.changeset = feature.properties.meta.changeset;
			header.version = feature.properties.meta.version;
			header.timestamp = feature.properties.meta.timestamp;
			header.type = feature.type;
			header.id = feature.id;
			header.geometry = feature.geometry;
			features.push(header);
		});
		var csv = json2csv({
			data: features,
			fields: fields
		});
		var filename = new Date().getTime();
		fs.writeFile('./extracts/' + filename + '.csv', csv, function(err) {
			if (err) {
				req.cdata = {
					success: 0,
					message: err
				};
				return next();
			}
			var jsonObj = JSON.stringify(req.cdata.geojson);
			fs.writeFile('./extracts/' + filename + '.json', jsonObj, 'utf8', function(err, jsonResponse) {
				if (err) {
					req.cdata = {
						success: 0,
						message: err
					};

				} else {
					req.cdata = {
						success: 1,
						csvlink: 'extracts/' + filename + '.csv',
						geojsonlink: 'extracts/' + filename + '.json'
					};
				}

				return next();
			});


		});

	}
}