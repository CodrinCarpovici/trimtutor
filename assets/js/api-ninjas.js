//setting key needed for both apis
var key = {
    method: 'GET',
    headers: { 'x-api-key': '7yNxJ/7ug8fCp9NKM+CpWw==AXs4advBy6OETTeg' }
  }

//api urls used in project
let queryURL = "https://api.api-ninjas.com/v1/quotes?category=inspirational";


let sQuote = JSON.parse(localStorage.getItem("quote"));
addQuote();
console.log(sQuote);

function addQuote() {
if (sQuote == null) {
  generateQuote();
} else {
  let quote = $("<p>").text(sQuote.quote);
  let author = $("<p>").text("- " + sQuote.author);
  $("#quote").append(quote);
  $("#quote").append(author);
  generateQuote();
}
}

//generate quote for main page
function generateQuote(){
fetch(queryURL, key)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    let text = data[0].quote;
    //check that quote is not too long for screen
    if (text.length > 50) {
        generateQuote();
    } else {
    //create array of current quote from api
    let cQuote = {
     quote : data[0].quote,
     author : data[0].author
    }

    localStorage.setItem("quote", JSON.stringify(cQuote));
  }});
}

function generateExercises(){
  //get required properties for api from modal
  let mGroup = $('#muscleGroups').find(':selected').val();
  let difficulty = $('#difficulty').find(':selected').val();
  console.log(mGroup, difficulty);
  //custom link for options selected
  let exerciseURL ="https://api.api-ninjas.com/v1/exercises?muscle=" + mGroup + "&difficulty=" + difficulty;

  fetch(exerciseURL, key)
   .then(function (response) {
      return response.json();
    })
  .then(function (data) {
    let workouts = data;

    //clear any existing exercises
    $('#workoutName').children().remove().end()
    for (let i=0; i<workouts.length; i++) {
      
      //create option for each exercise adding name into option
      $("#workoutName").append($('<option>', {
        value: i,
        text: workouts[i].name
      }));
    }
})
}

//when options are changed call to get exercises corresponding to options
$("#muscleGroups").change(function() {
  generateExercises();
})

$("#difficulty").change(function() {
  generateExercises();
})
