// Initalizes question tags
var startButton = document.querySelector(".start-button");
var quizContainer = document.querySelector(".quiz-time");
var questionTag = document.querySelector("#question");
var announcerTag = document.querySelector("#announcer");
var answersTags = {
    0: document.querySelector("#answer1"),
    1: document.querySelector("#answer2"),
    2: document.querySelector("#answer3"),
    3: document.querySelector("#answer4")
}

// Initializes score tags
var scoreContainer = document.querySelector(".high-score");
var yourScore = document.querySelector("#your-score");
var initialForm = document.querySelector("#initial-form");
var initialsInput = document.querySelector("#score-name");

// This is where you set your questions and answers
var questionsArray = [
    "Inside which HTML element do we put the JavaScript?",
    "Where is the correct place to insert a JavaScript?",
    "How do you write 'Hello World' in an alert box?"
];
var answersTextArrays = {
    0: ["<js>", "<script>", "<javascript>", "<scripting>"],
    1: ["The <head> section", "The <body> section", "Both are correct", "None are correct"],
    2: ["msg('Hello World')", "alert('Hello World')", "msgBox('Hello World')", "alertBox('Hello World')"]
}
var answerList = [1, 1, 1];
var questionCount = 0;

var secondsLeftQuiz = 60;
var secondsLeftAnnounce = 1;
var finalScore = null;

// This timer creates a delay after answering each question
function endQuestionTimer() {
    var timerInterval1 = setInterval(function () {
        let secondsLeft = secondsLeftAnnounce;
        secondsLeft--;
        if (secondsLeft=== 0) {
            // Moves on to next question or ends game if no questions are left
            if (questionsArray[questionCount + 1] === undefined) {
                quizContainer.setAttribute("style", "display: none;");
                scoreContainer.setAttribute("style", "display: flex;");
                yourScore.textContent += secondsLeftQuiz;
                finalScore = secondsLeftQuiz;
            } else {
                questionCount++;
                questionMaker(questionsArray[questionCount], answersTextArrays[questionCount]);
            }
            // Resets question answer announcer
            announcerTag.textContent = "";
            clearInterval(timerInterval1);
        }
    }, 600);
}

// Quiz timer
function quizTimer() {
    var timerInterval2 = setInterval(function () {
        secondsLeftQuiz--;
        if (secondsLeftQuiz === 0) {
            // WHEN all questions are answered or the timer reaches 0
            clearInterval(timerInterval2);
        }
    }, 1000);
}

// Loads questions and answers on to page
function questionMaker(question, answers) {
    questionTag.textContent = question;
    for (var x = 0; x < answers.length; x++) {
        answersTags[x].textContent = x + 1 + "." + answers[x];
    }
}

// Loads high-score list onto page after refresh
function highScoreList() {
    for (var x = 0; x < localStorage.length; x++) {
        var p = document.createElement("p");
        scoreObject = JSON.parse(localStorage.getItem("score" + String(x)));
        p.textContent = scoreObject.initials + ": " + scoreObject.highScore;
        
        startButton.parentElement.appendChild(p);
    }
}
highScoreList();

// Starts quiz when "start" button is pressed
startButton.addEventListener("click", function () {
    quizTimer();
    startButton.parentElement.setAttribute("style", "display: none;");
    quizContainer.setAttribute("style", "display: flex;");
});
// Presents first question
questionMaker(questionsArray[questionCount], answersTextArrays[questionCount]);

// This checks if a user is correct upon answering a question
quizContainer.addEventListener("click", function (event) {
    var element = event.target;

    if (element.matches("button")) {
        var answerIndex = element.getAttribute("data-index")
        if (answerIndex == answerList[questionCount]) {
            announcerTag.textContent = "Correct!";
        } else {
            announcerTag.textContent = "Wrong!";
            secondsLeftQuiz -= 10;
        }
        // Once a question is answered a delay timer is set
        endQuestionTimer();
    }
});

// Saves users initials and score
initialForm.addEventListener("submit", function(event) {
    event.preventDefault();
    var scoreInitials = initialsInput.value.trim();
    if (scoreInitials != "") {
        var scoreSave = {
            initials: scoreInitials,
            highScore: finalScore
        }
        localStorage.setItem("score" + localStorage.length, JSON.stringify(scoreSave));
        initialsInput.value = "";

        // Updates score list with new score
        var p = document.createElement("p");
        p.textContent = scoreSave.initials + ": " + scoreSave.highScore;
        startButton.parentElement.appendChild(p);
    } 

    // Unhides start button and score list
    scoreContainer.setAttribute("style", "display: none;");
    startButton.parentElement.setAttribute("style", "display: contents;");
    // Resets variables to default
    questionCount = 0;
    secondsLeftQuiz = 60;
    yourScore.textContent = "Your Score: ";
});



