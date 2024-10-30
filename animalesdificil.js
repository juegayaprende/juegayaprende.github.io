// Variables globales
const tablero = document.getElementById("tablero");
const menuIcon = document.getElementById("menu-icon");
const menu = document.getElementById("menu");
const cerrarMenu = document.getElementById("cerrar-menu");
const mensaje = document.getElementById("mensaje");
let cartas = [];
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
const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

// Barajear cartas al iniciar el juego
(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * cards.length);
        card.style.order = randomPos;
    });
})();

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flipped');

    if (!hasFlippedCard) {
        // Primera carta clickeada
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    // Segunda carta clickeada
    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.pair === secondCard.dataset.pair;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

cards.forEach(card => card.addEventListener('click', flipCard));
