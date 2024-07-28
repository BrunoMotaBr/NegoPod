import gerarCard from './script/gerarCards.js';

const url = window.location.href;
const urlObj = new URL(url);
const nomeDoProduto = urlObj.searchParams.get("nomeDoProduto");

const cards = document.getElementById("card");
const cabecalho = document.getElementById("cabecalho");
let ultimaPosicaoDeRolagem = window.scrollY;

window.addEventListener('scroll', function() {
    let novaPosicaoDeRolagem = window.scrollY;
    if (novaPosicaoDeRolagem == 0) {
        cabecalho.classList.remove("cabecalho-top");
    }else if(novaPosicaoDeRolagem > 0 && cabecalho.classList != "cabecalho cabecalho-top"){
        cabecalho.classList.add("cabecalho-top");
    }
});

console.log(nomeDoProduto)
if(nomeDoProduto !== null){
    gerarCard(nomeDoProduto).then((resultado) => {
        cards.innerHTML += resultado;
    })
    .catch((error) => {
        console.error('Erro:', error);
    });
}
else{
    gerarCard().then((resultado) => {
        cards.innerHTML += resultado;
        const cardsCard  = document.querySelectorAll(".cards-card");
        cardsCard.forEach(produto => {
            produto.addEventListener('click', () => {
                const nomeDoProduto = produto.getAttribute('data-nome');        
                const url = `detalhe_do_produto.html?nomeDoProduto=${encodeURIComponent(nomeDoProduto)}`;
                window.open(url, '_blank');
            });
        });
    })
    .catch((error) => {
        console.error('Erro:', error);
    });
}


