import React, { Component } from 'react';
import HeaderMenu from './HeaderMenu';
import FooterMenu from './FooterMenu';
import '../../style/sass/style.scss';

class App extends Component {
	
	constructor(props){
		super(props);		
	} 

	render() {
	    return (
	    	<div className="container">
	    		<div className="column">
	    			<HeaderMenu/>
	    			<div>
	    				{this.props.children}
	    			</div>
	    			<FooterMenu/>
	    		</div>
	    	</div>
	    );
	}
};

export default App;