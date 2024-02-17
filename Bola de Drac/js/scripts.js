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

let primeraCartaRevelada = null;
let segundaCartaRevelada = null;
let imgElement;
let clicks = 0;

function descubrirCarta() {
    this.removeEventListener("click", descubrirCarta);
    let aleatorio = Math.floor(Math.random() * cartasGoku.length);

    // Verificar si la carta ya se ha revelado dos veces
    while (cartasReveladas[aleatorio] >= 2) {
        aleatorio = Math.floor(Math.random() * cartasGoku.length);
    }

    cartasReveladas[aleatorio] = (cartasReveladas[aleatorio] || 0) + 1;

    imgElement = this.querySelector("img");
    imgElement.src = `./img/db${aleatorio}.jpg`;
    imgElement.id = "carta";

    if (primeraCartaRevelada === null) {
        primeraCartaRevelada = imgElement;
        console.log('Has seleccionado la primera imagen.');
    } else if (segundaCartaRevelada === null) {
        segundaCartaRevelada = imgElement;
        console.log('Has seleccionado la segunda imagen.');
        compararImagenes();
    }

    clicks++;
    if (clicks === 2) {
        setTimeout(compararImagenes, 1000); // Mostrar la segunda carta antes de comparar
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
            setTimeout(() => { // Restablecer las cartas después de un tiempo
                primeraCartaRevelada.src = "img/dorso.jpg";
                segundaCartaRevelada.src = "img/dorso.jpg";
                clicks = 0; // Reiniciar el contador de clics
                primeraCartaRevelada = null; // Restablecer las cartas reveladas
                segundaCartaRevelada = null;
            }, 1000);
            this.addEventListener("click", descubrirCarta);

        }
    }
}


