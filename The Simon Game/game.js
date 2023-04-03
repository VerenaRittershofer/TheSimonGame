var buttonColors = ["red", "blue", "green", "yellow"];

//Game Pattern wird von der nextSequence()-Funktion random vorgegegben
var gamePattern = [];

//speichert, welche Buttons der User geklickt hat
var userClickedPattern = [];

//Keeps track if game has started or not (only calls nextSequence() on the first keypress)
var started = false;

//Level-Variable
var level = 0;

//Start Game
$(document).on("keypress", function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});
//The if-statement evaluates the test and then runs the body code only if the test is true. If the test is false, the body is skipped.
// Code present inside if statement will be executed only when the 'NOT' of started is 'true' (!started),
//'started' variable already has boolean 'false' hence it's NOT' will be 'true',
//therefore code inside if statement will be executed.

//Once the code is executed boolean of the 'started' variable will be changed to 'true',
//therefore the code will not be executed again.

//Generiert neue Sequenz für Simon Game
function nextSequence() {
  //Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];
  //increases the level by 1 every time nextSequence() is called:
  level++;
  //updates the h1 with this change in the value of level:
  $("#level-title").text("Level " + level);
  //generiert zufällige Button-Farbe:
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  //button mit der random-Farbe leuchtet auf:
  $("#" + randomChosenColor)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  //gibt die random-Farbe an die play-Sound Funktion weiter:
  playSound(randomChosenColor);
}

//Spielt den Ton ab
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//Erkennt geklickte Farbe
$(".btn").on("click", function () {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  //Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence:
  //(Gibt den derzeitigen Level aus)
  checkAnswer(userClickedPattern.length - 1);
});

//Animiert Button beim Klicken
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  //check if the most recent user answer is the same as the game pattern:
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    //check that they have finished their sequence:
    if (userClickedPattern.length === gamePattern.length) {
      //call nextSequence() after a 1000 ms delay:
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
    //when the answer is false:
  } else {
    console.log("wrong");
    //play wrong-sound
    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();
    //animate red-flash for 200 milliseconds
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    //change h1
    $("#level-title").text("Game Over. Press Any Key To Restart.");
    //call startOver ()
    startOver();
  }
}

//Function to restart the game
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
