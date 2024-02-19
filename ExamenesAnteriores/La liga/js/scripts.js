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

/*array_objetos.sort((a, b) => {: Esta es la función de ordenamiento de
JavaScript que ordenará el array. Se utiliza una función de
comparación como argumento de sort.
Esta función toma dos elementos a y b del array y los compara entre sí.

let textA = a[campo]; y let textB = b[campo];:
Estos pasos extraen el valor del campo especificado (campo) de los
objetos a y b que se están comparando.

return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;:
Esta es la lógica de comparación. Se compara textA con textB.
Si textA es mayor que textB, significa que a debería ir antes que b en la lista ordenada,
por lo que devuelve -1. Si textA es menor que textB, significa que a debería ir después de b,
por lo que devuelve 1. Si son iguales, devuelve 0, lo que significa que su orden relativo no importa.

});: Cierra la función de comparación y la función sort.*/
function ordenarDesc(array_objetos,campo) {
    array_objetos.sort((a, b) => {
        let textA = a[campo];
        let textB = b[campo];
        return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
    });
}
