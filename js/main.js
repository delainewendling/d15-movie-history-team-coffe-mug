"use strict";

console.log("main.js is connected");

let $ = require("jquery"),
    addMovie = require("./db-interaction.js"),
    getMovie = require("./api-interaction.js"),
    domBuilder = require("./dom-builder.js"),
    id = "1234";
    // userID;
    // getMovieInfo = require("./api-interaction.js"),

/// SAVE BUTTON USED TO SEND MOVIE OBJ TO FB TO SAVE
$(document).on("click", ".add-ToWatch", function() {
  console.log("movie id", this.id);
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

/// Serching for Movies by Title, show results when enter is clicked

$(document).on("keypress", "#userSearch", function(e){
  var key = e.which || e.keyCode;
    if (key === 13) {
      addMovie.getSavedMovies(id);
      getMovie(id);
    }
});



// let function = addUserIdToMovieObj (userID) {
//   getMovieInfo(userID)
//   .then (function(movieData){
//   var idArr = Object.keys(movieData);
//   idArr.forEach(function (key){
//     movieData.[key].userID = key;
//     })
//   })
// }


