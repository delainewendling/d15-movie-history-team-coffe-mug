"use strict";

let $ = require("jquery");
    // userID;

///////SAVING A MOVIE TO FIREBASE
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


module.exports = addMovie;
