module.exports = {
	insightsKey: {
		hospital: [
			{
				"label" : "Hospitals",
				"value" : "total"
			},
			{
				"label" : "Bed Capacity",
				"value" : "Bed Capacity"
			},
			{
				"label" : "Employees",
				"value" : "Personnel Count"
			}
		],
		clinic: [
			{
				"label" : "Clinics",
				"value" : "total"
			}
		],
		health_post: [
			{
				"label" : "Health Posts",
				"value" : "total"
			}
		],
		pharmacy: [
			{
				"label" : "Pharmacies",
				"value" : "total"
			}
		],
		dentist: [
			{
				"label" : "Dental Clinics",
				"value" : "total"
			}
		],
		veterinary: [
			{
				"label" : "Veterinaries",
				"value" : "total"
			}
		],
		school: [
			{
				"label" : "Schools",
				"value" : "total"
			},
			{
				"label" : "Students",
				"value" : "Students"
			},
			{
				"label" : "Employees",
				"value" : "Personnel Count"
			}
		],
		college: [
			{
				"label" : "Colleges",
				"value" : "total"
			},
			{
				"label" : "Students",
				"value" : "Students"
			},
			{
				"label" : "Employees",
				"value" : "Personnel Count"
			}
		],
		university: [
			{
				"label" : "Universities",
				"value" : "total"
			}
		],
		kindergarten: [
			{
				"label" : "Kindergartens",
				"value" : "total"
			}
		],
		bank: [
			{
				"label" : "Banks",
				"value" : "total"
			}
		],
		cooperative: [
			{
				"label" : "Cooperatives",
				"value" : "total"
			}
		],
		atm: [
			{
				"label" : "ATMs",
				"value" : "total"
			}
		],
		government: [
			{
				"label" : "Government Offices",
				"value" : "total"
			}
		],
		ngo: [
			{
				"label" : "NGOs",
				"value" : "total"
			}
		],
		hotel: [
			{
				"label" : "Hotels",
				"value" : "total"
			},
			{
				"label" : "Bed Capacity",
				"value" : "Bed Capacity"
			},
			{
				"label" : "Room Capacity",
				"value" : "Room Capacity"
			}
		],
		restaurant: [
			{
				"label" : "Restaurants",
				"value" : "total"
			}
		],
		museum: [
			{
				"label" : "Museums",
				"value" : "total"
			}
		],
		park: [
			{
				"label" : "Parks",
				"value" : "total"
			}
		],
		storage_tank: [
			{
				"label" : "Public Water Tanks",
				"value" : "total"
			}
		],
		water_tap: [
			{
				"label" : "Public Taps",
				"value" : "total"
			}
		],
		water_well: [
			{
				"label" : "Wells",
				"value" : "total"
			}
		],
		fuel: [
			{
				"label" : "Fuel Stations",
				"value" : "total"
			}
		],
		gas: [
			{
				"label" : "LPG Shops",
				"value" : "total"
			}
		],
		hindu: [
			{
				"label" : "Place of Worship (Hinduism)",
				"value" : "total"
			}
		],
		muslim: [
			{
				"label" : "Place of Worship (Islam)",
				"value" : "total"
			}
		],
		buddhist: [
			{
				"label" : "Place of Worship (Buddhism)",
				"value" : "total"
			}
		],
		christian: [
			{
				"label" : "Place of Worship (Christianity)",
				"value" : "total"
			}
		],
		kirat: [
			{
				"label" : "Place of Worship (Kirat)",
				"value" : "total"
			}
		],
		sikh: [
			{
				"label" : "Place of Worship (Sikhism)",
				"value" : "total"
			}
		],
		judaism: [
			{
				"label" : "Place of Worship (Judaism)",
				"value" : "total"
			}
		],
		"other-religion": [
			{
				"label" : "Place of Worship (Other Religions)",
				"value" : "total"
			}
		],
		radio: [
			{
				"label" : "FM Stations",
				"value" : "total"
			}
		],
		television: [
			{
				"label" : "TV Stations",
				"value" : "total"
			}
		],
		newspaper: [
			{
				"label" : "Newspapers",
				"value" : "total"
			}
		],
		police: [
			{
				"label" : "Police Stations",
				"value" : "total"
			}
		],
		army_apf: [
			{
				"label" : "Army and Armed Police Force",
				"value" : "total"
			}
		]
	},
	parameters: {
		hospital: [{
			"label": "Select Ward",
			"type": "single-select",
			"parameter_name": "ward",
		},{
			"label" : "Select Bed Capacity",
			"type" : "range",
			"parameter_name": "Bed Capacity",
			"database_schema_key" : "capacity_beds"
		},{
			"label": "Select Facilities",
			"options": [
				{
					"value": "ICU",
					"label": "ICU",
					"database_schema_key" : "facility_icu"
				},
				{
					"value": "NICU",
					"label": "NICU",
					"database_schema_key" : "facility_nicu"
				},
				{
					"value": "Ventilator",
					"label": "Ventilator",
					"database_schema_key" : "facility_ventilator"
				},
				{
					"value": "Xray",
					"label": "Xray",
					"database_schema_key" : "facility_xray"
				},
				{
					"value": "Emergency",
					"label": "Emergency",
					"database_schema_key" : "emergency"
				},
				{
					"value": "Operation Theatre",
					"label": "Operation Theatre",
					"database_schema_key" : "facility_operating_theatre"
				},
				{
					"value": "Ambulance",
					"label": "Ambulance",
					"database_schema_key" : "facility_ambulance"
				}
			],
			"type": "multi-select",
			"boolean" : true,
			"parameter_name": "hospital_facilities"
		}],
		clinic: [{
			"label": "Select Ward",
			"type": "single-select",
			"parameter_name": "ward",
		},{
			"label": "Select specialization",
			"options": [
				{
					"value": "dental",
					"label": "Dental",
					"database_schema_key" : "healthcare_speciality"
				},
				{
					"value": "dermatology",
					"label": "Dermatology",
					"database_schema_key" : "healthcare_speciality"
				},
				{
					"value": "general",
					"label": "General",
					"database_schema_key" : "healthcare_speciality"
				},
				{
					"value": "oncology",
					"label": "Oncology",
					"database_schema_key" : "healthcare_speciality"
				},
				{
					"value": "opthalmology",
					"label": "Opthalmology",
					"database_schema_key" : "healthcare_speciality"
				},
				{
					"value": "orthopedics",
					"label": "Orthopedics",
					"database_schema_key" : "healthcare_speciality"
				},
				{
					"value": "psychiatry",
					"label": "Psychiatry",
					"database_schema_key" : "healthcare_speciality"
				}
			],
			"on" : "Speciality",
			"type": "multi-select",
			"parameter_name": "clinic_specialization"
		}],
		health_post: [{
			"label": "Select Ward",
			"type": "single-select",
			"parameter_name": "ward",
		}],
		pharmacy: [{
			"label": "Select Ward",
			"type": "single-select",
			"parameter_name": "ward",
		}],
		dentist: [{
			"label": "Select Ward",
			"type": "single-select",
			"parameter_name": "ward",
		}],
		veterinary: [{
			"label": "Select Ward",
			"type": "single-select",
			"parameter_name": "ward",
		}],
		school: [{
			"label": "Select Ward",
			"type": "single-select",
			"parameter_name": "ward",
		},{
			"label" : "Select Students",
			"type" : "range",
			"parameter_name": "Students",
			"database_schema_key" : "student_count"
		},{
			"label": "Select Type of School",
			"options": [
				{
					"value": "private",
					"label": "Private",
					"database_schema_key" : "operator_type"
				},
				{
					"value": "government",
					"label": "Government",
					"database_schema_key" : "operator_type"
				},
				{
					"value": "community",
					"label": "Community",
					"database_schema_key" : "operator_type"
				}
			],
			"on" : "Operator",
			"type": "multi-select",
			"parameter_name": "education_operator"
		}],
		college: [{
			"label": "Select Ward",
			"type": "single-select",
			"parameter_name": "ward",
		}],
		university: [{
			"label": "Select Ward",
			"type": "single-select",
			"parameter_name": "ward",
		}],
		kindergarten: [{
			"label": "Select Ward",
			"type": "single-select",
			"parameter_name": "ward",
		}],
		bank: [{
			"label": "Select Ward",
			"type": "single-select",
			"parameter_name": "ward",
		},{
			"label": "Select Bank Class",
			"options": [
				{
					"value": "commercial",
					"label": "Commercial",
					"database_schema_key" : "nrb_class"

				},
				{
					"value": "development",
					"label": "Development",
					"database_schema_key" : "nrb_class"
				},
				{
					"value": "finance companies",
					"label": "Finance Companies",
					"database_schema_key" : "nrb_class"
				},
				{
					"value" : "micro finance",
					"label" : "Micro Finance",
					"database_schema_key" : "nrb_class"
				}
			],
			"on" : "Class",
			"type": "multi-select",
			"parameter_name": "bank_class"
		},{
			"label": "Type of Operator",
			"options": [
				{
					"value": "public",
					"label": "Government",
					"database_schema_key" : "operator_type"
				},
				{
					"value": "private",
					"label": "Private",
					"database_schema_key" : "operator_type"
				}
			],
			"on" : "Operator Type",
			"type": "multi-select",
			"parameter_name": "bank_operator"
		},{
			"label": "Select Bank Facility",
			"options": [
				{
					"value": "ATM",
					"label": "ATM",
					"database_schema_key" : "atm"
				}
			],
			"type": "multi-select",
			"boolean" : true,
			"parameter_name": "bank_facility"
		}],
		cooperative: [{
			"label": "Select Ward",
			"type": "single-select",
			"parameter_name": "ward",
		},{
			"label": "Type of Operator",
			"options": [
				{
					"value": "public",
					"label": "Government",
					"database_schema_key" : "operator_type"
				},
				{
					"value": "private",
					"label": "Private",
					"database_schema_key" : "operator_type"
				}
			],
			"on" : "Operator Type",
			"type": "multi-select",
			"parameter_name": "cooperative_operator"
		}],
		atm: [{
			"label": "Select Ward",
			"type": "single-select",
			"parameter_name": "ward",
		},{
			"label": "Select Network",
			"options": [
				{
					"value": "VISA",
					"label": "VISA",
					"database_schema_key" : "network"
				},
				{
					"value" : "VISA Electron",
					"label" : "VISA Electron",
					"database_schema_key" : "network"
				},
				{
					"value": "JCB",
					"label": "JCB",
					"database_schema_key" : "network"
				},
				{
					"value": "MasterCard",
					"label": "Mastercard",
					"database_schema_key" : "network"
				},
				{
					"value": "Discover",
					"label": "Discover",
					"database_schema_key" : "network"
				},
				{
					"value" : "Cirrus",
					"label" : "Cirrus",
					"database_schema_key" : "network"
				}

			],
			"on" : "Network",
			"type": "multi-select",
			"parameter_name": "atm_network"
		}],
		government: [{
			"label": "Select Ward",
			"type": "single-select",
			"parameter_name": "ward",
		}],
		ngo: [{
			"label": "Select Ward",
			"type": "single-select",
			"parameter_name": "ward",
		}],
		hotel: [{
			"label": "Select Ward",
			"type": "single-select",
			"parameter_name": "ward",
		},{
			"label" : "Select Bed Capacity",
			"type" : "range",
			"parameter_name": "Bed Capacity",
			"database_schema_key" : "beds"
		},{
			"label" : "Select Room Capacity",
			"type" : "range",
			"parameter_name": "Room Capacity",
			"database_schema_key" : "rooms"
		},{
			"label" : "Select Number of Stars",
			"type" : "range",
			"step" : 1,
			"parameter_name": "Stars",
			"database_schema_key" : "stars"
		}],
		restaurant: [{
			"label": "Select Ward",
			"type": "single-select",
			"parameter_name": "ward",
		}],
		museum: [{
			"label": "Select Ward",
			"type": "single-select",
			"parameter_name": "ward",
		}],
		park: [{
			"label": "Select Ward",
			"type": "single-select",
			"parameter_name": "ward",
		}],
		storage_tank: [{
			"label": "Select Ward",
			"type": "single-select",
			"parameter_name": "ward",
		},{
			"label": "Select Attributes",
			"options": [
				{
					"value": "drinking_water",
					"label": "Drinking water tank?"
				}
			],
			"type": "multi-select",
			"boolean" : true,
			"parameter_name": "storage_tank_attributes"
		}],
		water_tap: [{
			"label": "Select Ward",
			"type": "single-select",
			"parameter_name": "ward",
		},{
			"label": "Select Attributes",
			"options": [
				{
					"value": "drinking_water",
					"label": "Drinking water tap?"
				}
			],
			"type": "multi-select",
			"boolean" : true,
			"parameter_name": "water_tap_attributes"
		}],
		water_well: [{
			"label": "Select Ward",
			"type": "single-select",
			"parameter_name": "ward",
		},{
			"label": "Select Attributes",
			"options": [
				{
					"value": "drinking_water",
					"label": "Drinking water well?"
				}
			],
			"type": "multi-select",
			"boolean" : true,
			"parameter_name": "water_well_attributes"
		}],
		fuel: [{
			"label": "Select Ward",
			"type": "single-select",
			"parameter_name": "ward",
		}],
		gas: [{
			"label": "Select Ward",
			"type": "single-select",
			"parameter_name": "ward",
		}],
		hindu: [{
			"label": "Select Ward",
			"type": "single-select",
			"parameter_name": "ward",
		},{
			"label": "Select Facilities",
			"options": [
				{
					"value": "Toilet",
					"label": "Toilet",
					"database_schema_key" : "facility_toilet"
				},
				{
					"value": "Water",
					"label": "Water",
					"database_schema_key" : "facility_drinking_water"
				}
			],
			"type": "multi-select",
			"boolean" : true,
			"parameter_name": "place_of_worship_facilities"
		}],
		muslim: [{
			"label": "Select Ward",
			"type": "single-select",
			"parameter_name": "ward",
		},{
			"label": "Select Facilities",
			"options": [
				{
					"value": "Toilet",
					"label": "Toilet",
					"database_schema_key" : "facility_toilet"
				},
				{
					"value": "Water",
					"label": "Water",
					"database_schema_key" : "facility_drinking_water"
				}
			],
			"type": "multi-select",
			"boolean" : true,
			"parameter_name": "place_of_worship_facilities"
		}],
		buddhist: [{
			"label": "Select Ward",
			"type": "single-select",
			"parameter_name": "ward",
		},{
			"label": "Select Facilities",
			"options": [
				{
					"value": "Toilet",
					"label": "Toilet",
					"database_schema_key" : "facility_toilet"
				},
				{
					"value": "Water",
					"label": "Water",
					"database_schema_key" : "facility_drinking_water"
				}
			],
			"type": "multi-select",
			"boolean" : true,
			"parameter_name": "place_of_worship_facilities"
		}],
		christian: [{
			"label": "Select Ward",
			"type": "single-select",
			"parameter_name": "ward",
		},{
			"label": "Select Facilities",
			"options": [
				{
					"value": "Toilet",
					"label": "Toilet",
					"database_schema_key" : "facility_toilet"
				},
				{
					"value": "Water",
					"label": "Water",
					"database_schema_key" : "facility_drinking_water"
				}
			],
			"type": "multi-select",
			"boolean" : true,
			"parameter_name": "place_of_worship_facilities"
		}],
		kirat: [{
			"label": "Select Ward",
			"type": "single-select",
			"parameter_name": "ward",
		},{
			"label": "Select Facilities",
			"options": [
				{
					"value": "Toilet",
					"label": "Toilet",
					"database_schema_key" : "facility_toilet"
				},
				{
					"value": "Water",
					"label": "Water",
					"database_schema_key" : "facility_drinking_water"
				}
			],
			"type": "multi-select",
			"boolean" : true,
			"parameter_name": "place_of_worship_facilities"
		}],
		sikh: [{
			"label": "Select Ward",
			"type": "single-select",
			"parameter_name": "ward",
		},{
			"label": "Select Facilities",
			"options": [
				{
					"value": "Toilet",
					"label": "Toilet",
					"database_schema_key" : "facility_toilet"
				},
				{
					"value": "Water",
					"label": "Water",
					"database_schema_key" : "facility_drinking_water"
				}
			],
			"type": "multi-select",
			"boolean" : true,
			"parameter_name": "place_of_worship_facilities"
		}],
		judaism: [{
			"label": "Select Ward",
			"type": "single-select",
			"parameter_name": "ward",
		},{
			"label": "Select Facilities",
			"options": [
				{
					"value": "Toilet",
					"label": "Toilet",
					"database_schema_key" : "facility_toilet"
				},
				{
					"value": "Water",
					"label": "Water",
					"database_schema_key" : "facility_drinking_water"
				}
			],
			"type": "multi-select",
			"boolean" : true,
			"parameter_name": "place_of_worship_facilities"
		}],
		"other-religion": [{
			"label": "Select Ward",
			"type": "single-select",
			"parameter_name": "ward",
		},{
			"label": "Select Facilities",
			"options": [
				{
					"value": "Toilet",
					"label": "Toilet",
					"database_schema_key" : "facility_toilet"
				},
				{
					"value": "Water",
					"label": "Water",
					"database_schema_key" : "facility_drinking_water"
				}
			],
			"type": "multi-select",
			"boolean" : true,
			"parameter_name": "place_of_worship_facilities"
		}],
		radio: [{
			"label": "Select Ward",
			"type": "single-select",
			"parameter_name": "ward",
		}],
		television: [{
			"label": "Select Ward",
			"type": "single-select",
			"parameter_name": "ward",
		}],
		newspaper: [{
			"label": "Select Ward",
			"type": "single-select",
			"parameter_name": "ward",
		}],
		police: [{
			"label": "Select Ward",
			"type": "single-select",
			"parameter_name": "ward",
		}],
		army_apf: [{
			"label": "Select Ward",
			"type": "single-select",
			"parameter_name": "ward",
		}]
	}
};