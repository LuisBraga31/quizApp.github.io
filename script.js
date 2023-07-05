const question = document.querySelector(".question");
const answers = document.querySelector(".answers");
const spnQtd = document.querySelector(".spnQtd");
const textFinish = document.querySelector(".finish span");
const content = document.querySelector(".content");
const contentFinish = document.querySelector(".finish");
const btnRestart = document.querySelector(".finish button");

const feedbackContent = document.querySelector(".feedback");

import questions from "./questions.js";

let indexAtual = 0;
let acertos = 0;
let feedback = [];
let feedback2 = [];

btnRestart.onclick = () => {
  content.classList.toggle('content-off');
  contentFinish.classList.toggle('finish-on');
  feedback = [];
  feedback2 = [];
  feedbackContent.innerHTML = "";
  indexAtual = 0;
  acertos = 0;
  loadQuestion();
};

function nextQuestion(e) {
  
  if (e.target.getAttribute("data-correct") === "true") {
    acertos++;
    feedback.push(true);
  } else {
    feedback.push(false);
  }

  if (indexAtual < questions.length - 1) {
    indexAtual++;
    loadQuestion();
  } else {
    finalizar();
  }
}

function finalizar() {
  textFinish.innerHTML = `Você acertou ${acertos} de ${questions.length}`;

  console.log(feedback);
  console.log(feedback2);

  for(let i =0; i < 4; i++) {
    console.log(feedback[i] + " " + feedback2[i]);
    if(feedback[i] === true) {
      feedbackContent.innerHTML += `<p class ="green"> ${i+1}. ${feedback2[i]} </p>`;
    } else {
      feedbackContent.innerHTML += `<p class ="red"> ${i+1}. ${feedback2[i]} </p>`;
    }
    
    
  }
  
  console.log(feedbackContent);

  content.classList.toggle('content-off');
  contentFinish.classList.toggle('finish-on');

}

function loadQuestion() {
  spnQtd.innerHTML = `${indexAtual + 1}/${questions.length}`;
  const item = questions[indexAtual];
  answers.innerHTML = "";
  feedback2.push(item.question);
  question.innerHTML = item.question;
  

  item.answers.forEach((answer) => {
    const div = document.createElement("div");

    div.innerHTML = `
    <button class="answer" data-correct="${answer.correct}">
      ${answer.option}
    </button>
    `;

    answers.appendChild(div);
  });

  document.querySelectorAll(".answer").forEach((item) => {
    item.addEventListener("click", nextQuestion);
  });
}

loadQuestion();