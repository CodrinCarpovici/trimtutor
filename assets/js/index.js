let key = {
    method: 'GET',
    headers: { 'x-api-key': 'TIDNLHTjaGEfQDFhfKVjsg==w57dRJ7ghY0iLRZ4' }
  }
let queryURL = "https://api.api-ninjas.com/v1/quotes?category=inspirational";

function generateQuote(){
fetch(queryURL, key)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    let text = data[0].quote;
    console.log(text.length);
    if (text.length > 50) {
        generateQuote();
    } else {
    let quote = $("<p>").text(data[0].quote);
    let author = $("<p>").text("- " + data[0].author);
    
    $("#quote").append(quote);
    $("#quote").append(author);
  }});
}

generateQuote();