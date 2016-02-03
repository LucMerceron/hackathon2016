'use strict';

import Flux from 'flux';
import assign from 'object-assign';

var Dispatcher = assign(new Flux.Dispatcher(), {

  handleViewAction: function (action) {
  	console.log('Dispatching :', action.actionType);
    this.dispatch(action);
  },
  handleServerAction: function (action) {
    this.dispatch(action);
  }

});

module.exports = Dispatcher;