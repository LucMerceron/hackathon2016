"use strict";

let _store = {
  actors: [],
  movies: []
}

var StoreManager = {
  getMovies: function(){
    return _store.movies;
  },

  getActors: function(){
    return _store.actors;
  },

  setMovies: function(movies){
    _store.movies = movies;
  },

  setActors: function(actors){
    _store.actors = actors;
  },

  getAll: function(){
    return _store.actors.concat(_store.movies);
  }
}