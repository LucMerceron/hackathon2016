"use strict";

// Jérémie
// Creation HTML CardUI for Person or Movie

var PersonHTMLObject = function ( name, urlPicture ){

  var id = -1;

  var isMovie = false;

  var moviePersonCard = document.createElement( 'div' );
  moviePersonCard.className = 'movie_person_card';

  var moviePersonCardPicture = document.createElement( 'div' );
  moviePersonCardPicture.className = 'movie_person_card_picture';
  if(urlPicture){
  	moviePersonCardPicture.style.backgroundImage = 'url(\'' + urlPicture + '\')';
  }else{
    urlPicture = "public/noImage.jpg";
    moviePersonCardPicture.style.backgroundImage = 'url(\'' + urlPicture + '\')';
    moviePersonCardPicture.style.opacity = 0.5;
  }
  moviePersonCard.appendChild( moviePersonCardPicture );

  var moviePersonCardContainer = document.createElement( 'div' );
  moviePersonCardContainer.className = 'movie_person_card_body_container';
  moviePersonCard.appendChild( moviePersonCardContainer );

  var moviePersonCardBody = document.createElement( 'div' );
  moviePersonCardBody.className = 'movie_person_card_body';
  moviePersonCardContainer.appendChild( moviePersonCardBody );

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

  this.getId = function(){
    return id;
  };

  this.setId = function( idPerson ){
    id = idPerson;
  };

  this.isMovie = function(){
    return isMovie;
  };

  this.getHTMLElement = function(){
    return moviePersonCard;
  };

  this.setPopularity = function( popularity ){
      moviePersonRatingNumber.innerHTML = popularity;
  };

  this.setBirthday = function( birthdayDate, placeBirhtday ){
    if ( birthdayDate && placeBirhtday ){
      moviePersonBirthday.innerHTML = birthdayDate + '-' + placeBirhtday;
    }else if ( birthdayDate ){
      moviePersonBirthday.innerHTML = birthdayDate;
    }else if (placeBirhtday){
      moviePersonBirthday.innerHTML = placeBirhtday;
    }else{
      moviePersonBirthday.innerHTML = "n/ a";
    }

  };

  this.setBiography = function( biography ){
    if ( biography ){
      moviePersonBiography.innerHTML = biography;
    }else{
      moviePersonBiography.innerHTML = 'No information about his biography.';
    }
  }

  this.setKnownFor = function( knownFor ){
    var res = '';

    for(var i= 0; i < knownFor.length; i++){
      if ( res == '' ){
        res = knownFor[i];
      }else {
        res = res + ' - ' + knownFor[i];
      }
    }
    moviePersonKnown.innerHTML = res;
  };

  this.closeLoader = function(){
    moviePersonContainer.style.display = "none";
    moviePersonNotShow.className = '';
    moviePersonNotShow.style.display = "block";
  };

  this.setOnClickListener = function( evt ){
    moviePersonFilmographyBtn.onclick = evt;
  };

}

var MovieHTMLObject = function ( name, urlPicture ){

  var id = -1;

  var isMovie = true;

  var movieShowCard = document.createElement( 'div' );
  movieShowCard.className = 'movie_show_card';

  var movieShowCardPicture = document.createElement( 'div' );
  movieShowCardPicture.className = 'movie_show_card_picture';
  if (urlPicture)
    movieShowCardPicture.style.backgroundImage = 'url(\'' + urlPicture + '\')';
  else{
    urlPicture = "public/noImage.jpg";
    movieShowCardPicture.style.backgroundImage = 'url(\'' + urlPicture + '\')';
    movieShowCardPicture.style.opacity = 0.5;
  }
  movieShowCard.appendChild( movieShowCardPicture );

  var movieShowCardContainer = document.createElement( 'div' );
  movieShowCardContainer.className = 'movie_show_card_body_container';
  movieShowCard.appendChild( movieShowCardContainer );

  var movieShowCardBody = document.createElement( 'div' );
  movieShowCardBody.className = 'movie_show_card_body';
  movieShowCardContainer.appendChild( movieShowCardBody );

  var movieShowContainer = document.createElement( 'div' );
  movieShowContainer.className = 'container';
  movieShowCardBody.appendChild( movieShowContainer );

  var movieShowPreLoader = document.createElement( 'div' );
  movieShowPreLoader.className = 'preloader';
  movieShowContainer.appendChild( movieShowPreLoader );

  var movieShowNotShow = document.createElement( 'div' );
  movieShowNotShow.className = 'notShow';
  movieShowCardBody.appendChild( movieShowNotShow );

  var movieShowPannel = document.createElement( 'div' );
  movieShowPannel.className = 'movie_show_pannel';
  movieShowNotShow.appendChild( movieShowPannel );

  var movieShowName = document.createElement( 'div' );
  movieShowName.className = 'movie_show_name';
  movieShowName.innerHTML = name;
  movieShowPannel.appendChild( movieShowName );

  var movieShowRatingPannel = document.createElement( 'div' );
  movieShowRatingPannel.className = 'movie_show_ratingPannel';
  movieShowPannel.appendChild( movieShowRatingPannel );

  var movieShowRatingTitle = document.createElement( 'div' );
  movieShowRatingTitle.className = 'movie_show_rating_title';
  movieShowRatingTitle.innerHTML = 'popularity';
  movieShowRatingPannel.appendChild( movieShowRatingTitle );

  var movieShowRatingNumber = document.createElement( 'div' );
  movieShowRatingNumber.className = 'movie_show_rating_number';
  movieShowRatingPannel.appendChild( movieShowRatingNumber );

  var movieShowDate = document.createElement( 'div' );
  movieShowDate.className = 'movie_show_date';
  movieShowNotShow.appendChild( movieShowDate );

  var movieShowGenre = document.createElement( 'div' );
  movieShowGenre.className = 'movie_show_genre';
  movieShowNotShow.appendChild( movieShowGenre );

  var movieShowOverview = document.createElement( 'div' );
  movieShowOverview.className = 'movie_show_overview';
  movieShowNotShow.appendChild( movieShowOverview );

  var movieShowActeurs = document.createElement( 'div' );
  movieShowActeurs.className = 'movie_show_acteurs';
  movieShowNotShow.appendChild( movieShowActeurs );

  var movieShowActeursBtn = document.createElement( 'div' );
  movieShowActeursBtn.className = 'movie_show_acteurs_btn';
  movieShowActeursBtn.innerHTML = '>CAST<';
  movieShowActeurs.appendChild( movieShowActeursBtn );

  this.isMovie = function(){
    return isMovie;
  };

  this.getId = function(){
    return id;
  };

  this.setId = function( idMovie ){
    id = idMovie;
  };

  this.getHTMLElement = function(){
    return movieShowCard;
  };

  this.setPopularity = function( popularity ){
    movieShowRatingNumber.innerHTML = popularity;
  };

  this.setDate = function( date ){
    if ( date ){
      movieShowDate.innerHTML = date;
    }else{
      movieShowDate.innerHTML = 'n/ a';
    }
  };

  this.setGenre = function( genre ){
    var res = '';

    for(var i= 0; i < genre.length; i++){
      if ( res == '' ){
        res = genre[i];
      }else {
        res = res + ' - ' + genre[i];
      }
    }
    movieShowGenre.innerHTML = genre;
  }

  this.setOverview = function( overview ){
    if ( overview ){
      movieShowOverview.innerHTML = overview;
    }else{
      movieShowOverview.innerHTML = 'No information about his overview.';
    }
  };

  this.closeLoader = function(){
    movieShowContainer.style.display = "none";
    movieShowNotShow.className = '';
    movieShowNotShow.style.display = "block";
  };

  this.setOnClickListener = function( evt ){
    movieShowActeursBtn.onclick = evt;
  };

}
