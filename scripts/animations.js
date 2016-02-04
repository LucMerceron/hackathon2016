"use strict";

// Jérémie

// Tooltip on hover

// Button of tooltip handling


function createPersonHTMLObject( name, birthday, placebirth, biography, knwownFor, urlPicture, popularity ){

  var moviePersonCard = document.createElement( 'div' );
  moviePersonCard.className = 'movie_person_card';

  var moviePersonCardPicture = document.createElement( 'div' );
  moviePersonCardPicture.className = 'movie_person_card_picture';
  moviePersonCardPicture.style.backgroundImage = 'urlPicture';

  var moviePersonCardBody = document.createElement( 'div' );
  moviePersonCardBody.className = 'movie_person_card_body';
  moviePersonCard.appendChild( moviePersonCardBody );

  var moviePersonPannel = document.createElement( 'div' );
  moviePersonPannel.className = 'movie_person_pannel';
  moviePersonCardBody.appendChild( moviePersonPannel );

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
  moviePersonRatingNumber.innerHTML = popularity;
  moviePersonRatingPannel.appendChild( moviePersonRatingNumber );

  var moviePersonBirthday = document.createElement( 'div' );
  moviePersonBirthday.className = 'movie_person_birthday';
  moviePersonBirthday.innerHTML = birthday + '-' + placebirth;
  moviePersonCardBody.appendChild( moviePersonBirthday );

  var moviePersonBiography = document.createElement( 'div' );
  moviePersonBiography.className = 'movie_person_biography';
  moviePersonBiography.innerHTML = biography;
  moviePersonCardBody.appendChild( moviePersonBiography );

  var moviePersonKnown = document.createElement( 'div' );
  moviePersonKnown.className = 'movie_person_known';
  moviePersonKnown.innerHTML = knwownFor;
  moviePersonCardBody.appendChild( moviePersonKnown );

  var moviePersonFilmography = document.createElement( 'div' );
  moviePersonFilmography.className = 'movie_person_filmography';
  moviePersonCardBody.appendChild( moviePersonFilmography );

  var moviePersonFilmographyBtn = document.createElement( 'div' );
  moviePersonFilmographyBtn.className = 'movie_person_filmography_btn';
  moviePersonFilmographyBtn.innerHTML = '>FILMOGRAPHY<';
  moviePersonFilmography.appendChild( moviePersonFilmographyBtn );

  return moviePersonCard;

}
