"use strict";

console.log("api-interaction.js is connected");

let domBuilder = require("./dom-builder.js");

//////// Call to get movie titles by search from OMDB
let getMovieInfo = function() {
  let userSearch = $("#userSearch").val().replace(' ', '+');
  return new Promise (function (resolve, reject) {
    $.ajax({
      url: `http://www.omdbapi.com/?s=${userSearch}&type=movie`,
    }).done (function(data){
      console.log(data);
      resolve(data);
    });
  });
};

module.exports = getMovieInfo;
