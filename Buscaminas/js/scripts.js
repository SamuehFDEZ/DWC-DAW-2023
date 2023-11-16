window.onload = function () {
    const empezar = document.getElementById("empezar");
    const error = document.getElementById("error");
    const numMinas = document.getElementById("numMinas");
    const tablero = document.getElementById("tablero");

    empezar.addEventListener("click", juego);

    function juego() {
        if (numMinas.value < 5 || numMinas.value > 50) {
            error.style.display = "block";
        } else {
            error.style.display = "none";
            crearTablero(100);
        }
    }

    function crearTablero(numBombas) {
        tablero.innerHTML = ''; // Limpiar el tablero

        for (let i = 0; i < numBombas; i++) {
            const casilla = document.createElement("div");
            casilla.classList.add("casilla", "oculto");

            casilla.addEventListener("click", revelarCelda);
            tablero.appendChild(casilla);
        }
    }

    function revelarCelda(event) {
        const celda = event.target;
        celda.classList.remove("oculto");
        // Aquí debes implementar la lógica para mostrar el contenido de la celda
    }
};
