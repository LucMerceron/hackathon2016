import React from 'react'
import Form from './Form'
import Timeline from '../../actions/Timeline'

var NewMessage = React.createClass({
  handleSendMessage: function(message){
    console.log(message.media);

    Timeline.putVideo('https://spectatortemp.s3.amazonaws.com/test?AWSAccessKeyId=AKIAJVNQJQSLCATFV5JQ&Content-Type=binary%2Foctet-stream&Expires=1454509315&Signature=4USTCWzWGb9wt0UrNvrIErsuUgQ%3D', message.media);
  },
  render: function(){
      return (
        <Form 
          tags={[
            {id: 'message', tag: 'Input', type: 'textarea', label: 'Message'},
            {id: 'media', tag: 'Input', type: 'file', label: 'Media'},
            {tag: 'ButtonInput', className: 'text-center blue-button', value: 'Send', func: this.handleSendMessage}
          ]}
        />
      )
  }
});

module.exports = NewMessage;