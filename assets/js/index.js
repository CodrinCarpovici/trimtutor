var key = {
    method: 'GET',
    headers: { 'x-api-key': 'TIDNLHTjaGEfQDFhfKVjsg==w57dRJ7ghY0iLRZ4' }
  }
let queryURL = "https://api.api-ninjas.com/v1/quotes?category=inspirational";
let exerciseURL ="https://api.api-ninjas.com/v1/exercises?muscle="

function generateQuote(){
fetch(queryURL, key)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    let text = data[0].quote;
    if (text.length > 50) {
        generateQuote();
    } else {
    let quote = $("<p>").text(data[0].quote);
    let author = $("<p>").text("- " + data[0].author);
    
    $("#quote").append(quote);
    $("#quote").append(author);
  }});
}

function generateExercises(){
  let mGroup = $('#muscleGroups').find(':selected').val();
  let difficulty = $('#difficulty').find(':selected').val();
  exerciseURL += mGroup + "&difficulty=" + difficulty;

  fetch(exerciseURL, key)
   .then(function (response) {
      return response.json();
    })
  .then(function (data) {
    let workouts = data;
})
}
$("#muscleGroups").change(function() {
  generateExercises();
})

$("#difficulty").change(function() {
  generateExercises();
})

generateQuote();