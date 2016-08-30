"use strict";

let addMovie = require("./db-interaction.js"),
    getMovie = require("./api-interaction.js"),
    domBuilder = require("./dom-builder.js"),
    userId = "",
    finalSearchList = {},
    firebase = require("firebase/app"),
    login = require("./user.js"),
    template = require('./template.js'),
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
    addMovie.addMovie(movie)
    .then((data)=>{
      template.showMovies(finalSearchList);
      domBuilder.saveToast();
    })
    // if (filterState === "search") {
    //   mainSearch();
    // } else {
    //   domBuilder.addAndPrint(filterState, e);
    // }
});

//Delete movie from FB
$(document).on("click", ".delete", function(e) {
    let movieId = $(e.currentTarget).attr('key');
    console.log(movieId);
    addMovie.deleteMovie(movieId)
    .then((data)=>{
      domBuilder.deleteAndPrint(filterState, e);
    })
});

// RATE MOVIE ON FB
$(document).on("click", ".userRating", function(e, rating){
  let movieRating = $(e.target).attr("class").split(' ')[0];
  let movieId = $(e.currentTarget).attr('key');
  let movie = finalSearchList[movieId];
  addMovie.rateMovie(movieId, {rating: movieRating, watched: true});
  domBuilder.ratingToast(movieRating);
  if (filterState === "search") {
    mainSearch();
  } else {
    domBuilder.rateAndPrint(filterState, e, userId);
  }
})

/// Serching for Movies by Title, show results when enter is clicked
$(document).on("keypress", "#userSearch", function(e) {
  filterState = "search";
    var key = e.which || e.keyCode;
    if (key === 13) {
      mainSearch();
        }})

function mainSearch() {
  $('.filter').removeClass('teal lighten-5 selectedBtn');
  $('#ratingSlider').val('0');
  domBuilder.changeBreadCrumb("Search");
      let firebaseMovies = {},
          imdbIdArray = [];
      finalSearchList = {};
      addMovie.getSavedMovies(userId)
        .then(function(data){
          console.log("call to Firebase", data);
          firebaseMovies = data;
          getMovie.searchMovies()
            .then(function(data) {
              console.log("call to OMDB", data.Error);
              if (data.Error){
                console.log("inside if");
                $("#output").html("<h3 class='center-align'> Movie Not Found! </h3> <p class='center-align'> Search Again </p>");
                $("#userSearch").val("");
              }
              let imdbIdArray = [];
              if (data.Search.length != undefined && data.Search.length > 0){
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
                      $('#userSearch').val("");
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
                      $('#userSearch').val("");
                      template.showMovies(finalSearchList);
                    }
                  })
              })
            } else {
              finalSearchList = fireBaseMovies;
              template.showMovies(finalSearchList);
            }
            })
          })
}

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
    $("#userSearch").val("");
    $('#output').html('');
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
        $("#userSearch").val("");
        $('#output').html('');
        $("#auth-btn").show();
        $(".filters").addClass('hide');
        domBuilder.goodbyeToast();
      })
});

//Filter Logic and CHANGE BREAD CRUMB STATUS ACCORDING TO ACTIVE FILTER
$(document).on('click', '#untracked-btn', getUntracked);
$(document).on('click', '#unwatched-btn', getUnwatched);
$(document).on('click', '#watched-btn', getWatched);

function getUntracked (){
  let currentPlace = $('#untracked-btn').html();
  domBuilder.changeBreadCrumb(currentPlace);
  changeSelectedBtn('untracked-btn');
  $('#ratingSlider').val('0');
  // if ($('#userSearch').val()){
  console.log("untracked");
  //Get rid of saved movies
  $('.movieCard[saved=true]').parent('.movieDiv').hide();
}

function getUnwatched (){
  console.log("unwatched");
  filterState = "unwatched";
  $('#ratingSlider').val('0');
  changeSelectedBtn('unwatched-btn');
  let currentPlace = $('#unwatched-btn').html();
  domBuilder.changeBreadCrumb(currentPlace);
  addMovie.getSavedMovies(userId, "watched", "false")
  .then ((userData)=>{
    console.log("unwatched movies", userData);
    if (Object.keys(userData).length === 0) {
      $("#output").html("<h3 class='center-align'> No Unwatched Movies </h3> <p class='center-align'> Add some by searching and adding to your watchlist </p>");
    } else {
      template.showMovies(userData);
    }
  });
}

function getWatched (){
  console.log("watched");
  filterState = "watched";
  $('#ratingSlider').val('0');
  changeSelectedBtn('watched-btn');
  let currentPlace = $('#watched-btn').html();
  domBuilder.changeBreadCrumb(currentPlace);
  addMovie.getSavedMovies(userId, "watched", true)
    .then ((userData)=>{
      console.log("user data", userData)
    if (Object.keys(userData).length === 0) {
      $("#output").html("<h3 class='center-align'> No Watched Movies </h3> <p class='center-align'> Add some by rating the movies you have saved </p>");
    } else {
      template.showMovies(userData);
    }
    });
}

function changeSelectedBtn (btnId){
  $('.filter').removeClass('teal lighten-5');
  $(`#${btnId}`).addClass('teal lighten-5 selectedBtn');
}

//Slider functionality
$(document).on('change', '#ratingSlider', showRatedMovies);

function showRatedMovies(){
  let ratingValue = $('#ratingSlider').val();
  $('.range-slider__value').val(ratingValue);
  domBuilder.changeBreadCrumb("Filter Ratings");
  console.log("rating", ratingValue);
  addMovie.getSavedMovies(userId, "rating", ratingValue)
  .then((movies)=>{
    console.log("movies with that rating", movies);
    if (Object.keys(movies).length === 0) {
      $("#output").html(`<h3 class='center-align'> No Movies with a rating of ${ratingValue} yet </h3>`);
    } else {
      template.showMovies(movies);
      domBuilder.slideAndPrint();
    }
  })
}

