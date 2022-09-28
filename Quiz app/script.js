let currentQuiz = 0,
  score = 0,
  correctAnswer;

const answerEl = document.querySelectorAll(".ans"),
  answerArr = Array.from(answerEl),
  answerInput = document.querySelectorAll(".answer"),
  questionEl = document.getElementById("question"),
  submitBtn = document.getElementById("submit"),
  quizEl = document.getElementById("quiz");

const quest = () => {
  fetch("https://the-trivia-api.com/api/questions?limit=5")
    .then((res) => res.json())
    .then((data) => {
      loadQuiz(data);

      submitBtn.addEventListener(
        "click",
        (submit = () => {
          const answer = getSelected();

          if (answer) {
            if (answer === answerArr[correctAnswer].htmlFor) {
              score++;
            }

            currentQuiz++;

            if (currentQuiz < data.length) {
              loadQuiz(data);
            } else {
              quizEl.innerHTML = `
                            <h2>You Answered correctly at ${score}/${data.length} questions</h2>
                            <button onclick="location.reload()">Reload</button>
                            `;
            }
          }
        })
      );

      return data;
    });
};
quest();

function loadQuiz(data) {
  let correct = Math.floor(Math.random() * 4);
  correctAnswer = correct;

  deselect();

  const currentQuizData = data[currentQuiz];

  questionEl.innerHTML = currentQuizData.question;

  answerArr[correct].classList.add("correct");

  const domAnswer = answerArr.filter((domAnswers) => {
    if (!domAnswers.classList.contains("correct")) {
      return domAnswers;
    }
  });

  domAnswer.forEach((answers, i) => {
    answers.innerHTML = currentQuizData.incorrectAnswers[i];
  });

  answerArr[correct].innerHTML = currentQuizData.correctAnswer;
  console.log(answerArr[correct]);
  answerArr[correct].classList.remove("correct");
}

function getSelected() {
  let answer = undefined;

  answerInput.forEach((answerIn) => {
    if (answerIn.checked) {
      answer = answerIn.id;
    }
  });

  return answer;
}

function deselect() {
  answerInput.forEach((answerIn) => {
    answerIn.checked = false;
  });
}
