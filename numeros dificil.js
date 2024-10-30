
const numbers = [31, 45, 3, 5, 9, 11];  // Números a emparejar
let shuffledNumbers = shuffle([...numbers, ...numbers]);  // Duplicamos los números para tener pares

const gameBoard = document.getElementById('game-board');
let firstTile = null;
let secondTile = null;
let canClick = true;

// Crear las fichas del tablero
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

// Función para verificar si hay un par coincidente
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

// Restablecer las fichas seleccionadas
function resetTiles() {
    firstTile = null;
    secondTile = null;
    canClick = true;
}

// Función para mezclar los números
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
// Variables globales
const tablero = document.getElementById("tablero");
const menuIcon = document.getElementById("menu-icon");
const menu = document.getElementById("menu");
const cerrarMenu = document.getElementById("cerrar-menu");
const mensaje = document.getElementById("mensaje");

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