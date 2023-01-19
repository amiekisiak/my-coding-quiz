
document.addEventListener("DOMContentLoaded", function () {
  // get the high scores from local storage
  let highScores = JSON.parse(localStorage.getItem("highScores")) || [];
   // sort the high scores array in descending order based on score
  let sortedScores = highScores.sort((a, b) => b.score - a.score);
    // get the high scores list element from the DOM
  let highScoresList = document.getElementById("highscores");


  // iterate over the sorted high scores array
  sortedScores.forEach(score => {
    let li = document.createElement("li");
    li.innerHTML = `${score.initials} - ${score.score}`;
    highScoresList.appendChild(li);
  });

  // add an event listener to the "clear" button to remove the high scores from local storage
  document.getElementById("clear").addEventListener("click", function () {
    localStorage.removeItem("highScores");
    highScoresList.innerHTML = "";
  });
});