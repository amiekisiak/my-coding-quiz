var correctAnswerIndex = 0;
var finalScore = 0;
var timer = 60;
var currentQuestionIndex = 0;
var intervalId;



function startQuiz() {
    // Start the timer
    intervalId = setInterval(function() {
        timer--;
        if (timer === 0) {
            clearInterval(intervalId);
            endQuiz();
        }
    }, 1000);
    // Check for the length of the choices array before calling showQuestion
    if (choices && choices.length > 0) {
        showQuestion();
        document.getElementById("start-screen").classList.add("hide");
        document.getElementById("questions").classList.remove("hide");
    }
}
if (choices && choices.length > 0) {
    showQuestion();
}

function showQuestion() {
    var question = choices[currentQuestionIndex];
    // Get the current question and display it on the page
    document.getElementById("question-title").textContent = question.question;
    var choicesEl = document.getElementById("choices");
    choicesEl.innerHTML = "";

    for (var i = 0; i < answer.question.length; i++) {
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
    if(currentQuestionIndex < 0 || currentQuestionIndex >= choices.length) {
        endQuiz();
    }else{
    currentQuestionIndex++;
    if (currentQuestionIndex === choices.length) {
        endQuiz();
    } else {
        showQuestion();
    }
    }
}

document.getElementById("start").addEventListener("click", startQuiz);
function endQuiz() {
    clearInterval(intervalId);
    document.getElementById("questions").classList.add("hide");
    document.getElementById("end-screen").classList.remove("hide");
    document.getElementById("final-score").textContent = finalScore;
}