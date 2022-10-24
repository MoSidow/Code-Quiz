var Highscores = document.querySelector("#Highscores");
var clear = document.querySelector("#clear");
var back = document.querySelector("#back");

// When clear is clicked, page is reloaded and local storage is creared
clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});

var allScores = localStorage.getItem("allScores");
allScores = JSON.parse(allScores);

if (allScores !== null) {

    for (var i = 0; i < allScores.length; i++) {

        var createLi = document.createElement("li");
        createLi.textContent = allScores[i].initials + " " + allScores[i].score;
        Highscores.appendChild(createLi);

    }
// back button
}
back.addEventListener("click", function () {
    window.location.replace("./index.html");
});