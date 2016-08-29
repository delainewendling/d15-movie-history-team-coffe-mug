 "use strict";

    let login = require("./user"),
        // templates = require("./dom-builder"),
        firebase = require("./firebaseConfig"),
        userId = "",
        db = require("./db-interaction");

$(".add-ToWatch").click( e => {
    console.log("hi there", this);
    // Extract all the info and create a new movie object with them
    // var newMovie = {
    //   title: "",
    //   year: "",
    //   id: ""
    // };
  });
//load the DOM
function loadMovies() {
  getMovies()
  .then(function(movieData){
    var idArr = Object.keys(movieData);
    idArr.forEach(function(key){
      movieData[key].id = key;
    });
    console.log("movie object with id added ", movieData);
  });
  // console.log("Need to load some movies, Buddy");
}
loadMovies();// needs to be commented

//-------------------------------------------
//authentication starts here
// --------------------------------------------
// $("#auth-btn").click(function() {
//   // console.log("clicked auth");
//   login()
//   .then(function(result){
//     let user = result.user;
//     // console.log("logged in user", user.uid);
//     console.log("logged in user", user.uid);
//         userId = user.uid;
//     loadMovies();
//   });
// });

//-------------
//Get elements
// const txtEmail = $('#txtEmail');
// const txtPassword = $('#txtPassword');
// // const btnLogin = $('#btnLogin');
// // const btnSignup = $('#btnSignup');
// // const btnLogout = $('#btnLogout');

// //add login event
// $('#btnLogin').click( e => {
//   console.log("login clicked");
//   //get email and pass
//   const email = txtEmail.value;
//   const pass = txtPassword.value;
//   const auth = firebase.auth();
//   //sign in
//   const promise = auth.signInWithEmailAndPassword(email, pass);
//     promise.catch( e => {
//       console.log(e.message);
//     });

// });


// //add sign up function
// $('#btnSignup').click( e => {
//   console.log("sign up clicked");
//   //get email and pass
//   const email = txtEmail.value;
//   const pass = txtPassword.value;
//   const auth = firebase.auth();
//   //sign in
//   const promise = auth.creatUserWithEmailAndPassword(email, pass);
//     promise
//     // .then(user => console.log(user))
//       .catch( e => console.log(e.message));
// });
// //log out
// $('#btnLogout').click( e => {
//   firebase.auth().signOut();
// });

//  //add real time listener
//  firebase.auth().onAuthStateChanged(firebaseUser => {
//    if(firebaseUser) {
//     console.log(firebaseUser);
//     $('#btnLogout').classList.remove('hide');
//    }
//    else {
//     console.log('not loged in');
//     $('#btnLogout').classList.add('hide');
//    }
//  });
//----------------------------------------------
//end of authentication
//-------------------------------------------

// get new movies from the main source
function getMovies() {
  console.log("this is working");
  return new Promise (function (resolve, reject) {
    $.ajax({
      url: "http://www.omdbapi.com/?s=braveheart&y=&plot=short&r=json",
      method: "GET",
      data: JSON
    }).done (function(data){
      console.log("data", data);
      // console.log("tittle", data.Search.Title);
      resolve(data);
    movieList(data);
    addMovie(data);

    });
  });
}

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
            <button  class="add-ToWatch" href="#">Add to watch</button>
            <a class="add-watched" href="#">Watched</a>
          </div>
        </div>
      </div>`;
 }
      $("#output").append(outputString);

}

    // POST the data to Firebase

 function addMovie(movieObjToAdd) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: "https://movie-history-9aaab.firebaseio.com/movies.json",
      type: "POST",
      data: JSON.stringify(movieObjToAdd),
      dataType: "json"
    }).done(function(movieId) {
      resolve(movieId);
    });
  });
}


