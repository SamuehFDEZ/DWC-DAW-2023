let jugada = true;

//Mensajes de los resultados de las jugadas
var mensajes = {
    tipa: "Tijeras cortan papel",
    papi: "Papel tapa piedra",
    pila:"Piedra aplasta lagarto",
    lasp: "Lagarto envenena a Spock",
    spti: "Spock rompe tijeras",
    tila: "Tijeras decapitan lagarto",
    lapa: "Lagarto devora papel",
    pasp: "Papel desautoriza a Spock",
    sppi: "Spock vaporiza piedra",
    piti: "Piedra aplasta tijeras"
}

let imagenes = [
    "img/piedra.png",
    "img/papel.png",
    "img/tijera.png",
    "img/lagarto.png",
    "img/spock.png"
];

//Variables que contendrán los elementos HTML que vayamos a necesitar

window.onload = () => {

    let elementos = document.querySelectorAll(".contitem .item>img");

    elementos.forEach(el =>{
       el.draggable = true;
       el.addEventListener("dragstart", drag);
    });

    document.getElementById("seleccionado").addEventListener("drop", drop);
    document.getElementById("seleccionado").addEventListener("dragover", allowDrop);
}

function continuar() {
    //Función que lanzamos cuando pulsamos al botón continuar
    //Volvemos a ocultar el mensaje;

    //Si es una jugada reiniciamos todo menos los contadores de puntos.
    if (jugada){
        let enemigo = document.querySelector("#enemigo img");
        let seleccionado = document.getElementById("seleccionado");
        document.getElementById("mensaje").className = "visible";

        mostrarResultado(seleccionado, enemigo, mensajes);

        document.getElementById("proteccion").className = "visible";
        document.getElementById("deliveracion").className = "invisible";
        document.getElementById("continuar").addEventListener("click", () =>{
            document.getElementById("mensaje").className = "invisible";
            document.getElementById("proteccion").className = "invisible";
            document.getElementById("seleccionado").innerHTML = null;
        });

    }
    else{
        document.getElementById("mensaje").className = "invisible";
        document.getElementById("proteccion").className = "invisible";
        document.getElementById("deliveracion").className = "invisible";

    }
    enemigo.src = "img/interrogante.png";
}

function imagenMaquina() {
    let numRand = Math.floor(Math.random() * 5);
    enemigo.firstElementChild.id = numRand + 1;
    enemigo.firstElementChild.src = imagenes[numRand];
}

function deliverar() {
    document.getElementById("proteccion").className="visible";
    document.getElementById("deliveracion").className="visible";
    setTimeout(mostrarMensaje,3000);
}

function mostrarMensaje() {
    continuar();
}

function mostrarResultado(seleccionado, enemigo, mensajes) {
    let puntosSeleccionado = parseInt(seleccionado.firstElementChild.dataset.puntos);
    let idEnemigo = parseInt(enemigo.id);

    let divMio = document.createElement("div");
    divMio.classList.add("punto");
    divMio.classList.add("mio");
    let divSuyo = document.createElement("div");
    divSuyo.classList.add("punto");
    divSuyo.classList.add("suyo");

    if (puntosSeleccionado === 1 && idEnemigo === 1) {
        document.querySelector("#mensaje p").innerHTML = "EMPATE";
        enemigo.src = "img/interrogante.png";

    } else if (puntosSeleccionado === 1 && idEnemigo === 2) {
        document.querySelector("#mensaje p").innerHTML = mensajes.papi;
        enemigo.src = "img/interrogante.png";
        document.getElementById("maquina").appendChild(divSuyo);


    } else if (puntosSeleccionado === 1 && idEnemigo === 3) {
        document.querySelector("#mensaje p").innerHTML = mensajes.piti;
        enemigo.src = "img/interrogante.png";
        document.getElementById("jugador").appendChild(divMio);


    } else if (puntosSeleccionado === 1 && idEnemigo === 4) {
        document.querySelector("#mensaje p").innerHTML = mensajes.pila;
        enemigo.src = "img/interrogante.png";
        document.getElementById("jugador").appendChild(divMio);

    } else if (puntosSeleccionado === 1 && idEnemigo === 5) {
        document.querySelector("#mensaje p").innerHTML = mensajes.sppi;
        enemigo.src = "img/interrogante.png";
        document.getElementById("maquina").appendChild(divSuyo);
    }

    /*----------------------------------------------------------------------------*/

    else if (puntosSeleccionado === 2 && idEnemigo === 1) {
        document.querySelector("#mensaje p").innerHTML = mensajes.papi;
        enemigo.src = "img/interrogante.png";
        document.getElementById("maquina").appendChild(divSuyo);

    } else if (puntosSeleccionado === 2 && idEnemigo === 2) {
        document.querySelector("#mensaje p").innerHTML = "EMPATE";
        enemigo.src = "img/interrogante.png";


    } else if (puntosSeleccionado === 2 && idEnemigo === 3) {
        document.querySelector("#mensaje p").innerHTML = mensajes.tipa;
        enemigo.src = "img/interrogante.png";
        document.getElementById("maquina").appendChild(divSuyo);

    } else if (puntosSeleccionado === 2 && idEnemigo === 4) {
        document.querySelector("#mensaje p").innerHTML = mensajes.lapa;
        enemigo.src = "img/interrogante.png";
        document.getElementById("maquina").appendChild(divSuyo);


    } else if (puntosSeleccionado === 2 && idEnemigo === 5) {
        document.querySelector("#mensaje p").innerHTML = mensajes.pasp;
        enemigo.src = "img/interrogante.png";
        document.getElementById("jugador").appendChild(divMio);

    }

    /*----------------------------------------------------------------------------*/

    else if (puntosSeleccionado === 3 && idEnemigo === 1) {
        document.querySelector("#mensaje p").innerHTML = mensajes.piti;
        enemigo.src = "img/interrogante.png";
        document.getElementById("maquina").appendChild(divSuyo);

    } else if (puntosSeleccionado === 3 && idEnemigo === 2) {
        document.querySelector("#mensaje p").innerHTML = mensajes.tipa;
        enemigo.src = "img/interrogante.png";
        document.getElementById("jugador").appendChild(divMio);


    } else if (puntosSeleccionado === 3 && idEnemigo === 3) {
        document.querySelector("#mensaje p").innerHTML = "EMPATE";
        enemigo.src = "img/interrogante.png";

    } else if (puntosSeleccionado === 3 && idEnemigo === 4) {
        document.querySelector("#mensaje p").innerHTML = mensajes.tila;
        enemigo.src = "img/interrogante.png";
        document.getElementById("jugador").appendChild(divMio);


    } else if (puntosSeleccionado === 3 && idEnemigo === 5) {
        document.querySelector("#mensaje p").innerHTML = mensajes.spti;
        enemigo.src = "img/interrogante.png";
        document.getElementById("maquina").appendChild(divSuyo);
    }

    /*----------------------------------------------------------------------------*/

    else if (puntosSeleccionado === 4 && idEnemigo === 1) {
        document.querySelector("#mensaje p").innerHTML = mensajes.pila;
        enemigo.src = "img/interrogante.png";
        document.getElementById("maquina").appendChild(divSuyo);

    } else if (puntosSeleccionado === 4 && idEnemigo === 2) {
        document.querySelector("#mensaje p").innerHTML = mensajes.lapa;
        enemigo.src = "img/interrogante.png";
        document.getElementById("jugador").appendChild(divMio);


    } else if (puntosSeleccionado === 4 && idEnemigo === 3) {
        document.querySelector("#mensaje p").innerHTML = mensajes.tila;
        enemigo.src = "img/interrogante.png";
        document.getElementById("maquina").appendChild(divSuyo);


    } else if (puntosSeleccionado === 4 && idEnemigo === 4) {
        document.querySelector("#mensaje p").innerHTML = "EMPATE";
        enemigo.src = "img/interrogante.png";

    } else if (puntosSeleccionado === 4 && idEnemigo === 5) {
        document.querySelector("#mensaje p").innerHTML = mensajes.lasp;
        enemigo.src = "img/interrogante.png";
        document.getElementById("maquina").appendChild(divSuyo);
    }

    /*----------------------------------------------------------------------------*/

    else if (puntosSeleccionado === 5 && idEnemigo === 1) {
        document.querySelector("#mensaje p").innerHTML = mensajes.sppi;
        enemigo.src = "img/interrogante.png";
        document.getElementById("jugador").appendChild(divMio);

    } else if (puntosSeleccionado === 5 && idEnemigo === 2) {
        document.querySelector("#mensaje p").innerHTML = mensajes.pasp;
        enemigo.src = "img/interrogante.png";
        document.getElementById("maquina").appendChild(divSuyo);

    } else if (puntosSeleccionado === 5 && idEnemigo === 3) {
        document.querySelector("#mensaje p").innerHTML = mensajes.spti;
        enemigo.src = "img/interrogante.png";
        document.getElementById("jugador").appendChild(divMio);

    } else if (puntosSeleccionado === 5 && idEnemigo === 4) {
        document.querySelector("#mensaje p").innerHTML = mensajes.lasp;
        enemigo.src = "img/interrogante.png";
        document.getElementById("maquina").appendChild(divSuyo);

    } else if (puntosSeleccionado === 5 && idEnemigo === 5) {
        document.querySelector("#mensaje p").innerHTML = "EMPATE";
        enemigo.src = "img/interrogante.png";
    }

    let jugador = document.getElementById("jugador");
    let maquina = document.getElementById("maquina");

    let cuentaJugador = jugador.getElementsByTagName("div").length;
    let cuentaMaquina = maquina.getElementsByTagName("div").length;

    if (cuentaJugador === 10 || cuentaMaquina === 10){
        location.reload();
    }
}

/***************************DRAG AND DROP ****************************/
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("id", this.id);
}

function drop(ev) {
    ev.preventDefault();
    var idElement = ev.dataTransfer.getData("id");
    document.getElementById("seleccionado").innerHTML = "";
    this.appendChild(document.getElementById(idElement).cloneNode(true));
    imagenMaquina();
    setTimeout(deliverar, 200);
}
/***************************FIN DRAG AND DROP **************************/