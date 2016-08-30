"use strict";

let $ = require("jquery"),
    addMovie = require("./db-interaction.js"),
    getMovie = require("./api-interaction.js"),
    domBuilder = require("./dom-builder.js"),
    userId = "",
    finalSearchList = {},
    firebase = require("firebase/app"),
    login = require("./user.js");

// AUTO LOGIN, SAVES USERID TO GLOBAL VARIABLE
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    userId = firebase.auth().currentUser.uid;
    console.log("This user has logged in: ",userId);
  }
});

/// SAVE BUTTON USED TO SEND MOVIE OBJ TO FB TO SAVE
$(document).on("click", ".add-ToWatch", function() {
  $("#rating").removeClass("hidden");
  let movieId = this.id;
    return new Promise(function (resolve, reject) {
      $.ajax({
        url: `http://www.omdbapi.com/?i=${movieId}&plot=short&r=json`,
        type: "GET"
      }).done(function(movieInfoFromId) {
        resolve(movieId);
    })
    .then(function(movieInfoFromId) {
      addMovie.addMovie(movieInfoFromId);
    });
  });
});


//Delete movie from FB
$(document).on("click", ".delete", function() {
  let movieId = this.id;
    addMovie.deleteMovie(movieId);
});

/// Serching for Movies by Title, show results when enter is clicked

$(document).on("keypress", "#userSearch", function(e){
  var key = e.which || e.keyCode;
    if (key === 13) {
      let firebaseMovies = {};
      addMovie.getSavedMovies(userId)
        .then(function(data){
          console.log("call to Firebase", data);
          firebaseMovies = data;
          getMovie.searchMovies()
            .then(function(data) {
              console.log("call to OMDB", data);
              let imdbIdArray = [];
              data.Search.forEach(function(movie, index) {
                imdbIdArray.push(movie.imdbID);
              });
              let i = 0,
                  arrayLength = imdbIdArray.length;
              imdbIdArray.forEach(function(ID, index) {
                for (let savedMovie in firebaseMovies) {
                  if (ID === firebaseMovies[savedMovie].imdbID) {
                    finalSearchList[savedMovie] = firebaseMovies[savedMovie];
                    imdbIdArray.splice(index,1);
                    i++;
                    if (i === (arrayLength - 1)) {
                      console.log("final search list", finalSearchList);
                    }
                  }
                }
              });
              imdbIdArray.forEach(function(ID, index) {
                getMovie.getMovieInfo(ID)
                  .then(function(data){
                    finalSearchList[index] = data;
                    i++;
                    if (i === (arrayLength - 1)) {
                      console.log("final search list", finalSearchList);
                    }
                  })
              })
            })
          })
          }
        })


//-------------------------------------------
//authentication starts here
// --------------------------------------------
$("#auth-btn").click(function() {
 // console.log("clicked auth");
 login()
 .then(function(result){
   let user = result.user;
   // console.log("logged in user", user.uid);
   console.log("logged in user", user.uid);
       userId = user.uid;
   // loadMovies();
 });
});

