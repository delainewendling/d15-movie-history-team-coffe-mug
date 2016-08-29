 "use strict";

    let login = require("./user"),
        $ = require('jquery'),
        dom = require("./dom-builder"),
        firebase = require("./firebaseConfig"),
        userId = "",
        db = require("./db-interaction"),
        ap = require("./api-interaction");


//load the DOM
function loadMovies() {
  ap.getMovies()
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

// -------------
// Get elements
var txtEmail = $('#txtEmail');
var txtPassword = $('#txtPassword');
// var btnLogin = $('#btnLogin');
// var btnSignup = $('#btnSignup');
// var btnLogout = $('#btnLogout');

//add login event
$('#btnLogin').click( (e) => {
  console.log("login clicked");
  console.log("txtEmail", txtEmail);
  //get email and pass
  var email = txtEmail.val();
  var pass = txtPassword.val();
  var auth = firebase.auth();
  console.log("email", email);
  //sign in
  var promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch( (e) => {
      console.log(e.message);
    });

});


//add sign up function
$('#btnSignup').click( (e) => {
  console.log("sign up clicked");
  //get email and pass
  var email = txtEmail.val();
  var pass = txtPassword.val();
  var auth = firebase.auth();
  //sign in
  var promise = auth.creatUserWithEmailAndPassword(email, pass);
    promise
    // .then(user => console.log(user))
      .catch( (e) => console.log(e.message));
});
//log out
$('#btnLogout').click( (e) => {
  firebase.auth().signOut();
});

 //add real time listener
 firebase.auth().onAuthStateChanged(firebaseUser => {
   if(firebaseUser) {
    console.log(firebaseUser);
    $('#btnLogout').classList.remove('hide');
   }
   else {
    console.log('not loged in');
    $('#btnLogout').classList.add('hide');
   }
 });
//----------------------------------------------
//end of authentication
//-------------------------------------------



function addToWatch () {

$(".add-ToWatch").click( (e) => {
    // console.log("hi there", this.id);
    console.log(e);
    db.getMovie();
    // Extract all the info and create a new movie object with them
    // var newMovie = {
    //   title: this.title,
    //   year: this.year,
    //   id: this.id
    // };
  });
}

module.exports = {
  addToWatch,
  loadMovies
};
