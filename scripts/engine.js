"use strict";

var camera, scene, renderer;
var controls;

var objects = [];
var targets = { grid: [] };

preloading();

function preloading() {
  let images = [];
  for ( var i = 1; i < launchItems.length; i += 2 ) {
    images.push(launchItems[i]);
  }
  preloadImages(images)
    .then(() => {
      init();
      animate();
    });
}

function init() {

  camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 10000 );
  camera.position.z = 7300;

  scene = new THREE.Scene();

  for ( var i = 0; i < launchItems.length; i += 2 ) {
    var element = new PersonHTMLObject('Bernard', ENDPOINT_POSTER + "/r7WLn4Kbnqb6oJ8TmSI0e4LkWTj.jpg").getHTMLElement(); 
    console.log(element);

    //var element = document.createElement( 'div' );
    //element.className = 'fakeElement';
    // element.style.backgroundColor = 'rgba(0,127,127,' + ( Math.random() * 0.5 + 0.25 ) + ')';

    // var poster = document.createElement('img');
    // poster.src = launchItems[i + 1];
    // poster.width = "120";
    // element.appendChild(poster);

    var object = new THREE.CSS3DObject( element );
    object.position.x = Math.random() * 4000 - 2000;
    object.position.y = Math.random() * 4000 - 2000;
    object.position.z = Math.random() * 4000 - 2000;

    // Listen on onclick event
    (function (j){
      object.element.onclick = evt => { moveCameraToObject(j); }
    })(object)
    
    scene.add( object );

    objects.push( object );

  }

  // grid

  for ( var i = 0; i < objects.length; i ++ ) {

    var object = new THREE.Object3D();

    var col = 10;
    var row = 5;
    var horizontalMargin = 800;
    var verticalMargin = 400;

    object.position.x = ( ( i % col ) * horizontalMargin ) - ((horizontalMargin * col) / 2 - horizontalMargin /2);
    object.position.y = ( - ( Math.floor( i / col ) % row ) * verticalMargin ) + (Math.floor(row / 2) * verticalMargin);
    object.position.z = ( Math.floor( i / (row * col) ) + 1 ) * 1000;

    targets.grid.push( object );

  }

  //

  renderer = new THREE.CSS3DRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.domElement.style.position = 'absolute';
  document.getElementById( 'container' ).appendChild( renderer.domElement );

  controls = new THREE.TrackballControls( camera, renderer.domElement );
  controls.rotateSpeed = 1.5;
  controls.zoomSpeed = 0.2;
  controls.addEventListener( 'change', render );

  transform( targets.grid, 2000 );

  window.addEventListener( 'resize', onWindowResize, false );

}

function transform( targets, duration ) {

  TWEEN.removeAll();

  for ( var i = 0; i < objects.length; i ++ ) {

    var object = objects[ i ];
    var target = targets[ i ];

    new TWEEN.Tween( object.position )
      .to( { x: target.position.x, y: target.position.y, z: target.position.z }, Math.random() * duration + duration )
      .easing( TWEEN.Easing.Exponential.InOut )
      .start();

    new TWEEN.Tween( object.rotation )
      .to( { x: target.rotation.x, y: target.rotation.y, z: target.rotation.z }, Math.random() * duration + duration )
      .easing( TWEEN.Easing.Exponential.InOut )
      .start();

  }

  new TWEEN.Tween( this )
    .to( {}, duration * 2 )
    .onUpdate( render )
    .start();

}

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

  render();

}

function animate() {

  requestAnimationFrame( animate );

  TWEEN.update();

  controls.update();

}

function render() {
  renderer.render( scene, camera );

}
