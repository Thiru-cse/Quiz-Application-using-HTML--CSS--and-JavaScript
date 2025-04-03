const quizData = [
  {
    question: "What is the capital of France?",
    a: "Berlin",
    b: "Madrid",
    c: "Paris",
    d: "Lisbon",
    correct: "c",
  },
  {
    question: "Who is the founder of Microsoft?",
    a: "Bill Gates",
    b: "Steve Jobs",
    c: "Elon Musk",
    d: "Mark Zuckerberg",
    correct: "a",
  },
  {
    question: "Which language is used for web apps?",
    a: "Python",
    b: "JavaScript",
    c: "Java",
    d: "C++",
    correct: "b",
  },
];

const questionEl = document.getElementById("question");
const answerEls = document.querySelectorAll(".answer");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const resultEl = document.getElementById("result");
const submitBtn = document.getElementById("submit");
const nextBtn = document.getElementById("next");

let currentQuiz = 0;
let score = 0;

loadQuiz();

function loadQuiz() {
  deselectAnswers();
  resultEl.innerText = "";
  submitBtn.style.display = "inline-block";
  nextBtn.style.display = "none";

  const currentQuizData = quizData[currentQuiz];
  questionEl.innerText = currentQuizData.question;
  a_text.innerText = currentQuizData.a;
  b_text.innerText = currentQuizData.b;
  c_text.innerText = currentQuizData.c;
  d_text.innerText = currentQuizData.d;
}

function deselectAnswers() {
  answerEls.forEach((answerEl) => (answerEl.checked = false));
  answerEls.forEach((answerEl) => {
    answerEl.nextElementSibling.classList.remove("correct", "wrong");
  });
}

function getSelected() {
  let answer;
  answerEls.forEach((answerEl) => {
    if (answerEl.checked) {
      answer = answerEl.id;
    }
  });
  return answer;
}

submitBtn.addEventListener("click", () => {
  const answer = getSelected();
  if (answer) {
    submitBtn.style.display = "none";
    nextBtn.style.display = "inline-block";

    if (answer === quizData[currentQuiz].correct) {
      resultEl.innerHTML = `<span class="correct">Correct!</span>`;
      score++;
    } else {
      resultEl.innerHTML = `<span class="wrong">Wrong!</span> Correct answer is: <span class="correct">${
        quizData[currentQuiz][quizData[currentQuiz].correct]
      }</span>`;
    }

    // highlight correct answer
    answerEls.forEach((ans) => {
      if (ans.id === quizData[currentQuiz].correct) {
        ans.nextElementSibling.classList.add("correct");
      } else if (ans.checked) {
        ans.nextElementSibling.classList.add("wrong");
      }
    });
  }
});

nextBtn.addEventListener("click", () => {
  currentQuiz++;
  if (currentQuiz < quizData.length) {
    loadQuiz();
  } else {
    quiz.innerHTML = `<h2>You scored ${score}/${quizData.length}</h2>
        <button onclick="location.reload()">Play Again</button>`;
  }
});
