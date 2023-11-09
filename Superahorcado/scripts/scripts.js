window.onload = function() {
    const teclado = document.getElementById("teclado");
    for (let teclaActual = 65; teclaActual <= 90; teclaActual++) {
        const tecla = document.createElement("button");
        tecla.innerText = String.fromCharCode(teclaActual);
        tecla.classList.add("tecla");
        teclado.appendChild(tecla);

        tecla.addEventListener("click", anyadirLetra);
        tecla.addEventListener("click", ultimaLetra)
        tecla.addEventListener("click", nombrePelicula);


        function nombrePelicula() {



        }

        function ultimaLetra() {
            const lastLetra = document.getElementById("ultimaLetra");
            lastLetra.classList.add("nuevoTexto");
            lastLetra.innerText = tecla.innerText;
        }

        function anyadirLetra() {
            /*Obtenemos el div del html
            * creamos uno dinamicamente
            * a ese div le añadimos la clase css de nuevoTexto, como texto,
            * le asignamos el del boton con el this, y finalmente se lo añadimos al div padre*/
            const coleccionLetras = document.getElementById("coleccionLetras");
            const nuevaLetra = document.createElement("div");
            nuevaLetra.classList.add("nuevoTexto");
            nuevaLetra.innerText = this.innerText;
            coleccionLetras.appendChild(nuevaLetra);
        }
    }
    const peliculas = ["El espíritu de la Navidad",
        "Elf",
        "The Polar Express",
        "El origen de los guardianes",
        "El Grinch"
    ];

    const cabeza = document.getElementById("cabeza");

    const titulo = document.getElementById("titulo");
    const aleatorios = peliculas[Math.floor(Math.random() * peliculas.length)];
    for (const aleatorio of aleatorios) {
        if (aleatorio === " ") {
            const espacio = document.createElement("span");
            espacio.innerHTML = "&nbsp; ";
            titulo.appendChild(espacio);
        } else {
            const linea = document.createElement("span");
            linea.innerHTML = "_ ";
            titulo.appendChild(linea);

        }
    }
    console.log(aleatorios);
    console.log(aleatorios.innerText)




    const extremidades = document.getElementsByClassName("extremidad");

    for (const extremidad of extremidades) {
        extremidad.classList.add("papanoelEscondido");
    }
}