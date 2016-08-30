"use strict";

//TOAST USER INTERACTIONS
function addAndPrint(state){
  /*******Adding a Movie*******/
  //if filtered state is search re-run the search call and print
  //if filtered state is hide the movie
}

function deleteAndPrint (state){
  /*******Deleting a Movie*******/
  //if filtered state is search hide movie
  //if filtered state is unwatched hide movie
  //if filtered state is watched hide movie
}

function rateAndPrint (state){
  /*******Rating a Movie*******/
  //if filtered state is search re-run search call and print
  //if filtered state is unwatched hide
  //if filtered state is watched re-run from firebase
}

function slideAndPrint (state){}
  /*******Slider*******/
  //call firebase on change of slider
  //rating and deleting will hide that card
}

function goodbyeToast() {
    Materialize.toast('Thank you for visiting our site!', 4000)
};

function saveToast() {
    Materialize.toast('Saved!', 4000)
};

function deleteToast() {
    Materialize.toast('Deleted!', 4000)
}
function ratingToast(movieRating) {
  Materialize.toast(`You rated this ${movieRating}`, 4000)
}
function changeBreadCrumb(currentPlace) {
  console.log('works')
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

