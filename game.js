//4.At the top of the game.js file, create a new empty array called gamePattern.
var gamePattern = [];

//2.create a new array called buttonColours and set it to hold the sequence "red", "blue", "green", "yellow" .
var buttonColors = ["red", "blue", "green", "yellow"];

//11.At the top of the game.js file, create a new empty array with the name userClickedPattern.

var userClickedPattern = [];

var level = 0;
var started = false;

$(document).keydown(function () {

    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
})

$(".btn").on("click", function () {
    var userChosenColor = $(this).attr("id");

    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    var lastAnswer = userClickedPattern.length - 1;

    checkAnswer(lastAnswer);
})

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 3) + 1;
    var randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);
}

function playSound(name) {
    var audioPath = "sounds/" + name + ".mp3";
    var audio = new Audio(audioPath);
    audio.play();
}

function animatePress(currenColor) {
    $("#" + currenColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currenColor).removeClass("pressed");
    }, 100)
}

function checkAnswer(currentLevel) {
    console.log("gamepattern " + gamePattern);
    console.log("userClicked " + userClickedPattern);
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("Suceess")

        console.log("gamepattern length " + gamePattern.length);
        console.log("userClicked length " + userClickedPattern.length);

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else {
        console.log("Fail")
        var wrongAudio = "wrong";
        playSound(wrongAudio);
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200)
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }

    function startOver()
    {
        level = 0;
        started = false;
        gamePattern = [];
    }
}










