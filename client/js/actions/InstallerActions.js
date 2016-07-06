import request from 'superagent';
import { TOGGLE_APP_RESOURCE, SELECT_APP_TO_INSTALL} from '../constants/ActionTypes';
import config from '../config';


export function install(app){
	
	console.log("----> installing...");
	console.log(app.manifest.name);

	return function (dispatch, getState) { 

		request
  			.get('/app/install')
  			.query({name:app.manifest.name})
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
}

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
