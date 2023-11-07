window.onload = function() {
    const teclado = document.getElementById("teclado");
    for(let teclaActual = 65; teclaActual <= 90;teclaActual++) {
        const tecla = document.createElement("button");
        tecla.innerText = String.fromCharCode(teclaActual);
        tecla.classList.add("tecla");
        teclado.appendChild(tecla);

        tecla.addEventListener("click", anyadirLetra);
        tecla.addEventListener("click", ultimaLetra)

        function ultimaLetra() {
            const lastLetra = document.getElementById("ultimaLetra");
            lastLetra.classList.add("nuevoTexto");
            lastLetra.innerText = tecla.innerText;
        }

        /*// Select first child element:
        const element = document.getElementById("myList").children[0];

// Create a new text node:
        const newNode = document.createTextNode("Water");

// Replace the text node:
        element.replaceChild(newNode, element.childNodes[0]);*/

        function anyadirLetra() {

           /* const coleccionLetras = document.getElementById("coleccionLetras");
            coleccionLetras.classList.add("nuevoTexto");
            coleccionLetras.innerText += tecla.innerText;*/

            const letrasUsadas = document.getElementById("letrasUsadas");
            const letras = document.createElement("div");
            letras.classList.add("nuevoTexto");
            letras.textContent += tecla.innerText;
            letrasUsadas.appendChild(letras);
        }
    }


    const extremidades = document.getElementsByClassName("extremidad");

    for (const extremidad of extremidades) {
        extremidad.classList.add("papanoelEscondido");
    }

    const peliculas = ["El espíritu de la Navidad",
        "Elf",
        "The Polar Express",
        "El origen de los guardianes",
        "El Grinch"
    ];

    const aleatorios = peliculas[Math.floor(Math.random() * peliculas.length)];
    const titulo = document.getElementById("titulo");

    for (const aleatorio of aleatorios) {
        const lineas =document.createElement("span");
        lineas.innerHTML = "_ ";
        titulo.appendChild(lineas);
    }
    console.log(aleatorios);
}