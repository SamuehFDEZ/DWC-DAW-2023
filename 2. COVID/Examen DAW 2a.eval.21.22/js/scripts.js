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
async function mostrarPanel(cod){
    modal.classList.toggle("oculto");
    //let fips = area.data-cod;
    let url = "https://api.covidtracking.com/v1/states/";
    //let urlHispanos = `https://api.census.gov/data/2019/pep/charagegroups?get=POP&HISP=1&for=state:${2}`;
    titulo.innerText = this.title;

    await fetch(url+cod+"info.json").then(data => data.json()).then(info => {
        console.log(info);
        notas.innerText = info.notes;

    });
}

/*
window.onload = async () => {
    clickEstado();
}

function clickEstado() {
    let area = document.getElementsByTagName("area");
    for (const areaElement of area) {
        areaElement.addEventListener("click", async () => {
            let stateCode = areaElement.getAttribute("data-cod");
            await cargarDatos(stateCode);
            mostrarPanel();
        });
    }

    modal.addEventListener("click", mostrarPanel);
}

function mostrarPanel() {
    modal.classList.toggle("oculto");
}

async function cargarDatos(stateCode) {
    let url = "https://api.covidtracking.com/v1/states/info.json";

        await fetch(url).then(data => data.json()).then(info => {
            if (stateCode){
                document.getElementById("titulo").innerText = info.name;

            }
        });

        // Find the state in the array based on the state code
      /!*  let stateInfo = info.find(state => state.state === stateCode);

        if (stateInfo) {
        } else {
            console.error("State information not found for code:", stateCode);
        }*!/

}
*/
