const config = require("./config");
const request = require("request");
const baseUrl = "http://localhost:4040/api/v2/features";

const amenities = Object.keys(require("./configv2").insightsKey);
const callRate = 10000; // in seconds

// const intervalObj = setInterval(intervalFunc,callRate);

// let index = 0;
// function intervalFunc(){
// 	console.log(`Requesting for ${amenities[index]}`);
// 	const url = baseUrl + `?type=${amenities[index]}&takeSnapshot=true&snapshotKey=${config.snapshotKey}`;
// 	request(
// 		{
// 			url
// 		},
// 		function (error, response) {
// 			if(error){
// 				clearInterval(intervalObj);
// 			}
// 			if ((response && response.statusCode && response.body)){
// 				const validResponse = (JSON.parse(response.body));
// 				if(!validResponse.success){
// 					clearInterval(intervalObj);
// 				}
// 			}else{
// 				clearInterval(intervalObj);
// 			}
// 		}
// 	);
// 	if(index > amenities.length-2){
// 		clearInterval(intervalObj);
// 	}else{
// 		index++;
// 	}
// }


function asyncFunction (item, cb) {
	console.log(`Waiting for ${callRate/1000} seconds....`);
	setTimeout(() => {
		console.log(`Requesting for ${item}`);
		const url = baseUrl + `?type=${item}&takeSnapshot=true&snapshotKey=${config.snapshotKey}`;
		request(
			{
				url
			},
			function (error, response) {
				if(error){
					cb(error);
				}
				if ((response && response.statusCode && response.body)){
					const validResponse = (JSON.parse(response.body));
					if(!validResponse.success){
						cb({
							success : 0,
							message : "No success"
						});
					}else{
						console.log(`DONE for ${item}`);
						cb();
					}
				}else{
					cb({
						success : 0,
						message : "No success"
					});
				}
			}
		);
	}, callRate);
}

let requests = amenities.reduce((promiseChain, item) => {
	return promiseChain.then(() => new Promise((resolve) => {
		asyncFunction(item, resolve);
	}));
}, Promise.resolve());

requests.then(() => console.log("Done with Snapshot creation"));

