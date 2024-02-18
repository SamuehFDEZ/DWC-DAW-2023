let clasificacion;

window.onload = async () => {
    await cargarEquipos();
    montarTabla();
}

function montarTabla() {
    ordenarDesc(clasificacion, "puntos");
    let tabla = document.querySelector("table");
    clasificacion.forEach((equipo) => {
        let fila = document.createElement("tr");
        let escudo = document.createElement("img");
        let celdaEscudo = crearElemento("td", "", "info");
        escudo.src = equipo.escudo;
        escudo.className = "escudo";
        celdaEscudo.appendChild(escudo);
        fila.appendChild(celdaEscudo);
        fila.appendChild(crearElemento("td", equipo.nombre, "info"));
        fila.appendChild(crearElemento("td", equipo.puntos, "info puntos"));
        fila.appendChild(crearElemento("td", equipo.partidos_jugados, "info"));
        fila.appendChild(crearElemento("td", equipo.partidos_ganados, "info"));
        fila.appendChild(crearElemento("td", equipo.partidos_empatados, "info"));
        fila.appendChild(crearElemento("td", equipo.partidos_perdidos, "info"));
        fila.appendChild(crearElemento("td", equipo.goles_a_favor, "info"));
        fila.appendChild(crearElemento("td", equipo.goles_en_contra, "info"));

        tabla.appendChild(fila);
    });
}

function crearElemento(elemento,contenido,clase) {
    let element = document.createElement(elemento);
    element.innerText = contenido;
    element.className = clase;
    return element;
}

async function cargarEquipos() {
    let url = "clasificacion.json";
    await fetch(url).then(data => data.json()).then(info => {
        clasificacion = info.equipos;
    });
}

function ordenarDesc(array_objetos,campo) {
    array_objetos.sort((a, b) => {
        let textA = a[campo];
        let textB = b[campo];
        return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
    });
}