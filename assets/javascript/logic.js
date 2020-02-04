var topicButtons = ["Mario", "Kratos", "Spyro", "Tetris", "Monopoly"]


for (i=0; i < pregenButtons.length; i++) {
    var pregenButton = $("<button>");
    pregenButton.addClass("btn btn-info m-2");
    pregenButton.text(pregenButtons[i]);
    $("#topicButtons").append(pregenButton);
}

