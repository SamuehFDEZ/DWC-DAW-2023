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

//Obtenemos el JSON de la dirección indicada
async function cargarUsuarios() {
    let url = "https://jsonplaceholder.typicode.com/users";
    await fetch(url).then(data => data.json()).then(info =>{
       usuarios = info;
    });
}

//Función que devuelve el sexo del usuario
async function estimarGenero(nombre) {
    partes = nombre.split(" ");
    nombre = partes[0];
    let url = `https://api.genderize.io?name=${nombre}`;
    await fetch(url).then(data => data.json()).then(info => {
    });
}
//Función que devuelve la edad del usuario
async function calcularEdad(nombre) {
    let url = `https://api.agify.io/?name=${nombre}`;
    await fetch(url).then(data => data.json()).then(info =>{

    });
}

//Buscamos la ciudad sugerida.
async function cargarCiudad(lat, lng) {
    let url = `https://geocode.xyz/${lat},${lng}?json=1`;
    await fetch(url).then(data => data.json()).then(info => {

    });
}

//Cargamos el JSON de usuarios en el select
//<option value=[id del usuario]>[nombre del usuario]</option>
function cargarSelectUsuarios() {
    reiniciarParametros();
    for (const usuario of usuarios) {
        let option = document.createElement("option");
        option.value = usuario.id;
        option.innerText = usuario.name;
        document.getElementById("usuarios").appendChild(option);
    }
}

//Función genérica para la creación de elementos
function crearElemento(div, inner, clas, info) {
    div.createElement("div");
    inner.innerText;
}


//Filtrado de info utilizando array.filter u otro sistema
async function mostrarDatosUsuario() {
    let nombrePrimero = this.value-1;
    document.getElementById("info").innerText = "";
    zonaPosts.innerHTML = "";
    zonaAlbums.innerHTML = "";
    zonaFotos.innerHTML = "";
    console.log(this.value);
    botonera.classList.remove("oculto");
    let fondo = document.createElement("div");
    let foto = document.createElement("img");
    fondo.id = "foto";
    foto.src = "img/female.png";
    fondo.appendChild(foto);
    datosUsuarios.appendChild(fondo);

    if (usuarios[nombrePrimero].gender === "female"){
        foto.src = "img/female.png";

    }
    else if (usuarios[nombrePrimero].gender === "male"){
        foto.src = "img/male.png";
        fondo.appendChild(foto);
        info.appendChild(fondo);
    }

    let divNombre = document.createElement("div");
    divNombre.innerText = "Nombre:";
    divNombre.classList.add("titulo");
    document.getElementById("info").appendChild(divNombre);

    let divDescripcioNombre = document.createElement("div");
    divDescripcioNombre.innerText = usuarios[this.value-1].name;
    divDescripcioNombre.classList.add("descripción");
    document.getElementById("info").appendChild(divDescripcioNombre);

    let divEdad = document.createElement("div");
    divEdad.innerText = "Edad:";
    divEdad.classList.add("titulo");
    document.getElementById("info").appendChild(divEdad);

    let divDescripcionEdad = document.createElement("div");
    divDescripcionEdad.innerText = usuarios[this.value-1].age;
    divDescripcionEdad.classList.add("descripción");
    document.getElementById("info").appendChild(divDescripcionEdad);

    let divEmail = document.createElement("div");
    divEmail.innerText = "Email:";
    divEmail.classList.add("titulo");
    document.getElementById("info").appendChild(divEmail);

    let divDescripcionEmail = document.createElement("div");
    divDescripcionEmail.innerText = usuarios[this.value-1].email;
    divDescripcionEmail.classList.add("descripción");
    document.getElementById("info").appendChild(divDescripcionEmail);

  /*  let aEnDescEmail = document.createElement("a");
    aEnDescEmail.href = */

    let divCiudad = document.createElement("div");
    divCiudad.innerText = "Ciudad:";
    divCiudad.classList.add("titulo");
    document.getElementById("info").appendChild(divCiudad);

    let divDescripcionCiudad = document.createElement("div");
    divDescripcionCiudad.innerText = "Zeewolf Fracture Zone";
    divDescripcionCiudad.classList.add("descripción");
    document.getElementById("info").appendChild(divDescripcionCiudad);

    let divWeb = document.createElement("div");
    divWeb.innerText = "Web:";
    divWeb.classList.add("titulo");
    document.getElementById("info").appendChild(divWeb);

    let divDescripcionWeb = document.createElement("div");
    divDescripcionWeb.innerText = "hildegard.org";
    divDescripcionWeb.classList.add("descripción");
    document.getElementById("info").appendChild(divDescripcionWeb);



    await estimarGenero(usuarios[nombrePrimero].name);
}

//Reiniciamos los parámetros para crear elementos.
function reiniciarParametros() {
    parametros = {tipo:"", clase:"", id:"", texto:"", src:"", href:"", value:""};
}

//Mostramos los posts en el div con id="posts"
async function showPosts() {
    zonaPosts.innerHTML = "";
    //A COMPLETAR
}

//Obtenemos los posts del servidor
async function getPosts() {
    url = `https://jsonplaceholder.typicode.com/users/${idUser}/posts`;
    //A COMPLETAR
}

//Mostramos los albumes en el div con id="albumes"
async function showAlbums() {
    zonaPosts.innerHTML = "";
    zonaAlbums.innerHTML = "";
    //A COMPLETAR
}

//Obtenemos los albumes del servidor
async function getAlbums() {
    url = `https://jsonplaceholder.typicode.com/users/${idUser}/posts`;
    //A COMPLETAR
}

//Mostramos las fotos en el div id="fotos"
async function showFotos() {
    zonaFotos.innerHTML = "";
    //A COMPLETAR
}

//Obtenemos las fotos del servidor
async function getFotos(idAlbum) {
    url = `https://jsonplaceholder.typicode.com/albums/${idAlbum}/photos`;
    //A COMPLETAR
}
