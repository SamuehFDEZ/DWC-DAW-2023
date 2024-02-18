window.onload = () =>{
    lanzar.addEventListener("click", lanzarDado);
}

function lanzarDado() {
    let dadete = document.createElement("img");
    let numRandom = Math.floor(Math.random() * 6+1);
    dado.innerHTML = "";
    dadete.src = `img/${numRandom}.png`;
    dado.appendChild(dadete);
    main.innerHTML = "";

    if (numRandom%2 === 0){
        cargarNorris();
    }
    else{
        cargarRickYMorty();
    }
}

async function cargarRickYMorty() {
    let urlCharacter = "https://rickandmortyapi.com/api/character";

    await fetch(urlCharacter).then(data => data.json()).then(info => {
        let numero = info.info.count;
        let numRand = Math.floor(Math.random() * numero);
        URLTotal = `https://rickandmortyapi.com/api/character/${numRand}`;
    });
    await fetch(URLTotal).then(data => data.json()).then(info => {
       mostrarPersonajeRickMorty(info);
       return info;
    });
}

async function cargarNorris(){
    let urlNorris = "https://api.chucknorris.io/jokes/random";
    await fetch(urlNorris).then(data => data.json()).then(info => {
        mostrarChisteNorris(info);
        return info;
    });
}

function mostrarChisteNorris(info) {
    let divNorris = document.createElement("div");
    divNorris.classList.add("chuckContainer");
    let h3Norris = document.createElement("h3");
    h3Norris.innerText = info.categories;
    if (h3Norris.innerText == ""){
        h3Norris.innerText = "No tiene categoria";
    }
    let pNorris = document.createElement("p");
    pNorris.innerText = info.value;
    divNorris.appendChild(h3Norris);
    divNorris.appendChild(pNorris);
    main.appendChild(divNorris);
}


function mostrarPersonajeRickMorty(info) {
    let divPadre = document.createElement("div");
    divPadre.classList.add("rickContainer");
    let imagen = document.createElement("img");
    imagen.src = info.image;
    divPadre.appendChild(imagen);
    //main.appendChild(divPadre);

    let nombre = document.createElement("div");
    nombre.classList.add("name");
    nombre.innerText = info.name;
    divPadre.appendChild(nombre);
    main.appendChild(divPadre);

    let genero = document.createElement("div");
    genero.classList.add("gender");
    let h3Genero = document.createElement("h3");
    h3Genero.innerText = "Género";
    let pGenero = document.createElement("p");
    pGenero.innerText = info.gender;
    genero.appendChild(h3Genero);
    genero.appendChild(pGenero);
    divPadre.appendChild(genero);
    //main.appendChild(genero);

    let divEspecie = document.createElement("div");
    divEspecie.classList.add("specie");
    let h3Especie = document.createElement("h3");
    h3Especie.innerText = "Especie";
    let pEspecie = document.createElement("p");
    pEspecie.innerText = info.species;
    divEspecie.appendChild(h3Especie);
    divEspecie.appendChild(pEspecie);
    divPadre.appendChild(divEspecie);

    let divType = document.createElement("div");
    divType.classList.add("type");
    let h3Type = document.createElement("h3");
    h3Type.innerText = "Tipo";
    let pTipo = document.createElement("p");
    pTipo.innerText = info.type;
    divType.appendChild(h3Type);
    divType.appendChild(pTipo);
    divPadre.appendChild(divType);
    if (pTipo.innerText == ""){
        pTipo.innerText = "Desconocido";
    }
}