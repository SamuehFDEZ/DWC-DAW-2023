//SELECT con los usuarios
let usuariosSel;
//JSON con todos los usuarios
let usuarios;
//Div donde cargaremos los datos del usuario seleccionado
let datosUsuarios;

//Div donde tenemos los botones. Permanecerá oculto mientras no haya seleccionado un usuario
let botonera;

//Div donde mostraremos los posts
let zonaPosts;

//Div donde mostraremos las fotos;
let zonaAlbums;

//Div donde mostraremos las fotos;
let zonaFotos;

//Boton Posts
let mostrarPosts;

//Boton Fotos
let mostrarFotos;


let idUser = 0;



var parametros = {tipo:"", clase:"", id:"", texto:"", src:"", href:"", value:""};


window.onload = async () => {
    //Seleccionamos el SELECT
    usuariosSel = document.querySelector("#usuarios");
    //Añadimos change al SELECT
    usuariosSel.addEventListener("change", mostrarDatosUsuario);
    //Seleccionamos el div donde cargaremos los datos de los usuarios.
    datosUsuarios = document.querySelector("#info");

    zonaPosts = document.getElementById("posts");
    zonaFotos = document.getElementById("fotos");
    zonaAlbums = document.getElementById("albums");

    mostrarPosts = document.getElementById("mostrarPosts");
    mostrarFotos = document.getElementById("mostrarFotos");

    mostrarPosts.addEventListener("click", showPosts);
    mostrarFotos.addEventListener("click", showAlbums);

    botonera = document.querySelector("#botonera");

    await cargarUsuarios();
    cargarSelectUsuarios();
}

//Cargamos el JSON de usuarios en el select
//<option value=[id del usuario]>[nombre del usuario]</option>
function cargarSelectUsuarios() {
    reiniciarParametros();
    for (const user of usuarios) {
        let option = document.createElement("option");
        option.value = user.id;
        option.innerText = user.name;
        usuariosSel.appendChild(option);
    }
}

//Obtenemos el JSON de la dirección indicada
async function cargarUsuarios() {
    let url = "https://jsonplaceholder.typicode.com/users";
    await fetch(url).then(data => data.json()).then(info =>{
        usuarios = info;
    });
}

//Función que devuelve el sexo del usuario
async function estimarGenero(nombre) {
    let partes = nombre.split(" ");
    let url = `https://api.genderize.io?name=${partes[0]}`;
    let genero;
    await fetch(url).then(data => data.json()).then(info => {
        genero = info.gender;
    });
    return genero;
}

//Función que devuelve la edad del usuario
async function calcularEdad(nombre) {
    let partes = nombre.split(" ");
    let edad;
    let url = `https://api.agify.io/?name=${partes[0]}`;
    await fetch(url).then(data => data.json()).then(info =>{
        edad = info.age;
    });
    return edad;
}

//Buscamos la ciudad sugerida.
async function cargarCiudad(lat, lng) {
    let url = `https://geocode.xyz/${lat},${lng}?json=1`;
    await fetch(url).then(data => data.json()).then(info => {
    });
}

//Función genérica para la creación de elementos

async function crearElemento(titulo, descripcion) {
    const divTitulo = document.createElement("div");
    divTitulo.innerText = titulo + ":";
    divTitulo.classList.add("titulo");
    document.getElementById("info").appendChild(divTitulo);

    const divDescripcion = document.createElement("div");
    divDescripcion.classList.add("descripción");

    if (titulo === "Email" || titulo === "Web") {
        let anchor = document.createElement("a");

        if (titulo === "Email") {
            anchor.href = "mailto:" + descripcion;
        } else if (titulo === "Web") {
            anchor.href = descripcion;
            anchor.target = "_blank";
        }

        anchor.innerText = descripcion;
        divDescripcion.appendChild(anchor);
    } else {
        divDescripcion.innerText = descripcion;
    }

    datosUsuarios.appendChild(divDescripcion);
}

//Filtrado de info utilizando array.filter u otro sistema
async function mostrarDatosUsuario() {
    let nombrePrimero = this.value - 1;
    let nombrePartido = usuarios[nombrePrimero].name.split(" ");
    document.getElementById("info").innerText = "";
    zonaPosts.innerHTML = "";
    zonaAlbums.innerHTML = "";
    zonaFotos.innerHTML = "";
    botonera.classList.remove("oculto");
    let fondo = document.createElement("div");
    let foto = document.createElement("img");
    fondo.id = "foto";
    foto.src = "img/female.png";
    fondo.appendChild(foto);

    if (await estimarGenero(usuarios[nombrePrimero].name) === "male" || nombrePrimero === 5) {
        foto.src = "img/male.png";
        fondo.appendChild(foto);
        datosUsuarios.appendChild(fondo);
    }
    else if (await estimarGenero(usuarios[nombrePrimero].name) === "female") {
        foto.src = "img/female.png";
        fondo.appendChild(foto);
        datosUsuarios.appendChild(fondo);
    }

    let edad = await calcularEdad(usuarios[nombrePrimero].name);
    if (nombrePrimero === 5){
        edad = 65;
    }
    await crearElemento("Nombre", usuarios[nombrePrimero].name);
    await crearElemento("Edad",  edad + " años");
    await crearElemento("Email", usuarios[nombrePrimero].email);
    await crearElemento("Ciudad", usuarios[nombrePrimero].address.city);
    await crearElemento("Web", usuarios[nombrePrimero].website);

    idUser = usuarios[this.value-1].id;

}

//Reiniciamos los parámetros para crear elementos.
function reiniciarParametros() {
    parametros = {tipo:"", clase:"", id:"", texto:"", src:"", href:"", value:""};
}

//Mostramos los posts en el div con id="posts"
async function showPosts() {
    zonaPosts.innerHTML = "";
    zonaAlbums.innerHTML = "";
    await getPosts(idUser);
}

//Obtenemos los posts del servidor
async function getPosts(idUser) {
    url = `https://jsonplaceholder.typicode.com/users/${idUser}/posts`;
    await fetch(url).then(data => data.json()).then(info => {
        for (const infoElement of info) {
            let divPost = document.createElement("div");
            let divTitular = document.createElement("div");
            let divCuerpo = document.createElement("div");
            divCuerpo.classList.add("cuerpo")
            divCuerpo.id = "";
            divTitular.classList.add("titular")
            divTitular.id = "";
            divTitular.innerText = infoElement.title;
            divPost.classList.add("post");
            divPost.id = "";
            divCuerpo.innerText = infoElement.body;
            divPost.appendChild(divTitular);
            divPost.appendChild(divCuerpo);
            posts.appendChild(divPost);
        }
    });
}

//Mostramos los albumes en el div con id="albumes"
async function showAlbums() {
    zonaPosts.innerHTML = "";
    zonaAlbums.innerHTML = "";
   await getAlbums(idUser);
}

//Obtenemos los albumes del servidor
async function getAlbums(idUser) {
    url = `https://jsonplaceholder.typicode.com/users/${idUser}/posts`;
    await fetch(url).then(data => data.json()).then(async info =>{
       for (const infoElement of info) {
            let album = document.createElement("div");
            let anchor = document.createElement("a");
            anchor.classList.add("album");
            anchor.id = infoElement.id;
            anchor.href =  "#";
            anchor.addEventListener("click", await showFotos);
            anchor.innerText = infoElement.title;
            album.appendChild(anchor);
            albums.appendChild(album);
        }
    });
}

//Mostramos las fotos en el div id="fotos"
async function showFotos(event) {
    zonaFotos.innerHTML = "";
    const idAlbum = event.target.id; // Obtiene el ID del álbum haciendo clic en el enlace
    await getFotos(idAlbum); // Llama a getFotos con el ID del álbum
}

//Obtenemos las fotos del servidor
async function getFotos(idAlbum) {
    url = `https://jsonplaceholder.typicode.com/albums/${idAlbum}/photos`;
    await fetch(url).then(data => data.json()).then(info =>{
        for (let i = 0; i < info.length; i++) {
            let img = document.createElement("img");
            img.classList.add("foto");
            img.src = info[i].thumbnailUrl;
            fotos.appendChild(img);
        }
    });
}