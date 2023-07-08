const question = document.querySelector(".question");
const answers = document.querySelector(".answers");
const tag = document.querySelector(".tag");
const spnQtd = document.querySelector(".spnQtd");
const textFinish = document.querySelector(".finish span");
const content = document.querySelector(".content");
const contentFinish = document.querySelector(".finish");
const btnRestart = document.querySelector(".finish button");

const feedbackContent = document.querySelector(".feedback");
const choiceContent = document.querySelector(".choice");

const backMenu = document.querySelector(".voltar");

import questions from "./questions.js";

let indexAtual = 0;
let acertos = 0;
let feedback = [];
let feedback2 = [];
let perguntas= [];


document.querySelectorAll(".escolha").forEach((item) => {
  item.addEventListener("click", () => start(item));  
});

function menu() {
  contentFinish.classList.toggle('finish-on');
  choiceContent.classList.toggle('choice-off');
  perguntas= [];
  feedback = [];
  feedback2 = [];
  feedbackContent.innerHTML = "";
  indexAtual = 0;
  acertos = 0;
}

backMenu.addEventListener("click", menu);

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
  
  tag.innerHTML = perguntas[indexAtual].tag;
  if(perguntas[indexAtual].tag === 'Geografia') {
    tag.style.backgroundColor = '#9a5833';
  } else if(perguntas[indexAtual].tag === 'História') {
    tag.style.backgroundColor = '#F7C942';
  } else if(perguntas[indexAtual].tag === 'Matemática') {
    tag.style.backgroundColor = '#5cb8ff';
  } else if(perguntas[indexAtual].tag === 'Biologia') {
    tag.style.backgroundColor = '#70ff63';
  }
  
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

function start(item) {
  let selecionado = item.textContent;

  if(selecionado === ' Geografia ') {
    
    for(let i = 0; i < questions.length; i++) {
      if(questions[i].tag === 'Geografia') {
        perguntas.push(questions[i]);
      }
    }

  } else if(selecionado === ' História ') {
    
    for(let i = 0; i < questions.length; i++) {
      if(questions[i].tag === 'História') {
        perguntas.push(questions[i]);
      }
    }

  } else if(selecionado === ' Matemática ') {
    
    for(let i = 0; i < questions.length; i++) {
      if(questions[i].tag === 'Matemática') {
        perguntas.push(questions[i]);
      }
    }
  } else if(selecionado === ' Biologia ') {
    
    for(let i = 0; i < questions.length; i++) {
      if(questions[i].tag === 'Biologia') {
        perguntas.push(questions[i]);
      }
    }
  }

  content.classList.toggle('content-off');
  choiceContent.classList.toggle('choice-off');

  loadQuestion();
}

