import React from 'react'
import TooltipBootstrap from 'react-bootstrap/lib/Tooltip'

var Tooltip = React.createClass({
  render: function(){
    let tooltipStyle = {position: 'absolute', top: this.props.top, left: this.props.left};
    return (
      this.props.show ?
      <TooltipBootstrap ref='tooltip' placement={this.props.placement} className={this.props.className} style={tooltipStyle}>
        {this.props.children}
      </TooltipBootstrap>
      :
      null
    )
  }
});

module.exports = Tooltip;