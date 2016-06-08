import React, { Component } from 'react';
import {connect} from 'react-redux';
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
import '../../css/style.css';

class AppContent extends Component {
	
	constructor(props){
		super(props);
	} 

	render() {
	
		const flexcontainer = {
			height: 'calc(100vh - 80px)',
			display: '-webkit-flex',
   			display: 'flex',
   			WebkitFlexDirection: 'column',
   			flexDirection: 'column',
		}

		const flexitem = {
			height: 100,
			width: '100vw',
			background: '#e46119',
			border: '1px solid #626262',
			margin: 3,
			WebkitFlex: '1 0 0', 
   			flex: '1 0 0', 
		}

		const { apps, dispatch } = this.props;
	    const applist = apps.map((app,i)=>{
	    	const data = app.data.map((data,j)=>{
	    		return <li key ={j}>{data.toString()}</li>
	    	})
	    	return <div key={i} style={flexitem}>{app.name}</div>
	    });

	    return <ReactCSSTransitionGroup style={flexcontainer} transitionName="flexitem" transitionEnterTimeout={500} transitionLeaveTimeout={300}>{applist}</ReactCSSTransitionGroup>
         	
         	
	   }
};

function select(state) {
  return {
    apps: state.apps
  };
}

AppContent.contextTypes = {
	store: React.PropTypes.object,
}

export default connect(select)(AppContent);
