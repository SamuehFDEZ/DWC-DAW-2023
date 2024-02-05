window.onload = () =>{
    fondo.classList.add("oculto");
    cartel.classList.add("oculto");

    mostrarCartas(10);
}




function mostrarCartas(num) {
    let carta = document.createElement("div");
    let imagen = document.createElement("img");
    carta.classList.add("carta");
    imagen.src = "./img/db"+num+".jpg";
    carta.appendChild(imagen);
    tablero.appendChild(carta);

}