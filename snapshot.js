const CronJob = require("cron").CronJob;
const request = require("request");

const config = require("./config");

const baseUrl = "http://localhost:4040/api/v2/features";
const amenities = Object.keys(require("./configv2").insightsKey);
const callRate = 10000; // delay consecutive request by this much seconds. Just to ensure that there is certain time gap between consecutive API request

const cronScheduledAt = "0 */59 * * * *"; // Run cron at every 59 minutes

module.exports = new CronJob(cronScheduledAt, function() {
	console.log("New Job started at ",new Date());
	function asyncFunction (item, cb) {
		console.log(`Waiting for ${callRate/1000} seconds....`);
		setTimeout(() => {
			console.log(`Requesting for ${item}`);
			const url = baseUrl + `?type=${item}&takeSnapshot=true&snapshotKey=${config.snapshotKey}`;
			request({ url }, function (error, response) {
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
			});
		}, callRate);
	}
	let requests = amenities.reduce((promiseChain, item) => {
		return promiseChain.then(() => new Promise((resolve) => {
			asyncFunction(item, resolve);
		}));
	}, Promise.resolve());
	requests.then(() => console.log("Done with Snapshot creation"));
}, null, false, null);
