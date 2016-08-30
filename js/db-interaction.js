"use strict";

let $ = require("jquery"),
    main = require("./main.js"),
    domBuilder = require("./dom-builder.js");

/// Saving a specific movie to firebase via save button
let addMovie = function (movieObjToAdd) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: "https://reel-good-movie-history.firebaseio.com/movies.json",
      type: "POST",
      data: JSON.stringify(movieObjToAdd),
      dataType: "json"
    }).done(function(movieId) {
      resolve(movieId);
    });
  });
};

// RATE MOVIE
let rateMovie = function (movieObjToRate, prop) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: `https://reel-good-movie-history.firebaseio.com/movies/${movieObjToRate}.json`,
      type: "PATCH",
      data: JSON.stringify(prop),
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
      url: `https://reel-good-movie-history.firebaseio.com/movies/${movieId}.json`,
      type: "DELETE"
    }).done(function(data) {
      resolve(data);
    });
  });
};

/// Retrieve user-saved movies from Firebase
let getSavedMovies = function (uid) {
  return new Promise (function (resolve, reject) {
    $.ajax({
      url: `https://reel-good-movie-history.firebaseio.com/movies.json?orderBy=\"uid\"&equalTo=\"${uid}\"`,
      type: "GET"
    }).done (function(savedMovieData){
      resolve(savedMovieData);
    });
  });
};


/// SAVE BUTTON USED TO SEND MOVIE OBJ TO FB TO SAVE
$(document).on("click", ".add-ToWatch", function() {
  $("#rating").removeClass("hidden");
    let movieId = this.id;
    return new Promise(function(resolve, reject) {
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







module.exports = {addMovie, getSavedMovies, deleteMovie, rateMovie};
