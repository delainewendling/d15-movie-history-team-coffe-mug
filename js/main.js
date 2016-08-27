 "use strict";
 // $ = require('jquery'),
   let login = require("./user"),
    userId = "",
    Search = "",
    firebase = require("./firebaseConfig"),
    key = require("./fb-getter"),
    movieKey = key(),
    movieData = {};


//--------------------------------------------
$("#auth-btn").click(function() {
  console.log("clicked auth");
  login()
  .then(function(result){
    let user = result.user;
    // console.log("logged in user", user.uid);
    console.log("logged in user", user.uid);
        // userId = user.uid;
    // getMovieInfo();
  });
});
//----------------------------------------------
function addMovie(songFormObj) {
  return new Promise(function (resolve,reject){
    $.ajax({
      url: "http://www.omdbapi.com/?s=King+Kong&i=tt0360717&r=json",
      type: 'POST',
      data: JSON.stringify(songFormObj),
      dataType: 'json'
    }).done(function(songId) {
      resolve(songId);
    });

  });
}


function getMovieInfo() {
  console.log("this is working");
  return new Promise (function (resolve, reject) {
    $.ajax({
      url: "http://www.omdbapi.com/?s=King+Kong&i=tt0360717&r=json",
    }).done (function(data){
      // console.log(data);
      // console.log("tittle", data.Search.Title);
      // resolve(data);
      movieList(data);
    });
  });
}
getMovieInfo();

// function getMovieActors() {
//   console.log("this is working");
//   return new Promise (function (resolve, reject) {
//     $.ajax({
//       url: "http://www.omdbapi.com/?t=King+Kong&i=tt0360717&r=json",
//     }).done (function(data){
//       // console.log(data);
//       resolve(data);
//       console.log("tittle", data.Actors);
//       movieList(data);
//     });
//   });
// }
// getMovieActors();


function movieList(movieData) {
      let outputString = "";

    for (let i = 0; i < movieData.Search.length; i++) {
      // console.log("movieData", movieData);
          let Title = movieData.Search[i].Title,
              year = movieData.Search[i].Year,
              // Actors = movieData.[i].Actors;
              Id = movieData.Search[i].imdbID;
              // Actor = movieData.Search[i].Year;
      // console.log("Id", Id);
      // console.log("year", year);
   outputString += `
      <div class="col s5 card horizontal">
        <div class="card-image">
          <img src="http://lorempixel.com/100/190/nature/10">
        </div>
        <div class="card-stacked">
          <div class="card-content">
            <ul>
              <li>${"Movie name: "} ${Title}</li>
              <li>${"Year released: "} ${year}</li>
              <li>${"Actors: "} ${"Rocky"}</li>
              <li>${"Rating: "} ${"3"}</li>
              <li>${"Watched/Not: "} ${"true"}</li>
            </ul>
          </div>
          <div class="card-action">
            <a href="#">Add to watch</a>
            <a href="#">Delete</a>
          </div>
        </div>
      </div>`;
 }
      $("#output").append(outputString);

}
