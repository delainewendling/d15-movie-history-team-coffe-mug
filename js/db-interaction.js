// "use strict";


// let firebase = require("./firebaseConfig");


// // function getMovies() {
// //   console.log("this is working");
// //   return new Promise (function (resolve, reject) {
// //     $.ajax({
// //       url: "http://www.omdbapi.com/?t=braveheart&y=&plot=short&r=json",
// //     }).done (function(data){
// //       console.log("data", data);
// //       // console.log("tittle", data.Search.Title);
// //       resolve(data);
// //     });
// //   });
// // }

// // function addMovie(songFormObj) {
// //   return new Promise(function (resolve,reject){
// //     $.ajax({
// //       url: "http://www.omdbapi.com/?t=braveheart&y=&plot=short&r=json",
// //       type: 'POST',
// //       data: JSON.stringify(songFormObj),
// //       dataType: 'json'
// //     }).done(function(movieId) {
// //       resolve(movieId);
// //     });

// //   });
// // }

// function getMovies() {
//   console.log("this is working");
//   return new Promise (function (resolve, reject) {
//     $.ajax({
//       url: "http://www.omdbapi.com/?s=braveheart&y=&plot=short&r=json",
//       method: "GET",
//       data: JSON
//     }).done (function(data){
//       console.log("data", data);
//       // console.log("tittle", data.Search.Title);
//       resolve(data);
//     // movieList(data);

//     });
//   });
// }
// module.exports = getMovies;
