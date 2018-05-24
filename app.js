let express = require("express");
let path = require("path");
let favicon = require("serve-favicon");
let logger = require("morgan");
let cookieParser = require("cookie-parser");
let bodyParser = require("body-parser");

global["funsole"] = require("funsole");

import config from "./config";

let app = express();

// const cronJob = require("./snapshot");
// if(!cronJob.running){
// 	cronJob.start(); //start cron job
// }

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/extracts",  express.static(__dirname + "/extracts"));
app.use("/apidocs", express.static(path.join(__dirname, "/apidocs")));
app.use("/apidocs/v2", express.static(path.join(__dirname, "/apidocsv2")));

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT ,DELETE");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");
	next();
});

let router = express.Router();
// app.use("/",router);

const versions = config.versions;

for(let version in versions){
	app.use(versions[version],require(`./controllers/api/${version}`)(router));
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	let err = new Error("Not Found");
	err.status = 404;
	next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get("env") === "development") {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render("error", {
			message: err.message,
			error: err
		});
	});
}
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render("error", {
		message: err.message,
		error: {}
	});
});

let port = 4040;
let listener =  app.listen(process.env.PORT || port,function(){
	console.log("API server running at port " +  listener.address().port);
});

module.exports = app;
