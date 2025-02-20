
// Variables globales
const tablero = document.getElementById("tablero");
const menuIcon = document.getElementById("menu-icon");
const menu = document.getElementById("menu");
const cerrarMenu = document.getElementById("cerrar-menu");
const mensaje = document.getElementById("mensaje");
let cartas = [];
let cartasVolteadas = [];
let cartasEmparejadas = 0;

// Evento para mostrar el menú de dificultad
menuIcon.addEventListener("click", () => {
    menu.style.display = "flex";
});

// Evento para cerrar el menú
cerrarMenu.addEventListener("click", () => {
    menu.style.display = "none";
});

// Evento para seleccionar el nivel de dificultad
const niveles = document.querySelectorAll(".nivel");
niveles.forEach(nivel => {
    nivel.addEventListener("click", () => {
        iniciarJuego(parseInt(nivel.dataset.nivel));
        menu.style.display = "none"; // Cierra el menú después de seleccionar
    });
});
// Figuras a emparejar (ruta de las imágenes)
const images = [
    "img/verde.png", "img/verde.png", "img/cafe.png", 
     "img/cafe.png", "img/rosa.png",  "img/rosa.png", 
    "img/azul.png", "img/azul.png",
];

// Barajar las imágenes
images.sort(() => 0.5 - Math.random());

const gameBoard = document.getElementById('game-board');
let firstCard = null;
let secondCard = null;
let lockBoard = false;

// Crear las tarjetas
images.forEach((imgSrc, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.image = imgSrc;

    const img = document.createElement('img');
    img.src = imgSrc;
    card.appendChild(img);

    // Evento al hacer clic en la tarjeta
    card.addEventListener('click', flipCard);

    gameBoard.appendChild(card);
});

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flipped');

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    lockBoard = true;

    checkForMatch();
}

function checkForMatch() {
    if (firstCard.dataset.image === secondCard.dataset.image) {
        disableCards();
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}
