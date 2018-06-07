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
		},{
			"label": "Select Facilities",
			"options": [
				{
					"value": "ICU",
					"label": "ICU"
				},
				{
					"value": "NICU",
					"label": "NICU"
				},
				{
					"value": "Ventilator",
					"label": "Ventilator"
				},
				{
					"value": "Xray",
					"label": "Xray"
				},
				{
					"value": "Emergency",
					"label": "Emergency"
				},
				{
					"value": "Operation Theatre",
					"label": "Operation Theatre"
				},
				{
					"value": "Ambulance",
					"label": "Ambulance"
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
					"label": "Dental"
				},
				{
					"value": "dermatology",
					"label": "Dermatology"
				},
				{
					"value": "general",
					"label": "General"
				},
				{
					"value": "oncology",
					"label": "Oncology"
				},
				{
					"value": "opthalmology",
					"label": "Opthalmology"
				},
				{
					"value": "orthopedics",
					"label": "Orthopedics"
				},
				{
					"value": "psychiatry",
					"label": "Psychiatry"
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
		},{
			"label": "Select Type of School",
			"options": [
				{
					"value": "private",
					"label": "Private"
				},
				{
					"value": "government",
					"label": "Government"
				},
				{
					"value": "community",
					"label": "Community"
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
					"label": "Commercial"
				},
				{
					"value": "development",
					"label": "Development"
				},
				{
					"value": "finance companies",
					"label": "Finance Companies"
				},
				{
					"value" : "micro finance",
					"label" : "Micro Finance"
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
					"label": "Government"
				},
				{
					"value": "private",
					"label": "Private"
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
					"label": "ATM"
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
					"label": "Government"
				},
				{
					"value": "private",
					"label": "Private"
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
					"label": "VISA"
				},
				{
					"value" : "VISA Electron",
					"label" : "VISA Electron"
				},
				{
					"value": "JCB",
					"label": "JCB"
				},
				{
					"value": "MasterCard",
					"label": "Mastercard"
				},
				{
					"value": "Discover",
					"label": "Discover"
				},
				{
					"value" : "Cirrus",
					"label" : "Cirrus"
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
		},{
			"label" : "Select Room Capacity",
			"type" : "range",
			"parameter_name": "Room Capacity",
		},{
			"label" : "Select Number of Stars",
			"type" : "range",
			"step" : 1,
			"parameter_name": "Stars",
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
					"label": "Toilet"
				},
				{
					"value": "Water",
					"label": "Water"
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
					"label": "Toilet"
				},
				{
					"value": "Water",
					"label": "Water"
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
					"label": "Toilet"
				},
				{
					"value": "Water",
					"label": "Water"
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
					"label": "Toilet"
				},
				{
					"value": "Water",
					"label": "Water"
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
					"label": "Toilet"
				},
				{
					"value": "Water",
					"label": "Water"
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
					"label": "Toilet"
				},
				{
					"value": "Water",
					"label": "Water"
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
					"label": "Toilet"
				},
				{
					"value": "Water",
					"label": "Water"
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
					"label": "Toilet"
				},
				{
					"value": "Water",
					"label": "Water"
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