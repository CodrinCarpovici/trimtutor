//setting key needed for both apis
var key = {
    method: 'GET',
    headers: { 'x-api-key': 'TIDNLHTjaGEfQDFhfKVjsg==w57dRJ7ghY0iLRZ4' }
  }

//api urls used in project
let queryURL = "https://api.api-ninjas.com/v1/quotes?category=inspirational";
let exerciseURL ="https://api.api-ninjas.com/v1/exercises?muscle="

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
    //create p tags for quote and author from api
    let quote = $("<p>").text(data[0].quote);
    let author = $("<p>").text("- " + data[0].author);
    //add quote and author onto page
    $("#quote").append(quote);
    $("#quote").append(author);
  }});
}

function generateExercises(){
  //get required properties for api from modal
  let mGroup = $('#muscleGroups').find(':selected').val();
  let difficulty = $('#difficulty').find(':selected').val();
  //custom link for options selected
  exerciseURL += mGroup + "&difficulty=" + difficulty;

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

generateQuote();