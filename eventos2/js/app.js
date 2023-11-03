window.onload = function () {

    const botonMas = document.querySelector("#mas");
    const botonEdit = document.querySelector("#edit");
    const botonX = document.querySelector("#x");
    
    const dniTexto = document.getElementById("dniTexto");
    const nomTexto = document.getElementById("nomTexto");
    const apTexto = document.getElementById("apTexto");

    botonEdit.addEventListener("click", editar, false);
    botonMas.addEventListener("click", anyadir, false);
    botonX.addEventListener("click", eliminar, false);

    botonX.disabled = true;

    function activar() {
        if (dniTexto.value !== null || 
            nomTexto.value !== null || 
            apTexto.value !== null) {
                
            botonX.disabled = true;
    
        }
        else{
            botonX.disabled = false;
    
        }
    }

   
    

    function eliminar() {
       alert(`Estás seguro de que quieras eliminar al usuario ${nomTexto.value} ${apTexto.value} con DNI ${dniTexto.value}`);
    }


    function editar() {
        dniTexto.disabled = false;
        nomTexto.disabled = false;
        apTexto.disabled = false;

        botonEdit.disabled = true;
    }


    function anyadir() {
        //Obtener siempre al padre
        const padre = document.querySelector("#contenedor");

        //De aqui
        const dniHijo = document.createElement("div");

        padre.appendChild(dniHijo);

        const lblHijo = document.createElement("label");
        const lblHijoTxt = document.createTextNode("DNI");

        const inpDni = document.createElement("input");
        inpDni.type = "text";

        dniHijo.appendChild(lblHijo)
        dniHijo.appendChild(lblHijoTxt)
        dniHijo.appendChild(inpDni)
        // A aqui todo lo necesario para el contendor de dni
        //creamos un div (el hijo), lo añadimos al padre, creamos un label y un input
        // y lo añadimos al div hijo


        //Lo mismo para el resto de divs
        //pero el padre no hace falta cojerlo porque ya esta declarado arriba
        const nombreHijo = document.createElement("div");

        padre.appendChild(nombreHijo);

        const nombreLblHijo = document.createElement("label");
        const nombreLblHijoTxt = document.createTextNode("Nombre");

        const inpNombre = document.createElement("input");
        inpDni.type = "text";

        dniHijo.appendChild(nombreLblHijo)
        dniHijo.appendChild(nombreLblHijoTxt)
        dniHijo.appendChild(inpNombre)


        const apHijo = document.createElement("div");

        padre.appendChild(apHijo);

        const apLblHijo = document.createElement("label");
        const apLblHijoTxt = document.createTextNode("Apellidos");

        const inpAp = document.createElement("input");
        inpDni.type = "text";

        dniHijo.appendChild(apLblHijo)
        dniHijo.appendChild(apLblHijoTxt)
        dniHijo.appendChild(inpAp)


        const xHijo = document.createElement("button");

        padre.appendChild(xHijo);

        const xHijoTxt = document.createTextNode("X");

        xHijo.appendChild(xHijoTxt);


        const editHijo = document.createElement("button");

        padre.appendChild(editHijo);

        const editHijoTxt = document.createTextNode("✏️");

        editHijo.appendChild(editHijoTxt);

    }
}