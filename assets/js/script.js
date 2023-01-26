const quadroImg = document.getElementById("borderImg");
const img = document.querySelector("#boxImg img");
const textImg = document.querySelector("#boxNomeImg span");
const btnStart = document.querySelector("#boxButtonStart button");
const contador = document.querySelector(".tempoJogo");
const textContador = document.querySelector(".tempoJogo span");
const tela = document.querySelector(".container");
const interrogacao = document.querySelector(".boxInterrogacao");
const contInicial = document.querySelector(".boxContInicio");
const textContInicial = document.querySelector(".boxContInicio span");

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
const startGame = (numSorteado) => {
    animacaoContagemInicial();
    startContadorInicial(5, textContInicial);

}

//FUNCAO QUE INICIA O CONTADOR inicial DA RODADA
const startContadorInicial = (num, elemento) => {
    elemento.textContent = num;
    const interval = setInterval(() => {
        --num
        if (num > 0) {
            elemento.textContent = num ;
        } else {
           enterGame();
            clearInterval(interval);
        }
    }, 1000);
}
const startContadorJogada = (num, elemento) => {
    elemento.textContent = num;
    const interval = setInterval(() => {
        --num
        if (num > 0) {
            elemento.textContent = num ;
        } else {

            clearInterval(interval);
        }
    }, 1000);
}


const enterGame = () =>{
    setImg(sortearNum(3));
    resetTelaContInicial();
    startContadorJogada(5,textContador);
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





btnStart.addEventListener("click", () => startGame(sortearNum(3)));

window.onload = setAnimaçoes();

