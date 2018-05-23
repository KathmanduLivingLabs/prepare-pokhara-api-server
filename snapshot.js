const config = require("./config");
const request = require("request");
const baseUrl = "http://localhost:4040/api/v2/features";

const amenities = Object.keys(require("./configv2").insightsKey);
const callRate = 20000;

const intervalObj = setInterval(intervalFunc,callRate);

let index = 0;
function intervalFunc(){
	console.log(`Requesting for ${amenities[index]}`);
	const url = baseUrl + `?type=${amenities[index]}&takeSnapshot=true&snapshotKey=${config.snapshotKey}`;
	request(
		{
			url
		},
		function (error, response) {
			if(error){
				clearInterval(intervalObj);
			}
			if ((response && response.statusCode && response.body)){
				const validResponse = (JSON.parse(response.body));
				if(!validResponse.success){
					clearInterval(intervalObj);
				}
			}else{
				clearInterval(intervalObj);
			}
		}
	);
	if(index > amenities.length-2){
		clearInterval(intervalObj);
	}else{
		index++;
	}
}





