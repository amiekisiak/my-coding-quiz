let highScores = JSON.parse(localStorage.getItem("highScores")) || [];
let highScoresList = document.getElementById("highscores");
// Loop over scores and add to list
for (let i = 0; i < highScores.length; i++) {
    let score = highScores[i];

    let li = document.createElement("li");
    li.textContent = `${score.initials} - ${score.score}`;
    highScoresList.appendChild(li);
  }
  document.getElementById("submit").addEventListener("click", function(event) {
    event.preventDefault();
    highScores();
});



if(submitButton){
    submitButton.addEventListener("click", function(){
    // code to handle submit button click
    document.getElementById("start").addEventListener("click", function() {
        startQuiz();
        displayQuestion();
    });
    // such as getting the user's initials and score
    // and saving them to local storage
    let initials = document.getElementById("initials").value;
    let score = finalScore;
    highScores.push({ initials, score });
    localStorage.setItem("highScores", JSON.stringify(highScores));
    window.location.href = "highscores.html";
    });
}

// Get the list element to display the scores
if(scoresList){
    for (let i = 0; i < highScores.length; i++) {
        let score = highScores[i];
        let li = document.createElement("li");
        li.textContent = `${score.initials} - ${score.score}`;
        scoresList.appendChild(li);
    }
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


// Handle clear high scores button click

//Function clearing the list of winners and clearing local storage

function endQuiz() {
    clearInterval(intervalId);
    let finalScoreEl = document.getElementById("final-score");
    if(finalScoreEl){
        finalScoreEl.textContent = finalScore;
    }
    document.getElementById("questions").classList.add("hide");
    document.getElementById("end-screen").classList.remove("hide");
}