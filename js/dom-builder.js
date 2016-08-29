"use strict";

let $ = require("jquery");
    // userID;


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

    <button class="save_new_btn" id="${movieId}">Save</button>`;
 }
      $("#output").append(outputString);
};

module.exports = movieList;
