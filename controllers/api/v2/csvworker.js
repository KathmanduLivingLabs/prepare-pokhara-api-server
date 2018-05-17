import fs from "fs";
import json2csv from "json2csv";

const csvHeaders = {
	"user" : "OSM User",
	"uid" : "OSM User ID",
	"changeset" : "OSM Changeset",
	"version" : "Version",
	"timestamp" : "Timestamp",
	"amenity" : "Amenity",
	"building" : "Building",
	"capacity:beds" : "Bed Capacity",
	"email" : "Email",
	"emergency" : "Emergency",
	"emergency_service" : "Emergency service",
	"facility:ambulance" : "Ambulance",
	"facility:icu" : "ICU",
	"facility:nicu" : "NICU",
	"facility:operation_theatre" : "Operation Theatre",
	"facility:ventilator" : "Ventilator",
	"facility:x-ray" : "X-ray",
	"name" : "Name",
	"name:ne" : "Nepali Name",
	"note" : "Notes",
	"operator:type" : "Operator type",
	"personnel:count" : "Personnel count",
	"phone" : "Phone number",
	"source" : "Source",
	"website" : "Website",
	"alt_name" : "Alternate name",
	"emergency:services" : "Emergency services",
	"addr:city" : "City address",
	"addr:street" : "Street address",
	"start_date" : "Start date",
	"opening_hours" : "Opening hours",
	"addr:postcode" : "Postal code",
	"wheelchair" : "Wheelchair",
	"fax" : "Fax",
	"contact:phone" : "Phone contact",
	"building:levels" : "Building levels",
	"capacity:bed" : "Bed capacity",
	"contact:fax" : "Fax contact",
	"addr:place" : "Place address",
	"healthcare" : "Healthcare",
	"healthcare:speciality" : "Healthcare speciality",
	"name:en" : "English name",
	"addr:housenumber" : "House Number",
	"type" : "Feature type",
	"id" : "OSM ID",
	"geometry" : "Geometry",
	"student:count" : "Student Count",
	"established" : "Established",
	"teacher:count" : "Teacher count",
	"operator" : "Operator",
	"addr:housename" : "House Name",
	"level" : "Level",
	"addr:country" : "Country Address",
	"addr:district" : "District",
	"addr:province" : "Province",
	"addr:state" : "State",
	"landuse" : "Landuse",
	"alt_name:ne" : "Nepali alternate name",
	"year_of_construction" : "Construction year",
	"toilets:wheelchair" : "Toilets wheelchair",
	"addr:hamlet" : "Hamlet",
	"add:city" : "Address city",
	"nrb_class" : "Nepal Rastra Bank(NRB) Class",
	"social_facility" : "Social facility",
	"social_facility:for" : "Social facility for",
	"atm" : "ATM",
	"network" : "Network",
	"brand" : "Brand",
	"barrier" : "Barrier",
	"office" : "Office",
	"drive_through" : "Drive through"
};

export default {
	generate: (req, res, next) => {
		let features = [];
		let availableTags = [];
		req.cdata.geometries.pois.features.forEach(function(feature) {
			for (let tag in feature.properties.tags) {
				if (availableTags.indexOf(tag) === -1) {
					availableTags.push(tag);
				}
			}
		});
		let fields = ["user", "uid", "changeset","version"].concat(availableTags.concat(["type", "id", "geometry"]));
		req.cdata.geometries.pois.features.forEach(function(feature) {
			let header = {};
			availableTags.forEach(function(availableTag) {
				header[availableTag] = feature.properties.tags[availableTag];
			});
			header.user = feature.properties.meta.user;
			header.uid = feature.properties.meta.uid;
			header.changeset = feature.properties.meta.changeset;
			header.version = feature.properties.meta.version;
			// header.timestamp = feature.properties.meta.timestamp;
			header.type = feature.type;
			header.id = feature.id;
			header.geometry = feature.geometry;
			for(let head in header){
				if(csvHeaders[head]){
					header[csvHeaders[head]] = (header[head]);
					delete header[head];
				}
			}
			features.push(header);
		});

		fields = fields.map(function(field){
			return csvHeaders[field];
		}).filter(Boolean);
		const csv = json2csv({
			data: features,
			fields: fields
		});
		const filename = new Date().getTime();
		fs.writeFile("./extracts/" + filename + ".csv", csv, (err)=>{
			if(err){
				req.cdata = {
					success: 0,
					message: err
				};
				return next();
			}
			const jsonObj = JSON.stringify(req.cdata.geometries.pois);
			fs.writeFile("./extracts/" + filename + ".json", jsonObj, "utf8",(err, jsonResponse)=> {
				if(err){
					req.cdata = {
						success: 0,
						message: err
					};
				}else{
					req.cdata = {
						success: 1,
						csvlink: "extracts/" + filename + ".csv",
						geojsonlink: "extracts/" + filename + ".json"
					};
				}
				return next();
			});
		});

	}
};