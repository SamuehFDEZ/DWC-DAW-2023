let codigoEstados = [
    "al", "ak", "az", "ar", "ca",
    "co", "ct", "de", "fl", "ga",
    "hi", "id", "il", "in", "ia",
    "ks", "ky", "la", "me", "md",
    "ma", "mi", "mn", "ms", "mo",
    "mt", "ne", "nv", "nh", "nj",
    "nm", "ny", "nc", "nd", "ok",
    "or", "pa", "ri", "sc", "sd",
    "tn", "tx", "ut", "vt", "va",
    "wa", "wv", "wi", "wy"
];

let promesasFetch = [];

window.onload = async () =>{
    await clickEstado();
}

//click al area que contiene el panel oculto y despliega la info del estado
async function clickEstado(){
    let area = document.getElementsByTagName("area");
    for (const areaElement of area) {
        areaElement.addEventListener("click", mostrarPanel);
        modal.addEventListener("click", mostrarPanel);
    }
}

//mostrar o no panel
// funcion asyncrona para cargar el nombre del estado y sus notas
async function mostrarPanel() {
    modal.classList.toggle("oculto");

    titulo.innerText = this.title;

    let url = `https://api.covidtracking.com/v1/states/info.json`;
    await cargarNotas(url);



}

async function cargarNotas(url) {
    await fetch(url).then(data => data.json()).then(info => {
        console.log(info);
        notas.innerText = info.notes;
    });
}










