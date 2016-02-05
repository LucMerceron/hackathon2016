"use strict";

var ENDPOINT_SEARCH_MOVIE = "https://api.themoviedb.org/3/search/movie?api_key=b5ba231e834cb7e22e4a9342cb76f970&query=";
var ENDPOINT_SEARCH_PERSON = "https://api.themoviedb.org/3/search/person?api_key=b5ba231e834cb7e22e4a9342cb76f970&query=";
var ENDPOINT_DETAILS_MOVIE = " https://api.themoviedb.org/3/movie/%s?api_key=b5ba231e834cb7e22e4a9342cb76f970"
var ENDPOINT_DETAILS_PERSON = " https://api.themoviedb.org/3/person/%s?api_key=b5ba231e834cb7e22e4a9342cb76f970"
var ENDPOINT_MOVIE_CAST = " https://api.themoviedb.org/3/movie/%s/credits?api_key=b5ba231e834cb7e22e4a9342cb76f970"
var ENDPOINT_PERSON_MOVIES = " https://api.themoviedb.org/3/person/%s/movie_credits?api_key=b5ba231e834cb7e22e4a9342cb76f970"
var ENDPOINT_POSTER = "https://image.tmdb.org/t/p/w300";

// Return an array of movie
function searchMovie(name) {
  return new Promise((resolve, reject) => {
	   	var req = superagent.get(ENDPOINT_SEARCH_MOVIE + name);
      req._callback = function(){}

      req.set('Accept', 'application/json')
        .end(function (err, res) {
        	if(err) {
            resolve([]);
        	} else {
        		resolve(res.body.results);
        	}
        });
	});
}

// Return an array of persons
function searchPerson(name) {
  return new Promise((resolve, reject) => {
	   	var req = superagent.get(ENDPOINT_SEARCH_PERSON + name);
      req._callback = function(){}

      req.set('Accept', 'application/json')
        .end(function (err, res) {
        	if(err) {
            resolve([]);
        	} else {
        		resolve(res.body.results);
        	}
        });
	});
}

// Return an array of size 2
// [0] => array of movies
// [1] => array of persons
function searchPersonAndMovie(name) {
	console.log('search', name);
	return Promise.all([
		searchMovie(name),
		searchPerson(name)
		]);
}

// Return an object with the details of a movie
function getMovieDetails(movieId) {
  return new Promise((resolve, reject) => {
	   	var req = superagent.get(parse(ENDPOINT_DETAILS_MOVIE, movieId));
      req._callback = function(){}

      req.set('Accept', 'application/json')
        .end(function (err, res) {
        	if(err) {
        		reject(err);
        	} else {
        		resolve(res.body);
        	}
        });
	});
}

// Return an object with the details of a person
function getPersonDetails(personId) {
  return new Promise((resolve, reject) => {
	   	var req = superagent.get(parse(ENDPOINT_DETAILS_PERSON, personId));
      req._callback = function(){}

      req.set('Accept', 'application/json')
        .end(function (err, res) {
        	if(err) {
        		reject(err);
        	} else {
        		resolve(res.body);
        	}
        });
	});
}

function getMovieCast(movieId) {
  return new Promise((resolve, reject) => {
   	var req = superagent.get(parse(ENDPOINT_MOVIE_CAST, movieId));
    req._callback = function(){}

    req.set('Accept', 'application/json')
      .end(function (err, res) {
      	if(err) {
          resolve([]);
      	} else {
      		resolve(res.body.cast.slice(0,20));
      	}
      });
	});
}

// Return an array of movies
function getPersonMovies(personId) {
  return new Promise((resolve, reject) => {
 	var req = superagent.get(parse(ENDPOINT_PERSON_MOVIES, personId));
  req._callback = function(){}

  req.set('Accept', 'application/json')
    .end(function (err, res) {
    	if(err) {
    		resolve([]);
    	} else {
    		resolve(res.body.cast);
    	}
    });
	});
}

function parse(str) {
  var args = [].slice.call(arguments, 1), i = 0;

  return str.replace(/%s/g, function() {
      return args[i++];
  });
}