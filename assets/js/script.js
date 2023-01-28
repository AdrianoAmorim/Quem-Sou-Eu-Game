const quadroImg = document.getElementById("borderImg");
const img = document.querySelector("#boxImg img");
const textImg = document.querySelector("#boxNomeImg span");
const btnStart = document.querySelector("#boxButtonStart button");
const contador = document.querySelector(".tempoJogo");
const textContador = document.querySelector(".tempoJogo span");
const tela = document.querySelector(".container");
const interrogacao = document.querySelector(".boxInterrogacao");
const contInicial = document.querySelector(".boxContInicio");
const textCountVitorias = document.querySelector(".boxVitorias span");
const textContInicial = document.querySelector(".boxContInicio span");
const telaJogarNovamente = document.querySelector(".boxTelaNovoJogo");
const cbAcertou = document.getElementById("cbAcertou");
const btnContinuarNj = document.getElementById("btnContinuarNj");
const btnNovoJogo = document.getElementById("btnNovoJogo");
const btnSom = document.getElementById("btnSom");
const btnHome = document.getElementById("btnHome");

const audioCount = document.getElementById("audioContagem");
const audioBtnOpc = document.getElementById("audioBtnOpc");
const audioFundo = document.getElementById("audioFundo");
const audioIniciar = document.getElementById("audioIniciar");

//VARIAVEIS GLOBAIS
var countVitorias = 0;
var interval;
var qtdImg = 19;
var tempoCountJogada = 30;
var imagensSorteio = [
    {
        nome: "Cachorro", url: "./assets/img/cachorro.jpg"
    },
    {
        nome: "Gato", url: "./assets/img/gato.jpg"
    },
    {
        nome: "Porco", url: "./assets/img/porco.jpg"
    },
    {
        nome: "Arara", url: "./assets/img/arara.jpg"
    },
    {
        nome: "Bateria", url: "./assets/img/bateria.jpg"
    },
    {
        nome: "Celular", url: "./assets/img/celular.jpg"
    },
    {
        nome: "Coelho", url: "./assets/img/coelho.jpg"
    },
    {
        nome: "Coruja", url: "./assets/img/coruja.jpg"
    },
    {
        nome: "Elvis", url: "./assets/img/elvis.jpg"
    },
    {
        nome: "Garfo", url: "./assets/img/garfo.jpg"
    },
    {
        nome: "Guitarra", url: "./assets/img/guitarra.jpg"
    },
    {
        nome: "Microfone", url: "./assets/img/microfone.jpg"
    },
    {
        nome: "Minhoca", url: "./assets/img/minhoca.jpg"
    },
    {
        nome: "Mouse", url: "./assets/img/mouse.jpg"
    },
    {
        nome: "Patins", url: "./assets/img/patins.jpg"
    },
    {
        nome: "Pinguim", url: "./assets/img/pinguin.jpg"
    },
    {
        nome: "Silvio Santos", url: "./assets/img/silvio.jpg"
    },
    {
        nome: "Skate", url: "./assets/img/skate.jpg"
    },
    {
        nome: "Teclado", url: "./assets/img/teclado.jpg"
    }
]


//SETA AS ANIMACOES INICIAS DA TELA PRINCIPAL DO JOGO
const setAnimaçoes = () => {
    tela.classList.add("fadeIn");
    if (audioFundo.volume > 0.4) {
        audioFundo.volume -= 0.4;
    }
}
//FUNCAO PARA INICIAR O JOGO
const startGame = () => {
    animacaoContagemInicial();
    startContadorInicial(5, textContInicial);

}

//FUNCAO QUE INICIA O CONTADOR inicial DA RODADA
const startContadorInicial = (tempo, elemento) => {
    elemento.textContent = tempo;
    audioCount.play();
    interval = setInterval(() => {
        --tempo
        if (tempo > 0) {
            elemento.textContent = tempo;
            audioCount.play();

        } else {
            audioIniciar.play();
            setTimeout(() => {
                audioIniciar.pause();
                enterGame();
            }, 600);
        }
    }, 1000);
}
//CONTADOR DA JOGADA
const startContadorJogada = (tempo, elemento) => {
    elemento.textContent = tempo;
    interval = setInterval(() => {
        --tempo
        if (tempo > 0) {
            elemento.textContent = tempo;
            if (tempo <= 5) {
                audioCount.play();
            }
        } else {
            animacaoTelaJogarNovamente();
        }
    }, 1000);
}
//FUNCAO PARA VOLTAR NO HOME
const retornarHome = () => {
    audioBtnOpc.play();
    audioCount.pause();
    clearInterval(interval);
    quadroImg.classList.add("outLeft");
    quadroImg.classList.add("hidden");
    interrogacao.classList.remove("hidden");
    contador.classList.add("hidden");
    btnStart.classList.remove("hidden");
    btnStart.classList.add("fadeIn");


}
//ENTRA NO JOGO 
const enterGame = () => {
    clearInterval(interval);
    setImg(sortearNum(qtdImg));
    resetTelaContInicial();
    startContadorJogada(tempoCountJogada, textContador);
}
//FAZ A ANIMACAO DE TROCA DE TELA PARA A TELA jOGAR nOVAMENTE
const animacaoTelaJogarNovamente = () => {
    clearInterval(interval);
    audioIniciar.play();
    setTimeout(() => {
        audioIniciar.pause();
        tela.classList.add("hidden");
        telaJogarNovamente.classList.add("fadeIn")
        telaJogarNovamente.classList.remove("hidden");
    }, 1000);
   

}
//FUNCAO PARA VERIFICAR SE USUARIO ACERTOU OU  NAO E LIBERA PARA CONTINUAR JOGANDO
const continuarJogando = () => {
    audioBtnOpc.play();
    if (cbAcertou.checked) {
        countVitorias += 1;
        textCountVitorias.textContent = countVitorias;
    }
    resetTelaJogarNovamente();
    setImg(sortearNum(qtdImg));
    startContadorJogada(tempoCountJogada, textContador);
}
//FUNCAO PARA INICIAR UMA NOVA RODADA DO JOGO (RESETA O CONTADOR DE VITORIAS)
const novoJogo = () => {
    audioBtnOpc.play();
    countVitorias = 0
    textCountVitorias.textContent = countVitorias;
    resetTelaJogarNovamente();
    setImg(sortearNum(qtdImg));
    startContadorJogada(tempoCountJogada, textContador);
}
//FUNCAO PARA RETORNAR A TELA PRINCIPAL DO JOGO E CONTINUAR JOGANDO
const resetTelaJogarNovamente = () => {
    telaJogarNovamente.classList.add("hidden");
    tela.classList.remove("hidden");
    interrogacao.classList.add("hidden");
    quadroImg.classList.remove("hidden");
    contador.classList.remove("hidden");
    btnStart.classList.add("hidden");
    cbAcertou.checked = false;
}
//FUNCAO PARA RETORNA A TELA PRINCIPAL DO JOGO
const resetTelaContInicial = () => {
    contInicial.classList.add("hidden");
    tela.classList.remove("hidden");
    interrogacao.classList.add("hidden");
    quadroImg.classList.remove("hidden");
    contador.classList.remove("hidden");
    btnStart.classList.add("hidden");
}

//FUNCAO QUE CRIA A ANIMAÇÃO E CHAMADA DA TELA DE CONTAGEM ANTES DO INICIO DO JOGO
const animacaoContagemInicial = () => {
    quadroImg.classList.remove("outLeft");
    tela.classList.add("hidden");
    contInicial.classList.remove("hidden");
    textContInicial.classList.add("animacaoContInicial");

}

//FUNCAO PARA SORTEAR UM NUMERO QUE SERA USADO PARA PEGAR A POSICAO NO ARRAY DE IMAGENS
const sortearNum = numMaxImg => parseInt(Math.random() * numMaxImg)


//FUNCAO QUE PEGA O VALOR SORTEADO E SETA A IMAGEM NO QUADRO 
const setImg = (numSorteado) => {
    img.setAttribute("src", `${imagensSorteio[numSorteado].url}`);
    textImg.textContent = imagensSorteio[numSorteado].nome;
};

//EVENTOS DOS BOTOES E CARERGAMENTO INICIAL
btnContinuarNj.addEventListener("click", () => continuarJogando());
btnNovoJogo.addEventListener("click", () => novoJogo());
btnStart.addEventListener("click", () => startGame());
btnHome.addEventListener("click", () => retornarHome());
cbAcertou.addEventListener("click", () => {
    audioBtnOpc.play()
});
btnSom.addEventListener("click", () => {
    if (btnSom.classList.contains("bgVerde")) {
        btnSom.classList.remove("bgVerde");
        audioFundo.pause();
    } else {
        btnSom.classList.add("bgVerde");
        audioFundo.play();
    }

});

window.onload = setAnimaçoes();

