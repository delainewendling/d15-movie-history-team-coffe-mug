
 "use strict";

console.log("this is connected");


function getMovieInfo() {

  return new Promise (function (resolve, reject) {
    $.ajax({
      url: "http://www.omdbapi.com/?t=Home+Alone&y=&plot=short&r=json",
    }).done (function(data){
      console.log(data);

      console.log(data.Actors);

      resolve(data);
    });
  });
}

getMovieInfo();

document.getElementById("addToBtn").addEventListener("click", clickBtn);

function clickBtn(event) {
  console.log("print the event object", event);
}

document.getElementById("watchBtn").addEventListener("click", clickBtn2);

function clickBtn2(event) {
  console.log("print the event object", event);
}
