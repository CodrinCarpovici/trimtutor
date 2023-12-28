const apiKey = "AIzaSyDQsjuseJi8yZC7IzSY_V3a6W8_Z1lrQrA";

const targetDiv = $(".row.mt-3");

const showVideos = function (search) {
  const queryURL = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&part=snippet&q=${search}&type=video&maxResults=3&order=relevance&videoEmbeddable=true`;

  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      for (let video = 0; video < 3; video++) {
        const videoId = data.items[video].id.videoId;
        const videoDiv = $('<div>').addClass('col-md-4');
        const iframe = $('<iframe>').attr({
          width: '100%',
          height: '200',
          src: `https://www.youtube.com/embed/${videoId}?origin=${window.location.origin}`,
          frameborder: '0',
          allowfullscreen: true,
        });

        videoDiv.append(iframe);
        targetDiv.append(videoDiv);
      }
    });
};

showVideos('triceps curls');
