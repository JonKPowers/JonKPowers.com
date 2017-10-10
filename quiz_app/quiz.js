function Quiz () {
  this.questions= [];
  this.currentQuestionIndex = 0;
  this.currentScore = 0;
}

Quiz.prototype.addQuestion = function(question) {
  this.questions.push(question);
};

Quiz.prototype.checkAnswer = function(answer) {
  let currentQuestion = this.questions[this.currentQuestionIndex];
  if (answer == 'guess0') {
    alert('Right!')
    console.log('Right answer. Q: ' + this.currentQuestionIndex);
    this.currentScore += 1;
  } else {
    alert('Nope!');
    console.log('Wrong answer. Q: ' + this.currentQuestionIndex + currentQuestion.answer);
  }
  this.currentQuestionIndex += 1;
};