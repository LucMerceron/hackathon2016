"use strict";

// Luc

function handleInputChange(element) {
	searchPersonAndMovie(element.value)
		.then(results => {
			StoreManager.setMovies(results[0]);
			StoreManager.setActors(results[1]);
		});
}
