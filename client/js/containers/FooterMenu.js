import React, { Component } from 'react';
import {Link} from 'react-router';

import cx from 'classnames';

class FooterMenu extends Component { 
  render(){
  	console.log(this.context.router);

  	const links = ['apps', 'appstore'].map((link)=>{
  		const className = cx({
  			active: this.context.router.isActive(link, true)
  		})

  		return <div className={className}>
        	<div className="centered">
        		<Link to={link}>{link}</Link>
        	</div>
        </div>

  	});

    return (<div className="footer">
        		<div className="row">
        			{links}
        		</div>
      		</div>)
  }


}

FooterMenu.contextTypes = {
   router: React.PropTypes.object
}

export default FooterMenu;