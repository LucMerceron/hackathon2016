"use strict";

// Luc

function handleInputChange(element) {
  searchPersonAndMovie(element.value)
    .then(results => {
      StoreManager.setMovies(results[0]);
      StoreManager.setActors(results[1]);
  });
}

function moveCameraToObject(object) {
  var controlRotation = controls.object.up.clone();
  var targetRotation = {x: 0, y: 1, z: 0}

  var cameraOrientation = camera.position.clone();
  var targetOrientation = object.position.clone();

  if (object.position.z === 1000) {
    targetOrientation.x *= 1.6;
    targetOrientation.y *= 1.6;
  }
  
  targetOrientation.set(targetOrientation.x, targetOrientation.y, targetOrientation.z + 800);

  TWEEN.removeAll();
  new TWEEN.Tween( cameraOrientation )
    .to( targetOrientation, 2000 )
    .easing( TWEEN.Easing.Exponential.InOut )
    .onUpdate( () => {
        camera.position.x = cameraOrientation.x;
        camera.position.y = cameraOrientation.y;
        camera.position.z = cameraOrientation.z;
      }
    )
    .start();

  new TWEEN.Tween( controlRotation )
    .to( targetRotation, 2000 )
    .easing( TWEEN.Easing.Exponential.InOut )
    .onUpdate( () => {
      controls.object.up.set(controlRotation.x, controlRotation.y, controlRotation.z)
      }
    )
    .start();

}

