const quiz = {
    timeLeft: 65,
    currentQuestionIndex: 0,
    score: 0,
    timerInterval: null,
  
    startQuiz() {
      document.getElementById("start-screen").style.display = "none";
      document.getElementById("questions").style.display = "block";
      this.startTimer();
      this.displayQuestions();
    },
  
    startTimer() {
      this.timerInterval = setInterval(() => {
        this.timeLeft--;
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
        choiceBtn.addEventListener("click", event => {
          if (event.target.value === currentQuestion.correctAnswer) {
            this.score++;
          }
          this.currentQuestionIndex++;
          if (this.currentQuestionIndex === questions.length) {
            this.endQuiz();
          } else {
            this.displayQuestions();
          }
        });
        choices.appendChild(choiceBtn);
      });
    },
  
    endQuiz() {
      document.getElementById("questions").style.display = "none";
      document.getElementById("end-screen").style.display = "block";
      document.getElementById("final-score").innerHTML = this.score;
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
  
  document.getElementById("start").addEventListener("click", quiz.startQuiz.bind(quiz));