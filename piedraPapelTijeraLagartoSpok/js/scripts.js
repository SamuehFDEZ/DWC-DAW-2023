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

let imagenes = ["img/piedra.png","img/papel.png", "img/tijera.png", "img/lagarto.png", "img/spock.png"];

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
    document.getElementById("mensaje").className = "visible";
    document.getElementById("proteccion").className = "visible";
    document.getElementById("deliveracion").className = "visible";

    //Si es una jugada reiniciamos todo menos los contadores de puntos.
    //Si es el final de la partida, también incluimos los contadores de puntos.
    cargarTablero();
}

function imagenMaquina() {
    let numRand = Math.floor(Math.random() * 5);
    enemigo.firstElementChild.src = imagenes[numRand];

}

function deliverar() {
    document.getElementById("proteccion").className="visible";
    document.getElementById("deliveracion").className="visible";
    setTimeout(mostrarMensaje,2000);
}

function mostrarMensaje() {
    //Mostramos el mensaje en función del resultado de la jugada o de la partida
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
}

function drop(ev) {
    ev.preventDefault();
    var idElement = ev.dataTransfer.getData("id");
    this.appendChild(document.getElementById(idElement).cloneNode(true));
    imagenMaquina();
}
/***************************FIN DRAG AND DROP **************************/