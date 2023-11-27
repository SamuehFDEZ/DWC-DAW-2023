window.onload = () =>{
    play.addEventListener("click", botonPlay);
    silenciar.addEventListener("click", botonMute)
}

let reproduciendo = false;
function botonPlay() {
    if (!reproduciendo){
        video.play()
        reproduciendo = true;
    }
    else{
        video.pause();
        reproduciendo = false;
    }

}

function botonMute() {
    video.volume = 0;
}

