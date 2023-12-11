let botones = document.getElementsByClassName("boton")

window.onload = () =>{
    botonRegistrar.addEventListener("click", ocultarRegistro);
    botonLog.addEventListener("click", ocultarLog);
    botonRegistrar.addEventListener("click", enviar);
    botonLog.addEventListener("click", enviar);

    for (const boton of botones) {

    }
}


function enviar() {
    
}

function ocultarRegistro() {
    registrar.classList.remove("oculto");
    login.classList.add("oculto");
}

function ocultarLog() {
    login.classList.remove("oculto");
    registrar.classList.add("oculto");
}