"use strict";

console.log("this is connected");

function getMovieInfo() {
  console.log("this is working");
  return new Promise (function (resolve, reject) {
    $.ajax({
      url: "http://www.omdbapi.com/?s=King+Kong&i=tt0360717&r=json",
    }).done (function(data){
      // console.log(data);
      // console.log("tittle", data.Search.Title);
      resolve(data);
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
      console.log("Id", Id);
      // console.log("year", year);
   outputString += `<div class="col-md-4 eachList">
   <ul>
      <li>${"Movie Title is: "} ${Title}</li></br>
      <li>${"Movie year is: "} ${year}</li></br>
      </li></br>
     </ul> </div>`;
 }
      $("#output").append(outputString);

}

