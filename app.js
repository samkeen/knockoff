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


app.use(function(err, req, res, next){
  console.error(err.stack);
  res.send(500, 'Something broke!');
});

// long hand
app.get("/", function(req, res){
  var body = "Hello World";
  res.setHeader("Content-Type", "text/plain");
  res.setHeader("Content-Length", Buffer.byteLength(body));
  res.end(body);
});

// express short hand
app.get("/short", function(req, res){
  res.send("Hello World");
});

/**
 * Display routes if in development env
 */
app.get("/routes", function(req, res){
  if('development' == app.get('env')) {
    res.send(app.routes);
  } else {
    res.send(404);
  }
});

app.listen(3003);
console.log("Listening on port 3003");
