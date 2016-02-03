import AppConstants from '../constants/AppConstants'
import AppDispatcher from '../dispatcher/AppDispatcher'
import objectAssign from 'react/lib/Object.assign'

let EventEmitter = require('events').EventEmitter;

let CHANGE_EVENT = 'changeActorStore';

let _store = {
  movieList: []
}

let setMovieList = function(movieList){
  _store.movieList = movieList;
}

let MovieStore = objectAssign({}, EventEmitter.prototype, {
  addChangeListener: function(cb){
    this.on(CHANGE_EVENT, cb);
  },
  removeChangeListener: function(cb){
    this.removeListener(CHANGE_EVENT, cb);
  },
  getMovieList: function(){
    return _store.movieList;
  },
});

AppDispatcher.register(function(payload){
  switch(payload.actionType){
    case AppConstants.GET_MOVIE_LIST_SUCCESS:
      setMovieList(payload.movieList);
      MovieStore.emit(CHANGE_EVENT);
      break;
    default:
      return true;
  }
});

module.exports = MovieStore;