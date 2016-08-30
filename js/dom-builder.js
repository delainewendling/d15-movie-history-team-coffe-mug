// "use strict";

// let $ = require("jquery");
//     // userID;


// let movieList = function (searchedMovieData) {
//       let outputString = "";

//     for (let i = 0; i < searchedMovieData.Search.length; i++) {
//           let poster = searchedMovieData.Search[i].Poster,
//               title = searchedMovieData.Search[i].Title,
//               year = searchedMovieData.Search[i].Year,
//               movieId = searchedMovieData.Search[i].imdbID,
//               watched = searchedMovieData.Search[i].Watched,
//               favorite = searchedMovieData.Search[i].Favorite;
//    outputString +=
//       `<div class="col s5 card horizontal" style>
//        <div class="card-image">
//          <img src=${poster} width="170" height="250">
//        </div>
//        <div class="card-stacked">
//          <div class="card-content">
//            <ul>
//              <li>${"Movie name: "} ${title}</li>
//              <li>${"Year released: "} ${year}</li>
//            </ul>
//          </div>
//          <div class="card-action">
//            <a  class="add-ToWatch" id="${movieId}" href="#">Unwatched</a>
//          </div>
//          <div class="card-action">
//            <a  class="delete" id="${movieId}" href="#">Delete</a>
//          </div>
//          <div>
//            <label>
//               Rating
//               <input class="hidden" type="number" id="rating" min="1" max="10" step="1">
//           </label>
//         </div>
//        </div>
//      </div>`;
//  }
//       $("#output").append(outputString);
// };

// module.exports = {movieList};

