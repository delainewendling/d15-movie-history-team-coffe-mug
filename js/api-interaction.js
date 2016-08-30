"use strict";

console.log("api-interaction.js is connected");

let $ = require("jquery"),
    domBuilder = require("./dom-builder.js");

//////// Call to get movie titles by search from OMDB
let searchMovies = function() {
  let userSearch = $("#userSearch").val();
  return new Promise (function (resolve, reject) {
    $.ajax({
      url: `http://www.omdbapi.com/?s=${userSearch}&r=json&type=movie`,
      method: 'GET'
    }).done (function(data){
      resolve(data);
    });
  });
};

let getMovieInfo = function(imdbID) {
  return new Promise(function(resolve, reject) {
    $.ajax({
      url: `http://www.omdbapi.com/?i=${imdbID}&r=json&type=movie`,
      method: 'GET'
    }).done(function(data){
      resolve(data);
    });
  });
};


module.exports = {searchMovies, getMovieInfo};
