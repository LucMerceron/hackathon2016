import React from 'react';

var Timer = {
  callbackAfterDelay: function(delay, callback){
    this._timer = setTimeout(function(){
      callback();
    }.bind(this), delay);
  }
};

module.exports = Timer;