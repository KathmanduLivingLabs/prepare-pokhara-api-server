
var amenities = {

	'hospital' : 'hospital|clinic|nursing_home|dentist|health|health_post',
	'school' : 'kindergarten|school',
	

}


module.exports = {

	build: (options)=> {


		var json = options.json;

		var boundingCoordinates = "(28.15504264831543, 83.93202209472656,28.275711059570426, 84.03964233398443)";



		var query = "";

		function headGenerator(query) {
			return query + "[out:" + json.requestConfig.dataType + "][timeout:" + json.requestConfig.timeout + "]; ";

		}

		function bodyGenerator(query) {
			var filters = "";

			for (var tag in json.tags) {
				filters = filters + '["' + tag + '"~"' + amenities[json.tags[tag]] + '"]';
			}

			query = query + "(";
			json.featureTypes.forEach(function(featureType) {
				query = query + featureType + filters + boundingCoordinates + ";"
			})
			query = query + "); ";

			return query;


		}

		function tailGenerator(query) {
			return query + "out body;" +
				">; " +
				"out skel qt;"
		}

		query = headGenerator(query);
		query = bodyGenerator(query);
		query = tailGenerator(query);


		return query;

	}

}