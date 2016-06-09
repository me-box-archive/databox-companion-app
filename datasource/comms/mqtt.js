import mqtt from 'mqtt';  

let counter = 0;

const generateMessage = ()=> {
	return JSON.stringify({
				id:counter++, 
				name: `a new app(${counter})`, 
				view:'list', 
				data: {"some":"data"}
			});
}

export default function init(){

	const client = mqtt.connect('mqtt://localhost:1883');

	client.on('connect', () => {  
  		setInterval(() => client.publish('ds/bulbs', generateMessage()), 2000); 
	})
}