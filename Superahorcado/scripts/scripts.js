let peliculaASolucionar = [];


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
            //console.log(aleatorios.includes(this.innerText));
            peliculaASolucionar.push(linea);
        }
    }

    console.log(peliculaASolucionar);
    function nombrePelicula() {
        for (const aleatorio of aleatorios) {
            if (aleatorios.includes(this.innerText)){
                let linea = document.createElement("span");
                linea.innerHTML = "_ ";
                linea.innerHTML.replaceAll("_ ", this.innerText);
            }
        }

        console.log(aleatorios.includes(this.innerText));

    }

    console.log(aleatorios);


    const extremidades = document.getElementsByClassName("extremidad");

    for (const extremidad of extremidades) {
        extremidad.classList.add("papanoelEscondido");
    }

}


