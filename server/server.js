import http  from 'http';
import express from 'express';
import bodyparser from 'body-parser';
import config from './config';
import websocketinit from './comms/websocket';
import mqttinit from './comms/mqtt';
import request from 'superagent';
import {pull, launch} from './utils/containermanagerapi'

const app = express();
app.use('/', express.static("static"));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
const server = http.createServer(app);

websocketinit(['databox'],server);
mqttinit();

app.get('/', function(req,res){
  res.render('index');
});

app.get('/install/', function(req,res){
	
	console.log(req.query);

	const apptoinstall = req.query.name;
	return pull(apptoinstall).then((result)=>{
		return launch(apptoinstall);
	}).then((result)=>{
		res.send(result);
	});
});

server.listen(8001);
