window.onload = function () {

    const botones = document.getElementsByClassName('boton');
    const pantalla = document.getElementById('pantalla');

    for (const boton of botones) {
        boton.addEventListener("mousedown", anyadirSombra);

        boton.addEventListener("mouseup", quitarSombra);

        boton.addEventListener("click", numeros)

    }
    function anyadirSombra() {
        this.classList.add("sombra")
    }

    function quitarSombra() {
        this.classList.remove("sombra")
    }

    function numeros() {
        let valorBoton = this.innerText;

        switch (valorBoton) {
            case "«":
                pantalla.value = pantalla.value.slice(0, -1);
                if (pantalla.value === ""){
                    pantalla.value = "0"
                }
                break;
            case "C":
                pantalla.value = "0"
                break;
            case "=":
                pantalla.value = eval( pantalla.value);
                break;
            default:
                if (pantalla.value === "0") {
                    if (valorBoton !== "C") {
                        pantalla.value = valorBoton;
                    } else {
                        pantalla.value += valorBoton;
                    }
                } else {
                    pantalla.value += valorBoton;
                }
                break;
        }
    }
}