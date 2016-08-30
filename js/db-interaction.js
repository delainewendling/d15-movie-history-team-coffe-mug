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
let getSavedMovies = function (uid, property, value) {
  return new Promise (function (resolve, reject) {
    $.ajax({
      url: `https://reel-good-movie-history.firebaseio.com/movies.json?orderBy=\"uid\"&equalTo=\"${uid}\"`,
      type: "GET"
    }).done (function(movieData){
      console.log("results?", movieData);
      let filteredMovies = {};
      for (var prop in movieData){
          if (movieData[prop][property] == value){
            filteredMovies[prop] = movieData[prop];
            console.log("filtered movies so far", filteredMovies);
          }
      }
      resolve(filteredMovies);
    });
  });
};


module.exports = {addMovie, getSavedMovies, deleteMovie, rateMovie};
