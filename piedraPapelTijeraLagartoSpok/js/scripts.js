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
    cargarTablero();
    asignarElementosHTML();
    cargarEventos();

    let elementos = document.querySelectorAll(".contitem .item>img");

    elementos.forEach(el =>{
       el.draggable = true;
       el.addEventListener("dragstart", drag);
    });

    document.getElementById("seleccionado").addEventListener("drop", drop);
    document.getElementById("seleccionado").addEventListener("dragover", allowDrop);
}

function asignarElementosHTML() {
    //Función que utilizaremos para asignar los elementos HTML que vayamos a utilizar, a las varibales que hemos creado.
}

function cargarEventos() {
    //Función donde cargaremos los eventos que necesite cada elemento de la partida
}

function continuar() {
    //Función que lanzamos cuando pulsamos al botón continuar
    //Volvemos a ocultar el mensaje;

    //Si es una jugada reiniciamos todo menos los contadores de puntos.
    if (jugada){
        let enemigo = document.querySelector("#enemigo img");
        let seleccionado = document.getElementById("seleccionado");
        document.getElementById("mensaje").className = "visible";
        console.log(seleccionado.firstElementChild.dataset.puntos);
        console.log(enemigo.id);

        mostrarResultado(seleccionado, enemigo, mensajes);
        puntos();
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
    
    cargarTablero();
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

function puntos() {
    let divMio = document.createElement("div");
    divMio.classList.add("punto");
    divMio.classList.add("mio");
    let divSuyo = document.createElement("div");
    divSuyo.classList.add("punto");
    divSuyo.classList.add("suyo");
    document.getElementById("maquina").appendChild(divSuyo);

   /* var mensajes = {
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
    }*/

    if (parseInt(seleccionado.firstElementChild.dataset.puntos) === 1 &&
        parseInt(enemigo.id) === 2) {
        document.getElementById("maquina").appendChild(divSuyo);
    }
    else if (parseInt(seleccionado.firstElementChild.dataset.puntos) === 1 &&
        parseInt(enemigo.id) === 3) {
        document.getElementById("jugador").appendChild(divMio);
    }
    else if (parseInt(seleccionado.firstElementChild.dataset.puntos) === 1 &&
        parseInt(enemigo.id) === 4) {
        document.getElementById("jugador").appendChild(divMio);
    }
    else if (parseInt(seleccionado.firstElementChild.dataset.puntos) === 1 &&
        parseInt(enemigo.id) === 5) {
        document.getElementById("maquina").appendChild(divSuyo);
    }
   /* else if (parseInt(seleccionado.firstElementChild.dataset.puntos) === 2 &&
        parseInt(enemigo.id) === 1) {
        document.getElementById("jugador").appendChild(divMio);
    }*/
}

function mostrarMensaje() {
    continuar();
}

function cargarTablero() {
    //Función donde crearemos los elementos que vayamos a necesitar, junto a sus atributos y eventos
    //La utilizaremos para reiniciar cada jugada
}

function mostrarResultado(seleccionado, enemigo, mensajes) {
    let puntosSeleccionado = parseInt(seleccionado.firstElementChild.dataset.puntos);
    let idEnemigo = parseInt(enemigo.id);

    if (puntosSeleccionado === 1 && idEnemigo === 1) {
        document.querySelector("#mensaje p").innerHTML = "EMPATE";
    } else if (puntosSeleccionado === 1 && idEnemigo === 2) {
        document.querySelector("#mensaje p").innerHTML = mensajes.papi;
    } else if (puntosSeleccionado === 1 && idEnemigo === 3) {
        document.querySelector("#mensaje p").innerHTML = mensajes.piti;
    } else if (puntosSeleccionado === 1 && idEnemigo === 4) {
        document.querySelector("#mensaje p").innerHTML = mensajes.pila;
    } else if (puntosSeleccionado === 1 && idEnemigo === 5) {
        document.querySelector("#mensaje p").innerHTML = mensajes.sppi;
    }

    else if (puntosSeleccionado === 2 && idEnemigo === 1) {
        document.querySelector("#mensaje p").innerHTML = mensajes.papi;
    } else if (puntosSeleccionado === 2 && idEnemigo === 2) {
        document.querySelector("#mensaje p").innerHTML = "EMPATE";
    } else if (puntosSeleccionado === 2 && idEnemigo === 3) {
        document.querySelector("#mensaje p").innerHTML = mensajes.tipa;
    } else if (puntosSeleccionado === 2 && idEnemigo === 4) {
        document.querySelector("#mensaje p").innerHTML = mensajes.lapa;
    } else if (puntosSeleccionado === 2 && idEnemigo === 5) {
        document.querySelector("#mensaje p").innerHTML = mensajes.pasp;
    }

    else if (puntosSeleccionado === 3 && idEnemigo === 1) {
        document.querySelector("#mensaje p").innerHTML = mensajes.piti;
    } else if (puntosSeleccionado === 3 && idEnemigo === 2) {
        document.querySelector("#mensaje p").innerHTML = mensajes.tipa;
    } else if (puntosSeleccionado === 3 && idEnemigo === 3) {
        document.querySelector("#mensaje p").innerHTML = "EMPATE";
    } else if (puntosSeleccionado === 3 && idEnemigo === 4) {
        document.querySelector("#mensaje p").innerHTML = mensajes.tila;
    } else if (puntosSeleccionado === 3 && idEnemigo === 5) {
        document.querySelector("#mensaje p").innerHTML = mensajes.spti;
    }

    else if (puntosSeleccionado === 4 && idEnemigo === 1) {
        document.querySelector("#mensaje p").innerHTML = mensajes.pila;
    } else if (puntosSeleccionado === 4 && idEnemigo === 2) {
        document.querySelector("#mensaje p").innerHTML = mensajes.lapa;
    } else if (puntosSeleccionado === 4 && idEnemigo === 3) {
        document.querySelector("#mensaje p").innerHTML = mensajes.tila;
    } else if (puntosSeleccionado === 4 && idEnemigo === 4) {
        document.querySelector("#mensaje p").innerHTML = "EMPATE";
    } else if (puntosSeleccionado === 4 && idEnemigo === 5) {
        document.querySelector("#mensaje p").innerHTML = mensajes.lasp;
    }

    else if (puntosSeleccionado === 5 && idEnemigo === 1) {
        document.querySelector("#mensaje p").innerHTML = mensajes.sppi;
    } else if (puntosSeleccionado === 5 && idEnemigo === 2) {
        document.querySelector("#mensaje p").innerHTML = mensajes.pasp;
    } else if (puntosSeleccionado === 5 && idEnemigo === 3) {
        document.querySelector("#mensaje p").innerHTML = mensajes.spti;
    } else if (puntosSeleccionado === 5 && idEnemigo === 4) {
        document.querySelector("#mensaje p").innerHTML = mensajes.lasp;
    } else if (puntosSeleccionado === 5 && idEnemigo === 5) {
        document.querySelector("#mensaje p").innerHTML = "EMPATE";
    }
}

/***************************DRAG AND DROP ****************************/
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("id", this.id);
    console.log(this);
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