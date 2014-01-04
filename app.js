var express = require("express");
var app = express();

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

app.listen(3003);
console.log("Listening on port 3003");
