window.onload = function() {
    const teclado = document.getElementById("teclado");
    const peliculas = ["El espíritu de la Navidad",
        "Elf",
        "The Polar Express",
        "El origen de los guardianes",
        "El Grinch"
    ];

    for (let teclaActual = 65; teclaActual <= 90; teclaActual++) {
        const tecla = document.createElement("button");
        tecla.innerText = String.fromCharCode(teclaActual);
        tecla.classList.add("tecla");
        teclado.appendChild(tecla);

        tecla.addEventListener("click", anyadirLetra);
        tecla.addEventListener("click", ultimaLetra)
        tecla.addEventListener("click", nombrePelicula);


        function ultimaLetra() {
            const lastLetra = document.getElementById("ultimaLetra");
            lastLetra.classList.add("nuevoTexto");
            lastLetra.innerText = tecla.innerText;
        }

        function anyadirLetra() {
            /*!*Obtenemos el div del html
            * creamos uno dinamicamente
            * a ese div le añadimos la clase css de nuevoTexto, como texto,
            * le asignamos el del boton con el this, y finalmente se lo añadimos al div padre*!*/
            const coleccionLetras = document.getElementById("coleccionLetras");
            const nuevaLetra = document.createElement("div");
            nuevaLetra.classList.add("nuevoTexto");
            nuevaLetra.innerText = this.innerText;
            coleccionLetras.appendChild(nuevaLetra);
        }
    }



    const aleatorios = peliculas[Math.floor(Math.random() * peliculas.length)].toUpperCase();
    const titulo = document.getElementById("titulo");
    for (const aleatorio of aleatorios) {
        if (aleatorio === " ") {
            const espacio = document.createElement("span");
            espacio.innerHTML = "&nbsp; ";
            titulo.appendChild(espacio);
        }
        else if(aleatorio !== " ") {
            let linea = document.createElement("span");
            linea.innerHTML = "_ ";
            titulo.appendChild(linea);
            linea.className = aleatorio;
        }
    }

    const extremidades = document.getElementsByClassName("extremidad");

    for (const extremidad of extremidades) {
        extremidad.classList.add("papanoelEscondido");
    }

    console.log(aleatorios)

    function nombrePelicula() {
        const spans = document.getElementsByTagName("span");
        let letra = this.innerText;
        for (let i = 0; i < aleatorios.length; i++) {
            if (aleatorios[i] === letra) {
                spans[i].textContent = letra;
            }
           /* else{
                for (const extremidad of extremidades) {
                    extremidades.classList.remove("papanoelEscondido");
                }
            }*/
        }
    }
}