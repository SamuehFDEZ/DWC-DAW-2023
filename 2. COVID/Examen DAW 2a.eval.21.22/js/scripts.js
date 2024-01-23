

window.onload = async () =>{
    await clickEstado();
}

//click al area que contiene el panel oculto y despliega la info del estado
async function clickEstado(){
    let area = document.getElementsByTagName("area");
    for (const areaElement of area) {
        areaElement.addEventListener("click", mostrarPanel);
        modal.addEventListener("click", quitarPanel);
    }
}

//mostrar o no panel
// funcion asyncrona para cargar el nombre del estado y sus notas
async function mostrarPanel() {
    modal.classList.remove("oculto");

    // variable de que almacena el data-cod del html
    //
    let codigoEstado = this.dataset.cod;

    let url = `https://api.covidtracking.com/v1/states/${codigoEstado.toLowerCase()}/info.json`;
    await fetch(url).then(data => data.json()).then(info => {
        mostrarTituloYnotes(info);
        numeroEstado = info.fips;
    });

    let urlHispano = `https://api.census.gov/data/2019/pep/charagegroups?get=POP&HISP=&for=state:${numeroEstado}`;
    await fetch(urlHispano).then(data => data.json()).then(info => {
        mostrarPoblacionEhispanos(info);
    });

    let urlDatos = `https://api.covidtracking.com/v1/states/${codigoEstado.toLowerCase()}/current.json`;
    await fetch(urlDatos).then(data => data.json()).then(info => {
        mostrarDatosEstado(info);
    });
}

function mostrarPoblacionEhispanos(info) {
    let porcentajePobl = ((info[1][0] * 100) / info[1][0]).toFixed(2);
    let porcentajeHisp = ((info[3][0] * 100) / info[1][0]).toFixed(2);
    let porcentajeGuiri = ((info[2][0] * 100) / info[1][0]).toFixed(2);

    poblacionTotal.innerHTML = info[1][0] + " personas " + `[<span style="color: blue;">${porcentajeHisp}%</span>]`;
    hispanos.innerHTML = info[3][0] + " personas " + `[<span style="color: blue;">${porcentajeHisp}%</span>]`;
    guiris.innerHTML = info[2][0] + " personas " + `[<span style="color: blue;">${porcentajeGuiri}%</span>]`;

    console.table(info);
}

function mostrarTituloYnotes(info){
    titulo.innerText = info.name;
    notas.innerText = info.notes
}


//faltan porcentajes: nº de lo cualquier campo*100 / totalpoblacion
// ej nebraska: 2113muertos * 100 / 1934408
function mostrarDatosEstado(info){
    let porcentajeDeath = info.death;

    //let poblacionTotal = info[1][0];
    //console.log(poblacionTotal);
    //console.log(info[1][0].innerText);
    //let porcentajeMuertos = ((muertos.innerText*100)/info[1][0]).toFixed(2);
    //let porcentajeDeath = ((info.death*100)/info[1][0]).toFixed(2);
    //let porcentajeHisp = ((info[3][0]*100)/info[1][0]).toFixed(2);
    //let porcentajeGuiri = ((info[2][0]*100)/info[1][0]).toFixed(2);
    console
    fecha.innerText = info.date

    muertos.innerHTML = info.death + " personas "+ `[<span style="color: red;">${porcentajeDeath}%</span>]`;

    incremento0.innerHTML = info.deathIncrease + " personas "+ `[<span style="color: red;">${porcentajeDeath}%</span>]`;
    hospitalizaciones.innerHTML = info.hospitalizedCurrently + " personas "+ `[<span style="color: red;">${porcentajeDeath}%</span>]`;
    incremento1.innerHTML = info.hospitalizedIncrease + " personas "+ `[<span style="color: red;">${porcentajeDeath}%</span>]`;
    tests.innerHTML = info.totalTestResults + " personas "+ `[<span style="color: red;">${porcentajeDeath}%</span>]`;
    incremento2.innerHTML = info.totalTestResultsIncrease + " personas "+ `[<span style="color: red;">${porcentajeDeath}%</span>]`;
    positivos.innerHTML = info.positive + " personas "+ `[<span style="color: red;">${porcentajeDeath}%</span>]`;
    incremento3.innerHTML = info.positiveIncrease + " personas "+ `[<span style="color: red;">${porcentajeDeath}%</span>]`;
    negativos.innerHTML = info.negative + " personas "+ `[<span style="color: red;">${porcentajeDeath}%</span>]`;
    incremento4.innerHTML = info.negativeIncrease + " personas "+ `[<span style="color: red;">${porcentajeDeath}%</span>]`;
}

//otra funcion para no repetir los estados
//cuando volvias a pulsar te repetia los estados
function quitarPanel() {
    modal.classList.add("oculto");
}