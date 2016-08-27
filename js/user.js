"use strict";
let firebase = require("./firebaseConfig"),
 provider = new firebase.auth.GoogleAuthProvider();
 console.log(provider);

function logInGoogle() {
 console.log('wazzup, auth?');
 return firebase.auth().signInWithPopup(provider);
}

module.exports = logInGoogle;
