import React, { Component } from 'react';
import HeaderMenu from './HeaderMenu';
import FooterMenu from './FooterMenu';
import AppContent from './AppContent';

class Main extends Component {
	
	constructor(props){
		super(props);		
	} 

	render() {
	      
	    return (
	    	<div>
	    		<HeaderMenu/>
	    		<AppContent/>
	    		<FooterMenu/>
	    	</div>
	    );
	  }
	};

export default Main;
