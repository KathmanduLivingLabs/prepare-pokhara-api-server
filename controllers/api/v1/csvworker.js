import config from '../../../config';
import json2csv from 'json2csv';
import fs from 'fs';


var csvHeaders = {

	'user' : 'OSM User',
	'uid' : 'OSM User ID',
	'changeset' : 'OSM Changeset',
	'version' : 'Version',
	'timestamp' : 'Timestamp',
	'amenity' : 'Amenity',
	'building' : 'Building',
	'capacity:beds' : 'Beds Capacity',
	'email' : 'Email',
	'emergency' : 'Emergency',
	'emergency_service' : 'Emergency service',
	'facility:ambulance' : 'Ambulance',
	'facility:icu' : 'ICU',
	'facility:nicu' : 'NICU',
	'facility:operating_theater' : 'Operating Theatre',
	'facility:operation_theatre' : 'Operation Theatre',
	'facility:ventilator' : 'Ventilator',
	'facility:x-ray' : 'X-ray',
	'name' : 'Name',
	'name:ne' : 'Nepali Name',
	'note' : 'Notes',
	'operator:type' : 'Operator type',
	'personnel:count' : 'Personnel count',
	'phone' : 'Phone number',
	'source' : 'Source',
	'website' : 'Website',
	'alt_name' : 'Alternate name',
	'emergency:services' : 'Emergency services',
	'facility:operating_theatre' : 'Operating theatre',
	'addr:city' : 'City address',
	'addr:street' : 'Street address',
	'start_date' : 'Start date',
	'opening_hours' : 'Opening hours',
	'addr:postcode' : 'Postal code',
	'wheelchair' : 'Wheelchair',
	'fax' : 'Fax',
	'contact:phone' : 'Phone contact',
	'building:levels' : 'Building levels',
	'personel:count' : 'Personel count',
	'capacity:bed' : 'Bed capacity',
	'facilityn:nicu' : 'NICU facility',
	'contact:fax' : 'Fax contact',
	'addr:place' : 'Place address',
	'healthcare' : 'Healthcare',
	'healthcare:speciality' : 'Healthcare speciality',
	'contact:email' : 'Contact email',
	'name:en' : 'English name',
	'addr:housenumber' : 'Housenumber',
	'type' : 'Feature type',
	'id' : 'OSM ID',
	'geometry' : 'Geometry',
	'student:count' : 'Student Count',
	'established' : 'Established',
	'teacher:count' : 'Teacher count',
	'operator' : 'Operator',
	'addr:housename' : 'Housename',
	'level' : 'Level',
	'addr:country' : 'Country Address',
	'addr:district' : 'District',
	'addr:province' : 'Province',
	'addr:state' : 'State',
	'landuse' : 'Landuse',
	'alt_name:ne' : 'Nepali alternate name',
	'year_of_construction' : 'Construction year',
	'toilets:wheelchair' : 'Toilets wheelchair',
	'addr:hamlet' : 'Hamlet',
	'add:city' : 'Address city',
	'nrb_class' : 'Nepal Rastra Bank(NRB) Class',
	'social_facility' : 'Social facility',
	'social_facility:for' : 'Social facility for',
	'atm' : 'ATM',
	'network' : 'Network',
	'brand' : 'Brand',
	'barrier' : 'Barrier',
	'office' : 'Office',
	'drive_through' : 'Drive through'

}


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
			for(var head in header){
				if(csvHeaders[head]){
					header[csvHeaders[head]] = (header[head]);
					delete header[head];
				}
			}
			features.push(header);
		});

		fields = fields.map(function(field){
			return csvHeaders[field] || field;
		})
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