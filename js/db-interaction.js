"use strict";

let $ = require("jquery"),
    main = require("./main.js"),
    domBuilder = require("./dom-builder.js"),
    userId="";

/// Saving a specific movie to firebase via save button
let addMovie = function (movieObjToAdd) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: "https://movie-hisotry-group-project.firebaseio.com/movies.json",
      type: "POST",
      data: JSON.stringify(movieObjToAdd),
      dataType: "json"
    }).done(function(movieId) {
      resolve(movieId);
    });
  });
};

/// Saving a specific movie to firebase via save button
let deleteMovie = function (movieId) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: "https://movie-hisotry-group-project.firebaseio.com/movies.json",
      type: "DELETE"
    }).done(function(data) {
      resolve(data);
    });
  });
};

/// Retrieve user-saved movies from Firebase
let getSavedMovies = function (id) {
  console.log("this is the userID", id);
  return new Promise (function (resolve, reject) {
    $.ajax({
      url: `https://movie-hisotry-group-project.firebaseio.com/movies.json?orderBy="id"&equalTo="${userId}"`
    }).done (function(savedMovieData){
      console.log(savedMovieData);
      resolve(savedMovieData);
    });
  });
};


// let addRatingToMovie = function(rating){
//   getMovieInfo(rating)
//   .then (function (movieData){
//     let rating = $("#rating").val()
//     if(rating === 10){
//       movieData.[key].Favorite = true;
//     }
//   })
// };

// let addToWatchedList = function (addWatchedTag){
//   getMovieInfo(watched)
//   .then (function (watched){
//     let watched = $("#watched").val()
//     if(watched === yes){
//       movieData.[key].Watched = true;
//     }
//   })
// };

module.exports = {addMovie, getSavedMovies, deleteMovie};
