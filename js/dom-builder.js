 "use strict";


let login = require("./user"),
        $ = require('jquery'),
        templates = require("./dom-builder"),
        // firebase = require("./firebaseConfig"),
        userId = "",
        db = require("./db-interaction"),
        main = require("./main"),
        ap = require("./api-interaction");




//populating method
function movieList(movieData) {
      let outputString = "";

    for (let i = 0; i < movieData.Search.length; i++) {
      // console.log("movieData", movieData);
          let Title = movieData.Search[i].Title,
              year = movieData.Search[i].Year,
              Type = movieData.Search[i].Type,
              // poster = movieData.[i].poster;
              Id = movieData.Search[i].imdbID;
      // console.log("Id", Id);
      // console.log("year", year);
   outputString += `
      <div class="col s5 card horizontal" style>
        <div class="card-image">
          <img src="http://lorempixel.com/170/250" width="170" height="250">
        </div>
        <div class="card-stacked">
          <div class="card-content">
            <ul>
              <li>${"Movie name: "} ${Title}</li>
              <li>${"Year released: "} ${year}</li>
              <li>${"Actors: "} ${"Rocky"}</li>
              <li>${"Type: "} ${Type}</li>
              <li>${"Rating: "} ${"3"}</li>
              <li>${"Watched/Not: "} ${"true"}</li>
            </ul>
          </div>
          <div class="card-action">
            <a  class="add-ToWatch" href="#">Add to watch</a>
            <a class="add-watched" href="#">Watched</a>
          </div>
        </div>
      </div>`;
 }
      $("#output").append(outputString);
      main.addToWatch();

}

module.exports = movieList;
