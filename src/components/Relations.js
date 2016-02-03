import React from 'react';

import { Input, Button} from 'react-bootstrap'
import { Link, History } from 'react-router'

var Relation = React.createClass({

  mixins: [ History ],

  handleSendRequest: function(text){
    // Go to results
    this.history.pushState(null, '/results?search=' + text);
  },

  render: function(){ 
    return (
      <div id="bodyContent">
        <Input type="text"/>
        <Button onClick={this.handleSendRequest}> _&#10095;</Button>
      </div>
    )
  }
});

module.exports = Relation;