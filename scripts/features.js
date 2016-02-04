"use strict";

// Luc

var promiseWait = new Promise(function(resolve, reject) { 
  setTimeout(()=>resolve(), 30000);
})

function handleInputChange(element) {
  STWcalled = setInterval(function(){ starWars(); }, 10);
  promiseWait.then(()=>console.log('ok'));
}


function launchRequest(element){
  searchPersonAndMovie(element.value)
    .then(results => {
      StoreManager.setMovies(results[0]);
      StoreManager.setActors(results[1]);
      clearInterval(STWcalled);
  });
}
var looping = "false";

function starWars(){
  console.log('called');
  for (var i = 0; i < objects.length; i++) {
    let objectPos = objects[i].position;
    let cameraPos = camera.position;

    if (objectBehindCamera(objectPos, cameraPos)) {
      objectPos.z = 0;
    } else {
      objectPos.z += 50;
    }
    render();
  }
}

function objectBehindCamera(object, camera){
  return object.z > camera.z
}


function moveCameraToObject(object) {

  var cameraOrientation = camera.position.clone();
  var targetOrientation = object.position.clone();

  targetOrientation.set(targetOrientation.x + 200, targetOrientation.y - 100, targetOrientation.z + 700);

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