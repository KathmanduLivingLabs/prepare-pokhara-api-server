module.exports = {
	versions: {
	    v1: '/api/v1'
	},

	overpass : {
		baseUrl : 'http://www.overpass-api.de/api/interpreter?data=',
		timeout : 25,
		dataType : 'json',
		include : ['node','way']
	},

	amenities : {
		'hospital': 'hospital|clinic|nursing_home|dentist|health|health_post',
		'school': 'kindergarten|school',
	},

	boundingCoordinates : "(28.15504264831543, 83.93202209472656,28.275711059570426, 84.03964233398443)",


	statsIndicator : {

		hospital : {
			"Bed Capacity" : ['capacity:beds','capacity:bed'],
			"ICU" : ['facility:icu'],
			"NICU" : ['facility:nicu'],
			"Ventilator" : ['facility:ventilator'],
			"Xray" : ['facility:x-ray'],
			"Emergency" : ['emergency'],
			"Operation Theatre" : ['facility:operating_theatre']
		},

		school : {
			"Students" : ['student:count']
		}
	}
}
