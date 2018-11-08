#!/usr/bin/node

var express = require('express');
var app = express();
var port = process.env.PORT || 5000;

app.get('/', function(req, res){
  res.send('{ "status" : "OK" }');
});

// it's necessary to listen this way in order not to lock the port
if(!module.parent){
  app.listen(port);
  console.log('Server running at http://127.0.0.1:' + port + '/');
}

module.exports = app;
