var express = require("express");
var app = express();

var config = require("./config");

var ClientDirectives = require("./lib/ClientDirectives");

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
 * @type {ClientDirectives}
 */
var client_directives = null;
/**
 * Set up utilities
 */
app.use(function(req, res, next){
  client_directives = new ClientDirectives(req);
  next();
});

/**
 * Examine Request for Status Code override
 */
app.use(function(req, res, next){
  var status_code_override = client_directives.get_status_code_override();
  if(undefined !== status_code_override) {
    console.log(
      "Found Client instruction for 'status code override' in Request:", status_code_override);
    res.status(status_code_override);
    if(status_code_override >= 200 && status_code_override < 300) {
      next();
    } else {
      res.send();
    }
  }
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.send(500, "Something broke!");
});

app.get("/", function(req, res){
  res.send("Hello World");
});

/**
 * Display routes if in development env
 */
app.get("/routes", function(req, res){
  if("development" === app.get("env")) {
    res.send(app.routes);
  } else {
    res.status(404).send();
  }
});

app.listen(3003);
console.log("Listening on port 3003");
