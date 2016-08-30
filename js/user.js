"use strict";

let firebase = require("./firebaseConfig"),
 provider = new firebase.auth.GoogleAuthProvider();
 console.log(provider);

function logInGoogle() {
  console.log('logging in');
 return firebase.auth().signInWithPopup(provider);
}

function logOutGoogle() {
  console.log('logging out');
  return firebase.auth().signOut();
}

module.exports = {logInGoogle, logOutGoogle};
