// An array to store food item names
var topicArray = ["Coffee", "Pizza", "Sushi", "Burritos", "Steak", "Seafood", "Barbeque", "Tacos", "Nachos", "Sweet Tea", "La Croix", "Perrier"];

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

// Adding new food items
function addNewButton() {
    $("#addGif").on("click", function () {
        // Get the input string
        var food = $("#newFood").val().trim();

        // Validate: Input string is empty or out of range
        if (food == "" || food.length >= 10) {
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
}

// Load the gifs and display on button click
function showGifs() {
    var foodChoice = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + foodChoice + "&api_key=ahbCxqFdx1cR2Kf5VDqdp3djLKDGm81E&limit=10";
    $.ajax({
        url: queryURL,
        method: 'GET'
    })
        .done(function (response) {
            $("#gifs-go-here").empty();
            var results = response.data;
            if (results == "") {
                return false;
            }
            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div>");
                gifDiv.addClass("gifDiv col-sm-12 col-lg-3 border border-primary");
                var gifRating = $("<p>").text("Rating: " + results[i].rating);
                var gifTitle = $("<p>").text("Title: " + results[i].title);
                var gifAdded = $("<p>").text("Date and time added to GIPHY: " + results[i].import_datetime);
                gifDiv.append(gifRating);
                gifDiv.append(gifTitle);
                gifDiv.append(gifAdded);
                var gifImage = $("<img>");
                gifImage.attr("src", results[i].images.fixed_width_still.url);
                gifImage.attr("data-still", results[i].images.fixed_width_still.url);
                gifImage.attr("data-animate", results[i].images.fixed_width.url);
                gifImage.attr("data-state", "still");
                gifImage.addClass("image");
                gifDiv.append(gifImage);
                $("#gifs-go-here").prepend(gifDiv);
            }
        });

}

displayGifButtons();
addNewButton();

$(document).on("click", ".food", showGifs);
$(document).on("click", ".image", function () {
    var state = $(this).attr('data-state');
    if (state == 'still') {
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    } else {
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
});
