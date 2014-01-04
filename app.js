var express = require("express");
var app = express();

var config = require("./config");

// all environments
app.configure(function () {
  app.set("config", config);
  app.use(express.logger("dev"));// Output development-friendly colored logs
  // body parsing
  app.use(express.json());
  app.use(express.urlencoded());
  //  app.use(express.multipart());


});

// development only
app.configure("development", function () {
  app.use(express.errorHandler());
});

// Production only
app.configure("production", function () {
  app.use(express.errorHandler({dumpExceptions: true}));
});

/**
 * Look for status_code_override=* in the URL query params
 * If found, override the response code to that value.
 * If the value is 200..299, continue with next(), else
 * finalize the request here.
 */
app.use(function(req, res, next){
  var status_code_override = req.query.status_code_override;
  console.log("req.query:", req.query.status_code_override);
  if(undefined !== status_code_override) {
    console.log("Found status code override in request:", status_code_override);
    res.status(status_code_override);
    if(status_code_override >= 200 && status_code_override < 300) {
      next();
    } else {
      res.send();
    }
  };
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.send(500, 'Something broke!');
});

app.get("/", function(req, res){
  res.send("Hello World");
});

/**
 * Display routes if in development env
 */
app.get("/routes", function(req, res){
  if('development' == app.get('env')) {
    res.send(app.routes);
  } else {
    res.status(404).send();
  }
});

app.listen(3003);
console.log("Listening on port 3003");
