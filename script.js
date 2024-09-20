const startGame = document.querySelector(".start-game");
const voltarMenu = document.querySelector(".voltar-menu");
const caixaDePergunta = document.querySelector(".pergunta-caixa");
const listaDePergunta = document.querySelector(".resposta-caixa");
const textoDePergunta = document.querySelector(".pergunta");
const textoDificuldade = document.querySelector(".dificuldade");
const proximaPergunta = document.querySelector(".proxima-pergunta");
const voltarPergunta = document.querySelector(".voltar-pergunta");
const selecionarDificuldade = document.querySelector(".selecionar-dificuldade");

startGame.addEventListener("click", startGameQuiz);
voltarMenu.addEventListener("click", voltarMenuFunc)
proximaPergunta.addEventListener("click", mostrarProximaPergunta);
voltarPergunta.addEventListener("click", mostrarPerguntaAnterior);
selecionarDificuldade.addEventListener("click", selecionarDificuldadeFunc);

// Variáveis para controlar o estado do quiz
let displayPergunta = 0;
let totalDeAcertos = 0;
let historicoRespostas = [];

// Função para selecionar dificuldade do quiz antes de iniciar

function selecionarDificuldadeFunc(event) {
    const dificuldadeSelecionada = event.target.textContent;
    questions = questions.filter(question => question.level === dificuldadeSelecionada);
    displayPergunta = 0;
    startGameQuiz();
}   

// Função para iniciar o quiz
function startGameQuiz() {
    startGame.classList.add("hide");
    caixaDePergunta.classList.remove("hide");
    voltarMenu.classList.remove("hide");


    mostrarProximaPergunta();
}

// Função para finalizar o quiz e voltar ao menu a qualquer momento

function voltarMenuFunc() {
    startGame.classList.remove("hide");
    caixaDePergunta.classList.add("hide");
    voltarMenu.classList.add("hide");

}
// Função para mostrar a próxima pergunta
function mostrarProximaPergunta() {
    resetarStatus();

    if (questions.length === displayPergunta) {
        return finalizarJogo();
    }

    textoDePergunta.textContent = questions[displayPergunta].question;
    textoDificuldade.textContent = `Dificuldade: ${questions[displayPergunta].level}`;
    questions[displayPergunta].answers.forEach(answer => {
        const novaResposta = document.createElement("button");
        novaResposta.classList.add("button", "pergunta-botao");
        novaResposta.textContent = answer.text;

        if (answer.correct) {
            novaResposta.dataset.correct = answer.correct;
        }
        listaDePergunta.appendChild(novaResposta);

        novaResposta.addEventListener("click", selecionarResposta);
    });

    // Atualizar a visibilidade dos botões
    voltarPergunta.classList.toggle("hide", displayPergunta === 0);
    proximaPergunta.classList.add("hide");
}

// Função para mostrar a pergunta anterior
function mostrarPerguntaAnterior() {
    if (displayPergunta > 0) {
        displayPergunta--;
        totalDeAcertos -= historicoRespostas.pop() ? 1 : 0;
        mostrarProximaPergunta();
    }
}

// Função para resetar o status das perguntas
function resetarStatus() {
    while (listaDePergunta.firstChild) {
        listaDePergunta.removeChild(listaDePergunta.firstChild);
    }

    document.body.removeAttribute("class");
    proximaPergunta.classList.add("hide");
    voltarPergunta.classList.add("hide");
}

// Função para selecionar a resposta
function selecionarResposta(event) {
    const botaoSelecionado = event.target;
    const respostaCorreta = botaoSelecionado.dataset.correct === "true";

    if (respostaCorreta && questions.length > 0) {
        caixaDePergunta.classList.add("correct");
        totalDeAcertos++;
        historicoRespostas.push(true);
    } else {
        caixaDePergunta.classList.add("incorrect");
        historicoRespostas.push(false);
    }

    document.querySelectorAll(".pergunta-botao").forEach(button => {
        if (button.dataset.correct) {
            button.classList.add("correct");
        } else {
            button.classList.add("incorrect");
        }
        button.disabled = true;
    });

    proximaPergunta.classList.remove("hide");
    voltarPergunta.classList.remove("hide");
    displayPergunta++;
}

// Função para finalizar o jogo
function finalizarJogo() {
    const totalDePerguntas = questions.length;
    const performance = Math.floor(totalDeAcertos * 100 / totalDePerguntas);

    let mensagem = "";

    switch (true) {
        case (performance >= 90):
            mensagem = "Parabéns! Você acertou 90% das perguntas!";
            break;

        case (performance >= 70):
            mensagem = "Você acertou 70% das perguntas!";
            break;

        case (performance >= 50):
            mensagem = "Você acertou 50% das perguntas!";
            break;

        default:
            mensagem = "Você não acertou nenhuma pergunta!";
    }
    caixaDePergunta.innerHTML =
        `
        <p class="mensagem-final">De todas as ${totalDePerguntas} perguntas, você acertou ${totalDeAcertos}</p>
        <p class="mensagem-final">${mensagem}</p>
        <button class="button" onclick="window.location.reload()">Reiniciar o Quiz</button>
        `;
}

// Banco de perguntas para o quiz
const questions = [
    // Perguntas fáceis
    {
        level: "fácil",
        question: "Dos personagens abaixo, qual fez sua aparição pela Marvel Comics primeiro?",
        answers: [
            {text: "Homem-Aranha", correct: false},
            {text: "Thor", correct: false},
            {text: "Magneto", correct: false},
            {text: "Capitão América", correct: true},
        ]
    },
    {
        level: "fácil",
        question: "Qual destes personagens é um mutante e membro dos X-Men?",
        answers: [
            {text: "Batman", correct: false},
            {text: "Wolverine", correct: true},
            {text: "Superman", correct: false},
            {text: "Super Choque", correct: false},
        ]
    },
    {
        level: "fácil",
        question: "Qual destes personagens é famoso por patrulhar a cidade de Nova York?",
        answers: [
            {text: "Super Choque", correct: false},
            {text: "Homem-Aranha", correct: true},
            {text: "Flash", correct: false},
            {text: "Mulher-Maravilha", correct: false},
        ]
    },
    {
        level: "fácil",
        question: "Qual destes personagens é conhecido por ter a identidade secreta de Clark Kent?",
        answers: [
            {text: "Superman", correct: true},
            {text: "Bruce Wayne", correct: false},
            {text: "Tony Stark", correct: false},
            {text: "Peter Parker", correct: false},
        ]
    },
    {
        level: "fácil",
        question: "Qual herói dos X-Men é capaz de controlar o clima?",
        answers: [
            {text: "Tempestade", correct: true},
            {text: "Jean Grey", correct: false},
            {text: "Ciclope", correct: false},
            {text: "Noturno", correct: false},
        ]
    },

    // Perguntas médias
    {
        level: "médio",
        question: "Qual destes personagens é conhecido por suas habilidades em tecnologia e possui um traje especial?",
        answers: [
            {text: "Homem de Ferro", correct: true},
            {text: "Capitão América", correct: false},
            {text: "Magneto", correct: false},
            {text: "Wolverine", correct: false},
        ]
    },
    {
        level: "médio",
        question: "Quem é o vilão principal na série de HQs do Batman?",
        answers: [
            {text: "Lex Luthor", correct: false},
            {text: "Coringa", correct: true},
            {text: "Duende Verde", correct: false},
            {text: "Apocalypse", correct: false},
        ]
    },
    {
        level: "médio",
        question: "Qual personagem da DC Comics é conhecido por ser o alter ego de Billy Batson?",
        answers: [
            {text: "Shazam", correct: true},
            {text: "Aquaman", correct: false},
            {text: "Lanterna Verde", correct: false},
            {text: "Ciborgue", correct: false},
        ]
    },
    {
        level: "médio",
        question: "Qual destes personagens é membro da Liga da Justiça?",
        answers: [
            {text: "Mulher-Maravilha", correct: true},
            {text: "Wolverine", correct: false},
            {text: "Homem-Aranha", correct: false},
            {text: "Super Choque", correct: false},
        ]
    },

    // Perguntas difíceis
    {
        level: "difícil",
        question: "Quem é o arqui-inimigo do Super Choque?",
        answers: [
            {text: "Ebon", correct: true},
            {text: "Charada", correct: false},
            {text: "Kingpin", correct: false},
            {text: "Dr. Destino", correct: false},
        ]
    },
    {
        level: "difícil",
        question: "Em que ano o Homem-Aranha fez sua primeira aparição nos quadrinhos?",
        answers: [
            {text: "1962", correct: true},
            {text: "1955", correct: false},
            {text: "1970", correct: false},
            {text: "1960", correct: false},
        ]
    },
    {
        level: "difícil",
        question: "Qual o verdadeiro nome do vilão Apocalypse, dos X-Men?",
        answers: [
            {text: "En Sabah Nur", correct: true},
            {text: "Victor Von Doom", correct: false},
            {text: "Norman Osborn", correct: false},
            {text: "Erik Lehnsherr", correct: false},
        ]
    },
    {
        level: "difícil",
        question: "Quem foi o primeiro Robin, parceiro do Batman?",
        answers: [
            {text: "Dick Grayson", correct: true},
            {text: "Jason Todd", correct: false},
            {text: "Tim Drake", correct: false},
            {text: "Damian Wayne", correct: false},
        ]
    },
    {
        level: "difícil",
        question: "Qual o nome da cidade onde a maioria das histórias do Super Choque acontecem?",
        answers: [
            {text: "Dakota City", correct: true},
            {text: "Gotham City", correct: false},
            {text: "Metropolis", correct: false},
            {text: "Central City", correct: false},
        ]
    }
];
