window.onload = () =>{
    const listaVideos = document.getElementsByClassName("lista");
    let boton = document.getElementsByTagName("button");
    play.addEventListener("click", botonPlay);
    silent.addEventListener("click", botonMute);
    retrasar.addEventListener("click", retrasarBoton);
    adelantar.addEventListener("click", adelantarBoton);
    reiniciar.addEventListener("click", reiniciarBoton);
    quitarVolumen.addEventListener("click", menosVolumen);
    masVolumen.addEventListener("click", moreVolumen);
    boton.addEventListener("click", quitarPubli);

    for (const listaVideo of listaVideos) {
        listaVideo.addEventListener("click", videoAlReproductor);
    }
}

function quitarPubli() {
    let panel = document.getElementById("panel");
    panel.remove();
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


let reproduciendo = false;
let silenciar = false;
function botonPlay() {
    if (!reproduciendo){
        video.play();
        reproduciendo = true;
    }
    else{
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