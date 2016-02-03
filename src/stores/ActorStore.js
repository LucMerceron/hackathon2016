import AppConstants from '../constants/AppConstants'
import AppDispatcher from '../dispatcher/AppDispatcher'
import objectAssign from 'react/lib/Object.assign'

let EventEmitter = require('events').EventEmitter;

let CHANGE_EVENT = 'changeActorStore';

let _store = {
  actorList: []
}

let setActorList = function(actorList){
  _store.actorList = actorList;
}

let ActorStore = objectAssign({}, EventEmitter.prototype, {
  addChangeListener: function(cb){
    this.on(CHANGE_EVENT, cb);
  },
  removeChangeListener: function(cb){
    this.removeListener(CHANGE_EVENT, cb);
  },
  getActorList: function(){
    return _store.actorList;
  },
});

AppDispatcher.register(function(payload){
  switch(payload.actionType){
    case AppConstants.GET_ACTOR_LIST_SUCCESS:
      setActorList(payload.actorList);
      ActorStore.emit(CHANGE_EVENT);
      break;
    default:
      return true;
  }
});

module.exports = ActorStore;