$(document).ready(function() {
    $("#myForm").submit(function(e) {
        e.preventDefault();

        var url = $("#url").val();

        var apiKey = "AIzaSyAuoPbCRVQIafk4G7VO0o5ge05qNqpvhvE";

        var videoId = getVideoId(url);

        var apiUrl =
            "https://www.googleapis.com/youtube/v3/videos?key=" +
            apiKey +
            "&fields=items(snippet(title,description,tags,thumbnails))&part=snippet&id=" +
            videoId;

        generateInfo(apiUrl);
    });

    function getVideoId(url) {
        return url.split("v=")[1];
    }

    function generateInfo(apiUrl) {
        $.get(apiUrl, function(data) {
            console.log(data);

            $("#result").empty();

            $("#url").val("");

            var title = data.items[0].snippet.title;

            var description = unescape(data.items[0].snippet.description);

            var tags = data.items[0].snippet.tags;

            var thumbnail = data.items[0].snippet.thumbnails.maxres.url;

            var tagsResult = "";

            tags.forEach((tag) => {
                tagsResult += tag + ",";
            });

            $("#result").append(`
  
              <h3>Thumbnail:</h3>
  
              <img id="img" src="${thumbnail}" class="img-thumbnail" />
  
              <div class="form-group">
  
              <label for="title">Title:</label>
              
              <input type="text" class="form-control" disabled="true" value="${title}"/>
  
              </div>
  
  
              <div class="form-group">
  
              <label for="description">Description:</label>
              
              <textarea cols="12" rows="9" class="form-control" disabled="true">${description}</textarea>
  
              </div>
  
  
              <div class="form-group">
  
              <label for="tags">Tags:</label>
              
              <textarea cols="12" rows="5" class="form-control" disabled="true">${tagsResult}</textarea>
  
              </div>
              
              `);
        });
    }
});