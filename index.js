
const tablero = document.getElementById("tablero");
const menuIcon = document.getElementById("menu-icon");
const menu = document.getElementById("menu");
const cerrarMenu = document.getElementById("cerrar-menu");
const mensaje = document.getElementById("mensaje");
let cartas = [];
let cartasVolteadas = [];
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




