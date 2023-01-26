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

//VARIAVEIS GLOBAIS
var countVitorias = 0;
var interval ;
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
]


//SETA AS ANIMACOES INICIAS DA TELA PRINCIPAL DO JOGO
const setAnimaçoes = () => {
    tela.classList.add("fadeIn");
}
//FUNCAO PARA INICIAR O JOGO
const startGame = () => {
    animacaoContagemInicial();
    startContadorInicial(5, textContInicial);
   
}

//FUNCAO QUE INICIA O CONTADOR inicial DA RODADA
const startContadorInicial = (tempo, elemento) => {
    elemento.textContent = tempo;

     interval = setInterval(() => {
        --tempo
        if (tempo > 0) {
            elemento.textContent = tempo;
            console.log("dentro do if")
        } else {
            enterGame();
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
        } else {
            animacaoTelaJogarNovamente();
        }
    }, 1000);
}
//FUNCAO PARA VOLTAR NO HOME
const retornarHome = ()=>{
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
    setImg(sortearNum(3));
    resetTelaContInicial();
    startContadorJogada(5, textContador);
}
//FAZ A ANIMACAO DE TROCA DE TELA PARA A TELA jOGAR nOVAMENTE
const animacaoTelaJogarNovamente = () => {
    clearInterval(interval);
    tela.classList.add("hidden");
    telaJogarNovamente.classList.add("fadeIn")
    telaJogarNovamente.classList.remove("hidden");
}
//FUNCAO PARA VERIFICAR SE USUARIO ACERTOU OU  NAO E LIBERA PARA CONTINUAR JOGANDO
const continuarJogando = () => {
    if (cbAcertou.checked) {
        countVitorias += 1;
        textCountVitorias.textContent = countVitorias;
    }
    resetTelaJogarNovamente();
    setImg(sortearNum(3));
    startContadorJogada(5, textContador);
}
//FUNCAO PARA INICIAR UMA NOVA RODADA DO JOGO (RESETA O CONTADOR DE VITORIAS)
const novoJogo = () => {
    console.log("aki")
    countVitorias = 0
    textCountVitorias.textContent = countVitorias;
    resetTelaJogarNovamente();
    setImg(sortearNum(3));
    startContadorJogada(5, textContador);
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




btnContinuarNj.addEventListener("click", () => continuarJogando());
btnNovoJogo.addEventListener("click", () => novoJogo());
btnStart.addEventListener("click", () => startGame());
btnHome.addEventListener("click",()=> retornarHome());

window.onload = setAnimaçoes();

