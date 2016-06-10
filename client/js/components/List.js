import React, { Component } from 'react';

class List extends Component {
	
	constructor(props){
		super(props);
	} 

	render() {
		var headings = this.props.keys.map(function(item, i){
			return <th key={i}>{item}</th>;
		})

		var rows = this.props.rows.map((item,i)=>{
			
			var col = this.props.keys.map(function(key,j){
				return <td key={j}>{item[key]}</td>
			});

			return <tr key={i}>{col}</tr>
		});

		
		return <table className="bordered striped">
			<thead>
				<tr>
					{headings}
				</tr>	
			</thead>
			<tbody>
				{rows}
			</tbody>
		</table>
	}
};

export default List;