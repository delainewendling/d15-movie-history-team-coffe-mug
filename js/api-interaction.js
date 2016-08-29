'use strict';

let login = require("./user"),
        $ = require('jquery'),
        dom = require("./dom-builder"),
        // firebase = require("./firebaseConfig"),
        userId = "",
        db = require("./db-interaction"),
        ap = require("./api-interaction");



// get new movies from the main source
function getMovies() {
  console.log("this is working");
  return new Promise (function (resolve, reject) {
    $.ajax({
      url: "http://www.omdbapi.com/?s=braveheart&y=&plot=short&r=json",
      method: "GET",
      data: JSON
    }).done (function(data){
      console.log("data", data);

      // console.log("tittle", data.Search.Title);
      resolve(data);
    dom.movieList(data);
    // db.addMovie(data);

    });
  });
}














module.exports = {
  getMovies
};
