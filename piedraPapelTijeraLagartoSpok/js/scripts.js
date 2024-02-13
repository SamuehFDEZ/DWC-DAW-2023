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
        console.log(seleccionado.firstElementChild.src);
        console.log(enemigo.src);

        if (seleccionado.firstElementChild.id == "piedra" && enemigo.id == "tijera"){
            document.querySelector("#mensaje p").innerHTML = mensajes.piti;
            console.log(true);
        }

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

    //Si es el final de la partida, también incluimos los contadores de puntos.
   /* if(jugador.length - 1 !== null && maquina.length - 1 !== null ){

    }*/
    cargarTablero();
}

function imagenMaquina() {
    let numRand = Math.floor(Math.random() * 5);
    enemigo.firstElementChild.id = numRand + 1;
    console.log(enemigo.firstElementChild.id);
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

function cargarTablero() {
    //Función donde crearemos los elementos que vayamos a necesitar, junto a sus atributos y eventos
    //La utilizaremos para reiniciar cada jugada
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