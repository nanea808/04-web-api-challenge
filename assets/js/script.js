// GIVEN I am taking a code quiz
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

var scoreContainer = document.querySelector(".high-score");
var yourScore = document.querySelector("#your-score");
var initialForm = document.querySelector("#initial-form");
var initialsInput = document.querySelector("#score-name");

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

function endQuestionTimer() {
    var timerInterval1 = setInterval(function () {
        let secondsLeft = secondsLeftAnnounce;
        secondsLeft--;
        if (secondsLeft=== 0) {
            if (questionsArray[questionCount + 1] === undefined) {
                // WHEN all questions are answered or the timer reaches 0
                // THEN the game is over
                quizContainer.setAttribute("style", "display: none;");
                // WHEN the game is over
                scoreContainer.setAttribute("style", "display: flex;");
                yourScore.textContent += secondsLeftQuiz;
            } else {
                questionCount++;
                questionMaker(questionsArray[questionCount], answersTextArrays[questionCount]);
            }
            announcerTag.textContent = "";
            clearInterval(timerInterval1);
        }
    }, 600);
}

function quizTimer() {
    var timerInterval2 = setInterval(function () {
        secondsLeftQuiz--;
        if (secondsLeftQuiz === 0) {
            // WHEN all questions are answered or the timer reaches 0
            clearInterval(timerInterval2);
        }
    }, 1000);
}

function questionMaker(question, answers) {
    questionTag.textContent = question;
    for (var x = 0; x < answers.length; x++) {
        answersTags[x].textContent = x + 1 + "." + answers[x];
    }
}

function highScoreList() {
    for (var x = 0; x < localStorage.length; x++) {
        var p = document.createElement("p");
        scoreObject = JSON.parse(localStorage.getItem("score" + String(x)));
        p.textContent = scoreObject.initials + ": " + scoreObject.highScore;
        
        startButton.parentElement.appendChild(p);
    }
}
highScoreList();

// WHEN I click the start button
startButton.addEventListener("click", function () {
    // THEN a timer starts and I am presented with a question
    quizTimer();
    startButton.parentElement.setAttribute("style", "display: none;");
    quizContainer.setAttribute("style", "display: flex;");
});

questionMaker(questionsArray[questionCount], answersTextArrays[questionCount]);

quizContainer.addEventListener("click", function (event) {
    // WHEN I answer a question
    var element = event.target;

    if (element.matches("button")) {
        var answerIndex = element.getAttribute("data-index")
        if (answerIndex == answerList[questionCount]) {
            announcerTag.textContent = "Correct!";
        } else {
            // WHEN I answer a question incorrectly
            announcerTag.textContent = "Wrong!";
            // THEN time is subtracted from the clock
            secondsLeftQuiz -= 10;
        }
        endQuestionTimer();
        finalScore = secondsLeftQuiz;
    }
});

// THEN I can save my initials and my score
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
    } 

    scoreContainer.setAttribute("style", "display: none;");
    startButton.parentElement.setAttribute("style", "display: contents;");
    questionCount = 0;
    secondsLeftQuiz = 60;
    yourScore.textContent = "Your Score: ";
});



