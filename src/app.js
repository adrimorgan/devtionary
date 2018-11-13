#!/usr/bin/node

var express = require('express');
var app = express();
var port = process.env.PORT || 5000;

// temporary array to store devnotes, modified by the HTTP interaction
var devnotesMap = new Map;

// status route - to verify execution of the service
app.get('/', function(req, res){
  res.send({
    status: "OK",
    ejemplo: {
      ruta: "/help",
      valor: {
        usage: "try to POST a new devnote to /devnotes/key/value"
      }
    }
  });
});

// help route - necessary for testing purposes
app.get('/help', function(req, res){
  res.send({
    usage: "try to POST a new devnote to /devnotes/key/value"
  });
});

// devnotes GET route - to get all the devnotes existing in the "database"
app.get('/devnotes', function(req, res){
  res.send(devnotesMap);
});

// devnotes DELETE route - to empty the "database"
app.delete('/devnotes', function(req, res){
  devnotesMap.clear();
  res.sendStatus(200);
});

// devnotes/:key GET route - to get a specific devnote
app.get('/devnotes/:key', function(req, res){
  var key = req.params.key;
  if(key in devnotesMap)
    res.send(devnotesMap[key]);
  else
    res.sendStatus(404);
});

// devnotes/:key/:value POST route - to create a devnote in "database"
app.post('/devnotes/:key/:value', function(req, res){
  var key = req.params.key;
  var value = req.params.value;
  if(!(key in devnotesMap)){
    devnotesMap[key] = value;
    res.sendStatus(200);  // created
  } else
    res.sendStatus(409);  // already existing
});

// devnotes/:key DELETE route - to delete a specific devnote
app.delete('/devnotes/:key', function(req, res){
  var key = req.params.key;
  if(key in devnotesMap){
    delete devnotesMap[key];
    res.sendStatus(200);  // deleted
  } else
    res.sendStatus(204);  // didn't exist
});

// it's necessary to listen this way in order not to lock the port
if(!module.parent){
  app.listen(port);
  console.log('Server running at http://127.0.0.1:' + port + '/');
}

module.exports = app;
