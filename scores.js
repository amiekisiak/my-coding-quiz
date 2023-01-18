
document.addEventListener("DOMContentLoaded", function () {
    
     

    let highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    
    let sortedScores = highScores.sort((a, b) => b.score - a.score);
  
    let highScoresList = document.getElementById("highscores");
  
    sortedScores.forEach(score => {
      let li = document.createElement("li");
      li.innerHTML = `${score.initials} - ${score.score}`;
      highScoresList.appendChild(li);
    });
    
    document.getElementById("clear").addEventListener("click", function () {
      localStorage.removeItem("highScores");
      highScoresList.innerHTML = "";
    });
  });