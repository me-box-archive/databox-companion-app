import React, { Component } from 'react';
import {connect} from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {HEADER_TOOLBAR_HEIGHT,FOOTER_TOOLBAR_HEIGHT} from '../constants/ViewConstants';
import '../../css/style.css';
import cx from 'classnames';
import List from '../components/List';

class AppContent extends Component {
	
	constructor(props){
		super(props);
	} 

	render() {
	
		const flexcontainer = {
			height: `calc(100vh - ${HEADER_TOOLBAR_HEIGHT+FOOTER_TOOLBAR_HEIGHT}px)`,
		}

		const { apps, dispatch } = this.props;

	    const applist = apps.map((app,i)=>{
	    	
	    	let dataview;

	    	switch (app.view){	    		
	    		case 'list':
	    			
	    			const data = app.data[app.data.length-1];
	    			const props = {keys: data.keys, rows: data.rows};
					dataview = <List {...props}/>
	    			
	    			break;
	    	
	    	}

	    	const {view} =  app;

	    	const classname = cx({
	    		flexitem: true,
	    		[view]:true,
	    	})

	    	return <div>
	    				<div key={i} className={classname}>
	    					{app.name}
							{dataview}
	    				</div>
	    				
	    		   </div>
	    });

	    return <ReactCSSTransitionGroup className="flexcontainer" style={flexcontainer} transitionName="flexitem" transitionEnterTimeout={500} transitionLeaveTimeout={300}>{applist}</ReactCSSTransitionGroup>
         	
         	
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
