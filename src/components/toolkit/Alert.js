import React from 'react';
import AlertStore from '../../stores/AlertStore';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';

var Alert = React.createClass({

  getInitialState: function(){
    return {
      message: null,
    }
  },

  componentDidMount: function(){
    document.addEventListener('scroll', this.handleScroll, false);
    window.addEventListener('resize', this.handleScroll, false);
    AlertStore.addChangeListener(this.handleChange);
  },
  componentWillUnmount: function(){
    document.removeEventListener('scroll', this.handleScroll, false);
    window.removeEventListener('resize', this.handleScroll, false);
    AlertStore.removeChangeListener(this.handleChange);
  },

  handleChange: function(){
    let message = AlertStore.getMessage();
    this.setState({
      message: 
        <div key="1" id="alert" className="text-center">
          <img className="error-close" alt="close" src="/images/close.png" onClick={this.handleClose}/>
          <table>
            <tbody>
              <tr>
                <td>
                  <img className="error-image" alt="error" src="/images/error.png"/>
                </td>
                <td>
                  <p className="alert-text">
                    {message}
                  </p>
                </td>
              </tr>
            </tbody>
          </table>          
        </div>});
  },

  handleClose: function(){
    this.setState({message: null});
  },
  handleScroll: function(){
    let top = (window.scrollY || window.pageYOffset || document.body.scrollTop) - document.getElementById('refAlert').offsetTop
    let left = (window.scrollX || window.pageXOffset || document.body.scrollLeft);
    let size = window.innerWidth;
    let valueToLeft = size >= 800 ? size * 0.291667 + 15 : 800 * 0.291667 + 15;
    if (top > 0) {
      document.getElementById('alertWrap').className = 'float-top'
      document.getElementById('alertWrap').style.left = (valueToLeft - left)+'px';
      document.getElementById('takePlace').className = 'show'
    } else {
      document.getElementById('alertWrap').className = 'nofloat-top'
      document.getElementById('alertWrap').style.left = '0px';
      document.getElementById('takePlace').className = 'hide'
    }
  },
  
  render: function(){
    return (
      <div>
      <div id="takePlace" className="hide">{this.state.message}</div>
      <div id="alertWrap">
        <ReactCSSTransitionGroup transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
          {this.state.message}
        </ReactCSSTransitionGroup>
      </div>
      </div>
     )
  }
});

module.exports = Alert;
