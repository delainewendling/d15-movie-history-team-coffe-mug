"use strict";

let addMovie = require("./db-interaction.js"),
    getMovie = require("./api-interaction.js"),
    domBuilder = require("./dom-builder.js"),
    userId = "",
    finalSearchList = {},
    firebase = require("firebase/app"),
    login = require("./user.js"),
    template = require('./template.js'),
    slider = require('./slider'),
    starRating = require('./star-rating.js'),
    filterState = null;

/// SAVE BUTTON USED TO SEND MOVIE OBJ TO FB TO SAVE
$(document).on("click", ".add-ToWatch", function(e) {
  $("#rating").removeClass("hidden");
    let movieId = $(e.currentTarget).attr('key');
    console.log("movieID", movieId);
    let movie = finalSearchList[movieId];
    movie.watched = 'false';
    movie.saved = 'true';
    movie.rating = 0;
    movie.uid = userId;
    addMovie.addMovie(movie);
    domBuilder.saveToast();
});

//Delete movie from FB
$(document).on("click", ".delete", function(e) {
    let movieId = $(e.currentTarget).attr('key');
    console.log(movieId);
    addMovie.deleteMovie(movieId);
    domBuilder.deleteToast()
});

// RATE MOVIE ON FB
$(document).on("click", ".userRating", function(e, rating){
  let movieRating = $(e.target).attr("class").split(' ')[0];
  let movieId = $(e.currentTarget).attr('key');
  let movie = finalSearchList[movieId];
  addMovie.rateMovie(movieId, {rating: movieRating, watched: true});
  domBuilder.ratingToast(movieRating);
})

function checkStateAndPrint(){
  /*******Adding a Movie*******/
  //if filtered state is search re-run the search call and print
  //if filtered state is hide the movie
  /*******Deleting a Movie*******/
  //if filtered state is search hide movie
  //if filtered state is unwatched hide movie
  //if filtered state is watched hide movie
  /*******Rating a Movie*******/
  //if filtered state is search re-run search call and print
  //if filtered state is unwatched hide
  //if filtered state is watched re-run from firebase
  /*******Slider*******/
  //call firebase on change of slider
  //rating and deleting will hide that card
}

// CHANGES BREAD CRUMB STATUS ACCORDING TO ACTIVE FILTER
$('#untracked-btn').on('click',function() {
  let currentPlace = $('#untracked-btn').html();
  domBuilder.changeBreadCrumb(currentPlace);
})

$('#unwatched-btn').on('click',function() {
  let currentPlace = $('#unwatched-btn').html();
  domBuilder.changeBreadCrumb(currentPlace);
})

$('#watched-btn').on('click',function() {
  let currentPlace = $('#watched-btn').html();
  domBuilder.changeBreadCrumb(currentPlace);
})



/// Serching for Movies by Title, show results when enter is clicked
$(document).on("keypress", "#userSearch", function(e) {
  filterState = "search";
    var key = e.which || e.keyCode;
    if (key === 13) {
      let firebaseMovies = {};
      addMovie.getSavedMovies(userId)
        .then(function(data){
          console.log("call to Firebase", data);
          firebaseMovies = data;
          getMovie.searchMovies()
            .then(function(data) {
              console.log("call to OMDB", data);
              let imdbIdArray = [];
              data.Search.forEach(function(movie, index) {
                imdbIdArray.push(movie.imdbID);
              });
              let i = 0,
                  arrayLength = imdbIdArray.length;
              imdbIdArray.forEach(function(ID, index) {
                for (let savedMovie in firebaseMovies) {
                  if (ID === firebaseMovies[savedMovie].imdbID) {
                    finalSearchList[savedMovie] = firebaseMovies[savedMovie];
                    imdbIdArray.splice(index,1);
                    i++;
                    if (i === (arrayLength - 1)) {
                      template.showMovies(finalSearchList);
                    }
                  }
                }
              });
              imdbIdArray.forEach(function(ID, index) {
                getMovie.getMovieInfo(ID)
                  .then(function(data){
                    finalSearchList[index] = data;
                    i++;
                    if (i === (arrayLength - 1)) {
                      template.showMovies(finalSearchList);
                    }
                  })
              })
            })
          })
          }
        })

//-------------------------------------------
//authentication starts here
// --------------------------------------------
$("#auth-btn").click(function() {
  $(".landingPage").addClass('hide');
    login.logInGoogle()
        .then(function(result) {
            userId = result.user.uid;
            $("#auth-btn").addClass('hide');
            $("#auth-btnLogOut").removeClass('hide');
            $(".filters").removeClass('hide');
        });
});


// AUTO LOGIN, SAVES USERID TO GLOBAL VARIABLE
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    userId = firebase.auth().currentUser.uid;
    $(".landingPage").hide();
    $("#auth-btn").hide();
    $("#auth-btnLogOut").removeClass("hide");
    $(".filters").removeClass('hide');
  }
});

$("#auth-btnLogOut").on("click", function() {
    login.logOutGoogle()
      .then(function(){
        userId = "";
        $(".landingPage").show();
        $("#auth-btnLogOut").addClass('hide');
        $("#auth-btn").show();
        $(".filters").addClass('hide');
        domBuilder.goodbyeToast();
      })
});


//Filter Logic
$(document).on('click', '#untracked-btn', getUntracked);
$(document).on('click', '#unwatched-btn', getUnwatched);
$(document).on('click', '#watched-btn', getWatched);

function getUntracked (){
  console.log("untracked");
  filterState = "untracked";
  changeSelectedBtn('untracked-btn');
 //Get rid of saved movies
  $('.movieCard[saved=true]').parent('.movieDiv').hide();
}

function getUnwatched (){
  console.log("unwatched");
  filterState = "unwatched";
  changeSelectedBtn('unwatched-btn');
  addMovie.getSavedMovies(userId, "watched", "false")
  .then ((userData)=>{
    template.showMovies(userData);
  });
}

function getWatched (){
  console.log("watched");
  filterState = "watched";
  changeSelectedBtn('watched-btn');
  addMovie.getSavedMovies(userId, "watched", "true")
  .then ((userData)=>{
    template.showMovies(userData);
  });
}

function changeSelectedBtn (btnId){
  $('.filter').removeClass('teal lighten-5');
  $(`#${btnId}`).addClass('teal lighten-5 selectedBtn');
}

