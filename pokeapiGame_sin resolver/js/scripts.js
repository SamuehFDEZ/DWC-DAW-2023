let totalCartas = 10;
let cartasMaquinas =[];
let cartasJugador = [];
let pokemons;
let juegaLaMaquina = false;

window.onload = async () =>{
    ocultarCartel();
    await cargarPokemons();
    player.addEventListener("click", cartaEnJugada);
    turnoSalida();
}

function ocultarCartel(){
    cartel.classList.add("ocultar");
}
function desocultarCartel(){
    cartel.classList.remove("ocultar");
}

function cartaEnJugada(event) {
    // Obtén el elemento que fue clickeado (la carta)
    const cartaClickeada = event.target.closest(".carta");

    // Verifica que la carta sea hija del div player
    if (cartaClickeada && player.contains(cartaClickeada)) {
        // Mueve la carta al div jugadaPlayer
        jugadaPlayer.appendChild(cartaClickeada);
        console.log(cuentaCartas());
        if (cuentaCartas() >= 2){
            juegaLaMaquina = true;
            comprobarJugada();
        }
        else{
            setTimeout(turnoDeMaquina, 3000);
            juegaLaMaquina = false;

        }
    }
}


function turnoSalida(){
    // Maquina - 0
    //Jugador - 1
    let turno = Math.floor(Math.random() * 2);
    
    if (!turno){
        console.log(turno);
        reportero.innerHTML = '<img src="img/progress.gif">'+"Juega la máquina";
        turnoDeMaquina();

    }
    else {
        console.log(turno);
        reportero.innerText = "Juega el jugador";

    }
}

cartaMaquina.sort((a,b)=> a[0] - b[0]);
cartaPlayer.sort((a,b)=> a[0] - b[0]);



function cuentaCartas(){
    return play.querySelectorAll("#play .carta").length;
}

//cuando haya dos cartas en medio comprobar quien gana
function comprobarJugada() {
    if (parseInt(jugadaMachine.querySelector(".carta .experiencia").innerText) >
        parseInt(jugadaPlayer.querySelector(".carta .experiencia").innerText)){
        let cartasJugadas = play.querySelectorAll(".carta");
        for (carta of cartasJugadas) {
            cartasMachine.appendChild(carta);
            totalMachine.innerText = parseInt(totalMachine.innerText) + parseInt(carta.querySelector(".experiencia").innerText);
            if (totalMachine.innerText >= 1000){
                cartel.innerText = "Ha ganado la maquina";
                desocultarCartel();
                let boton = document.createElement("button");
                boton.id = "volveraJugar";
                boton.innerText = "Volver a Jugar";
                cartel.appendChild(boton);
                volverJugar();

            }
        }
        turnoDeMaquina();
    }
    else if (parseInt(jugadaMachine.querySelector(".carta .experiencia").innerText) <
        parseInt(jugadaPlayer.querySelector(".carta .experiencia").innerText)){
        let cartasJugadas = play.querySelectorAll(".carta");
        for (carta of cartasJugadas) {
            cartasPlayer.appendChild(carta);
            totalPlayer.innerText = parseInt(totalPlayer.innerText) + parseInt(carta.querySelector(".experiencia").innerText);
            if (totalPlayer.innerText >= 1000){
                cartel.innerText = "Ha ganado el jugador";
                desocultarCartel();
                let boton = document.createElement("button");
                boton.id = "volveraJugar";
                boton.innerText = "Volver a Jugar";
                cartel.appendChild(boton);
                volverJugar();
            }
        }
    }
    else{
        cartasPlayer.appendChild(jugadaPlayer.querySelector(".carta"));
        cartasMachine.appendChild(jugadaMachine.querySelector(".carta"));
        if (juegaLaMaquina){
            turnoDeMaquina();
        }

    }
}

async function turnoDeMaquina() {
    let cartasMaquina = document.querySelectorAll("#machine .carta");
    let cartaMaquina = elegirCarta(); //cartasMaquina[Math.floor(Math.random() * cartasMaquina.length)];
    cartaMaquina.querySelector("img.dorso").remove();
    jugadaMachine.appendChild(cartaMaquina);
    if (cuentaCartas() >= 2){
       await comprobarJugada();
    }
}

function elegirCarta() {
    let cartaElegida;

    if (play.querySelectorAll(".carta").length == 1){
        // experiencia carta jugador
        let exp = parseInt(jugadaPlayer.querySelector(".carta .experiencia").innerText);
        let cartasMaquina = machine.querySelectorAll(".carta");
        console.log(typeof(parseInt(cartasMaquina[0].querySelector(".experiencia").innerText)));
        /*for (const carta of cartaMaquina) {
            if (parseInt(carta.querySelector(".experiencia").innerText) > exp){
                return carta
            }
        }*/
        let i = 0;
        while (!cartaElegida || i < cartasMaquina.length){
            if(parseInt(cartasMaquina[i].querySelector(".experiencia").innerText == exp)){
                //comprobar puntuacion
                if (parseInt(totalMachine.innerText)
                    + parseInt(cartasMaquina[i].querySelector(".experiencia").innerText) >= 1000){
                    cartaElegida = cartasMaquina[i];
                }
            }
            else if(parseInt(cartasMaquina[i].querySelector(".experiencia").innerText > exp)){
                cartaElegida = cartasMaquina[i];
            }
            i++;
        }
        if (!cartaElegida){
            cartaElegida = cartasMaquina[0];
        }
    } else{
       //la maquina elige una carta random
        cartaElegida = cartasMaquina[Math.floor(Math.random() * cartasMaquinas.length)];
    }
    return cartaElegida;
}

async function cargarPokemons() {
    let iniURL = "https://pokeapi.co/api/v2/pokemon";
    let totalURL;
    let total;

    await fetch(iniURL).then(data => data.json()).then(info => {
        total = info.count;
        totalURL = "https:pokeapi.co/api/v2/pokemon/?limit="+total
    });

    await fetch(totalURL).then(data => data.json()).then(info => {
        pokemons = info.results;
    });
    let pokemonSeleccionados = [];
    let i = 0;

    while (i < totalCartas) {
        let pos = Math.floor(Math.random() * total);

        if (pokemonSeleccionados[pos] != "X") {
            pokemonSeleccionados[pos] = "X";

            let cartaPokemon = await cargarPokemon(pokemons[pos].url);

            if (cartaPokemon[0]){
                if (i%2 === 0){
                    cartasJugador.push(await cargarPokemon(pokemons[pos].url))
                }
                else{
                    cartasMaquinas.push(await cargarPokemon(pokemons[pos].url));
                }
                i++;
            }
        }
    }
    cargarCartas();
}

async function cargarPokemon(url) {
    let pokemon = [];
   await fetch(url).then(data => data.json()).then(info =>{
       pokemon.push(info.base_experience);
       pokemon.push(info.name);
       pokemon.push(info.sprites.other["official-artwork"].front_default);
   });
    return pokemon;
}


function volverJugar() {
    let boton = document.getElementById("volveraJugar")
    boton.addEventListener("click", ()=>{
        location.reload();
    })
}

function cargarCartas() {
    // bucle para las cartas del jugador
    for (let i = 0; i < cartasJugador.length; i++) {
        let carta = document.createElement("div");
        carta.classList.add("carta");

        let exp = document.createElement("div");
        exp.classList.add("experiencia");
        exp.innerText = cartasJugador[i][0];

        let img = document.createElement("img");
        img.src = cartasJugador[i][2];

        let nombre = document.createElement("div");
        nombre.innerText= cartasJugador[i][1];

        player.appendChild(carta);
        carta.appendChild(exp);
        carta.appendChild(img);
        carta.appendChild(nombre);
    }

    // bucle para las cartas de la maquina
    for (let i = 0; i < cartasMaquinas.length; i++) {
        let carta = document.createElement("div");
        carta.classList.add("carta");

        let exp = document.createElement("div");
        exp.classList.add("experiencia");
        exp.innerText = cartasMaquinas[i][0];
        carta.appendChild(exp);

        let img = document.createElement("img");
        img.src = cartasMaquinas[i][2];
        carta.appendChild(img);

        let nombre = document.createElement("div");
        nombre.innerText= cartasMaquinas[i][1];
        carta.appendChild(nombre);

        let dorso = document.createElement("img");
        dorso.src = "img/dorso.png";
        dorso.classList.add("dorso");

        carta.appendChild(dorso);
        machine.appendChild(carta);
    }
}