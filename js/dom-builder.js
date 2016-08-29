"use strict";

let $ = require("jquery");
    // userID;


let movieList = function (searchedMovieData) {
      let outputString = "";

    for (let i = 0; i < searchedMovieData.Search.length; i++) {
          let poster = searchedMovieData.Search[i].Poster,
              title = searchedMovieData.Search[i].Title,
              year = searchedMovieData.Search[i].Year,
              movieId = searchedMovieData.Search[i].imdbID,
              watched = searchedMovieData.Search[i].Watched,
              favorite = searchedMovieData.Search[i].Favorite;
      console.log("Id", movieId);
   outputString += `
    <div class="col-md-3 movieList">
      <ul>
        <li><img src= ${poster}></li></br>
        <li>${"Movie Title is: "} ${title}</li></br>
        <li>${"Movie year is: "} ${year}</li></br>
        </li></br>
      </ul>
    </div>
    <button class="save_new_btn" id="${movieId}">Add to Watch List</button>`;
 }
      $("#output").append(outputString);
};

module.exports = {movieList};
