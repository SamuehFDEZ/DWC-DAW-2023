window.onload = () =>{
    cargarAnuncioBloqueador();
    const listaVideos = document.getElementsByClassName("lista");
    const boton = document.getElementById("boton");
    play.addEventListener("click", botonPlay);
    silent.addEventListener("click", botonMute);
    retrasar.addEventListener("click", retrasarBoton);
    adelantar.addEventListener("click", adelantarBoton);
    reiniciar.addEventListener("click", reiniciarBoton);
    quitarVolumen.addEventListener("click", menosVolumen);
    masVolumen.addEventListener("click", moreVolumen);
    boton.addEventListener("click", quitarPubli);
    barra.addEventListener('click', segundoDelVideo);

    for (const listaVideo of listaVideos) {
        listaVideo.addEventListener("click", videoAlReproductor);
    }
}

function cargarAnuncioBloqueador() {
    bloquear.classList.remove("oculto");
    panel.classList.remove("oculto");
    contador();
}

function quitarPubli() {
    this.parentNode.classList.add("oculto");
    bloquear.classList.add("oculto");

}


let num = setInterval(contador, 1000);
numero = 11;

function contador(){
    if (numero !== 0){
        boton.classList.add("oculto");
    }
    else{
        boton.classList.remove("oculto");

    }
    if(numero === 0){
        clearInterval(num);

    }
    else {
        numero -= 1;
        document.getElementById("numero").innerHTML = numero;
    }
}

function videoAlReproductor() {
    /*Coges el video del reporductor dentro de una variable, el contenido de esa
    * variable lo sustituyes por el video que estas clickando y el video que estas clickando
    * lo sustituyes por el del reproductor,
    * esto lo que quiere decir es que vamos sustituyendo los valores
    * y los vamos swapeando entre ellos, es como el codigo comentado de las letras de abajo */
    let video = document.getElementById("video");
    let videoAReproductor = video.src;
    video.src = this.src;
    this.src = videoAReproductor;
    numero = 10;
    document.getElementById("numero").innerHTML = numero;

    bloquear.classList.remove("oculto");
    panel.classList.remove("oculto");
}

/*
a que vale 1 y b que vale 2
c vale a (c=1)
luego a = b (b=1)
luego b = c (c = 2)
let a = 1
let b = 2;
let c = a;

a = b;
b = c;
*/

let rep = 0;
let reproduciendo = false;
let silenciar = false;
function botonPlay() {
    if (!reproduciendo){
        rep = setInterval(progreso, 1);
        video.play();
        reproduciendo = true;
    }
    else{
        clearInterval(rep);
        video.pause();
        reproduciendo = false;
    }
}

function moreVolumen() {
    try {
        video.volume += 0.1;
    }
    catch (e){
        console.log(e+"No se puede pasar de uno")
    }

}

function menosVolumen() {
    try {
        video.volume -= 0.1;
    }
    catch (e){
        console.log(e+"No se puede pasar de uno")
    }
}

function reiniciarBoton() {
    video.currentTime = 0;
}

function adelantarBoton() {
    video.currentTime += 1;
}

function retrasarBoton() {
    video.currentTime -= 1;
}

function progreso() {
    barra.value = video.currentTime*10000
    barra.max = video.duration*10000
}

function botonMute() {
    video.volume = 0;
    if (silenciar){
        video.volume = 1;
        silenciar = false;
    }
    else{
        video.volume = 0;
        silenciar = true;
    }
}
function segundoDelVideo(e) {
    // en porcentaje se calcula lo que mide la barra y lo que ocupa en el navegador
    let porcentaje = (100*e.offsetX)/barra.offsetWidth;
    video.currentTime = Math.floor(video.duration * (porcentaje / 100));
}