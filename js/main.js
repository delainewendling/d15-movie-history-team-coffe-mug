"use strict";

let $ = require("jquery"),
    addMovie = require("./db-interaction.js"),
    getMovie = require("./api-interaction.js"),
    domBuilder = require("./dom-builder.js"),
    userId = "",
    firebase = require("firebase/app"),
    login = require("./user.js");

/// SAVE BUTTON USED TO SEND MOVIE OBJ TO FB TO SAVE
$(document).on("click", ".add-ToWatch", function() {
    $("#rating").removeClass("hidden");
    let movieId = this.id;
    return new Promise(function(resolve, reject) {
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

$(document).on("keypress", "#userSearch", function(e) {
    var key = e.which || e.keyCode;
    if (key === 13) {
        // Fix me
        addMovie.getSavedMovies(userId);
        // I'm cool
        getMovie(userId);
        // Print to DOM
        // domBuilder.movieList(data);
    }
});

//-------------------------------------------
//authentication starts here
// --------------------------------------------
$("#auth-btn").click(function() {
    login.logInGoogle()
        .then(function(result) {
            let user = result.user;
            console.log("logged in user", user.uid);
            userId = user.uid;
            $("#auth-btn").addClass('hide');
            $("#auth-btnLogOut").removeClass('hide');
        });
});

$("#auth-btnLogOut").on("click", function() {
  console.log('goodbye');
    login.logOutGoogle();
    $("#auth-btnLogOut").addClass('hide');
    $("#auth-btn").removeClass('hide');
});
