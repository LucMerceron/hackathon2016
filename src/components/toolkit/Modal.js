import React from 'react';
import Modal from 'react-bootstrap/lib/Modal'
import Button from 'react-bootstrap/lib/Button'

var Alert = React.createClass({

  getInitialState: function(){
    return {showModal: this.props.showModal}
  },
  componentWillReceiveProps: function(nextProps){
    this.setState({showModal: nextProps.showModal});
  },

  render: function(){
    return (
      <Modal show={this.state.showModal} onHide={() => this.setState({ showModal: false })}>
        <Modal.Header closeButton >
          <Modal.Title>{this.props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h2>Are you sure ?</h2>
          {this.props.body}
        </Modal.Body>
        <Modal.Footer>
          <Button className={this.props.validate.className} onClick={this.props.validate.onClick}>{this.props.validate.value}</Button>
          <Button className="white-button-modal" onClick={() => this.setState({ showModal: false })}>Cancel</Button>
        </Modal.Footer>
      </Modal>
     )
  }
});

module.exports = Alert;
