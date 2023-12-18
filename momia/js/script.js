let columnas = 23;
let filas = 15;

/*let columnas = 11;
let filas = 6;*/

let posNinotX = 1;
let posNinotY = 1;


let contenedorPadre = [];
window.onload = () =>{
    crearPlano();
    contenedorPadre[posNinotX][posNinotY].classList.add("ninot")

    document.addEventListener("keydown", movimiento)
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
            mover(posNinotX, posNinotY -1);
            break;
        case "ArrowRight":
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
        contenedorPadre[x][y].classList.add("ninot");
        contenedorPadre[x+1][y+1].classList.add("pasos");


        posNinotX = x;
        posNinotY = y;
    }
}