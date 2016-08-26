 "use strict";

console.log("this is connected");

function getMovieInfo() {
  console.log("this is working");
  return new Promise (function (resolve, reject) {
    $.ajax({
      url: "http://www.omdbapi.com/?t=Home+Alone&y=&plot=short&r=json",
    }).done (function(data){
      console.log(data);
      console.log();
      resolve(data);
    });
  });
}

getMovieInfo();
