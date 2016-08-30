"use strict";

var db = require('./db-interaction.js'),
    template = require('./template.js');

//TOAST USER INTERACTIONS
function addAndPrint(state, evt){
  $(evt.currentTarget).closest('.movieDiv').hide();
  /*******Adding a Movie*******/
  //if filtered state is search re-run the search call and print
  //if filtered state is hide the movie
}

function deleteAndPrint (state, evt){
  $(evt.currentTarget).closest('.movieDiv').hide();
  deleteToast();
}

function rateAndPrint (state, evt, userID){
    switch (state) {
    case "unwatched":
      $(evt.currentTarget).closest('.movieDiv').hide();
      break;
    case "watched":
      db.getSavedMovies(userID, "watched", true)
        .then((data)=>{
          template.showMovies(data);
        });
      break;
  }
  /*******Rating a Movie*******/
  //if filtered state is search re-run search call and print xx
  //if filtered state is unwatched hide
  //if filtered state is watched re-run from firebase
}

function slideAndPrint (){
  /*******Slider*******/
    $('.delete').click(function(e){
      $(e.currentTarget).closest('.movieDiv').hide();
    });
    $('.userRating').click(function(e){
      //Call firebase if rating is changed
      //
    });
}


function goodbyeToast() {
    Materialize.toast('Thank you for visiting our site!', 3000)
};

function saveToast() {
    Materialize.toast('Saved!', 2000)
};

function deleteToast() {
    Materialize.toast('Deleted!', 2000)
}
function ratingToast(movieRating) {
  Materialize.toast(`You rated this ${movieRating}`, 4000)
}
function changeBreadCrumb(currentPlace) {
  $('#curentLocation').html(currentPlace);
};


module.exports = {
    saveToast,
    goodbyeToast,
    deleteToast,
    ratingToast,
    changeBreadCrumb,
    addAndPrint,
    deleteAndPrint,
    rateAndPrint,
    slideAndPrint
};

