"use strict";

let $ = require("jquery"),
    domBuilder = require("./dom-builder.js");
    // userID;

//////// AJAX CALL TO GET INFO FROM API - KING KONG (FOR NOW)
let getMovieInfo = function() {
  console.log("this is working");
  return new Promise (function (resolve, reject) {
    $.ajax({
      url: "http://www.omdbapi.com/?s=King+Kong&i=tt0360717&r=json",
    }).done (function(data){
      console.log(data);
      resolve(data);
      domBuilder(data);
      // buildMovieToSave(data); ******* attached to save button --- post to fb
    });
  });
};
getMovieInfo(); // this will be called from the search button event listener - then it will resolve back to the listener

module.exports = getMovieInfo;




//   firebase = require("./firebaseConfig"),
//   movieSetup = require("./main.js");


// let getMovieInfo = function() {
//   console.log("this is working");
//   return new Promise (function (resolve, reject) {
//     $.ajax({
//       url: "http://www.omdbapi.com/?s=King+Kong&i=tt0360717&r=json",
//     }).done (function(data){
//       // console.log(data);
//       // console.log("tittle", data.Search.Title);
//       resolve(data);
//       movieSetup(data);
//     });
//   });
// };
// getMovieInfo();


// module.exports = getMovieInfo;
