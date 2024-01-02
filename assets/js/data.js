// Youtube API Key
const apiKey = "AIzaSyDQsjuseJi8yZC7IzSY_V3a6W8_Z1lrQrA";

const rowDiv = $(".row.mt-3");

// Function to fetch YouTube video based on search words
const showVideos = function (search) {
  const queryURL = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&part=snippet&q=${search}&type=video&maxResults=3&order=relevance&videoEmbeddable=true`;

  // Fetch data from the YouTube API
  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Loop through the first 3 videos in the search results
      for (let video = 0; video < 3; video++) {
        const videoId = data.items[video].id.videoId;
        const videoDiv = $("<div>").addClass("col-md-4");

        // Create an iframe for embedding the YouTube video
        const videoContainer = $("<iframe>").attr({
          width: "100%",
          height: "250",
          src: `https://www.youtube.com/embed/${videoId}?origin=${window.location.origin}`,
          frameborder: "0",
          allowfullscreen: true,
        });

        videoDiv.append(videoContainer);

        rowDiv.append(videoDiv);
      }
    });
};

// showVideos("triceps curls");

//  Get workout details
const getWorkoutDetails = function () {
  let sWorkout = JSON.parse(localStorage.getItem("formData"));
  $("#workoutName").append(" " + sWorkout[0].workoutName);
  $("#difficulty").append(" " + sWorkout[0].difficulty);
  $("#time").append(" " + sWorkout[0].time);
  const workoutName = sWorkout[0].workoutName;
  const difficulty = sWorkout[0].difficulty;
  if (workoutName && difficulty) {
    // Use the workout details to search for related videos
    const searchQuery = `${workoutName} ${difficulty} workout`;
    showVideos(searchQuery);
  } else {
    console.log("No workout found");
  }
};
getWorkoutDetails();