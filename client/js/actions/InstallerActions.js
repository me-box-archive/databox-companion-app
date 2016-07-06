import request from 'superagent';
import { TOGGLE_APP_RESOURCE, SELECT_APP_TO_INSTALL} from '../constants/ActionTypes';
import config from '../config';
import {INSTALL_PULLING_APP, INSTALL_PULLING_APP_ERROR,INSTALL_LAUNCHING_APP, INSTALL_LAUNCHING_APP_ERROR,  INSTALL_LAUNCHED_APP} from '../constants/ActionTypes'; 

export function pullingApp(name){

    console.log("pulling app!!!");
	
	return {
		type: INSTALL_PULLING_APP,
		name
	}
}

export function errorPullingApp(name){
	console.log("error pulling app!!!");
	return{
		type: INSTALL_PULLING_APP_ERROR,
		name
	}
}

export function launchingApp(name){
	console.log("launching app!!!");
	return{
		type: INSTALL_LAUNCHING_APP,
		name
	}
}

export function errorLaunchingApp(name){
	console.log("error launching app!!!");
	return{
		type: INSTALL_LAUNCHING_APP_ERROR,
		name
	}
}

export function launchedApp(result){
	console.log("error launched app!!!");
	return {
		INSTALL_LAUNCHED_APP,
		result
	}
}

export function launchApp(name){

	
	console.log("launch app called!");

	return function (dispatch, getState) { 
		dispatch(launchingApp());

		request
			.post(`${config.containermanager.API}/launch-container`)
			.send({
				repoTag:`${config.registry.URL}/${name}:latest`,
			})
			.type("form")
			.set('Accept', 'application/json')
   			.end((err, data)=>{
     			if (err) {
       				console.log('error launching  app');
       				console.log(err);
       				dispatch(errorLaunchingApp());
     			} 
     			else {
     				console.log(data.body);
     			 	dispatch(launchedApp(data.body))
     			}
     		});
    }	
}



export function install(app){
	
	console.log("----> installing...");
	console.log(app.manifest.name);

	return function (dispatch, getState) { 

		dispatch(pullingApp(app.manifest.name));

		request
   			.post(`${config.containermanager.API}/pull-app`)
   			.send({
  				"name": app.manifest.name,
			})
			.type("form")
   			//.set('Accept', 'application/json')
   			.end((err, data)=>{
   				
     			if (err) {
     				console.log(err);
       				dispatch(errorPullingApp(err));
     			} 
     			else {
     				//console.log(data.body);
     			 	dispatch(launchApp(app.manifest.name))
     			}
     		});
	}	
}
/*
export function install(app){

	return function (dispatch, getState) { 

		request
  			.get('/install')
  			.query({name:app.name})
  			.set('Accept', 'application/json')
  			.type('json')
  			.end(function(err, res){
  				if (err){
  					console.log(err);
  				}else{
  					console.log(res.body);
  	 			}
  	 		});		

	}	
}*/

export function selectApptoInstall(appId){

	return function (dispatch, getState) { 
		
		const a =  getState().appstore.reduce((acc, app)=>{
            return app.manifest.id === appId ? app : acc;
        },null);

        if (a){
        	dispatch({
        		type : SELECT_APP_TO_INSTALL,
				app: a
        	})
        }
	}
}


export function toggleResource(resource){

	/*
	const r = app.manifest.packages.map((p)=>{
				return p['driver-permissions'].reduce((acc, perm)=>{
					acc[perm] = {id: p.id, name: perm, required: p.required}
					return acc;
				},{})
			}).reduce((acc, resource)=>{
				
				Object.keys(resource).forEach((key)=>{
					const r = resource[key];
					acc[r.name] = acc[r.name] || {packages: [], required: false}
					if (r.required){
						acc[r.name].required = true;
					}
					if (acc[r.name].packages.indexOf(r.id) === -1){
						acc[r.name].packages.push(r.id)
					}
				});

				return acc;			
			},{});
	*/

	return {
			type: TOGGLE_APP_RESOURCE,
			resource: resource,
	}
}
