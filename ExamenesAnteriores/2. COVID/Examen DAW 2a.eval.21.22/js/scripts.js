let poblacion; //mirar fetch hispano

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
        poblacion = info[1][0]; // para obtener la poblacion del estado y calcular porcentajes
    });

    let urlDatos = `https://api.covidtracking.com/v1/states/${codigoEstado.toLowerCase()}/current.json`;
    await fetch(urlDatos).then(data => data.json()).then(info => {
        mostrarDatosEstado(info);

    });
}

function formatearNumerosConPuntosDeMil(number) {
    try {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    } catch (e){
        console.log("El error se debe a que, en ciertos casos no encuentra " +
            "el patron de la regexp, pero el caso es que funciona");
    }
}

function mostrarPoblacionEhispanos(info) {
    let porcentajePobl = ((info[1][0] * 100) / info[1][0]).toFixed(2);
    let porcentajeHisp = ((info[3][0] * 100) / info[1][0]).toFixed(2);
    let porcentajeGuiri = ((info[2][0] * 100) / info[1][0]).toFixed(2);

    poblacionTotal.innerHTML = formatearNumerosConPuntosDeMil(info[1][0]) + " personas " + `[<span style="color: blue;">${porcentajePobl}%</span>]`;
    hispanos.innerHTML = formatearNumerosConPuntosDeMil(info[3][0]) + " personas " + `[<span style="color: blue;">${porcentajeHisp}%</span>]`;
    guiris.innerHTML = formatearNumerosConPuntosDeMil(info[2][0]) + " personas " + `[<span style="color: blue;">${porcentajeGuiri}%</span>]`;
}

function mostrarTituloYnotes(info){
    titulo.innerText = info.name;
    notas.innerText = info.notes
}


//faltan porcentajes: nº de lo cualquier campo*100 / totalpoblacion
// ej nebraska: 2113muertos * 100 / 1934408
function mostrarDatosEstado(info){
    let porcentajeDeath = ((info.death*100)/poblacion).toFixed(2);
    let porcentajeHosp = ((info.hospitalizedCurrently*100)/poblacion).toFixed(2);
    let porcentajeTests = ((info.totalTestResults*100)/poblacion).toFixed(2);
    let porcentajePos = ((info.positive*100)/poblacion).toFixed(2);
    let porcentajeNeg = ((info.negative*100)/poblacion).toFixed(2);
    let porcentajeInc0 = ((info.deathIncrease*100)/poblacion).toFixed(2);
    let porcentajeInc1 = ((info.hospitalizedIncrease*100)/poblacion).toFixed(2);
    let porcentajeInc2 = ((info.totalTestResultsIncrease*100)/poblacion).toFixed(2);
    let porcentajeInc3 = ((info.positiveIncrease*100)/poblacion).toFixed(2);
    let porcentajeInc4 = ((info.negativeIncrease*100)/poblacion).toFixed(2);


    let fechaOriginal = info.date.toString();

    let anyo = fechaOriginal.slice(0, 4);
    let mes = fechaOriginal.slice(4, 6);
    let dia = fechaOriginal.slice(6, 8);

    // condicion ternaria para comprobar si hay un 0 en la primera posicion de dia
    // si lo hay se sobrepone con el numero 2, el de la posicion 1
    dia = (dia.charAt(0) === '0') ? dia.charAt(1) : dia;

    let nombresMeses = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    let nombreMes = nombresMeses[parseInt(mes, 10) - 1];

    let fechaFormateada = dia + ' ' + nombreMes + ' ' + anyo;


    fecha.innerText = fechaFormateada;
    muertos.innerHTML = formatearNumerosConPuntosDeMil(info.death) + " personas "+ `[<span style="color: red;">${porcentajeDeath}%</span>]`;
    incremento0.innerHTML = formatearNumerosConPuntosDeMil(info.deathIncrease) + " personas "+ `[<span style="color: red;">${porcentajeInc0}%</span>]`;
    hospitalizaciones.innerHTML = formatearNumerosConPuntosDeMil(info.hospitalizedCurrently)  + " personas "+ `[<span style="color: red;">${porcentajeHosp}%</span>]`;
    incremento1.innerHTML = formatearNumerosConPuntosDeMil(info.hospitalizedIncrease)  + " personas "+ `[<span style="color: red;">${porcentajeInc1}%</span>]`;
    tests.innerHTML = formatearNumerosConPuntosDeMil(info.totalTestResults)  + " personas "+ `[<span style="color: red;">${porcentajeTests}%</span>]`;
    incremento2.innerHTML = formatearNumerosConPuntosDeMil(info.totalTestResultsIncrease)  + " personas "+ `[<span style="color: red;">${porcentajeInc2}%</span>]`;
    positivos.innerHTML = formatearNumerosConPuntosDeMil(info.positive)  + " personas "+ `[<span style="color: red;">${porcentajePos}%</span>]`;
    incremento3.innerHTML = formatearNumerosConPuntosDeMil(info.positiveIncrease)   + " personas "+ `[<span style="color: red;">${porcentajeInc3}%</span>]`;
    negativos.innerHTML = formatearNumerosConPuntosDeMil(info.negative)  + " personas "+ `[<span style="color: red;">${porcentajeNeg}%</span>]`;
    incremento4.innerHTML = formatearNumerosConPuntosDeMil(info.negativeIncrease)  + " personas "+ `[<span style="color: red;">${porcentajeInc4}%</span>]`;
}

//otra funcion para no repetir los estados
//cuando volvias a pulsar te repetia los estados
function quitarPanel() {
    modal.classList.add("oculto");
}