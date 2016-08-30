"use strict";

let $ = require("jquery");
// userID;


let movieList = function(searchedMovieData) {
    let outputString = "";

    for (let i = 0; i < searchedMovieData.Search.length; i++) {
        let poster = searchedMovieData.Search[i].Poster,
            title = searchedMovieData.Search[i].Title,
            year = searchedMovieData.Search[i].Year,
            movieId = searchedMovieData.Search[i].imdbID,
            watched = searchedMovieData.Search[i].Watched,
            favorite = searchedMovieData.Search[i].Favorite;
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
         <div class="card-action">
           <a  class="delete" id="${movieId}" href="#">Delete</a>
         </div>
         <div>
           <label>
           <span class="rating">
               <i key="{{@key}}" class="1 material-icons userRating {{activateStars rating 1}}">star</i>
               <i key="{{@key}}" class="2 material-icons userRating {{activateStars rating 2}}">star</i>
               <i key="{{@key}}" class="3 material-icons userRating {{activateStars rating 3}}">star</i>
               <i key="{{@key}}" class="4 material-icons userRating {{activateStars rating 4}}">star</i>
               <i key="{{@key}}" class="5 material-icons userRating {{activateStars rating 5}}">star</i>
               <i key="{{@key}}" class="6 material-icons userRating {{activateStars rating 6}}">star</i>
               <i key="{{@key}}" class="7 material-icons userRating {{activateStars rating 7}}">star</i>
               <i key="{{@key}}" class="8 material-icons userRating {{activateStars rating 8}}">star</i>
               <i key="{{@key}}" class="9 material-icons userRating {{activateStars rating 9}}">star</i>
               <i key="{{@key}}" class="10 material-icons userRating {{activateStars rating 10}}">star</i>
              </span>
          </label>
        </div>
       </div>
     </div>`;
    }
    $("#output").append(outputString);
};

//TOAST USER INTERACTIONS
function goodbyeToast() {
    Materialize.toast('Thank you for visiting our site!', 4000)
};

module.exports = {
    movieList,
    goodbyeToast
};
