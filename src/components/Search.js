import React from 'react';

import { Input, Button} from 'react-bootstrap'
import { Link, History } from 'react-router'

var Search = React.createClass({

  mixins: [ History ],

  handleSendRequest: function(text){
    // Go to results
    this.history.pushState(null, '/results?search=' + text);
  },
  handleInputChange: function(event){
    console.log(event.target.value);
  },

  render: function(){ 
    return (
      <div className="col-md-6 col-md-offset-3 margin-top-6">
        <Input onChange={this.handleInputChange} type="text" placeholder="Search for..." />
      </div>
    )
  }
});

module.exports = Search;