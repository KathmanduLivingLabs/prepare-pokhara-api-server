module.exports = {
	insightsKey: {
		hospital: {
			"total": "Hospitals"
		}
	},
	parameters: {
		hospital: [{
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
			"parameter_name": "hospital_facilities"
		},{
			"label" : "Select bed capacity",
			"type" : "range",
			"parameter_name": "Bed Capacity",
		},{
			 "label": "Select ward",
			 "type": "single-select",
			 "parameter_name": "ward",
		}]
	}
};