window.onload = async () =>{
    clickEstado();
    await cargarDatos();
}

//click al area que contiene el panel oculto y despliega la info del estado
function clickEstado(){
    let area = document.getElementsByTagName("area");
    for (const areaElement of area) {
        areaElement.addEventListener("click", mostrarPanel);
        modal.addEventListener("click", mostrarPanel);
    }
}
//mostrar o no panel
function mostrarPanel(){
    modal.classList.toggle("oculto");
}

// funcion asyncrona para cargar el nombre del estado y sus notas
//⚠️ solo sale wyoming (problema con el for del primer fetch)
async function cargarDatos() {
        let url = "https://api.covidtracking.com/v1/states/info.json";
        let urlHispanos = `https://api.census.gov/data/2019/pep/charagegroups?get=POP&HISP=1&for=state:${2}`;

        await fetch(url).then(data => data.json()).then(info => {
            for (let i = 0; i < info.length; i++) {
                titulo.innerText = info[i].name;
                notas.innerText = info[i].notes;
                //fecha.innerText = info[i].date;
            }
        });
     /*   await fetch(urlHispanos).then(data => data.json()).then(info => {
            let poblacion = document.querySelectorAll(".poblacion");
            for (let i = 0; i < poblacion.length; i++) {
                console.log(poblacion[i] = info[i]);
            }
        });*/


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
