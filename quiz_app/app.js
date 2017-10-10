// Quiz Application

//*******************************************
//Quiz object constructor
//*******************************************
//Takes care of the following functions:
//  1. Holds array of questions and answers in the quiz. Initialized to empty array.
//  2. Allows questions to be added to the question array.
//  3. Keeps track of current question and provides getCurrentQuestion() method to get current indenx.
//  4. Keeps track of score.
//  5. Checks guesses. If correct, score is incremented by one.
//*******************************************

function Quiz () {
  this.questions= [];
  this.currentQuestionIndex = 0;
  this.score = 0;
}

Quiz.prototype.getCurrentQuestion = function() {
    return this.questions[this.currentQuestionIndex];
};

Quiz.prototype.addQuestion = function(question) {
  this.questions.push(question);
};

Quiz.prototype.checkAnswer = function(answer) {
    let currentQuestion = this.getCurrentQuestion();
    if(currentQuestion.isCorrectAnswer(answer)) {
        this.score++;
        console.log(`Current score: ${this.score}.`);
    }
    this.currentQuestionIndex++;
};

//*******************************************
//Question object constructor
//*******************************************

function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.isCorrectAnswer = function (choice) {
    return this.answer === choice;
};

//*******************************************
//Quiz user interface object
//*******************************************
//TO-DO:
//  randomize placement of choices
//  add in mechanism to end quiz
//  add mechanism to allow multiple numbers of choices (maybe include max number of options)
//  add admin interface (probably better in Quiz object)
// Provide feedback on whether previous answer was right.
//

var QuizUI = {
    startQuiz: function(quizObject) {
        this.currentQuiz = quizObject;
        this.renderUI();
    },
    endQuiz: function() {
        document.getElementById("quiz-container").innerHTML =`<h1>Game Over</h1> <h2> Your score is: ${this.currentQuiz.score} </h2>`;
    },
    renderUI: function() {
        console.log(`Index: ${this.currentQuiz.currentQuestionIndex}. Questions: ${this.currentQuiz.questions.length}.`);
        if (this.currentQuiz.currentQuestionIndex >= this.currentQuiz.questions.length) {
            this.endQuiz();
        } else {
            this.renderQuestion();
            this.renderChoices();
            this.renderProgress();
        }
    },
    renderQuestion: function() {
        console.log("question", this.currentQuiz.getCurrentQuestion());
        this.injectTextToID("question", this.currentQuiz.getCurrentQuestion().text)
    },
    renderChoices: function() {
        let choices = this.currentQuiz.getCurrentQuestion().choices;
        for(var i = 0; i < choices.length; i++) {
            this.injectTextToID("choice" + i, choices[i]); //Add text to choice button
            let button = document.getElementById("guess" + i);
            let button_value = choices[i];
            button.onclick = function(currentQuiz) {
                quiz.checkAnswer(button_value); //Checks the guess, advances question index, and adjusts score
                QuizUI.renderUI(); //Displays next question if there are questions left
            };
        }
    },
    renderProgress: function() {
        var currentQuestionNumber = this.currentQuiz.currentQuestionIndex + 1;
        document.getElementById('progress').innerHTML = `<li style="width: ${currentQuestionNumber / this.currentQuiz.questions.length * 100}%"> Question ${currentQuestionNumber} of ${this.currentQuiz.questions.length} (${Math.floor(currentQuestionNumber / this.currentQuiz.questions.length * 100)}%)</li>`;
    },
    injectTextToID: function(id, text) {
        var element = document.getElementById(id);
        element.innerText = text;
    },
};

// Create new Quiz object
var quiz = new Quiz();

// Create and add initial question objects
const question1 = new Question("Who is the prettiest girl in the world?", ["Baby!", "Lady the bad dog"], "Baby!");
const question2 = new Question("Who is the worst dog in the world", ["Bad dog", "Loki the Good"], "Bad dog");
const question3 = new Question("Was Loki ever ever a naughty puppy?", ["Nope!", "Of course he was!"], "Nope!")
quiz.addQuestion(question1);
quiz.addQuestion(question2);
quiz.addQuestion(question3);


// Start quiz
QuizUI.startQuiz(quiz);
