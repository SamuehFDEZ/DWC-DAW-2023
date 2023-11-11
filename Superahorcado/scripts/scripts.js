let arrayLetras = [];

window.onload = function () {
    const teclado = document.getElementById("teclado");
    const peliculas = ["El espiritu de la Navidad",
        "Elf",
        "The Polar Express",
        "El origen de los guardianes",
        "El Grinch",
        "Arthur Christmas",
        "Solo en casa",
        "Gremlins"
    ];

    for (let teclaActual = 65; teclaActual <= 90; teclaActual++) {
        const tecla = document.createElement("button");
        tecla.innerText = String.fromCharCode(teclaActual);
        tecla.classList.add("tecla");
        teclado.appendChild(tecla);

        tecla.addEventListener("click", anyadirLetra);
        tecla.addEventListener("click", ultimaLetra)
        tecla.addEventListener("click", nombrePelicula);
        tecla.addEventListener("click", fallos);
        tecla.addEventListener("click", puntuacion);

/* -------------------MOSTRAR LA ULTIMA LETRA USADA-----------------------------------------------------*/
        function ultimaLetra() {
            const lastLetra = document.getElementById("ultimaLetra");
            lastLetra.classList.add("nuevoTexto");
            lastLetra.innerText = tecla.innerText;
        }
/*AÑADIR LAS LETRAS QUE VAYAMOS USANDO, SI (CON EL ARRAY QUE HEMOS CREADO: arrayLetras)
YA ESTAN LAS LETRAS NO LAS MOTRAMOS---------------------------------------------------------*/
        function anyadirLetra() {
            let letra  = this.innerText;

            if (!arrayLetras.includes(letra)){
                arrayLetras.push(letra);
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
    }

/*------PARA GENERAR LAS PELICULAS DEL ARRAY ALEATORIOAS Y MOSTRAR SUS HUECOS QUE LUEGO SERAN------------
-----------------------------RELLENADOS POR LAS LETRAS---------------------------------------------------*/
    const aleatorios = peliculas[Math.floor(Math.random() * peliculas.length)].toUpperCase();
    const titulo = document.getElementById("titulo");
    for (const aleatorio of aleatorios) {
        if (aleatorio === " ") {
            const espacio = document.createElement("span");
            espacio.innerHTML = "&nbsp; ";
            titulo.appendChild(espacio);
        } else if (aleatorio !== " ") {
            let linea = document.createElement("span");
            linea.innerHTML = "_ ";
            titulo.appendChild(linea);
            linea.className = aleatorio;

        }
    }

    const extremidades = document.getElementsByClassName("extremidad");

    for (const extremidad of extremidades) {
        extremidad.classList.add("noelEscondido");
    }

    /*------------SI ACERTAMOS +1000PTOS, CADA VEZ QUE HAYA MAS PARTES DEL PAPA NOEL SE IRAN RESTANDO 100PTOS*/
    function puntuacion() {
        const numeros = document.getElementById("numeros");
        let letra = this.innerText;
        let puntuacionActual = parseInt(numeros.textContent);

        let letrasEnTitulo = aleatorios.split('');
        //se crea un nuevo array para las palabras repetidas y asi multiplicarlas segun cuantas haya
        // si por ejemplo hay 4 As pues sera 4*1000, lo que hace la linea 60
        let repeticiones = letrasEnTitulo.filter(l => l === letra).length;

        // Calcula la puntuación por letra acertada
        puntuacionActual += repeticiones * 1000;

        // Descuenta puntos por partes de Papá Noel
        for (let i = 0; i < extremidades.length; i++) {
            if (!extremidades[i].classList.contains("noelEscondido")) {
                puntuacionActual -= 100;
            }
        }

        // Actualiza la puntuación en el elemento HTML
        numeros.textContent = puntuacionActual.toString().padStart(5, '0');
    }



    let coincidencia = false;
    let letrasAcertadas = 0;

    const body = document.getElementById("body");
    const div = document.createElement("div")
    const label = document.createElement("label");
    const boton = document.createElement("button");

    /*--------A MEDIDA QUE PULSAMOS EN LOS BOTONES, SI ESTAN LAS LETRAS EN LA PELICULA---------------------
    ------------------------------LAS VAMOS MOSTRANDO-----------------------------------------------------*/
    function nombrePelicula() {
        const spans = document.getElementsByTagName("span");
        let letra = this.innerText;
        for (let i = 0; i < aleatorios.length; i++) {
            if (aleatorios[i] === letra) {
                spans[i].textContent = letra;
                coincidencia = true;
                letrasAcertadas++;
            }
        }
        /*aleatorios.replace(/ /g, "").length cuenta la cantidad de letras en la cadena aleatorios
        sin contar los espacios. Si letrasAcertadas llega a ser igual a esta cantidad, significa
        que se han acertado todas las letras.*/
        if (letrasAcertadas === aleatorios.replace(/ /g, "").length) {

            label.textContent = "GG WP";
            boton.textContent = "VOLVER A JUGAR";
            div.classList.add("cartelVerde")
            body.appendChild(div);
            label.classList.add("labelGG");
            div.appendChild(label);
            div.appendChild(boton);
            boton.classList.add("botonGG");
            teclado.style.display = 'none';

            boton.addEventListener("click", ()=>{
                location.reload();
            });
        }
    }


    /*------------------------CUANDO SE FALLA LA LETRA QUE VAYA APARECIENDO EL PAPA NOEL------------------- */

    let fallo = 0;
    function fallos() {
        if (!aleatorios.includes(this.innerText)){
            extremidades[fallo].classList.remove("noelEscondido");
            fallo++;

        }
        if (fallo === 10 ){
            label.textContent = "ERES UN LOSER";
            boton.textContent = "VOLVER A JUGAR";
            div.classList.add("cartelRojo")
            body.appendChild(div);
            label.classList.add("labelPerdedor");
            div.appendChild(label);
            div.appendChild(boton);
            boton.classList.add("botonPerdedor");
            teclado.style.display = 'none';


            boton.addEventListener("click", ()=>{
                location.reload();
            });

        }
    }
}