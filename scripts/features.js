"use strict";

// Luc

var goodTile = false;
var flaggounet = false;
var flaggounetNoResult = false;
var flagOverview = false;

function handleInputChange(element) {
  goodTile = false;
  flaggounet = false;
  flaggounetNoResult = false;

  var cameraPosition = camera.position.clone();

  TWEEN.removeAll();
  new TWEEN.Tween( cameraPosition )
    .to( {x: 0, y: 0, z: INITIAL_CAMERA_Z}, 5000 )
    .easing( TWEEN.Easing.Exponential.Out )
    .onUpdate(() =>{
      camera.position.x = cameraPosition.x;
      camera.position.y = cameraPosition.y;
      camera.position.z = cameraPosition.z;
      render();
    })
    .start();

  var pWait = new Promise(function(resolve, reject) {
    setTimeout(resolve, 4000);
  });
  STWcalled = setInterval(function(){ starWars(); }, 20);

  Promise.all([
    searchPersonAndMovie(element.value)
        .then(array => {
            let urls = [];
            let movies = array[0];
            for(let i = 0; i < movies.length; i++) {
                if(movies[i].poster_path) {
                    urls.push(ENDPOINT_POSTER + movies[i].poster_path);
                }
            }
            let actors = array[1];
            for(let i = 0; i < actors.length; i++) {
                if(actors[i].profile_path) {
                    urls.push(ENDPOINT_POSTER + actors[i].profile_path);
                }
            }
            return preloadImages(urls)
                .then(() => {return Promise.resolve(array)});
        }),
    pWait
    ]).then((results) => {
      StoreManager.setMovies(results[0][0]);
      StoreManager.setActors(results[0][1]);
      flaggounet = true;
      if(StoreManager.getMovies().length == 0 && StoreManager.getActors().length == 0)
      	flaggounetNoResult = true;
    })
}

function searchFilmography(actorId) {
  goodTile = false;
  flaggounet = false;
  flaggounetNoResult = false;

  var cameraPosition = camera.position.clone();

  TWEEN.removeAll();
  new TWEEN.Tween( cameraPosition )
    .to( {x: 0, y: 0, z: INITIAL_CAMERA_Z}, 5000 )
    .easing( TWEEN.Easing.Exponential.Out )
    .onUpdate(() =>{      
      camera.position.x = cameraPosition.x;
      camera.position.y = cameraPosition.y;
      camera.position.z = cameraPosition.z;
      render();
    })
    .start();

  var pWait = new Promise(function(resolve, reject) { 
    setTimeout(resolve, 4000);
  });
  STWcalled = setInterval(function(){ starWars(); }, 20);

  Promise.all([
    getPersonMovies(actorId)
        .then(movies => {
            let urls = [];
            for(let i = 0; i < movies.length; i++) {
                if(movies[i].poster_path) {
                    urls.push(ENDPOINT_POSTER + movies[i].poster_path);
                }
            }
            return preloadImages(urls)
                .then(() => {return Promise.resolve(movies)});
        }),
    pWait
    ]).then((results) => {
      StoreManager.setMovies(results[0]);
      StoreManager.setActors([]);
      flaggounet = true;
    })
}

function searchCast(movieId) {
  goodTile = false;
  flaggounet = false;
  flaggounetNoResult = false;

  var cameraPosition = camera.position.clone();

  TWEEN.removeAll();
  new TWEEN.Tween( cameraPosition )
    .to( {x: 0, y: 0, z: INITIAL_CAMERA_Z}, 5000 )
    .easing( TWEEN.Easing.Exponential.Out )
    .onUpdate(() =>{      
      camera.position.x = cameraPosition.x;
      camera.position.y = cameraPosition.y;
      camera.position.z = cameraPosition.z;
      render();
    })
    .start();

  var pWait = new Promise(function(resolve, reject) { 
    setTimeout(resolve, 4000);
  });
  STWcalled = setInterval(function(){ starWars(); }, 20);

  Promise.all([
    getMovieCast(movieId)
        .then(actors => {
            let urls = [];
            for(let i = 0; i < actors.length; i++) {
                if(actors[i].poster_path) {
                    urls.push(ENDPOINT_POSTER + actors[i].profile_path);
                }
            }
            return preloadImages(urls)
                .then(() => {return Promise.resolve(actors)});
        }),
    pWait
    ]).then((results) => {
      StoreManager.setMovies([]);
      StoreManager.setActors(results[0]);
      flaggounet = true;
    })
}

function starWars(){
  let minimumZ = 10000;
  for (var i = 0; i < objects.length; i++) {
    let object = objects[i];
    let objectPos = object.position;
    let cameraPos = camera.position;

    if (objectBehindCamera(objectPos, cameraPos)) {
      removeTile(object);
    } else {
      objectPos.z += 150;
    }

    if(objectPos.z < minimumZ)
      minimumZ = objectPos.z;


    if ((flaggounet && tileInFront(object, cameraPos)) || flaggounetNoResult)
      goodTile = true;

    render();
  }

  if(minimumZ > 2000) {
    popLayer(minimumZ - 2000);
  }

  if (goodTile) {
    let tilesToRemove = []
    // If good tile then delete what is between them and the camera
    for (var i = 0; i < objects.length; i++) {
      let object = objects[i];
      let cameraPos = camera.position;
      if ((object.element.className === 'fakeRoot' && (cameraPos.z - object.position.z) < 2000)) {
        tilesToRemove.push(object);
      }
     }

    for (var i = 0; i < tilesToRemove.length; i++) {
      removeTile(tilesToRemove[i]);
    }
    clearInterval(STWcalled);
    smoothStop();
    attachOverviewListener();
  }
}

function smoothStop(){
  var cameraPosition = camera.position.clone();
  var targetPosition = {x: cameraPosition.x, y: cameraPosition.y, z: cameraPosition.z - 1000};

  TWEEN.removeAll();
  new TWEEN.Tween( cameraPosition )
    .to( targetPosition, 3000 )
    .easing( TWEEN.Easing.Exponential.Out )
    .onUpdate( () => {
        camera.position.x = cameraPosition.x;
        camera.position.y = cameraPosition.y;
        camera.position.z = cameraPosition.z;
        render();
      }
    )
    .start();
}

function tileInFront(tile, cameraPos){
  return (!(tile.element.className === 'fakeElement' || tile.element.className === 'fakeRoot') && (cameraPos.z - tile.position.z) < 3000)
}

function removeTile(object) {
  // Delete old object
  const index = objects.indexOf(object);
  if (index > -1) {
    objects.splice(index, 1);
  }
  scene.remove(object);
}

function popLayer(offset) {
  for ( var i = 0; i < 12; i ++ ) {
    let tile = _getNextTile();

    var object = new THREE.CSS3DObject(tile);
    var col = 4;
    var row = 3;
    var horizontalMargin = 800;
    var verticalMargin = 400;

    object.position.x = ( ( i % col ) * horizontalMargin ) - ((horizontalMargin * col) / 2 - horizontalMargin /2) + 260;
    object.position.y = ( - ( Math.floor( i / col ) % row ) * verticalMargin ) + (Math.floor(row / 2) * verticalMargin) + 200;
    object.position.z = 1000 + offset;


    if ( !(tile.className === 'fakeElement' || tile.className === 'fakeRoot') ){
      // setOnClickListener
      (function (j){
        j.element.onclick = evt => { moveCameraToObject(j); };
      })(object)
    }

    // Add new object
    scene.add(object);
    objects.push(object);
  }
}

function _getNextTile() {
  let rand = Math.random();
  let nbMovies = StoreManager.getMovies().length;
  let nbActors = StoreManager.getActors().length;
	if ((nbMovies > 0 && nbActors > 0 && rand > 0.5)
      || (nbMovies > 0 && nbActors == 0)) {
		// Pop movie
    console.log('pop movie');
    let movie = StoreManager.getMovies().shift();
    let movieElt = new MovieHTMLObject(movie.original_title, movie.poster_path ? ENDPOINT_POSTER + movie.poster_path : null);
    movieElt.setId( movie.id );
    setListener( movieElt, () => searchCast(movieElt.getId()));
    return movieElt.getHTMLElement();
	} else if (StoreManager.getActors().length > 0) {
		// Pop actor
    console.log('pop actor');
		let actor = StoreManager.getActors().shift();
		let actorElt = new PersonHTMLObject(actor.name, actor.profile_path ? ENDPOINT_POSTER + actor.profile_path : null);
    actorElt.setId( actor.id );
    setListener( actorElt, () => searchFilmography(actorElt.getId()));
    return actorElt.getHTMLElement();
	} else {
		// Pop fake
		return newFakeTile();
	}
}

function setListener( element, evtOnClick ){
  (function (el){
    var object = el.getHTMLElement();
    object.onmouseover = evt => {

      if ( el.getId() > -1 ){

        if ( el.isMovie() == true ){
          getMovieDetails( el.getId() ).then(
            details => {
              el.setPopularity( Math.round(details.popularity) );
              el.setDate( details.release_date );

              var genre = new Array();
              for ( var i = 0; i < details.genres.length; i++ ){
                genre.push( details.genres[i].name );
              }
              el.setGenre( genre );
              el.setOverview( details.overview );
              el.closeLoader();
            }
          );
        }else {
          getPersonDetails( el.getId() ).then(
            details => {
              el.setPopularity( Math.round(details.popularity) );
              el.setBirthday( details.birthday, details.place_of_birth );
              el.setBiography( details.biography );
              el.setKnownFor( details.also_known_as );
              el.closeLoader();
            }
          );
        }
      }
      object.onmouseover = null;
    };

    el.setOnClickListener(
      evtOnClick
    );

  })(element);
}



function removeEntity(object) {
  var selectedObject = scene.getObjectByName(object.name);
  scene.remove(selectedObject);
  animate();
}

function objectBehindCamera(object, camera){
  return object.z > camera.z
}


function moveCameraToObject(object) {

  if (!flagOverview){
    var cameraOrientation = camera.position.clone();
    var targetOrientation = object.position.clone();

    targetOrientation.set(targetOrientation.x + 120, targetOrientation.y - 170, targetOrientation.z + 900);

    TWEEN.removeAll();
    new TWEEN.Tween( cameraOrientation )
      .to( targetOrientation, 2000 )
      .easing( TWEEN.Easing.Exponential.InOut )
      .onUpdate( () => {
          camera.position.x = cameraOrientation.x;
          camera.position.y = cameraOrientation.y;
          camera.position.z = cameraOrientation.z;
          render();
        }
      )
      .start();

  }

 
}


// listeners
document.addEventListener( 'wheel', mousewheel, false );
document.addEventListener( 'mousedown', mousedown, false );
document.addEventListener( 'mousemove', mousemove, false );
document.addEventListener( 'mouseup', mouseup, false );

function attachOverviewListener() {
  var overviewMovie = document.getElementsByClassName('movie_show_card_body');
  for (var i = 0; i < overviewMovie.length; i++) {
    overviewMovie[i].onmouseenter = () => flagOverview = true;
    overviewMovie[i].onmouseleave = () => flagOverview = false;
  }
  var overviewPerson = document.getElementsByClassName('movie_person_card_body');
  for (var i = 0; i < overviewPerson.length; i++) {
    overviewPerson[i].onmouseenter = () => flagOverview = true;
    overviewPerson[i].onmouseleave = () => flagOverview = false;
  }
}

var readyStateCheckInterval = setInterval(function() {
    if (document.readyState === "complete") {
        clearInterval(readyStateCheckInterval);
        attachOverviewListener();
    }
}, 100);


var posInit;
var camInit;
var flatInit;
var STWcalled;

function mousedown( event ) {
  flatInit = "pressed";
  posInit = {x: event.pageX, y: event.pageY};
  camInit = camera.position;
}

function mousemove ( event ) {
  if (flatInit === "pressed") {
    document.body.style.cursor = 'all-scroll';
    var movingX = event.pageX - posInit.x;
    var movingY = event.pageY - posInit.y;

    camera.position.x = camInit.x - (movingX);
    camera.position.y = camInit.y + (movingY);

    camInit = camera.position;
    posInit = {x: event.pageX, y: event.pageY};
    render();
  }
}

function mouseup ( event ) {
  flatInit = "unpressed";
    document.body.style.cursor = 'default';
}

function mousewheel( e ) {
  
  var cameraPosition = camera.position.clone();
  var cameraTarget = camera.position.clone();

  if (!flagOverview){
    if(e.deltaY > 0 && cameraPosition.z <= INITIAL_CAMERA_Z) {
      cameraTarget.z += 500;
      new TWEEN.Tween( cameraPosition )
      .to( cameraTarget, 200 )
      .easing( TWEEN.Easing.Linear.None )
      .onUpdate( () => {
          camera.position.z = cameraPosition.z;
          render();
        }
      )
      .start();
    } else if (e.deltaY < 0) {
     cameraTarget.z -= 500;
      new TWEEN.Tween( cameraPosition )
      .to( cameraTarget, 200 )
      .easing( TWEEN.Easing.Linear.None )
      .onUpdate( () => {
          camera.position.z = cameraPosition.z;
          render();
        }
      )
      .start();
    }
  }
}
