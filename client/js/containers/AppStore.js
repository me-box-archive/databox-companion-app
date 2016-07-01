import React, { Component } from 'react';
import * as AppStoreActions from '../actions/AppStoreActions';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import {HEADER_TOOLBAR_HEIGHT, FOOTER_TOOLBAR_HEIGHT} from '../constants/ViewConstants';
import {Link} from 'react-router';

class AppStore extends Component {
	
	constructor(props){
		super(props);	
		Object.assign(this, ...bindActionCreators(AppStoreActions, props.dispatch));	
	} 
	
	componentDidMount(){
		this.fetchAppStoreList();	
	}
	
	render() {
	     
	    const container = {
	    	width: '100vw',
	    	height: `calc(100vh - ${HEADER_TOOLBAR_HEIGHT + FOOTER_TOOLBAR_HEIGHT}px)`,
	    }
	    const headerstyle ={
	    	flex: '0 0 auto',
	    	height: 60,
	    	background: '#f2f2f2'
	    }

	    const {apps, dispatch} = this.props;

	    const header = <div style={headerstyle}>
	    					<div className="row">
	    						<div className="title">
									<div className="centered">
		    							name
		    						</div>
	    						</div>
	    						<div>
									<div className="centered">
		    							description
		    						</div>
	    						</div>
	    						<div>
									<div className="centered">
		    							author
		    						</div>
	    						</div>
	    					</div>
	    			    </div>


	    const list = apps.map((a)=>{
	    	return  <div>
		    			<div className="row">
		    				<div className="title">
		    					<div className="centered">
		    						{a.manifest.name}
		    					</div>
		    				</div>
		    				<div>
		    					<div className="centered">
		    						{a.manifest.description}
		    					</div>
		    				</div>
		    				<div>
		    					<div className="centered">
		    						{a.author.username}
		    					</div>
		    				</div>
		    				<div>
		    					<div className="centered">
		    						<Link to="/install/1">install</Link>
		    					</div>
		    				</div>
		    		   </div>
		    		</div>
	    });

	   
	    let content;

	    if (this.props.children){
	    	content = <div className="column">
	    				{this.props.children}
	    			  </div>
	    }else{
	    	content = <div className="column">
	    				{header}
	    				{list}
	    			  </div>
	    }
	    return <div style={container}>
	    			{content}
	    		</div>
	}
};


function select(state) {
  return {
    apps: state.appstore.apps,
  };
}

export default connect(select)(AppStore);
