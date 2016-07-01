import React, { Component } from 'react';

export default class Installer extends Component {
	
	constructor(props){
		super(props);
		console.log("am in installer");
	} 

	render() {	
		const expanded = {
			flex: '4 1 auto'
		}

		console.log("am in installwer!");
		 return <div style={expanded}> Installer </div>
	}
};