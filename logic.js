const quiz = {
  timeLeft: 65,
  score: 0,
  currentQuestionIndex: 0,
  correctAnswerIndex: 0,
  timerInterval: 0,


  startQuiz() {
    document.getElementById("start-screen").style.display = "none";
    document.getElementById("questions").style.display = "block";
    this.startTimer();
    this.displayQuestions();
  },

  startTimer() {
    this.timerInterval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      }
      document.getElementById("time").innerHTML = this.timeLeft;
      if (this.timeLeft === 0) {
        clearInterval(this.timerInterval);
        this.endQuiz();
      }
    }, 1000);
  },

  displayQuestions() {
    let currentQuestion = questions[this.currentQuestionIndex];
    document.getElementById("question-title").innerHTML = currentQuestion.title;
    let choices = document.getElementById("choices");
    choices.innerHTML = "";
    currentQuestion.choices.forEach((choice, index) => {
      let choiceBtn = document.createElement("button");
      choiceBtn.classList.add("choice");
      choiceBtn.innerHTML = `${index + 1}. ${choice}`;
      choiceBtn.value = choice; //set the value property of the button
      choiceBtn.addEventListener("click", event => {
        if (event.target.value === currentQuestion.correctAnswer) {
          this.score++; //increment the score property
          this.correctAnswers++;
          feedback.classList.remove('hide');
          feedback.classList.add('wrapper');
          feedback.textContent = "Correct answer!";
          document.body.appendChild(feedback);

          document.getElementById("correct-audio").play(); // play incorrect answer audio

        } else {
          if (this.timeLeft - 10 > 0) {
            this.timeLeft -= 10;
          } else {
            this.timeLeft = 0;
          }
          this.incorrectAnswers++;
          feedback.classList.remove('hide');
          feedback.classList.add('wrapper')
          feedback.textContent = "Wrong answer!";
          document.body.appendChild(feedback);
          document.getElementById("incorrect-audio").play(); // play incorrect answer audio
        }
        this.currentQuestionIndex++;
        if (this.currentQuestionIndex === questions.length) {
          this.endQuiz();
          return;
        } else {
          this.displayQuestions();
        }
      });
      choices.appendChild(choiceBtn);
    });
  },
  endQuiz() {
    this.timeLeft = 0;
    clearInterval(this.timer);

    let finalScore = document.getElementById("final-score");
    finalScore.textContent = `Your Score: ${this.score}`;

    document.getElementById("questions").style.display = "none";
    document.getElementById("end-screen").style.display = "block";
    document.getElementById("submit").addEventListener("click", this.saveHighScore);
  },


  saveHighScore() {
    let initials = document.getElementById("initials").value;
    let score = quiz.score;
    let highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    highScores.push({ initials, score });
    localStorage.setItem("highScores", JSON.stringify(highScores));
    window.location.href = "highscores.html";
  }
};
if (document.getElementById("start")) {
  document.getElementById("start").addEventListener("click", quiz.startQuiz.bind(quiz));
}

