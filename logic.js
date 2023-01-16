var correctAnswerIndex = 0;
var finalScore = 0;
var timer = 60;
var currentQuestionIndex = 0;
var intervalId;

document.getElementById("start").addEventListener("click", startQuiz);
function startQuiz() {
    // Start the timer
    intervalId = setInterval(function() {
        timer--;
        document.getElementById("time").textContent = timer;
        if (timer === 0) {
            endQuiz();
        }
    }, 1000);

    // Display the first question and hide the start screen
    displayQuestion();
    document.getElementById("start-screen").classList.add("hide");
    document.getElementById("questions").classList.remove("hide");
}
function displayQuestion() {
    var question = choices[currentQuestionIndex];
    // Get the current question and display it on the page
    document.getElementById("question-title").textContent = question.question;
    var choicesEl = document.getElementById("choices");
    choicesEl.innerHTML = "";

    for (var i = 0; i < question.answers.length; i++) {
        let answer = question.answers[i];
        var button = document.createElement("button");
        button.textContent = answer;
        button.addEventListener("click", (function(index) {
            return function() {
                checkAnswer(index);
            }
        })(i));
        choicesEl.appendChild(button);
    }
}

function checkAnswer(answerIndex) {
    var question = choices[currentQuestionIndex];
    if (answerIndex === question.correctAnswerIndex) {
        finalScore++;
    } else {
        timer -= 10;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex === choices.length) {
        endQuiz();
    } else {
        displayQuestion();
    }
}

function endQuiz() {
    // Stop the timer and display the final score
    clearInterval(intervalId);
    document.getElementById("final-score").textContent = finalScore;
    document.getElementById("end-screen").classList.remove("hide");
    document.getElementById("questions").classList.add("hide");
}


document.querySelector("#submit").addEventListener("click", function(event) {
    event.preventDefault();
    saveHighScore();
});

function saveHighScore() {
    // Get initials and score
    let initials = document.getElementById("initials").value;
    let score = document.getElementById("final-score").textContent;

    // Save to local storage
    let highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    highScores.push({ initials, score });
    localStorage.setItem("highScores", JSON.stringify(highScores));

    // Redirect to high scores page
    window.location.href = "highscores.html";
}