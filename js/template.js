"use strict";

let Handlebars = require('hbsfy/runtime'),
    movieTemplate = require('../templates/movieDisplay.hbs'),
    firebase = require("firebase/app");

Handlebars.registerHelper('activateStars', function(rating, index){
  if (rating >= index) {
    return 'active-star';
  }
});

Handlebars.registerHelper('checkAuth',function(){
  if (firebase.auth().currentUser) {
    return ``;
  } else {
    return `display:none`;
  }
})

function showMovies (data){
  $('#output').html(movieTemplate(data));
}

module.exports = {showMovies};