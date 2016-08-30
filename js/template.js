"use strict";

let Handlebars = require('hbsfy/runtime'),
    movieTemplate = require('../templates/movieDisplay.hbs');

Handlebars.registerHelper('activateStars', function(rating, index){
  if (rating >= index) {
    return 'active-star';
  }
});

function showMovies (data){
  $('#output').html(movieTemplate(data));
}

module.exports = {showMovies};