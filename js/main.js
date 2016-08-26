"use strict";


function getMovieInfo() {
  return new Promise (function (resolve, reject) {
    $.ajax({
      url: "http://www.omdbapi.com/?t=Home+Alone&y=&plot=short&r=json",
    }).done (function(data){
      console.log(data);
      console.log(data.Actors);
      resolve(data);
    });
  });
}

getMovieInfo();
