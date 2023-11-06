window.onload = function() {
    const teclado = document.getElementById("teclado");
    for(let teclaActual = 65; teclaActual <= 90;teclaActual++) {
        const tecla = document.createElement("button");
        tecla.innerText = String.fromCharCode(teclaActual);
        tecla.classList.add("tecla");
        teclado.appendChild(tecla);

    }

    const noel = document.getElementById("monigote");
    const extremidades = document.getElementsByClassName("extremidad");

    for (const extremidad of extremidades) {
        extremidad.style.visibility = "hidden";
    }
}