var intervalId;
var timerNumber;
var delayNewRound;
var questionsAsked = 0;
var answerChoices = [];

var quizQuestions = [
    {
        question: "What is 10/2?",
        answers: {
            a: '3',
            b: '5',
            c: '115'
        },
        correctAnswer: 'b'
    },
    {
        question: "What is 30/3?",
        answers: {
            a: '3',
            b: '5',
            c: '10'
        },
        correctAnswer: 'c'
    }
];

// after clicking the start button, begin the game.
$('#startButton').on('click', newGame)


function newGame() {
    $('#startButton').hide();
    gameTimer();
}

function displayQuestion(questionNumber) {
    for (var i = 0; i < quizQuestions.length; i++) {
        $('#question').text(quizQuestions[questionNumber].question);
    //     $('#choiceA').text(quizQuestions[questionNumber].answers.a);
    //     $('#choiceB').text(quizQuestions[questionNumber].answers.b);
    //     $('#choiceC').text(quizQuestions[questionNumber].answers.c);
    // }
    // creating image and assigning each image a value from randomNumbers array.

        for (letter in quizQuestions[questionNumber].answers) {
            answerChoices.push(quizQuestions[i].answers[letter]);
        }

        // For each iteration, create an imageCrystal
        var answerButton = $("<button>");

        answerButton.addClass("answerChoices");

        // Each crystal image generated from crystal Images array, which holds all the images.
        // imageCrystal.attr("src", crystalImages[i]);

        // Each imageCrystal will be given a data attribute called data-crystalValue.
        // The value of each crystal is each value in the randomNumbers[] array.
        answerButton.attr("data-answerValue", answerChoices[i]);

        // add images and their attributes to the page.
        $("#answerChoices").append(answerButton);
    

    
    }
}


function checkAnswers () {
    $('.answerChoice').on('click', function() {
        console.log()
    });
}

function gameTimer() {
    // set the timer
    timerNumber = 5;
    // display the starting number of the timer
    $('#show-timer').html("<h2>" + timerNumber + "</h2>");
    clearInterval(intervalId);
    intervalId = setInterval(decrement, 1000 * 1);
    // display the next question in line.
    displayQuestion(questionsAsked);
    
}

// function to decrement numbers in the timer
function decrement() {

    timerNumber--;
    // show the timer in on the page
    $("#show-timer").html("<h2>" + timerNumber + "</h2>");

    // 
    if (timerNumber === 0) {
        questionsAsked++;
        console.log("Times up!");
        console.log(questionsAsked);
        stop();
        // if all the questions haven't been asked, contine the game
        if (questionsAsked != quizQuestions.length) {
            betweenRoundTimer();
        // otherwise, end the game.
        } else {
            gameOver();
        }
    }
}

// time out function for between questions.
function betweenRoundTimer() {
    clearTimeout(delayNewRound);
    delayNewRound = setTimeout(function () {
        console.log("between rounds time is up");
        gameTimer();
        // alert("between rounds time is up");
    }, 1000 * 3);
        
}

// stop the game timer.
function stop() {
    clearInterval(intervalId);
    
}

// function to end the game and show results
function gameOver() {
    console.log("Game over");
}