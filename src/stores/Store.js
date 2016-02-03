import AppConstants from '../../constants/AppConstants'
import AppDispatcher from '../../dispatcher/AppDispatcher'
import objectAssign from 'react/lib/Object.assign'
import _ from 'underscore'

let EventEmitter = require('events').EventEmitter;

let CHANGE_EVENT = 'changeEventListStore';

let _store = {
  datas: []
}

let setStore = function(datas){
  _store.datas = datas;
}

let Store = objectAssign({}, EventEmitter.prototype, {
  addChangeListener: function(cb){
    this.on(CHANGE_EVENT, cb);
  },
  removeChangeListener: function(cb){
    this.removeListener(CHANGE_EVENT, cb);
  },
  getDatas: function(){
    return _store.datas;
  },
});

AppDispatcher.register(function(payload){
  switch(payload.actionType){
    case AppConstants.GET_EVENT_LIST_SUCCESS:
      setStore(payload.datas);
      Store.emit(CHANGE_EVENT);
      break;
    default:
      return true;
  }
});

module.exports = Store;