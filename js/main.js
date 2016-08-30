"use strict";

console.log("main.js is connected");

let $ = require("jquery"),
    addMovie = require("./db-interaction.js"),
    getMovie = require("./api-interaction.js"),
    domBuilder = require("./dom-builder.js"),
    userId ="",
    firebase = require("./firebaseConfig.js"),
    login = require("./user.js");
    // userID;
    // getMovieInfo = require("./api-interaction.js"),

/// SAVE BUTTON USED TO SEND MOVIE OBJ TO FB TO SAVE
$(document).on("click", ".add-ToWatch", function() {
  $("#rating").removeClass("hidden");
  let movieId = this.id;
    return new Promise(function (resolve, reject) {
      $.ajax({
        url: `http://www.omdbapi.com/?i=${movieId}&plot=short&r=json`,
        type: "GET",
        data: JSON.stringify(),
        dataType: "json"
      }).done(function(movieInfoFromId) {
        resolve(movieId);
    })
    .then(function(movieInfoFromId) {
      addMovie.addMovie(movieInfoFromId);
      console.log("movie info from ID", movieInfoFromId);
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
      addMovie.getSavedMovies(userId);
      getMovie(userId);
    }
});


// $("#unwatched-btn").click(function{
//   return new Promise (function (resolve, reject) {
//     $.ajax({
//       url: `https://movie-hisotry-group-project.firebaseio.com/movies.json?orderBy="id"&equalTo="${userId}"`
//     }).done (function(savedMovieData){
//       console.log(savedMovieData);
//       resolve(savedMovieData);
//       domBuilder.movieList(savedMovieData);
//     });
//   });
// })


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

// -------------

// let function = addUserIdToMovieObj (userID) {
//   getMovieInfo(userID)
//   .then (function(movieData){
//   var idArr = Object.keys(movieData);
//   idArr.forEach(function (key){
//     movieData.[key].userID = key;
//     })
//   })
// }


