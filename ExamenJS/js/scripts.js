let gruposJugadores = [["Futbolistas", "futbol"],
    ["Intérpretes", "interpretes"],
    ["DC", "dc"],
    ["Star Wars", "starwars"],
    ["Marvel", "marvel"]
];

//Número de jugadores en cada grupo
let numeroJugadores = 13;

//Número máximo de jugadores por equipo
let maxJugadoresEquipo = 11;

window.onload = function() {
    //Obtenemos mensaje y bloquear para ocultarlos agregandoles la clase de css oculto
    const mensaje = document.getElementById("mensaje");
    const bloquear = document.getElementById("bloquear");
    const botonJugar = document.getElementById("botonJugar")
    mensaje.classList.add("oculto");
    bloquear.classList.add("oculto");
    cargarJugadorSelect(); // cargamos en el select los tipos de jugadores

    //por cada jugador le "cargamos" sus respectivas imagenes
    document.getElementById("selectorJugadores").addEventListener("click", cargarImg);

    //al pulsar el boton jugar invocamos a la funcion jugar
    botonJugar.addEventListener("click", jugar);

}

/*funcion que cuando se clicka en la opcion del select despliega todas las imagenes
* asociadas y coincidentes con el indice del array de grupoJugadores
* la url esta construida de la siguiente forma:
* img/ el valor del select, la posicion que se esta iterando y la extension del archivo */
function cargarImg() {
    let grupoJugadores = document.getElementById("selectorJugadores");
    let jugadores = document.getElementById("jugadores");
    jugadores.innerHTML = "";// cada vez que invoquemos a la funcion, las imagenes no se acumularan
    if (document.querySelector("img")!== null){
        document.querySelector("img").remove();
    }
    if (grupoJugadores !== ''){
        for (let i = 1; i <= numeroJugadores; i++) {
            let jugadoresImg = document.createElement("img");
            jugadoresImg.addEventListener("dblclick", elegirEquipo);
            jugadoresImg.classList.add("jugador");
            jugadoresImg.src="img/"+grupoJugadores.value+"/"+i+".jpg";
            jugadores.appendChild(jugadoresImg);
        }
    }
}

/*funcion que al hacer doble click mueve las imagenes ha un lado del campo
* ya sea equipo1 o equipo2, aqui controlariamos si hay mas de 11 en un equipo que no se
* puede*/
function elegirEquipo() {
    let imagen = this;
    let campos = document.getElementsByClassName("campo");
    let jugadores = document.getElementById("jugadores");
    let cantidadJugadores = document.getElementsByClassName("cantidadJugadores");
    let selectorEquipo = document.getElementsByClassName("selectorEquipo");


    /*Con esto pretendia que si en el select esta seleccionado equipo 1 las imagenes se pasen
    * al lado izquierdo, lo mismo para el lado derecho, solo funciona para el lado derecho*/
    jugadores.removeChild(imagen);
    campos[1].appendChild(imagen);
    cantidadJugadores[1].innerHTML++;
    if (selectorEquipo.innerHTML === "Equipo1"){
        jugadores.removeChild(imagen);
        campos[0].appendChild(imagen);
        cantidadJugadores[0].innerHTML++;
    }else if(selectorEquipo.innerHTML === "Equipo2"){
        jugadores.removeChild(imagen);
        campos[1].appendChild(imagen);
        cantidadJugadores[1].innerHTML++;
    }

    else if (cantidadJugadores[1].innerHTML >= 11){
        maximoJugadores();
        cantidadJugadores[1].innerHTML = 11;
    }
}

function cargarJugadorSelect() {
    //obtenemos el select de los jugadores
    const selectorJugadores = document.getElementById("selectorJugadores");
    //Al ser 5 tipos de jugadores recorremos el for 5 veces
    for (let i = 0; i < 5; i++) {
        /*En el creamos el elemento option de los select,
        * el texto de cada opcion sera el indice del for mas el indice 0 del array:
        * 0 => Futbolistas
        * 1 => Intérpretes, y finalmente agregamos esto al select */

        opcion = jugadoresImg = document.createElement("option");
        opcion.innerHTML = gruposJugadores[i][0];
        opcion.value = gruposJugadores[i][1];
        selectorJugadores.appendChild(opcion);
    }
}

//Devuelve un número aleatorio entero entre el mínimo y el máximo indicado, ambos inclusive
function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

//funcion para que, cuando le demos a volver a jugar recargue la pagina
function volverAJugar() {
    location.reload();
}

/*Funcion que, cuando le demos a, en este caso a jugar (aunque soy consciente que es con otra funcionalidad)
* aparezca la pantalla de bloqueo y el cartel mostrando el mensaje y con un boton de continuar*/
function maximoJugadores() {
    let mensaje = document.getElementById("mensaje");
    let bloquear = document.getElementById("bloquear");
    mensaje.classList.remove("oculto");
    mensaje.classList.add("error");
    mensaje.textContent = "No puede haber mas de 11 jugadores en el mismo equipo"
    let boton = document.createElement("button");
    boton.textContent = "continuar";
    bloquear.classList.remove("oculto");
    boton.addEventListener("click", () => {
        mensaje.classList.add("oculto");
        mensaje.classList.remove("error");
        bloquear.classList.add("oculto");
    });
    mensaje.appendChild(boton);
}