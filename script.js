const question = document.querySelector(".question");
const answers = document.querySelector(".answers");
const spnQtd = document.querySelector(".spnQtd");
const textFinish = document.querySelector(".finish span");
const content = document.querySelector(".content");
const contentFinish = document.querySelector(".finish");
const btnRestart = document.querySelector(".finish button");

const feedbackContent = document.querySelector(".feedback");
const choiceContent = document.querySelector(".choice");

const geografia = document.querySelector(".escolha");

import questions from "./questions.js";
import questions2 from "./questions2.js";

let indexAtual = 0;
let acertos = 0;
let feedback = [];
let feedback2 = [];
let perguntas= [];

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

  if (indexAtual < perguntas.length - 1) {
    indexAtual++;
    loadQuestion();
  } else {
    finalizar();
  }
}

function finalizar() {
  
  textFinish.innerHTML = `Você acertou ${acertos} de ${perguntas.length}`;

  for(let i =0; i < perguntas.length; i++) {
    
    if(feedback[i] === true) {
      feedbackContent.innerHTML += `<p class ="green"> ${i+1}. ${feedback2[i]} </p>`;
    } else {
      feedbackContent.innerHTML += `<p class ="red"> ${i+1}. ${feedback2[i]} </p>`;
    }
  }

  content.classList.toggle('content-off');
  contentFinish.classList.toggle('finish-on');

}

function loadQuestion() {
  
  spnQtd.innerHTML = `${indexAtual + 1}/${perguntas.length}`;
  const item = perguntas[indexAtual];
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


document.querySelectorAll(".escolha").forEach((item) => {
  item.addEventListener("click", () => start(item));
  
});


function start(item) {
  let selecionado = item.textContent;

  if(selecionado === ' Geografia ') {
    perguntas = questions;
    console.log(perguntas);
  } else if(selecionado === ' História ') {
    perguntas = questions2;
  } else {

  }
  content.classList.toggle('content-off');
  choiceContent.classList.toggle('choice-off');



  loadQuestion();
}

