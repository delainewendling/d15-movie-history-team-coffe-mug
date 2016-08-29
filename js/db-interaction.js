"use strict";


let firebase = require("./firebaseConfig"),
      login = require("./user"),
        $ = require('jquery'),
        dom = require("./dom-builder"),
        // firebase = require("./firebaseConfig"),
        userId = "",
        db = require("./db-interaction"),
        ap = require("./api-interaction");


   // POST the data to Firebase

 function addMovie(movieObjToAdd) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: "https://movie-history-9aaab.firebaseio.com/movies.json",
      type: "POST",
      data: JSON.stringify(movieObjToAdd),
      dataType: "json"
    }).done(function(movieId) {
      resolve(movieId);
    });
  });
}
function getMovie() {
  console.log("this is working");
  return new Promise (function (resolve, reject) {
    $.ajax({
      url: "https://movie-history-9aaab.firebaseio.com/movies.json",
      method: "GET",
      data: JSON
    }).done (function(data){
      // console.log("data", data);
      for(var key in data) {
        console.log(key);
      }
      // console.log("tittle", data.Search.Title);
      resolve(data);
    // movieList(data);

    });
  });
}

module.exports = {
  getMovie,
  addMovie
};
