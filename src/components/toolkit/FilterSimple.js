import React from 'react';
import ReactDOM from 'react-dom';
import Input from 'react-bootstrap/lib/Input'

var FilterSimple = React.createClass({
	componentDidMount: function(){
  	ReactDOM.findDOMNode(this.refs.filterInput).childNodes[0].value = ''
  },
	_doFilter: function(){
      var query = ReactDOM.findDOMNode(this.refs.filterInput).childNodes[0].value;
      this.props.callback(query);
  },

  render: function(){
      return <Input type="text" ref='filterInput' placeholder="Filter" value={this.props.query} onChange={this._doFilter}/>
  }
});

module.exports = FilterSimple;