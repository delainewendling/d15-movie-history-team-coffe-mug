"use strict";

let $ = require("jquery"),
    addMovie = require("./db-interaction.js"),
    getMovie = require("./api-interaction.js"),
    domBuilder = require("./dom-builder.js"),
    userId = "",
    firebase = require("firebase/app"),
    login = require("./user.js"),
    template = require('./template.js'),
    starRating = require('./star-rating.js');

/// SAVE BUTTON USED TO SEND MOVIE OBJ TO FB TO SAVE
$(document).on("click", ".add-ToWatch", function() {
  $("#rating").removeClass("hidden");
  let movieId = this.id;
    return new Promise(function (resolve, reject) {
      $.ajax({
        url: `http://www.omdbapi.com/?i=${movieId}&plot=short&r=json`,
        type: "GET"
      }).done(function(movieInfoFromId) {
        resolve(movieId);
    })
    .then(function(movieInfoFromId) {
      addMovie.addMovie(movieInfoFromId);
    });
  });
});


//Delete movie from FB
$(document).on("click", ".delete", function() {
  let movieId = this.id;
    addMovie.deleteMovie(movieId);
});

/// Serching for Movies by Title, show results when enter is clicked

$(document).on("keypress", "#userSearch", function(e){
  var key = e.which || e.keyCode;
    if (key === 13) {
      // Fix me
      // addMovie.getSavedMovies(userId);
      // I work when the title is used to search
      getMovie()
      .then ((movieData)=>{
        template.showMovies(movieData);
      })
      // Print to DOM
      domBuilder.movieList(data);
    }
});

//-------------------------------------------
//authentication starts here
// --------------------------------------------
$("#auth-btn").click(function() {
 // console.log("clicked auth");
 login()
 .then(function(result){
   let user = result.user;
   // console.log("logged in user", user.uid);
   console.log("logged in user", user.uid);
       userId = user.uid;
   // loadMovies();
 });
});

