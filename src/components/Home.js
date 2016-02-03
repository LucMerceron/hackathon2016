import React from 'react';

var Home = React.createClass({
  render: function(){
    return (
      <div id="bodyContent">
        {this.props.children}
      </div>
    )
  }
});

module.exports = Home;