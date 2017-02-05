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
		'hospital': 'hospital',
		'school': 'school',
	},

	boundingCoordinates : "(28.15504264831543, 83.93202209472656,28.275711059570426, 84.03964233398443)",


	statsIndicator : {

		hospital : {
			"Bed Capacity" : {
				"type" : 'slider',
				"osmtags" : ['capacity:beds','capacity:bed']
			},
			"ICU" : {
				"type" : 'filter',
				"osmtags" : ['facility:icu'],
			}, 
			"NICU" : {
				"type" : 'filter',
				"osmtags" : ['facility:nicu']
			},
			"Ventilator" : {
				"type" : 'filter',
				"osmtags" : ['facility:ventilator']
			},
			"Xray" :{
				"type" : 'filter',
				"osmtags" : ['facility:x-ray']
			}, 
			"Emergency" : {
				"type" : 'filter',
				"osmtags" : ['emergency']
			}, 
			"Operation Theatre" : {
				"type" : 'filter',
				"osmtags" : ['facility:operating_theatre']
			},
			"Personnel Count" : {
				"type" : 'slider',
				"osmtags" : ['personnel:count']
			}
		},

		school : {
			"Students" : {
				"type" : 'slider',
				"osmtags" : ['student:count']
			}
		}
	}
}
