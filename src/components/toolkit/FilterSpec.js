import React from 'react'
import ReactDOM from 'react-dom'
import Input from 'react-bootstrap/lib/Input'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'

var FilterSpec = React.createClass({
	componentDidMount: function(){
  	ReactDOM.findDOMNode(this.refs.filterInput).childNodes[0].value = ''
  },
	_doFilter: function(){
      var query = ReactDOM.findDOMNode(this.refs.filterInput).childNodes[0].value;
      var selected = ReactDOM.findDOMNode(this.refs.filterSelect).childNodes[0].value;
      this.props.callback(query, selected);
  },

  render: function(){
      var options = this.props.dropdown.map(function(value, index){
      	return <option key={index} value={value}>{value}</option>
      });
      return (
      	<Row>
      		<Col xs={8}>
	      		<Input type="text" ref='filterInput' placeholder="Filter" value={this.props.query} onChange={this._doFilter}/>
	      	</Col>
	      	<Col xs={4}>
	      		<Input type="select" ref='filterSelect' placeholder="" onChange={this._doFilter}>
			      	{options}
			      </Input>
	      	</Col>
	      </Row>
      )
  }
});

module.exports = FilterSpec;