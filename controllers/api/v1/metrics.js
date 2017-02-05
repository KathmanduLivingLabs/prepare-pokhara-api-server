export default {

	wards : (req,res,next)=>{
		
		var statsIndicators = config.statsIndicator;
		
		var metrics = {
			wards : new geoJSONParser('wards-name').getFile().wards
		};

		// metrics.indicators = {};
		// for(var statIndicator in  statsIndicators){
		// 	metrics.indicators[statIndicator] = [];
		// 	for(var tag in statsIndicators[statIndicator]){
		// 		metrics.indicators[statIndicator].push(tag);
		// 	}
		// }
		
		req.cdata = {
			success : 1,
			message : 'Metrics successfully fetched.',
			metrics : metrics
		}

		next();
		

	}

}