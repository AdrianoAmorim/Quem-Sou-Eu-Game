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
    setImg(numSorteado);
    animacaoStartJogo();
    startContador(10,textContador);
}


//FUNCAO QUE INICIA O CONTADOR DA RODADA
const startContador = (num,elemento) => {
    elemento.textContent= num;
    const interval = setInterval(() => {
        if(num >= 0) {
            elemento.textContent = num--
        }else{
            clearInterval(interval);
        }
    }, 1000);
    
}

//FUNCAO QUE CRIA A ANIMAÇÃO E CHAMADA DA TELA DE CONTAGEM ANTES DO INICIO DO JOGO
const animacaoContagemInicial = ()=>{
    tela.classList.add("hidden");
    contInicial.classList.remove("hidden");
    textContInicial.classList.add("animacaoContInicial");
    console.log(startContador(5,textContInicial));

}
//FUNCAO QUE CRIA A ANIMACAO DE TROCA DOS ELEMENTOS DO GAME E INICIA O CONTADOR
const animacaoStartJogo = () => {
    interrogacao.classList.replace("animacaoInterrogacao", "outLeft");
    setTimeout(() => {
        interrogacao.classList.add("hidden");
        interrogacao.classList.remove("outLeft");
        quadroImg.classList.remove("hidden");
        quadroImg.classList.add("fadeIn");
        btnStart.classList.add("hidden");
        contador.classList.remove("hidden")
    }, 300);


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

