"use strict";

//TOAST USER INTERACTIONS
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
    changeBreadCrumb
};

