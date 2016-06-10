import mqtt from 'mqtt';  

const generateBulbData = ()=> {

	return JSON.stringify({
						  	
						  	timestamp: Date.now(),
						  	
						  	values: [
								{name: 'bulb one', 		id: 1, value: !!Math.floor(Math.random() * 2) ? "on":"off"},
								{name: 'bulb two', 		id: 2, value: !!Math.floor(Math.random() * 2) ? "on":"off"},
						  		{name: 'bulb three',	id: 3, value: !!Math.floor(Math.random() * 2) ? "on":"off"},
						  		{name: 'bulb four', 	id: 4, value: !!Math.floor(Math.random() * 2) ? "on":"off"}
						  	]
						});
}

export default function init(){

	const client = mqtt.connect('mqtt://localhost:1883');
	const min = 500;
	const max = 5000;

	client.on('connect', () => {  
  		
  		setInterval(() => {
  			client.publish('ds/bulbs', generateBulbData())
  		}, Math.random() * (max - min) + min) 
	})
}