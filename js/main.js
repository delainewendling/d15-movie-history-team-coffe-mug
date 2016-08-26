"use strict";

var movieData = {

}

function getMovieInfo() {
  return new Promise (function (resolve, reject) {
    $.ajax({
      url: "http://www.omdbapi.com/?t=Home+Alone&y=&plot=short&r=json",
    }).done (function(data){
      resolve(data);
    });
  });
}

getMovieInfo();


function getMovieInfo(movieData) {
  let searchedMovies = "";

  for (var i = search.length - 1; i >= 0; i--) {
    let searchedMovies = data.search.Title
  }
}
