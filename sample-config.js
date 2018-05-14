module.exports = {
	versions: {
		v1: "/api/v1",
		v2 : "/api/v2"
	},

	overpass: {
		baseUrl: "http://www.overpass-api.de/api/interpreter?data=",
		timeout: 250,
		dataType: "json",
		include: ["node", "way"],
		metaOn : true
	},

	useSnapshot : false,

	osmapi : {

		liveBaseUrl : "https://www.openstreetmap.org",
		devBaseUrl : "https://api06.dev.openstreetmap.org"

	},

	amenities: {
		"hospital": {
			value : "hospital"
		},
		"school": {
			value : "school"
		},
		"college": {
			value : "college"
		},
		"university": {
			value : "university"
		},
		"kindergarten": {
			value : "kindergarten"
		},
		"bank" : {
			value : "bank",
			constraints : [{
				"constraint" : "name",
				"keyname" : "operator",
				"multiple" : false
			},{
				"constraint" : "nrb_class",
				"keyname" : "nrb_class",
				"multiple" : false
			}],
			grades : {
				"on" : "nrb_class",
				"values" : {
					"development" : ["development","b"],
					"commercial" : ["commercial" , "a"],
					"co-operative" : ["co-operative","cooperative"],
					"finance companies" : ["finance companies"],
					"micro finance" : ["micro finance"]
				}
			},
			postFilter : ["Operator"]
				
			
		},
		"atm" : {
			value  : "atm",
			constraints : [{
				"constraint" : "operator",
				"keyname" : "operator",
				"multiple" : false
			}]
		},
		"pharmacy" : {
			value : "pharmacy"
		},
		"dentist" : {
			value : "dentist"
		},
		"clinic" : {
			value : "clinic"
		},
		"health_post" : {
			value : "health_post"
		},
		"place_of_worship" : {
			value : "place_of_worship"
		},
		"hindu" : {
			taggedon : {
				"religion" : {
					value : "hindu"
				}
			}
		},
		"muslim" : {
			taggedon : {
				"religion" : {
					value : "muslim"
				}
			}
		},
		"buddhist" : {
			taggedon : {
				"religion" : {
					value : "buddhist"
				}
			}
		},
		"christian" : {
			taggedon : {
				"religion" : {
					value : "christian"
				}
			}
		},
		"energy" : {
			taggedon : {
				"amenity" : {
					value : "fuel"
				}
			}
		},
		"fuel" : {
			taggedon : {
				"amenity" : {
					value : "fuel"
				}
			}
		},
		"gas" : {
			taggedon : {
				"shop" : {
					value : "gas"
				}
			}
		},
		"governance" : {
			taggedon : {
				"office" : {
					value : "government,ngo"
				}
			}
		},
		"government" : {
			taggedon : {
				"office" : {
					value : "government"
				}
			}
		},
		"ngo" : {
			taggedon : {
				"office" : {
					value : "ngo"
				}
			}
		},
		"security" : {
			taggedon : {
				"amenity" : {
					value : "police"
				}
			}
		},
		"tourism" : {
			taggedon : {
				"tourism" : {
					value : "hotel,museum"
				},
				"amenity" : {
					value : "restaurant"
				},
				"leisure" : {
					value : "park"
				},
			}
		},
		"hotel" : {
			taggedon : {
				"tourism" : {
					value : "hotel"
				}
			}
		},
		"restaurant" : {
			taggedon : {
				"tourism" : {
					value : "restaurant"
				}
			}
		},
		"museum" : {
			taggedon : {
				"tourism" : {
					value : "museum"
				}
			}
		},
		"park" : {
			taggedon : {
				"leisure" : {
					value : "park"
				}
			}
		},
		"communication" : {
			taggedon : {
				"studio" : {
					value : "radio,television"
				},
				"office" : {
					value : "newspaper"
				}
			}
		},
		"radio" : {
			taggedon : {
				"studio" : {
					value : "radio"
				}
			}
		},
		"television" : {
			taggedon : {
				"studio" : {
					value : "television"
				}
			}
		},
		"newspaper" : {
			taggedon : {
				"office" : {
					value : "newspaper"
				}
			}
		},
		"storage_tank" : {
			taggedon : {
				"man_made" : {
					value : "storage_tank"
				}
			}
		},
		"water_tap" : {
			taggedon : {
				"man_made" : {
					value : "water_tap"
				}
			}
		},
		"water_well" : {
			taggedon : {
				"man_made" : {
					value : "water_well"
				}
			}
		}
	},

	boundingCoordinates: "(28.15504264831543, 83.93202209472656,28.275711059570426, 84.03964233398443)",


	statsIndicator: {

		hospital: {
			"Bed Capacity": {
				"type": "slider",
				"osmtags": ["capacity:beds", "capacity:bed"]
			},
			"ICU": {
				"type": "filter",
				"osmtags": ["facility:icu"],
			},
			"NICU": {
				"type": "filter",
				"osmtags": ["facility:nicu"]
			},
			"Ventilator": {
				"type": "filter",
				"osmtags": ["facility:ventilator"]
			},
			"Xray": {
				"type": "filter",
				"osmtags": ["facility:x-ray"]
			},
			"Emergency": {
				"type": "filter",
				"osmtags": ["emergency"]
			},
			"Operation Theatre": {
				"type": "filter",
				"osmtags": ["facility:operating_theatre","facility:operation_theatre"]
			},
			"Personnel Count": {
				"type": "slider",
				"osmtags": ["personnel:count"]
			},
			// "Ambulance": {
			// 	"type": "value",
			// 	"on": "ambulance",
			// 	"osmtags": ["emergency:services", "emergency_service"]
			// },
			"Ambulance": {
				"type": "filter",
				"osmtags": ["facility:ambulance"]
			},
			"Emergency Service": {
				"type": "value",
				"on": "ambulance",
				"osmtags": ["emergency:services", "emergency_service"]
			}
		},

		school: {
			"Students": {
				"type": "slider",
				"osmtags": ["student:count","student:coount","count:students"]
			},
			"Operator Type": {
				"type": "filter",
				"osmtags": ["operator:type","operator"],
				"hidden" : true,
				"object" : true,
				"others" : ["private","government","community"]
			},
			"Private" : {
				"type": "value",
				"on": "private",
				"osmtags": ["operator:type", "operator"]
			},
			"Government" : {
				"type": "value",
				"on": "government",
				"osmtags": ["operator:type", "operator"]
			},
			"Community" : {
				"type": "value",
				"on": "community",
				"osmtags": ["operator:type", "operator"]
			},
			"Personnel Count": {
				"type": "slider",
				"osmtags": ["personnel:count"]
			},
		},

		college : {
			"Students": {
				"type": "slider",
				"osmtags": ["student:count","student:coount","count:students"]
			},
			"Personnel Count": {
				"type": "slider",
				"osmtags": ["personnel:count"]
			}
		},

		bank : {
			"ATM" : {
				"type" : "filter",
				"osmtags" : ["atm"]
			},
			"NRB Class" : {
				"type" : "filter",
				"osmtags" : ["nrb_class"],
				"hidden":true,
				"object" : true,
				"equalityCheck" : true,
				"others" : ["development","commercial","co-operative","finance companies","micro finance"],
				"matchTagValueExactly" : true
			},
			"Class" : {
				"type" : "filter",
				"osmtags" : ["nrb_class"]
			},
			"Operator" : {
				"type" : "filter",
				"osmtags" : ["name"],
				"hidden":true,
				"equalityCheck" : true
			},
			"Network" : {
				"type" : "filter",
				"osmtags" : ["network"],
				"hidden" : true,
				"object" : true,
				"others" : []
			}
		},

		atm : {
			"Operator" : {
				"type" : "filter",
				"osmtags" : ["operator","brand"],
				"hidden":true,
				"equalityCheck" : true
			}
		},
		clinic : {
			"Speciality": {
				"type": "filter",
				"osmtags": ["healthcare:speciality"]
			}
		},
		health_post : {
			"Operator": {
				"type": "filter",
				"osmtags": ["operator:type"]
			}
		}
	}
};