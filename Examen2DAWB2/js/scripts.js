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


window.onload = async function() {
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

    usuarios = await cargarUsuarios();


    cargarSelectUsuarios();
}

//Obtenemos el JSON de la dirección indicada
async function cargarUsuarios() {
    let url = "https://jsonplaceholder.typicode.com/users";
    await fetch(url).then(data => data.json()).then(info =>{
        for (let i = 0; i < info.length; i++) {
            let option = document.createElement("option");
            option.value = info[i].id;
            option.innerText = info[i].name;
            document.getElementById("usuarios").appendChild(option);
            let nombre = info[i].name.split(" ");
            console.log(nombre[0]);
            estimarGenero(info[0].name.gender);
        }
    });
}

//Función que devuelve el sexo del usuario
async function estimarGenero(nombre) {
    let url = `https://api.genderize.io?name=${nombre}`;
    await fetch(url).then(data => data.json()).then(info => {
        console.log(info);
    });
}
//Función que devuelve la edad del usuario
async function calcularEdad(nombre) {
    let url = `https://api.agify.io/?name=${nombre}`;
    //A COMPLETAR
}

//Cargamos el JSON de usuarios en el select
//<option value=[id del usuario]>[nombre del usuario]</option>
function cargarSelectUsuarios() {
    reiniciarParametros();
    //A COMPLETAR
}

//Función genérica para la creación de elementos
function crearElemento(atributos) {
    //A COMPLETAR SI SE QUIERE
}

//Buscamos la ciudad sugerida.
async function cargarCiudad(lat, lng) {
    let url = `https://geocode.xyz/${lat},${lng}?json=1`;
    //A COMPLETAR
}
//Filtrado de info utilizando array.filter u otro sistema
async function mostrarDatosUsuario() {
    zonaPosts.innerHTML = "";
    zonaAlbums.innerHTML = "";
    zonaFotos.innerHTML = "";
    //A COMPLETAR
    botonera.classList.remove("oculto");
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
