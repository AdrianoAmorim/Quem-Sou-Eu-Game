const img = document.querySelector("#boxImg img");
const btnStart = document.querySelector("#boxButtonStart button");

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

const sortearNum = numMaxImg => parseInt(Math.random() * numMaxImg)

const sortearImg = ()=>{
    let positSorteada = sortearNum(3);
console.log(positSorteada)
    img.setAttribute("src",`${imagensSorteio[positSorteada].url}`);
}

btnStart.addEventListener("click",sortearImg);