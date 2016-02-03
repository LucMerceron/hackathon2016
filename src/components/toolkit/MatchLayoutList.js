import React from 'react';
import Button from 'react-bootstrap/lib/Button'
import AppConstants from '../../constants/AppConstants'
import moment from 'moment';
import MatchLayout from './MatchLayout'
import {History} from 'react-router'
import _ from 'underscore'

var MatchLayoutList = React.createClass({
  mixins: [ History ],

  handleMatchClick: function(matchId){
    this.history.pushState(null, '/' + this.props.eventId + '/matches/' + matchId);
  },

  render: function(){
    let content = this.props.content;
    let MatchList = [];

    if (this.props.sorted) content = _.sortBy(content, this.props.sorted);
    
    content.forEach(function(value,index){
      MatchList.push(<div className="public-event-matchLayout" onClick={()=>this.handleMatchClick(value.id)} key={index}><MatchLayout eventId={this.props.eventId} content={value}/></div>);
    }.bind(this));

    return <div key={Math.random()}>{MatchList}</div>;
  }
});

module.exports = MatchLayoutList;
