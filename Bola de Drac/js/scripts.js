// array para almacenar los src de las imagenes de goku
const cartasGoku = [
    "img/db0.jpg",
    "img/db1.jpg",
    "img/db2.jpg",
    "img/db3.jpg",
    "img/db4.jpg",
    "img/db5.jpg",
    "img/db6.jpg",
    "img/db7.jpg",
    "img/db8.jpg",
    "img/db9.jpg",
    "img/db10.jpg"
];

// Variable para contar cuántas veces se ha revelado cada carta
const cartasReveladas = {};

window.onload = () =>{
    quitarFondoCartel();
    mostrarCartasConDorso();
}

function quitarFondoCartel() {
    fondo.classList.add("oculto");
    cartel.classList.add("oculto");
}

function mostrarCartasConDorso() {
    for (let i = 1; i <= 10; i++) {
        const carta = document.createElement("div");
        const imagen = document.createElement("img");
        carta.classList.add("carta");
        imagen.src = "img/dorso.jpg";
        imagen.id = "dorso";
        carta.appendChild(imagen);
        carta.addEventListener("click", descubrirCarta);
        tablero.appendChild(carta);
    }
}

/*
function descubrirCarta() {
    this.removeEventListener("click", descubrirCarta);
    // Generar un índice aleatorio
    let aleatorio = Math.floor(Math.random() * cartasGoku.length);
    console.log("numale"+aleatorio);

    // Verificar si la carta ya se ha revelado dos veces
    while (cartasReveladas[aleatorio] >= 2) {
        aleatorio = Math.floor(Math.random() * cartasGoku.length);
    }

    // Incrementar el contador de la carta revelada
    cartasReveladas[aleatorio] = (cartasReveladas[aleatorio] || 0) + 1;

    // Actualizar la imagen de la carta
    this.querySelector("img").src = `./img/db${aleatorio}.jpg`;
    this.querySelector("img").id = "carta";

    // Si se ha revelado dos veces, remover el event listener
    if (cartasReveladas[aleatorio] >= 2) {
        puntuacion.innerText = parseInt(puntuacion.innerText) + 1000;
    }
    else {
        this.querySelector("img").src = "img/dorso.jpg";
        this.querySelector("img").id = "dorso";
    }
}
*/

let primeraCartaRevelada = null;
let segundaCartaRevelada = null;

function descubrirCarta() {
    this.removeEventListener("click", descubrirCarta);
    let aleatorio = Math.floor(Math.random() * cartasGoku.length);

    // Verificar si la carta ya se ha revelado dos veces
    while (cartasReveladas[aleatorio] >= 2) {
        aleatorio = Math.floor(Math.random() * cartasGoku.length);
    }

    cartasReveladas[aleatorio] = (cartasReveladas[aleatorio] || 0) + 1;

    let imgElement = this.querySelector("img");
    imgElement.src = `./img/db${aleatorio}.jpg`;
    imgElement.id = "carta";

    if (primeraCartaRevelada === null) {
        primeraCartaRevelada = imgElement;
        console.log('Has seleccionado la primera imagen.');
    } else {
        segundaCartaRevelada = imgElement;
        console.log('Has seleccionado la segunda imagen.');
        compararImagenes();
    }
}

function compararImagenes() {
    if (primeraCartaRevelada !== null && segundaCartaRevelada !== null) {
        if (primeraCartaRevelada.src === segundaCartaRevelada.src) {
            console.log('¡Las imágenes coinciden!');
            puntuacion.innerText = parseInt(puntuacion.innerText) + 1000;
        }
        else {
            console.log('Las imágenes no coinciden.');
           /* primeraCartaRevelada.src = "img/dorso.jpg";
            segundaCartaRevelada.src = "img/dorso.jpg";*/
        }
        // Restaurar variables
       /* primeraCartaRevelada = null;
        segundaCartaRevelada = null;*/
    }
}

