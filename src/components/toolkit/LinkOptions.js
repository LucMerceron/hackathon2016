import React from 'react'
import {Link} from 'react-router'
import _ from 'underscore'

var LinkOptions = React.createClass({
  render: function(){
  	let layout = this.props.links.map(function(value, index){
      // TODO : Might change to a more clean declarative way
      // 
      return value.toLowerCase() == 'general' ? <Link key={index} onlyActiveOnIndex={true} activeClassName="active" className="pretty-link" to={'/pro/' + this.props.eventId}>{value}</Link> : <Link key={index} activeClassName="active" className="pretty-link" to={`/pro/${this.props.eventId}/${value.toLowerCase()}`}>{value}</Link>
  	}.bind(this));
    return (
      <div>
        <div id="linkOptions">
        {layout}
        </div>
      </div>
    )
  }
});

module.exports = LinkOptions;
