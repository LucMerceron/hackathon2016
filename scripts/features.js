"use strict";

// Luc

function handleInputChange(element) {
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
      // clearInterval(STWcalled)
    })
}

function starWars(){
  for (var i = 0; i < objects.length; i++) {
    let objectPos = objects[i].position;
    let cameraPos = camera.position;

    if (objectBehindCamera(objectPos, cameraPos)) {
      popTile(objects[i]);
    } else {
      objectPos.z += 50;
    }
    render();
  }
}

function popTile(object) {
	let tile = _getNextTile();

	let randomX = -2000 + Math.random() * 4000;
	let randomY = -600 + Math.random() * 1400;
	let randomZ = Math.random() * 50;

	scene.remove(object);

	const index = objects.indexOf(object);
	if (index > -1) {
    objects.splice(index, 1);
	}

  var object = new THREE.CSS3DObject(tile);
  object.position.x = randomX;
  object.position.y = randomY;
  object.position.z = randomZ;

  // Listen on onclick event
  (function (j){
    object.element.onclick = evt => { moveCameraToObject(j); }
  })(object)
  
  scene.add(object);
  objects.push(object);
}

function _getNextTile() {
	if (Math.random() > 0.5 && StoreManager.getMovies().length > 0 && false) { // TODO remove false!!
		// Pop movie
	} else if (StoreManager.getActors().length > 0) {
		// Pop actor
		let actor = StoreManager.getActors().shift();
		let actorElt = new PersonHTMLObject(actor.name, actor.profile_path ? ENDPOINT_POSTER + actor.profile_path : null);
		return actorElt.getHTMLElement(); 
	} else {
		// Pop fake
		let fakeTile = document.createElement( 'div' );
    fakeTile.className = 'fakeElement';
    return fakeTile;
	}
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

  var cameraOrientation = camera.position.clone();
  var targetOrientation = object.position.clone();

  targetOrientation.set(targetOrientation.x + 200, targetOrientation.y, targetOrientation.z + 1000);

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


document.addEventListener( 'wheel', mousewheel, false );
document.addEventListener( 'mousedown', mousedown, false ); 
document.addEventListener( 'mousemove', mousemove, false );
document.addEventListener( 'mouseup', mouseup, false );

// listeners

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

  if(e.deltaY > 0) {
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
  }else {
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