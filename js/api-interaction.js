"use strict";

console.log("api-interaction.js is connected");

let $ = require("jquery"),
    domBuilder = require("./dom-builder.js");
    // userID;

//////// Call to get movie titles by search from OMDB
let getMovieInfo = function() {
  console.log("this is working");
  let userSearch = $("#userSearch").val();
  console.log(userSearch);
  return new Promise (function (resolve, reject) {
    $.ajax({
      url: `http://www.omdbapi.com/?s=${userSearch}&r=json`,
    }).done (function(data){
      console.log(data);
      resolve(data);
      domBuilder.movieList(data);
    });
  });
};

module.exports = getMovieInfo;
