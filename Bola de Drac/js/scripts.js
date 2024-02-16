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

function descubrirCarta() {
    let aleatorio = Math.floor(Math.random() * cartasGoku.length);
    console.log(aleatorio);
    console.log(this.querySelector("img"));
    this.querySelector("img").src = `./img/db${aleatorio}.jpg`;
    this.querySelector("img").id = "carta";
    this.removeEventListener("click", descubrirCarta);
    console.log(this.querySelector("img").src );
}