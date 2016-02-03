import React from 'react';

import { Link, History } from 'react-router'

var App = React.createClass({

  mixins: [ History ],

  componentWillMount: function(){
    // Redirection : Activate first day
    // if (this.props.location.pathname === '/')
    //   this.history.pushState(null, '/Master-U-BNP-Paribas-2015')
  },
  render: function(){
    return (
      <div>
      	{this.props.children}  
      </div>
    )
  }
});

module.exports = App;
