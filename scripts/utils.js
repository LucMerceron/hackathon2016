"use strict";

// Return a promise. When the promise is resolved, all the images are preloaded.
function preloadImages(images) {
	var promises = [];
	for (var i = 0; i < images.length; i++) {
	  let img = new Image();
	  promises.push(new Promise((resolve, reject) => {
	    img.onload = () => resolve();
	    img.src = images[i];
	  }));
	}
	return Promise.all(promises);
}

function newFakeTile() {
  var fakeRoot = document.createElement( 'div' );
  fakeRoot.className = 'fakeRoot';
  var element = document.createElement( 'div' );
  element.className = 'fakeElement';
  fakeRoot.appendChild(element);
  return fakeRoot;
}