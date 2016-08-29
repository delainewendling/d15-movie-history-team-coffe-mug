"use strict";

let $ = require("jquery"),
  userID;
    // getMovieInfo = require("./api-interaction.js"),

console.log("this is connected");

////////// EXTRACTING INFO FROM API CALL
let movieList = function (searchedMovieData) {
      let outputString = "";

    for (let i = 0; i < searchedMovieData.Search.length; i++) {
          let poster = searchedMovieData.Search[i].Poster,
              title = searchedMovieData.Search[i].Title,
              year = searchedMovieData.Search[i].Year,
              // Actors = searchedMovieData.[i].Actors;
              movieId = searchedMovieData.Search[i].imdbID;
              // Actor = searchedMovieData.Search[i].Year;
      console.log("Id", movieId);
   outputString += `
    <div class="col-md-4 eachList">
      <ul>
        <li><img src= ${poster}></li></br>
        <li>${"Movie Title is: "} ${title}</li></br>
        <li>${"Movie year is: "} ${year}</li></br>
        </li></br>
      </ul>
    </div>

    <button class ="save_new_btn" id="${movieId}">Save</button>`;
 }
      $("#output").append(outputString);
};


// let function = addUserIdToMovieObj (userID) {
//   getMovieInfo(userID)
//   .then (function(movieData){
//   var idArr = Object.keys(movieData);
//   idArr.forEach(function (key){
//     movieData.[key].userID = key;
//     console.log("movie obj with user id added", songData)
//     })
//   })
// }


///////SAVING A MOVIE TO FIREBASE
function addMovie(movieObjToAdd) {
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
}


//////// AJAX CALL TO GET INFO FROM API - KING KONG (FOR NOW)
let getMovieInfo = function() {
  console.log("this is working");
  return new Promise (function (resolve, reject) {
    $.ajax({
      url: "http://www.omdbapi.com/?s=King+Kong&i=tt0360717&r=json",
    }).done (function(data){
      console.log(data);
      resolve(data);
      movieList(data);
      // buildMovieToSave(data); ******* attached to save button --- post to fb
    });
  });
};
getMovieInfo(); // this will be called from the search button event listener - then it will resolve back to the listener

///// SAVE BUTTON USED TO SEND MOVIE OBJ TO FB TO SAVE
$(document).on("click", ".save_new_btn", function() {
  let movieObj = buildMovieToSave();
  console.log(movieObj);
  addMovie(movieObj)
  .then(function(movieId) {
    console.log("movie ID", movieId);
  });
});


//////BUILD MOVIE OBJ TO BE ABLE TO ADD TO FB
function buildMovieToSave(movieData) {
    let movieObj = {
    "title": movieData.Search[0].Title,
    "year": movieData.Search[0].Year,
    "imdbID": movieData.Search[0].imdbID
  };
  console.log(movieObj);
  return movieObj;
}




// function movieListDisplay(searchedMovieData) {
//   let $movieListDisplay =
//   $(`<div>
//     <ul class="movie-list">
//     </ul>
//   </div>`);
//   $(".uiContainer--wrapper").html($movieListDisplay);
//   for (let movie in searchedMovieData ) {
//     let currentMovie = searchedMovieData[movie],
//         $movieListItem = $("<li>", {class: "movie-list__item"}),
//         $title = $("<span/>", {class: "movie-title"}).text(currentMovie.title),
//         $movieListData = $("<ul/>", {class: "movie-list__item--data"}),
//         $movieListEdit = $("<a>", {"data-edit-id": movie, class: "edit-btn waves-effect waves-light btn", text: "edit" }),
//         $movieListDelete = $("<a>", {"data-delete-id": movie, class: "delete-btn waves-effect waves-light btn", text: "delete" });
//         // Same as `<a id="${movie}" class="delete-btn waves-effect waves-light btn">delete</a>`

//     $songListData.append(
//       `<li>${currentMovie.title}</li>
//       <li>${currentMovie.year}</li>
//       <li>${currentMovie.id}</li>`);

//     $(".movie-list").append($songListItem.append($title));
//     $(".movie-list").append($songListItem.append($songListData).append($songListDelete).append($songListEdit));
//   }
// }

// function getMovieActors() {
//   console.log("this is working");
//   return new Promise (function (resolve, reject) {
//     $.ajax({
//       url: "http://www.omdbapi.com/?t=King+Kong&i=tt0360717&r=json",
//     }).done (function(data){
//       // console.log(data);
//       resolve(data);
//       console.log("tittle", data.Actors);
//       searchedMovieData(data);
//     });
//   });
// }
// getMovieActors();
