window.onload =  () =>{
     cargarProvincias();
}

function cargarProvincias() {
    let comunidad = document.querySelectorAll(".comunidad");

    for (const com of comunidad) {
        com.addEventListener("click", mostrarProvincias);
    }
}


async function mostrarProvincias() {
    let url = " https://api/explore/v2.1/catalog/datasets/provincias-espanolas/records?limit=52";

    await fetch(url).then(data => data.json()).then(provincias => {
        console.log(provincias);
        //showProv(provincias);
    });
}


/*function showProv(provincias) {
    let table = document.createElement("table");
    let td = document.createElement("td");

    informacion.appendChild(table);
    table.appendChild(td);
}*/
