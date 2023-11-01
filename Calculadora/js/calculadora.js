window.onload = function () {

    const botones = document.getElementsByClassName('boton');
    const pantalla = document.getElementById('pantalla');

    for (const boton of botones) {
        boton.addEventListener("mousedown", anyadirSombra);

        boton.addEventListener("mouseup", quitarSombra);

        boton.addEventListener("click", numeros)

    }
    function anyadirSombra() {
        this.classList.add("sombra")
    }

    function quitarSombra() {
        this.classList.remove("sombra")
    }
    
    function porcentaje() {
        // El 1% de 4 = 4*(1/100) = 4*0.01 = 0.04
        pantalla.value.split("%");
        pantalla.value += "%";
        //let calculo =    pantalla.value.at(-1)
        console.log(pantalla.value.at(0))

    }


    function numeros() {
        let valorBoton = this.innerText;

        switch (valorBoton) {
            case "«":
                /*aqui damos de valor al valor de la pantalla quitarle un numero
                 basicamente es lo que hace el slice, dependiendo de los parametros te quitará
                  uno o mas numeros del string, en nuestro caso de la pantalla
                  si por ejemplo en vez de 0, -1 ponemos -2 quitará de dos en dos
                  lo mismo si cambiamos el 0 por otros numeros*/
                pantalla.value = pantalla.value.slice(0, -1);
                /*ademas si en la pantalla no queda nada, pondra un 0*/
                if (pantalla.value === ""){
                    pantalla.value = "0";
                }
                break;
            case "%":
                porcentaje();
                break;
            case "C":
                pantalla.value = "0"
                break;
            case "=":
                if (pantalla.value.includes("x")) { /*comprobamos si hay simbolo de
                multiplicar, dividimos en las partes desde la x a la izquierda y a la derecha
                si la medida de la pantalla es 2 entonces hacemos la multiplicacion
                a esto ultimo se refiere a que si tuvieramos: 1x, no haria nada,
                 de hecho te lo toma como un 0, si no pones nada en el lado derecho
                 de la x te lo toma como 0*/
                    //PROBLEMA -----> NO SE PUEDE CONCATENAR CON UNA SUMA
                    // no puedes hacer 5x6+5 lo tienes que hacer por separado
                    //sin embargo la suma y resta si
                    let partes = pantalla.value.split("x");
                    if (partes.length === 2) {
                        let num1 = partes[0];
                        let num2 = partes[1];
                        pantalla.value = num1 * num2;
                    }
                }else{ /*dado que la funcion eval no contempla la multiplicacion
                necesitamos apañar un poco el igual*/
                    pantalla.value = eval( pantalla.value);

                }
                break;
            case "()":
                //redondea el valor de la pantalla entre parentesis
                // mediante los template literals (plantillas literales)
               pantalla.value = `(${pantalla.value})`;
                break;

            default:
                // aqui lo que damos por defecto en la calculadora es la adicion de los numeros
                // en la pantalla, si hay un 0 sera sustituido por otro numero
                // pero si no hay 0 se seguira concatenando
                // no obstante esto da a pensar que si tenemos
                // 7480 a partir de ese 0 lo sustituira por otro
                //esto no es asi, ademas de que si el primer numero es un 0
                // no podemos poner otro 0
                // (esto ya puede ser o no fallo):
                // cuando tenemos solo el 0 y le damos la coma de decimal
                // quita el 0 pero en realidad sigue estando
                if (pantalla.value === "0") {
                    if (valorBoton !== "C") {
                        pantalla.value = valorBoton;
                    } else {
                        pantalla.value += valorBoton;
                    }
                } else {
                    pantalla.value += valorBoton;
                }
                break;
        }
    }
}