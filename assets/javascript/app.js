// Array of actors
let actors = ["Ryan Gosling", "Shia LaBeouf", "Robert Pattinson", "Abbey Lee", "Mackenzie Davis"];

// Event listener for all button elements
function displayActorInfo() {

    let actorName = $(this).val();
    console.log($(this));

    // QueryURL
    let queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        actorName + "&api_key=z0iTbup8is8OXLpDqye8t3acsCCo5USj&limit=10";;

    // AJAX call
    console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        // Results variable
        let results = response.data;

        // Looping over every result item
        for (let i = 0; i < results.length; i++) {

            // If the photo has an appropriate rating
            if (results[i].rating !== "r") {

                // Create a div with the class "item"
                let gifDiv = $("<div class='item'>");

                // Storing the result item's rating
                let rating = results[i].rating;

                // Creating a paragraph tag with the result item's rating
                let p = $("<p>").text("Rating: " + rating);

                // Creating an image tag
                let actorImage = $("<img>");

                // Giving the image tag attributes to play and pause gifs
                actorImage.attr("src", results[i].images.fixed_height_still.url);
                actorImage.attr("data-still", results[i].images.fixed_height_still.url);
                actorImage.attr("data-animate", results[i].images.fixed_height.url);
                actorImage.attr("data-state", "still");

                // Appending the paragraph and actorImage we created to the "gifDiv" div
                gifDiv.append(p);
                gifDiv.append(actorImage);

                // Prepending the gifDiv to the "#actors-view" div in the HTML
                $("#actors-view").prepend(gifDiv);
            }
        }
        // This function will play and pause Gifs 
        $("img").on("click", function () {
            // Creating variable calling the "data-state" attr created above
            let state = $(this).attr("data-state");
            // If else statement controlling still and animate attributes set above.
            if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            }
            else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }
        });
    });

}

// Function for displaying actor data
function renderButtons() {

    // Deleting the actors prior to adding new actors
    $("#buttons-view").empty();

    // Looping through the array of actors
    for (let i = 0; i < actors.length; i++) {

        // Generating buttons for each actor in the array
        let a = $("<button>");
        // Adding a class of actor to our button
        a.addClass("actor-btn");
        // Adding a data-attribute
        a.val(actors[i]);
        // Providing the initial button text
        a.text(actors[i]);
        // Adding the button to the HTML
        $("#buttons-view").append(a);
    }
}

// This function handles events where an actor button is clicked
$("#add-actor").on("click", function (event) {

    event.preventDefault();

    // This line grabs the input from the textbox
    let actorText = $("#actor-input").val().trim();

    // Adding actor from the textbox to our array
    actors.push(actorText);

    // Calling renderButtons which handles the processing of our actor array
    renderButtons();
});

// Adding a click event listener to all elements with a class of "actor-btn"
$(document).on("click", ".actor-btn", displayActorInfo);

// Final call
renderButtons();

