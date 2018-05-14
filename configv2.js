module.exports = {
	insightsKey: {
		hospital: [
			{
				"label" : "Hospitals",
				"value" : "total"
			},
			{
				"label" : "Bed capacity",
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
				"label" : "Dentists",
				"value" : "total"
			}
		],
		school: [
			{
				"label" : "Schools",
				"value" : "total"
			}
		],
		college: [
			{
				"label" : "Schools",
				"value" : "total"
			}
		],
		university: [
			{
				"label" : "Schools",
				"value" : "total"
			}
		],
		kindergarten: [
			{
				"label" : "Schools",
				"value" : "total"
			}
		],
		bank: [
			{
				"label" : "Banks",
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
		]
	},
	parameters: {
		hospital: [{
			"label": "Select ward",
			"type": "single-select",
			"parameter_name": "ward",
		},{
			"label" : "Select bed capacity",
			"type" : "range",
			"parameter_name": "Bed Capacity",
		},{
			"label": "Select facilities",
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
			"label": "Select ward",
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
			"label": "Select ward",
			"type": "single-select",
			"parameter_name": "ward",
		},{
			"label": "Select Operator",
			"options": [
				{
					"value": "public",
					"label": "Public"
				},
				{
					"value": "private",
					"label": "Private"
				}
			],
			"on" : "Operator",
			"type": "multi-select",
			"parameter_name": "health_post_operator"
		}],
		pharmacy: [{
			"label": "Select ward",
			"type": "single-select",
			"parameter_name": "ward",
		}],
		dentist: [{
			"label": "Select ward",
			"type": "single-select",
			"parameter_name": "ward",
		}],
		school: [{
			"label": "Select ward",
			"type": "single-select",
			"parameter_name": "ward",
		}],
		college: [{
			"label": "Select ward",
			"type": "single-select",
			"parameter_name": "ward",
		}],
		university: [{
			"label": "Select ward",
			"type": "single-select",
			"parameter_name": "ward",
		}],
		kindergarten: [{
			"label": "Select ward",
			"type": "single-select",
			"parameter_name": "ward",
		}],
		bank: [{
			"label": "Select ward",
			"type": "single-select",
			"parameter_name": "ward",
		}],
		atm: [{
			"label": "Select ward",
			"type": "single-select",
			"parameter_name": "ward",
		}],
		government: [{
			"label": "Select ward",
			"type": "single-select",
			"parameter_name": "ward",
		}],
		ngo: [{
			"label": "Select ward",
			"type": "single-select",
			"parameter_name": "ward",
		}],
		hotel: [{
			"label": "Select ward",
			"type": "single-select",
			"parameter_name": "ward",
		}],
		restaurant: [{
			"label": "Select ward",
			"type": "single-select",
			"parameter_name": "ward",
		}],
		museum: [{
			"label": "Select ward",
			"type": "single-select",
			"parameter_name": "ward",
		}],
		park: [{
			"label": "Select ward",
			"type": "single-select",
			"parameter_name": "ward",
		}]
	}
};