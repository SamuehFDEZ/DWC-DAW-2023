let columnas = 23;
let filas = 15;
let posMomiaX;
let posMomiaY;
let intervaloMomia;


/*let columnas = 11;
let filas = 6;*/

let posNinotX = 0;
let posNinotY = 9;
let contenedorPadre = [];

let vertices = [
    [1,1],
    [1,5],
    [1,9],
    [1,13],
    [1,17],
    [4,1],
    [4,5],
    [4,9],
    [4,13],
    [4,17],
    [7,1],
    [7,5],
    [7,9],
    [7,13],
    [7,17],
    [10,1],
    [10,5],
    [10,9],
    [10,13],
    [10,17],
];

window.onload = () =>{
    crearPlano();
    contenedorPadre[posNinotX][posNinotY].classList.add("ninot");
    document.addEventListener("keydown", movimiento);
    contenedorPadre[0][9].classList.add("camino");
    posMomiaX = Math.floor(Math.random() * (filas - 2)) + 1; // Evita las filas de fuera
    posMomiaY = Math.floor(Math.random() * (columnas - 2)) + 1; // Evita las columnas de fuera

    contenedorPadre[posMomiaX][posMomiaY].classList.add("momia");
}

let direccionAnterior = { x: 0, y: 0 };

function moverMomia() {
    const direcciones = [
        { x: 1, y: 0 },  // Derecha
        { x: 0, y: -1 },  // Abajo
        { x: -1, y: 0 }, // Izquierda
        { x: 0, y: 1 }, // Arriba
    ];

    /*En esta constante lo que se busca es que no se repita una direccion
    * si por ejemplo la momia se mueve hacia adelante luego atras y luego adelante
    * evitar ese comportamiento, ¿como? obtenemos el array direcciones, con el metodo filter
    * dentro le pasamos un parametro (dir), mediante una funcion flecha que devolvera lo que
    * nos interesa controlara que de las direcciones que tenemos en el array direcciones no coincida
    * con con la direccion que hemos realizado antes */
    const direccionesDisponibles =
        direcciones.filter(dir =>
            !(dir.x === -direccionAnterior.x && dir.y === -direccionAnterior.y));

    // Si quedan direcciones disponibles, elige una aleatoria
    if (direccionesDisponibles.length > 0) {
        const direccionAleatoria = direccionesDisponibles[Math.floor(Math.random() * direccionesDisponibles.length)];

        const nuevaPosX = posMomiaX + direccionAleatoria.x;
        const nuevaPosY = posMomiaY + direccionAleatoria.y;

        if (contenedorPadre[nuevaPosX][nuevaPosY].classList.contains("camino")) {
            // Mueve la momia
            contenedorPadre[posMomiaX][posMomiaY].classList.remove("momia");
            posMomiaX = nuevaPosX;
            posMomiaY = nuevaPosY;
            contenedorPadre[posMomiaX][posMomiaY].classList.add("momia");

            // Actualiza la dirección anterior
            direccionAnterior = direccionAleatoria;
        }
    }
}



// Llama a esta función en intervalos regulares (por ejemplo, cada 1000 milisegundos)
intervaloMomia = setInterval(moverMomia, 200);

function comprobar() {
    for (const vertice of vertices) {
        recorrerCaja(vertice[0], vertice[1]);
    }

    if (posNinotX === posMomiaX && posNinotY === posMomiaY) {
        alert("¡La momia te ha atrapado!");
        // Realiza alguna acción, como reiniciar el juego
    }
}

function descubrirElemento(x, y) {
    for (let i = x; i < x + 2; i++) {
        for (let j = y; j < y + 3; j++) {
            contenedorPadre[i][j].classList.add("descubrir")
        }
    }
}

function recorrerCaja(x,y) {
    let pisadas = 0;
    for (let i = x; i < x + 4; i++) {
        for (let j = y; j < y + 5; j++) {
            if (contenedorPadre[i][j].classList.contains("pasos")){
                pisadas++;
            }
        }
    }
    if (pisadas === 14){
        descubrirElemento(x + 1 , y + 1);
    }
}

function crearPlano(){
    let tablero = document.createElement("div");

    tablero.id = "plano";

    document.body.appendChild(tablero);

    for (let i = 0; i < filas; i++) {
        let fila = [];
        for (let j = 0; j < columnas; j++) {
            let cajita = document.createElement("div");
            cajita.className = "cajita";
            fila.push(cajita);
            tablero.appendChild(cajita);
            if (i == 0 || i == filas -1 || j == 0 || j == columnas -1){
                cajita.classList.add("fuera");
            }
            else if (j % 4 == 1 || i % 3 == 1){
                cajita.classList.add("camino");
            }
            else{
                cajita.classList.add("columna");
            }
        }
        contenedorPadre.push(fila);
    }
}


function movimiento(ev) {
    switch (ev.key) {
        case "ArrowLeft":
           /* contenedorPadre[posNinotX][posNinotY].classList.add("ninot-invertido");
            contenedorPadre[posNinotX][posNinotY].classList.remove("ninot");*/
            mover(posNinotX, posNinotY -1);
            break;
        case "ArrowRight":
           /* contenedorPadre[posNinotX][posNinotY].classList.add("ninot");
            contenedorPadre[posNinotX][posNinotY].classList.remove("ninot-invertido");*/
            mover(posNinotX , posNinotY +1);
            break;
        case "ArrowUp":
            mover(posNinotX-1, posNinotY);
            break;
        case "ArrowDown":
            mover(posNinotX+1, posNinotY);
            break;
        default:
            break;
    }
}

function mover(x, y){
    if (contenedorPadre[x][y].classList.contains("camino")){
        if (posNinotX !== 0 && posNinotY !== 9){
            contenedorPadre[0][9].classList.remove("camino")
            contenedorPadre[0][9].classList.remove("pasos")
            contenedorPadre[0][9].classList.add("fuera")
        }
        contenedorPadre[posNinotX][posNinotY].classList.remove("ninot");
        contenedorPadre[posNinotX][posNinotY].classList.add("pasos");
        contenedorPadre[x][y].classList.add("ninot");
        posNinotX = x;
        posNinotY = y;
        comprobar();
    }
}