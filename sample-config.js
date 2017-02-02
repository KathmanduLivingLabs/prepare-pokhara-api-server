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
			bedCapacity : ['capacity:beds','capacity:bed'],
			icu : ['facility:icu'],
			nicu : ['facility:nicu'],
			ventilator : ['facility:ventilator'],
			xray : ['facility:x-ray'],
			emergency : ['emergency'],
			operationTheatre : ['facility:operating_theatre']
		},

		school : {
			students : ['student:count']
		}
	}
}
