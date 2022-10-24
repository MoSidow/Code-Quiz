// list of all questions, choices, and answers
var questions = [
  {
    title: 'Commonly used data types DO NOT include:',
    choices: ['strings', 'booleans', 'alerts', 'numbers'],
    answer: 'alerts',
  },
  {
    title: 'The condition in an if / else statement is enclosed within ____.',
    choices: ['quotes', 'curly brackets', 'parentheses', 'square brackets'],
    answer: 'parentheses',
  },
  {
    title: 'Arrays in JavaScript can be used to store ____.',
    choices: [
      'numbers and strings',
      'other arrays',
      'booleans',
      'all of the above',
    ],
    answer: 'all of the above',
  },
  {
    title:
      'String values must be enclosed within ____ when being assigned to variables.',
    choices: ['commas', 'curly brackets', 'quotes', 'parentheses'],
    answer: 'quotes',
  },
  {
    title:
      'A very useful tool used during development and debugging for printing content to the debugger is:',
    choices: ['JavaScript', 'terminal / bash', 'for loops', 'console.log'],
    answer: 'console.log',
  },
];

var score= 0;
var questionsN= 0;


var currentTime = document.querySelector("#currentTime");
var questionsD = document.querySelector("#questionsD");
var startQuizTimer= document.querySelector("#startQuizTimer");
var box = document.querySelector("#box");

var remainingTime = 60;
var holdTime = 0;
var timeLost = 6;
var createList = document.createElement("ul")


startQuizTimer.addEventListener("click", function () {
  if(holdTime === 0) {
    holdTime = setInterval(function () {
      remainingTime--;
      currentTime.textContent="Time: " + remainingTime;

      if(remainingTime <= 0) {
        clearInterval(holdTime);
        allDone();
        currentTime.textContent= "Time is Up";
      }
    }, 1000);
  }
  render(questionsN);
});


function render(questionsN) {
  questionsD.innerHTML = "";
  createList.innerHTML = "";
  for (var i = 0; i < questions.length; i++) {
      var userQuestion = questions[questionsN].title;
      var userChoices = questions[questionsN].choices;
      questionsD.textContent = userQuestion;
  }
  
  userChoices.forEach(function (newItem) {
      var listItem = document.createElement("li");
      listItem.textContent = newItem;
      questionsD.appendChild(createList);
      createList.appendChild(listItem);
      listItem.addEventListener("click", (compare));
  })
}


function compare(event) {
  var element = event.target;

  if (element.matches("li")) {

      var createDiv = document.createElement("div");
      createDiv.setAttribute("id", "createDiv");
      
      if (element.textContent == questions[questionsN].answer) {
          score++;
          createDiv.textContent = "Correct! The answer is:  " + questions[questionsN].answer;
        
      } else {
          
          remainingTime = remainingTime - timeLost;
          createDiv.textContent = "Wrong! The correct answer is:  " + questions[questionsN].answer;
      }
  }

  questionsN++;

  if (questionsN >= questions.length) {
      
      allDone();
      createDiv.textContent = "End of quiz!" + " " + "You got  " + score + "/" + questions.length + " Correct!";
  } else {
      render(questionsN);
  }
  questionsD.appendChild(createDiv);

}

  function allDone() {
    questionsD.innerHTML = "";
    currentTime.innerHTML = "";

    
    var createT = document.createElement("h1");
    createT.setAttribute("id", "createT");
    createT.textContent = "All Done!"

    questionsD.appendChild(createT);

  
    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");

    questionsD.appendChild(createP);

    if (remainingTime >= 0) {
        var timeRemaining = remainingTime;
        var createP2 = document.createElement("p");
        clearInterval(holdInterval);
        createP.textContent = "Your score is: " + timeRemaining;

        questionsD.appendChild(createP2);
    }


    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials: ";

    questionsD.appendChild(createLabel);

    
    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    questionsD.appendChild(createInput);

    
    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";

    questionsD.appendChild(createSubmit);
  

    createSubmit.addEventListener("click", function () {
      var initials = createInput.value;

      if (initials === null) {

          console.log("No value entered!");

      } else {
          var finalScore = {
              initials: initials,
              score: timeRemaining
          }
          console.log(finalScore);
          var allScores = localStorage.getItem("allScores");
          if (allScores === null) {
              allScores = [];
          } else {
              allScores = JSON.parse(allScores);
          }
          allScores.push(finalScore);
          var newScore = JSON.stringify(allScores);
          localStorage.setItem("allScores", newScore);
          
          window.location.replace("./HighScores.html");
      }
  });

}