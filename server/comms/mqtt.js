import mqtt from 'mqtt';  
import {sendmessage} from './websocket';

let counter = 0;

export default function init(){
	console.log("nice, initing the mqtt client");

	const client = mqtt.connect('mqtt://localhost:1883')
	
	
	client.on('connect', () => {  
  		client.subscribe('appmessage')
	})

	client.on('message', (topic, message) => {  
		console.log(JSON.parse(message.toString()));
		sendmessage("testApp", "databox", "message", {id:counter++, name: `a new app(${counter})`, view:'list', data: {"some":"data"}})
	});
}