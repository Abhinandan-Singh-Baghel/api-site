// An array to store food item names
var topicArray = ["Coffee", "Pizza", "Sushi", "Burritos", "Steak", "Seafood", "Barbeque", "Tacos", "Nachos", "Sweet Tea", "La Croix", "Perrier"];

// Render the food buttons for the first time
displayGifButtons();


// Display the food buttons
function displayGifButtons() {
    // Clear the child elements of #button-display
    $("#button-display").empty();

    // Loop to go through all the items in the array
    for (var i = 0; i < topicArray.length; i++) {

        // Store the button element
        var gifButton = $("<button class='m-1'>");

        // Adding attributes and values to the button
        gifButton.addClass("food btn btn-primary");
        gifButton.attr("data-name", topicArray[i].toLowerCase());
        gifButton.text(topicArray[i]);

        // Pushing the new button element to #button-display
        $("#button-display").append(gifButton);
    }

}


// On click event listener to add new food items which triggers when submit button is clicked
$("#addGif").on("click", function () {
    // Get the input string
    var food = $("#newFood").val().trim();

    // Validate: Input string is empty or out of range
    if (food == "" || food.length >= 11) {
        return false;
    }
    // Validate: Inout string is already present in the array
    for (i = 0; i < topicArray.length; i++) {
        if (food.toLowerCase() == topicArray[i].toLowerCase()) {
            return false;
        }
    }

    // Push to the main array
    topicArray.push(food);

    // Calling display gif function to render the #button-display again
    displayGifButtons();
});


// Load the gifs and display on button click
function showGifs() {

    // Store the data name of the food button that was clicked
    var foodChoice = $(this).attr("data-name");

    // Using API to search for the food choice query
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + foodChoice + "&api_key=ahbCxqFdx1cR2Kf5VDqdp3djLKDGm81E&limit=10";

    tryThis(foodChoice);

    function tryThis(foodChoice)
    {
    // Perform an async AJAX request to follow the URL and get the response
    $.ajax({
        url: queryURL,
        method: 'GET',
        timeout: 3000
    })
        .done(function (response) {

            // Clear the child elements of #gifs-go-here
            $("#gifs-go-here").empty();

            // Store all response data object in results
            var results = response.data;

            // Check if response data is empty
            if (results == "") {
                return false;
            }

            // Loop to itter through all the results
            for (var i = 0; i < results.length; i++) {

                // Create a new child div tag element which will be appended to #gifs-go-here
                var gifDiv = $("<div>");
                // Add classes to the new child div
                gifDiv.addClass("gifDiv col-sm-12 col-lg-3 border border-primary");

                // Create some new child p tag element to store API gathered information which will be appended to gifDiv
                var gifRating = $("<p>").text("Rating: " + results[i].rating);
                var gifTitle = $("<p>").text("Title: " + results[i].title);
                var gifAdded = $("<p>").text("Date and time added to GIPHY: " + results[i].import_datetime);

                // Appending the child p tag elements to gifDiv
                gifDiv.append(gifRating);
                gifDiv.append(gifTitle);
                gifDiv.append(gifAdded);

                // Create a new img tag element to display the gif
                var gifImage = $("<img>");

                // Modify the attributes of the new img tag element
                gifImage.attr("src", results[i].images.fixed_width_still.url);
                gifImage.attr("data-still", results[i].images.fixed_width_still.url);
                gifImage.attr("data-animate", results[i].images.fixed_width.url);
                gifImage.attr("data-state", "still");
                gifImage.addClass("image");

                // Appending the gifImage to gifDiv
                gifDiv.append(gifImage);
                
                // Prepending(Can also append) the gifDiv to #gifs-go-here
                $("#gifs-go-here").prepend(gifDiv);
            }
        })

        // Error handling
        .catch(function(e) {
            if(e.statusText == "timeout")
            {
                alert("Request Timeout. Try again?");
                // Try again
                tryThis(foodChoice);
            }
        });}

}


// On click event listener to call showGifs function which triggers when a food button is clicked
$(document).on("click", ".food", showGifs);

// On click event listener to change the state of the gif when it is clicked
$(document).on("click", ".image", function () {

    // Store the current state of the gif that was clicked
    var state = $(this).attr('data-state');

    // Check the current state of the gif. If state is still then change it to animate
    if (state == 'still') {
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    } else {
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
});
