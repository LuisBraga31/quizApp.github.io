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

const body = document.querySelector("body");
const main = document.querySelector("main");

// Importando questões
import questions from "./questions.js";

let indexAtual = 0;
let acertos = 0;
let feedback = [];
let feedback2 = [];
let perguntas= [];

// Iniciando a aplicação selecionando um tema
document.querySelectorAll(".escolha").forEach((item) => {
  item.addEventListener("click", () => start(item));  
});

function menu() {
  contentFinish.classList.toggle('finish-on');
  choiceContent.classList.toggle('choice-off');
  main.classList.toggle("quizContent");
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

// Carregar proxima pergunta
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
    finalizar(e);
  }
}

// Carregar tela de finalização
function finalizar(ev) {
  ev.preventDefault();
  let url = '';
  if(acertos === 0) {
    url = 'https://www.maxieduca.com.br/blog/wp-content/uploads/2017/10/Nota-Zero.jpg';
  } else if(acertos === 1) {
    url = 'https://extra.globo.com/incoming/25209387-3f4-847/w640h360-PROP/meme-chloe.png';
  } else if(acertos === 2) {
    url = 'https://pm1.aminoapps.com/6389/9c28e4faffa7fc8556b19863a3f2bbab507a1cab_hq.jpg';
  } else if(acertos === 3) {
    url = 'https://ichef.bbci.co.uk/news/640/amz/worldservice/live/assets/images/2015/04/15/150415162940_success_kid_624x351_arquivopessoal.jpg';
  } else if(acertos === 4) {
    url = 'https://media.tenor.com/53mmUaqb1b0AAAAC/copa-torcedor.gif';
  }
  
  Swal.fire({
    title: 'Jogo Finalizado!',
    text: `Você acertou ${acertos} de ${perguntas.length}`,
    imageUrl: `${url}`,
    imageWidth: 400,
    imageHeight: 200,
    imageAlt: 'Custom image',
    confirmButtonText: 'Ver feedback',
    confirmButtonColor: 'green'
  })

  body.classList.remove("swal2-height-auto");
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

// Carregando pergunta ao jogador
function loadQuestion() {
  
  tag.innerHTML = perguntas[indexAtual].tag;

  
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


// Carregando as perguntas do tema escolhido
function start(item) {

  main.classList.toggle("quizContent");
  let selecionado = item.textContent;

  if(selecionado === ' Geografia ') {
    
    for(let i = 0; i < questions.length; i++) {
      if(questions[i].tag === 'Geografia') {
        perguntas.push(questions[i]);
        tag.style.backgroundColor = '#9a5833';
      }
    }

  } else if(selecionado === ' História ') {
    
    for(let i = 0; i < questions.length; i++) {
      if(questions[i].tag === 'História') {
        perguntas.push(questions[i]);
        tag.style.backgroundColor = '#F7C942';
      }
    }

  } else if(selecionado === ' Matemática ') {
    
    for(let i = 0; i < questions.length; i++) {
      if(questions[i].tag === 'Matemática') {
        perguntas.push(questions[i]);
        tag.style.backgroundColor = '#5cb8ff';
      }
    }
  } else if(selecionado === ' Biologia ') {
    
    for(let i = 0; i < questions.length; i++) {
      if(questions[i].tag === 'Biologia') {
        perguntas.push(questions[i]);
        tag.style.backgroundColor = '#70ff63';
      }
    }
  }

  content.classList.toggle('content-off');
  choiceContent.classList.toggle('choice-off');

  loadQuestion();
}