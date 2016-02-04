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

var preload = [
  "https://image.tmdb.org/t/p/w500/fELdVq2KuqW8vWEeb1vi6IfDRSO.jpg", 
  "https://image.tmdb.org/t/p/w500/7ad4iku8cYBuB08g9yAU7tHJik5.jpg", 
  "https://image.tmdb.org/t/p/w500/eQs5hh9rxrk1m4xHsIz1w11Ngqb.jpg"
];
preloadImages(preload)
  .then(() => console.log('all ok'));