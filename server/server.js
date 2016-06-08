var http = require('http');
var express = require('express');
var bodyparser = require('body-parser');

var app = express();
app.use('/', express.static("static"));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
var server = http.createServer(app);

import websocketinit from './comms/websocket';
import mqttinit from './comms/mqtt';

websocketinit(['databox'],server);
mqttinit();

app.get('/', function(req,res){
  res.render('index');
});

server.listen(8080);
