var intervalId;
var timerNumber;
var delayNewRound;
var currentQuestion;
var questionsAsked = 0;
var userSelect;
var correctAnswer;
var incorrectAnswer;
var unanswered;
var answered;
var correctAnswerText;
var correctAnserIndex;

var quizQuestions = [
    {
        question: "What are Durin's Folk more commonly known as?",
        answers: [
            'Hobbits from outside The Shire',
            'Dwarves',
            'Elves',
            'Great Eagles'
        ],
        answer: 1
    },

    {
        question: "What was the bridge of Khazad-Dum?",
        answers: [
            'The bridge over the Brandywine river, marking the end of The Shire.',
            'The mythical gateway between Middle-Earth and Valinor, the land of the gods.',
            'The name of the broken sword before it was reforged as the legendary Andúril.',
            'The bridge inside the Great Gates of Moria where Gandalf faced the Balrog.'
        ],
        answer: 3
    },

    {
        question: "What kind of creatures are the spawn of Ungoliant?",
        answers: [
            'Hill Giants',
            'Uruk-hai',
            'Giant Spiders',
            'Flying Fell Beasts'
        ],
        answer: 2
    },

    {
        question: "Which of these is not a public inn in Middle Earth?",
        answers: [
            'The Old Guesthouse',
            'The Green Dragon',
            'The Prancing Pony',
            'The Southern Star'
        ],
        answer: 3
    },

    {
        question: "Who participated in the battle of Isengard?",
        answers: [
            'Saruman’s forces versus King Théoden’s Rohirrim.',
            'Saruman’s forces versus the Ents.',
            'Orcs of Dol Guldur versus the Galadhrim of Lothlórien.',
            'The forces of the Dark Lord Sauron versus the forces of Gondor.'
        ],
        answer: 1
    },

    {
        question: "Which of these items was not found in the troll's cave?",
        answers: [
            'Orcrist the Goblin-cleaver',
            'Glamdring the Foe-hammer',
            'Sting',
            'Angrist'
        ],
        answer: 3
    },

    {
        question: "What marked the start of the third age?",
        answers: [
            'The defeat of Sauron at the hands of Last Alliance of Elves and Men.',
            'The destruction of Beleriand in the War of Wrath.',
            'The death of Sauron after the destruction of the One Ring.',
            'The creation of the Two Trees that gave light and time to the world.'
        ],
        answer: 0
    },

    {
        question: "What are the palantiri, and how many are there?",
        answers: [
            'Three Rings of Power given to the Elves.',
            'Three jewels created by Fëanor.',
            'Seven Seeing-Stones',
            'Three strands of Galadriels hair given to Gimli.'
        ],
        answer: 2
    },
];

// after clicking the start button, begin the game.
$('#results').hide();

$('#startButton').on('click', function () {
    $('#startButton').hide();
    newGame();
});


function newGame() {
    $('#answerChoices').empty();
    currentQuestion = 0;
    correctAnswer = 0;
    incorrectAnswer = 0;
    unanswered = 0;
    askQuestion();
}

function askQuestion() {
    $('#answerPanel').hide();
    $('#message').empty();
    answered = true;

    $('#question').html(quizQuestions[currentQuestion].question);



    // for (var i = 0; i < quizQuestions.answers.length; i++) {
    for (var i = 0; i < 4; i++) {
        var answerButton = $("<div>");
        answerButton.text(quizQuestions[currentQuestion].answers[i]);
        answerButton.attr({ "data-index": i });
        // answerButton.attr( "data-index", i );
        answerButton.addClass('choiceSelected')
        $('#answerChoices').append(answerButton);
    }

    


    // set the game timer running
    gameTimer();

    $(".choiceSelected").on("click", function () {
        userSelect = $(this).data("index");
        clearInterval(intervalId);
        checkAnswers();
    });

}


function checkAnswers() {
    // $("#currentQuestion").empty();
    $('#answerPanel').show();
    $("#question").empty(); // clears question
    $(".choiceSelected").empty(); //Clears answer choices
    $("#answerChoices").empty();
    console.log("checking answers");
    console.log("The current question is: " + currentQuestion);

    correctAnswerText = quizQuestions[currentQuestion].answers[quizQuestions[currentQuestion].answer];
    correctAnswerIndex = quizQuestions[currentQuestion].answer;

    //This checks to see if user choice is correct, incorrect, or unanswered
    if ((userSelect === correctAnswerIndex) && (answered === true)) {
        correctAnswer++;
        console.log("correct");
        
        $('#message').html("That is correct");
    } else if ((userSelect != correctAnswerIndex) && (answered === true)) {
        incorrectAnswer++;
        console.log("incorrect");
        $('#message').html("That is incorrect. The answer was " + correctAnswerText);
        $('#correctedAnswer').html('The correct answer was: ' + correctAnswerText);
    } else {
        unanswered++;
        $('#message').html("Out of time. The correct answer was " + correctAnswerText);
        answered = true;
    }


    // check to see is all questions have been asked
    if (currentQuestion === (quizQuestions.length - 1)) {
        // if there are no more questions, go to final rusults page.
        setTimeout(finalResults, 1000 * 3);
        // wait before asking another question.
    } else {
        currentQuestion++;
        setTimeout(askQuestion, 1000 * 3);
    }
}

function finalResults() {
    $('#answerPanel').hide();
    $('#results').show();
    console.log("Game is over");
    $('#correct').html("Correct Answers: " + correctAnswer);
    console.log("Correct Answers: " + correctAnswer);
    $('#incorrect').html("Incorrect Answers: " + incorrectAnswer);
    console.log("Incorrect Answers: " + incorrectAnswer);
    $('#unanswered').html("Unanswered: " + unanswered);
    console.log("Unanswered: " + unanswered);

    // upon clicking play again, hide the results page
    $("#playAgain").on("click", function () {
        $(this).hide();
        $('#results').hide();
        newGame();
    });
}

function gameTimer() {
    // set the timer
    timerNumber = 15;
    // display the starting number of the timer
    $('#show-timer').html("<h2>" + timerNumber + "</h2>");
    answered = true;
    clearInterval(intervalId);
    intervalId = setInterval(decrement, 1000 * 1);

}

// function to decrement numbers in the timer
function decrement() {

    timerNumber--;
    // show the timer in on the page
    $("#show-timer").html("<h2>" + timerNumber + "</h2>");

    
    if (timerNumber === 0) {
        // currentQuestion++;
        console.log("Times up!");
        console.log(currentQuestion);
        answered = false;
        stop();
        checkAnswers();
    }
}


// stop the game timer.
function stop() {
    clearInterval(intervalId);

}

// function to end the game and show results
function gameOver() {
    console.log("Game over");
}