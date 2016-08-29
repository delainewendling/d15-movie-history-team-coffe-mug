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
   outputString +=
      `<div class="col s5 card horizontal" style>
       <div class="card-image">
         <img src=${poster} width="170" height="250">
       </div>
       <div class="card-stacked">
         <div class="card-content">
           <ul>
             <li>${"Movie name: "} ${title}</li>
             <li>${"Year released: "} ${year}</li>
           </ul>
         </div>
         <div class="card-action">
           <a  class="add-ToWatch" id="${movieId}" href="#">Unwatched</a>
         </div>
       </div>
     </div>`;
 }
      $("#output").append(outputString);
};

module.exports = {movieList};


             // <li>${"Type: "} ${Type}</li>
             // <li>${"Rating: "} ${"3"}</li>
             // <li>${"Watched/Not: "} ${"true"}</li>
