
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

$("#auth-btn").click(function() {
  console.log("clicked auth");
  login()
  .then(function(result) {
    let user = result.user;
    console.log('logged in as', user.uid);
  });
});

// begin the view/hidden area

$(document).ready(function(){
        $('.text_container').addClass("hidden");

        $('.text_container').click(function() {
            var $this = $(this);

            if ($this.hasClass("hidden")) {
                $(this).removeClass("hidden").addClass("visible");

            } else {
                $(this).removeClass("visible").addClass("hidden");
            }
        });
    });

// end the view/hidden area

getMovieInfo();

