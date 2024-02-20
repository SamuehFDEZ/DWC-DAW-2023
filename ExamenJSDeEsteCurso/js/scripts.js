
// dentro del window onload todos los botones que cuando clickamos nos lleva las funciones
window.onload = async () =>{
    empezar.addEventListener("click", anyadirOculto)
    todos.addEventListener("click", await cargarTodos);
    alumnos.addEventListener("click", await cargarTodosAlumnos);
    profesores.addEventListener("click", await cargarTodosProfes);
    asignalo.addEventListener("click", await cargarAsign);
}

//funcion para quitar las clases que nos "molestan"
function anyadirOculto(){
    protector.classList.add("ocultar");
    titulo.classList.add("ocultar");
    logo.classList.remove("ocultar");
}


//funcion para cargar todos los usuarios, recorriendo un for
// con la longitud de info, a cada texto se vamos poniendo sus respectivos campos
async function cargarTodos(){
    cartas.innerHTML = "";
    let todosLosUsuarios = "http://diegogarcia.ddns.net/usuarios";
    await fetch(todosLosUsuarios).then(data => data.json()).then(info =>{
        for (let i = 0; i < info.length; i++) {
            let divPadre = document.createElement("div");
            divPadre.classList.add("carta");
            divPadre.id = info[i].id;
            let img = document.createElement("img");
            img.src = info[i].foto;

            let divNombre = document.createElement("div");
            divNombre.classList.add("nombre");
            divNombre.innerText = info[i].nombre +" "+ info[i].apellidos;

            let divEmail = document.createElement("div");
            divEmail.classList.add("email");
            divEmail.innerText = info[i].correo;

            let divRol = document.createElement("div");
            divRol.classList.add("rol");
            if (info[i].rol === "Alumno"){
                divRol.classList.add("alumno");
                divRol.innerText = info[i].rol.slice(0,1);
            }
            else{
                divRol.classList.add("profesor");
                divRol.innerText = info[i].rol.slice(0,1);

            }
            divPadre.appendChild(img);
            divPadre.appendChild(divNombre);
            divPadre.appendChild(divEmail);
            divPadre.appendChild(divRol);

            divPadre.addEventListener("click", cargarAsignaturas);

            cartas.appendChild(divPadre);
        }
    });
}


//Lo mismo que la funcion de cargarTodos pero solo con alumnos
async function cargarTodosAlumnos() {
    cartas.innerHTML = "";
    let todosLosAlumnnos = "http://diegogarcia.ddns.net/usuarios/alumno";
    await fetch(todosLosAlumnnos).then(data => data.json()).then(info =>{
        for (let i = 0; i < info.length; i++) {
            let divPadre = document.createElement("div");
            divPadre.classList.add("carta");
            divPadre.id = info[i].id;
            let img = document.createElement("img");
            img.src = info[i].foto;

            let divNombre = document.createElement("div");
            divNombre.classList.add("nombre");
            divNombre.innerText = info[i].nombre +" "+ info[i].apellidos;

            let divEmail = document.createElement("div");
            divEmail.classList.add("email");
            divEmail.innerText = info[i].correo;

            let divRol = document.createElement("div");
            divRol.classList.add("rol");
            divRol.classList.add("alumno");
            divRol.innerText = info[i].rol.slice(0,1);


            divPadre.appendChild(img);
            divPadre.appendChild(divNombre);
            divPadre.appendChild(divEmail);
            divPadre.appendChild(divRol);

            divPadre.addEventListener("click", cargarAsignaturas);

            cartas.appendChild(divPadre);
        }
    });
}

//Lo mismo que la funcion de cargarTodos pero solo con los profes
async function cargarTodosProfes() {
    cartas.innerHTML = "";
    let todosLosProfes = "http://diegogarcia.ddns.net/usuarios/profesor";
    await fetch(todosLosProfes).then(data => data.json()).then(info =>{
        for (let i = 0; i < info.length; i++) {
            let divPadre = document.createElement("div");
            divPadre.classList.add("carta");
            divPadre.id = info[i].id;
            let img = document.createElement("img");
            img.src = info[i].foto;

            let divNombre = document.createElement("div");
            divNombre.classList.add("nombre");
            divNombre.innerText = info[i].nombre +" "+ info[i].apellidos;

            let divEmail = document.createElement("div");
            divEmail.classList.add("email");
            divEmail.innerText = info[i].correo;

            let divRol = document.createElement("div");
            divRol.classList.add("rol");
            divRol.classList.add("profesor");
            divRol.innerText = info[i].rol.slice(0,1);

            divPadre.appendChild(img);
            divPadre.appendChild(divNombre);
            divPadre.appendChild(divEmail);
            divPadre.appendChild(divRol);

            divPadre.addEventListener("click", cargarAsignaturas);

            cartas.appendChild(divPadre);
        }
    });
}


//cuando clickamos en una carta, nos muetra informacion
async function cargarAsignaturas(){
    let todosLosUsuariosConID = "http://diegogarcia.ddns.net/asignaturas/alumno/ID";
    await fetch(todosLosUsuariosConID).then(data => data.json()).then(info =>{
        let div = document.createElement("div");
        div.classList.toggle("asignaturas");
       /* if (){

        }*/
        div.innerText = info;
        this.appendChild(div);
    });
}

let todasLasAsingProfeID = "http://diegogarcia.ddns.net/asignaturas/profesor/ID";
let todasLasAsingAlumnoID = "http://diegogarcia.ddns.net/asignaturas/alumno/1";
let roles = "http://diegogarcia.ddns.net/roles";


// cuando clickamos el boton asignaturas cargamos una tabla con todas las asignaturas
// sus horas y sus respectivos profes
async function cargarAsign(){
    asignaturas.classList.remove("ocultar");
    protector.classList.remove("ocultar");
    cerrar.addEventListener("click", () =>{
        asignaturas.classList.add("ocultar");
        protector.classList.add("ocultar");

    });

    let todasLasAsignaturas = "http://diegogarcia.ddns.net/asignaturas";
    await fetch(todasLasAsignaturas).then(data => data.json()).then(info =>{
        for (let i = 0; i < info.length; i++) {
            let tr = document.createElement("tr");
            tabla.appendChild(tr);

            let tdNombre = document.createElement("td");
            tdNombre.classList.add("celdaas")
            tdNombre.innerHTML = info[i].titulo;
            tr.appendChild(tdNombre);

            let tdHoras = document.createElement("td");
            tdHoras.classList.add("celdaho")
            tdHoras.innerHTML = info[i].horas;
            tr.appendChild(tdHoras);

            let tdProfesor = document.createElement("td");
            tdProfesor.classList.add("celdapr")
            tdProfesor.innerHTML = info[i].profesor;
            tr.appendChild(tdProfesor);
        }
    });
}