#!/usr/bin/node

var express = require('express');
const { createLogger, format, transports } = require('winston');
require('winston-daily-rotate-file');
const fs = require('fs');
const path = require('path');

// production or development mode
const env = process.env.NODE_ENV || 'development';

// create the log directory if it doesn't exist
const logDirectory = 'log';
if(!fs.existsSync(logDirectory)){
  fs.mkdirSync(logDirectory);
}

// code for the daily log file
const dailyRotateFileTransport = new transports.DailyRotateFile({
  filename: `${logDirectory}/%DATE%-results.log`,
  datePattern: 'YYYY-MM-DD'
});

// defines logger with timestamps and colorized output
const logger = createLogger({
  level: env === 'development' ? 'debug' : 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [
    new transports.Console({
      level: 'info',
      format: format.combine(
        format.colorize(),
        format.printf(
          info => `${info.timestamp} ${info.level}: ${info.message}`
        )
      )
    }),
    dailyRotateFileTransport
  ]
});

/// Creates address, port and application
var app = express();
var address = process.env.ADDR || '0.0.0.0';
var port = process.env.PORT || 80;

// temporary array to store devnotes, modified by the HTTP interaction
var devnotesMap = new Map;

////////////////////////////////////////////////////////////////////////////////
/// ROUTES ///

/// status route - to verify execution of the service
app.get('/', function(req, res){

  // log the address of the request author
  logger.info('Request to / from ' + req.connection.remoteAddress);

  // send the simple current website map
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

/// help route - necessary for testing purposes
app.get('/help', function(req, res){

  // log the address of the request author
  logger.info('Request to /help from ' + req.connection.remoteAddress);

  // send a little help with an example of use of the service (must use POST)
  res.send({
    usage: "try to POST a new devnote to /devnotes/key/value"
  });
});

/// devnotes GET route - to get all the devnotes existing in the "database"
app.get('/devnotes', function(req, res){

  // log the address of the request author
  logger.info('Request to /devnotes from ' + req.connection.remoteAddress);

  // send the list of devnotes currently available
  res.send(devnotesMap);
});

/// devnotes DELETE route - to empty the "database"
app.delete('/devnotes', function(req, res){

  // drop every devnote
  devnotesMap.clear();

  // log the DELETE action and the agent
  logger.info('Devnotes map cleared by ' + req.connection.remoteAddress);
  res.sendStatus(200);
});

// devnotes/:key GET route - to get a specific devnote
app.get('/devnotes/:key', function(req, res){

  // reads the introduced key and logs it
  var key = req.params.key;
  var ip = ' requested by ' + req.connection.remoteAddress;

  if(key in devnotesMap){
    logger.info('Devnote ' + key + ip);
    res.send(devnotesMap[key]);
  } else {
    logger.error('Devnote ' + key + ' couldn\'t be found -' + ip);
    res.sendStatus(404);
  }
});

// devnotes/:key/:value POST route - to create a devnote in "database"
app.post('/devnotes/:key/:value', function(req, res){

  // gets the parameters to create a new entry
  var key = req.params.key;
  var value = req.params.value;

  // request made by
  var ip = req.connection.remoteAddress;

  // checks the existence of the key
  if(!(key in devnotesMap)){
    devnotesMap[key] = value;
    logger.info('Devnote ' + key + ' created by ' + ip);
    res.sendStatus(200);  // created
  } else {
    logger.error('Already existing devnote ' + key + ' - requested by ' + ip);
    res.sendStatus(409);  // already existing
  }
});

// devnotes/:key DELETE route - to delete a specific devnote
app.delete('/devnotes/:key', function(req, res){

  // key of devnote to be removed
  var key = req.params.key;
  if(key in devnotesMap)
    delete devnotesMap[key];

  // logs deleted key
  logger.info('Devnote ' + key + ' removed by ' + req.connection.remoteAddress);
  res.sendStatus(200);
});

// it's necessary to listen this way in order not to lock the port
if(!module.parent){
  app.listen(port, address);
  logger.info('Server listening at ' + address + ':' + port + '/');
}

module.exports = app;
