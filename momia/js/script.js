let columnas = 23;
let filas = 15;

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
}

function comprobar() {
    for (const vertice of vertices) {
        recorrerCaja(vertice[0], vertice[1]);
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