import mqtt from 'mqtt';  
import {sendmessage} from './websocket';

let counter = 0;

export default function init(){
	
	const client = mqtt.connect('mqtt://localhost:1883')
	
	client.on('connect', () => {  
  		client.subscribe('webapp')
	})

	client.on('message', (topic, message) => {  
		try {
			console.log(message);
			const msg = JSON.parse(message.toString());
			console.log("OK now message is");
			console.log(msg);
			sendmessage("testApp", "databox", "message", msg)
		}
		catch(err){
			console.log(err);
		}
	});
}