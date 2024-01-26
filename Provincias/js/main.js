let datos;

window.onload =  () =>{
    mostrarProvincias();
}

function mostrarProvincias() {
    let url = "https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/provincias-espanolas/records?limit=52";
    //no hace falta ni async ni await porque solo hay un fetch
    fetch(url).then(data => data.json()).then(provincias => {
        datos = provincias.results;
        cargarProvincias();
    });
}

function cargarProvincias() {
    //obtenemos la comunidad con su clase y accediendo al div de dentro
    let comunidad = document.querySelectorAll(".comunidad div");
    // lo recorremos y con la comprobacion le añadimos el evento al amchor (a)
    for (const com of comunidad) {
        if (com.querySelector("a")){
            com.querySelector("a").addEventListener("click", showProv);
        }
    }
}

function showProv() {
    informacion.innerHTML = "";//reseteamos el html para que no se acumule
    let comunidad = decodeURI(this.parentNode.dataset.id); // eliminaos las cosas raras de los dataid
    //Comunidad%20Foral%20de%20Navarra => Comunidad Foral de Navarra
    let tabla = document.createElement("table");
    let fila = document.createElement("tr");
    fila.innerText = this.dataset.provincia; // ponemos en la fila el nombre de la provincia

    informacion.appendChild(tabla);
    fila.innerText = comunidad;
    //table.appendChild(td);

    for (const provincias of datos) {
        if (provincias.ccaa == comunidad){
            let columna = document.createElement("td");
            columna.appendChild(document.createTextNode(provincias.provincia));
            columna.addEventListener("click", () =>{
                cargarMapa(provincias.geo_point_2d);
            });
            tabla.appendChild(columna);
        }
    }
}

function cargarMapa(coordenadas) {
    let urlMapa = `https://www.openstreetmap.org/#map=14/${coordenadas.lat}/${coordenadas.lon}`;
    window.open(urlMapa);
}