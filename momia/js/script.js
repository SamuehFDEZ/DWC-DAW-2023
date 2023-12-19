let columnas = 23;
let filas = 15;

/*let columnas = 11;
let filas = 6;*/

let posNinotX = 1;
let posNinotY = 1;
let contenedorPadre = [];

let vertices = [
    [0,0],
    [0,3],
    [0,6],
    [4,0],
    [4,3],
    [4,6]
];

window.onload = () =>{
    crearPlano();
    contenedorPadre[posNinotX][posNinotY].classList.add("ninot");
    document.addEventListener("keydown", movimiento);

    for (const vertice of vertices) {
        if (recorrerCaja(vertice[0], vertice[1])){
            descubrirElemento(vertice[0] + 1, vertice[1] + 1);
        }
    }

}

function descubrirElemento(x, y) {
    for (let i = x; i < 3; i++) {
        for (let j = y; j < 2; j++) {
            contenedorPadre[i][j].classList.add("descubrir")
        }
    }
}

function recorrerCaja(x,y) {
    let pisadas = 0;
    for (let i = x; i < 5; i++) {
        for (let j = y; j < 4; j++) {
            if (contenedorPadre[i][j].classList.contains("pasos")){
                pisadas++;
            }
        }
    }
    return (pisadas === 14);

}

function crearPlano(){
    let tablero = document.createElement("div");

    tablero.id = "plano";

    document.body.appendChild(tablero);

    for (let i = 0; i < filas; i++) {
        let fila = [];
        for (let j = 0; j < columnas; j++) {
            let cajita = document.createElement("div")
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
        contenedorPadre[posNinotX][posNinotY].classList.remove("ninot");
        contenedorPadre[posNinotX][posNinotY].classList.add("pasos");
        contenedorPadre[x][y].classList.add("ninot");
        posNinotX = x;
        posNinotY = y;
    }
}