var topics = ["Mario", "Sonic", "Spyro", "Tetris", "Dungeons & Dragons"]

function renderButtons() {

    // Deleting the topics prior to adding new topics
    $("#topicButtons").empty();

    // Looping through the array of topics
    for (i=0; i < topics.length; i++) {
        var topicButton = $("<button>");
        topicButton.addClass("btn btn-info m-2 topicButton");
        topicButton.text(topics[i]);
        $("#topicButtons").append(topicButton);
    }
  }

function displayGifs() {

    // Empty previous gifs in the gif display section
    $("#gifSection").empty();

    // Grab topic of gifs to pull from the button that was clicked
    var topic = $(this).text();
    console.log("You clicked on this topic: " + topic);

    // Insert topic into the query URL
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=MevZlV0JPdtVt3MKQBrlnNwOmZmGV7bh&limit=10";

    // Call the API
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        // After response is returned, do everything else
        .then(function(response) {

            // Store array of results in a variable
            var results = response.data;

            console.log(response.data);

            for (var i=0; i < results.length; i++) {

            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {

                // Creating a div for the gif
                var gifDiv = $("<div>");
  
                // Storing the result item's rating
                var rating = results[i].rating;
  
                // Creating a paragraph tag with the result item's rating
                var p = $("<p>").text("Rating: " + rating);
  
                // Creating an image tag
                var topicImage = $("<img>");
  
                // Giving the image tag a default still URL src
                topicImage.attr("src", results[i].images.fixed_height_still.url);

                // Adding data attributes for pausing/unpausing gif functionality
                topicImage.attr("data-still", results[i].images.fixed_height_still.url);
                topicImage.attr("data-animate", results[i].images.fixed_height.url);
                topicImage.attr("data-state", "still");
                topicImage.addClass("gif");
  
                // Appending the paragraph and personImage we created to the "gifDiv" div we created
                gifDiv.append(p);
                gifDiv.append(topicImage);
                gifDiv.addClass("gifDiv m-2");
  
                // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
                $("#gifSection").append(gifDiv);
              }
            }
        })

}

$("#topicSubmit").on("click", function() {
    event.preventDefault();

    // Empty previous gifs in the gif display section
    $("#gifSection").empty();

    // Grab topic of gifs to pull from the button that was clicked
    var topic = $("#formTextSearch").val().trim();
    console.log("You clicked on this topic: " + $("#formTextSearch").val().trim());

    // Add topic to array of topic buttons
    topics.push(topic);
    renderButtons();

    // Insert topic into the query URL
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=MevZlV0JPdtVt3MKQBrlnNwOmZmGV7bh&limit=10";
    console.log("This is your queryURL: " + queryURL);

    // Do the AJAX thing
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        // After response is returned, do this thing
        .then(function(response) {

            // Store array of results in a variable
            var results = response.data;

            console.log(response.data);

            for (var i=0; i < results.length; i++) {

            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {

                // Creating a div for the gif
                var gifDiv = $("<div>");
  
                // Storing the result item's rating
                var rating = results[i].rating;
  
                // Creating a paragraph tag with the result item's rating
                var p = $("<p>").text("Rating: " + rating);
  
                // Creating an image tag
                var topicImage = $("<img>");
  
                 // Giving the image tag a default still URL src
                 topicImage.attr("src", results[i].images.fixed_height_still.url);

                 // Adding data attributes for pausing/unpausing gif functionality
                 topicImage.attr("data-still", results[i].images.fixed_height_still.url);
                 topicImage.attr("data-animate", results[i].images.fixed_height.url);
                 topicImage.attr("data-state", "still");
                 topicImage.addClass("gif");
  
                // Appending the paragraph and personImage we created to the "gifDiv" div we created
                gifDiv.append(p);
                gifDiv.append(topicImage);
                gifDiv.addClass("gifDiv m-2");
  
                // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
                $("#gifSection").append(gifDiv);
              }
            }
        })

})

$(document).on("click", ".topicButton", displayGifs);

function animateGif () {
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
}

$(document).on("click", ".gif", animateGif);

renderButtons();