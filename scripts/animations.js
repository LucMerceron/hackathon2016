"use strict";

// Jérémie

// Tooltip on hover

// Button of tooltip handling



var PersonHTMLObject = function ( name, urlPicture ){

  var moviePersonCard = document.createElement( 'div' );
  moviePersonCard.className = 'movie_person_card';

  var moviePersonCardPicture = document.createElement( 'div' );
  moviePersonCardPicture.className = 'movie_person_card_picture';
  if(urlPicture){
  	moviePersonCardPicture.style.backgroundImage = 'url(\'' + urlPicture + '\')';	
  }
  moviePersonCard.appendChild( moviePersonCardPicture );

  var moviePersonCardBody = document.createElement( 'div' );
  moviePersonCardBody.className = 'movie_person_card_body';
  moviePersonCard.appendChild( moviePersonCardBody );

  var moviePersonContainer = document.createElement( 'div' );
  moviePersonContainer.className = 'container';
  moviePersonCardBody.appendChild( moviePersonContainer );

  var moviePersonPreLoader = document.createElement( 'div' );
  moviePersonPreLoader.className = 'preloader';
  moviePersonContainer.appendChild( moviePersonPreLoader );

  var moviePersonNotShow = document.createElement( 'div' );
  moviePersonNotShow.className = 'notShow';
  moviePersonCardBody.appendChild( moviePersonNotShow );

  var moviePersonPannel = document.createElement( 'div' );
  moviePersonPannel.className = 'movie_person_pannel';
  moviePersonNotShow.appendChild( moviePersonPannel );

  var moviePersonName = document.createElement( 'div' );
  moviePersonName.className = 'movie_person_name';
  moviePersonName.innerHTML = name;
  moviePersonPannel.appendChild( moviePersonName );

  var moviePersonRatingPannel = document.createElement( 'div' );
  moviePersonRatingPannel.className = 'movie_person_ratingPannel';
  moviePersonPannel.appendChild( moviePersonRatingPannel );

  var moviePersonRatingTitle = document.createElement( 'div' );
  moviePersonRatingTitle.className = 'movie_person_rating_title';
  moviePersonRatingTitle.innerHTML = 'popularity';
  moviePersonRatingPannel.appendChild( moviePersonRatingTitle );

  var moviePersonRatingNumber = document.createElement( 'div' );
  moviePersonRatingNumber.className = 'movie_person_rating_number';
  moviePersonRatingPannel.appendChild( moviePersonRatingNumber );

  var moviePersonBirthday = document.createElement( 'div' );
  moviePersonBirthday.className = 'movie_person_birthday';
  moviePersonNotShow.appendChild( moviePersonBirthday );

  var moviePersonBiography = document.createElement( 'div' );
  moviePersonBiography.className = 'movie_person_biography';
  moviePersonNotShow.appendChild( moviePersonBiography );

  var moviePersonKnown = document.createElement( 'div' );
  moviePersonKnown.className = 'movie_person_known';
  moviePersonNotShow.appendChild( moviePersonKnown );

  var moviePersonFilmography = document.createElement( 'div' );
  moviePersonFilmography.className = 'movie_person_filmography';
  moviePersonNotShow.appendChild( moviePersonFilmography );

  var moviePersonFilmographyBtn = document.createElement( 'div' );
  moviePersonFilmographyBtn.className = 'movie_person_filmography_btn';
  moviePersonFilmographyBtn.innerHTML = '>FILMOGRAPHY<';
  moviePersonFilmography.appendChild( moviePersonFilmographyBtn );

  this.getHTMLElement = function(){
    return moviePersonCard;
  };

  this.setPopularity = function( popularity ){
    moviePersonRatingNumber.innerHTML = popularity;
  };

  this.setBirthday = function( birthdayDate, placeBirhtday ){
    moviePersonBirthday.innerHTML = birthday + '-' + placebirth;
  };

  this.setBiograĥy = function( biography ){
    moviePersonBiography.innerHTML = biography;
  }

  this.setKnownFor = function( knownFor ){
    moviePersonKnown.innerHTML = knwownFor;
  };

  this.closeLoader = function(){
    moviePersonContainer.style.display = "none";
    moviePersonNotShow.className = '';
    moviePersonNotShow.style.display = "block";
  };

}
