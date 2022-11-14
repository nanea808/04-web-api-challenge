// GIVEN I am taking a code quiz
var startButton = document.querySelector(".start-button");
var quizContainer = document.querySelector(".quiz-time");
var questionTag = document.querySelector("#question");
var announcerTag = document.querySelector("#announcer");
var scoreContainer = document.querySelector(".high-score");
var answersTags = {
    0: document.querySelector("#answer1"),
    1: document.querySelector("#answer2"),
    2: document.querySelector("#answer3"),
    3: document.querySelector("#answer4")
}

var questionsArray = [
    "Inside which HTML element do we put the JavaScript?",
    "Where is the correct place to insert a JavaScript?"
];
var answersTextArrays = {
    0: ["<js>", "<script>", "<javascript>", "<scripting>"],
    1: ["The <head> section", "The <body> section", "Both are correct"]
}
var answerList = [1, 1];
var questionCount = 0;
var score = 0;

var secondsLeftQuiz = 60;
var secondsLeftAnnounce = 1;

function announceTimer() {
    var timerInterval = setInterval(function() {
    secondsLeftAnnounce--;
    if (secondsLeftAnnounce === 0) {
        clearInterval(timerInterval);
        announcerTag.textContent = "";
    }
    }, 600);
}

function quizTimer() {
    var timerInterval = setInterval(function() {
    secondsLeftQuiz--;
    if (secondsLeftQuiz === 0) {
        // WHEN all questions are answered or the timer reaches 0
        clearInterval(timerInterval);
    }
    }, 1000);
} 

function questionMaker(question, answers) {
    questionTag.textContent = question;
    for (x = 0; x < answers.length; x++) {
        answersTags[x].textContent = x + 1 + "." + answers[x];
    }
}
// WHEN I click the start button
startButton.addEventListener("click", function () {
    // THEN a timer starts and I am presented with a question
    quizTimer();
    startButton.setAttribute("style", "visibility: hidden;");
    quizContainer.setAttribute("style", "display: flex;");
});

questionMaker(questionsArray[questionCount], answersTextArrays[questionCount]);

quizContainer.addEventListener("click", function (event) {
    // WHEN I answer a question
    var element = event.target;

    if (element.matches("button")) {
        var answerIndex = element.getAttribute("data-index")
        debugger;
        if (answerIndex == answerList[questionCount]) {
            announcerTag.textContent = "Correct!";
            score++
        } else {
            // WHEN I answer a question incorrectly
            announcerTag.textContent = "Wrong!"
            // THEN time is subtracted from the clock
            secondsLeftQuiz -= 10;
        }
        announceTimer();

        // THEN I am presented with another question
        if (questionsArray[questionCount + 1] === undefined) {
            // WHEN all questions are answered or the timer reaches 0
            quizContainer.setAttribute("style", "display: none;");
            // THEN the game is over

        } else {
            questionCount++
            questionMaker(questionsArray[questionCount], answersTextArrays[questionCount]);
        }
    }
})

// WHEN the game is over
// THEN I can save my initials and my score