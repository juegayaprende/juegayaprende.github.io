
const tablero = document.getElementById("tablero");
const menuIcon = document.getElementById("menu-icon");
const menu = document.getElementById("menu");
const cerrarMenu = document.getElementById("cerrar-menu");
const mensaje = document.getElementById("mensaje");
let cartas = [];
let cartasEmparejadas = 0;


menuIcon.addEventListener("click", () => {
    menu.style.display = "flex";
});


cerrarMenu.addEventListener("click", () => {
    menu.style.display = "none";
});


const niveles = document.querySelectorAll(".nivel");
niveles.forEach(nivel => {
    nivel.addEventListener("click", () => {
        iniciarJuego(parseInt(nivel.dataset.nivel));
        menu.style.display = "none"; 
    });
});
const numbers = [31, 45, 3];  
let shuffledNumbers = shuffle([...numbers, ...numbers]);  

const gameBoard = document.getElementById('game-board');
let firstTile = null;
let secondTile = null;
let canClick = true;


shuffledNumbers.forEach(number => {
    const tile = document.createElement('div');
    tile.classList.add('tile', 'hidden');
    tile.dataset.number = number;
    tile.textContent = number;

    tile.addEventListener('click', () => {
        if (!canClick || tile.classList.contains('matched') || tile === firstTile) return;
        tile.classList.remove('hidden');

        if (!firstTile) {
            firstTile = tile;
        } else {
            secondTile = tile;
            canClick = false;
            checkForMatch();
        }
    });

    gameBoard.appendChild(tile);
});


function checkForMatch() {
    if (firstTile.dataset.number === secondTile.dataset.number) {
        firstTile.classList.add('matched');
        secondTile.classList.add('matched');
        resetTiles();
    } else {
        setTimeout(() => {
            firstTile.classList.add('hidden');
            secondTile.classList.add('hidden');
            resetTiles();
        }, 1000);
    }
}


function resetTiles() {
    firstTile = null;
    secondTile = null;
    canClick = true;
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
