window.onload = function () {

    const botones = document.getElementsByClassName('boton');
    const pantalla = document.getElementById('pantalla');

    for (const boton of botones) {
        boton.addEventListener("mousedown", anyadirSombra);

        boton.addEventListener("mouseup", quitarSombra);

        boton.addEventListener("click", numeros);
    }

    document.body.addEventListener("keydown", teclas);


        function teclas(evento) {
            // en la variable tecla guardamos la tecla que pulsamos con el atributo key
            const tecla = evento.key;
            // el \d dentro de la expresion regular impide introducir en la pantalla
            // caracteres
            let antiletra = /^\d$/;
            if (antiletra.test(tecla)) { /*dentro de este if hacemos lo mismo que el
            default del switch case si hay un 0 en la pantalla lo sustituimos por otro numero
            sino concatenamos los numeros
            SI POR EJEMPLO TENEMOS 12340 NO PARARIA Y SEGUIRIA CONCATENANDO*/
                if (pantalla.value === "0") {
                    pantalla.value = tecla;
                }else {
                    pantalla.value += tecla;
                }
            }
            let operaciones = /^[+\-/*.]$/;
            if (operaciones.test(tecla)) { /*dentro de este if hacemos lo mismo que el
            default del switch case si hay un 0 en la pantalla lo sustituimos por otro numero
            sino concatenamos los numeros
            SI POR EJEMPLO TENEMOS 12340 NO PARARIA Y SEGUIRIA CONCATENANDO*/
                if (pantalla.value === "0") {
                    pantalla.value = tecla;
                }else {
                    pantalla.value += tecla;
                }
            }
            /*Las teclas del teclado tienen un comportamiento curioso, si hacemos un
            console.log(evento) al tener un keydown nos mostrara la informacion de la tecla
            que hayamos pulsado, todas tienen sus nombre y codigo especificos
            el del retroceso es el Backspace y cuando pulsemos esta tecla tendrá el mismo
            comportamiento que el boton de «, eliminar numeros de derecha a izquierda*/
            if (tecla === "Backspace") {
                pantalla.value = pantalla.value.slice(0, -1);
                if (pantalla.value === ""){
                    pantalla.value = "0";
                }
            }
            // lo mismo con el backspace pero ahora con el intro (Enter)
            if (tecla === "Enter") {
                pantalla.value = eval(pantalla.value);
            }
        }

    function anyadirSombra() {
        this.classList.add("sombra")
    }

    function quitarSombra() {
        this.classList.remove("sombra")
    }

    function calcularPorcentaje() {
        let expresion = pantalla.value;
        let partes = expresion.split("%");

        if (partes.length === 2) {
            let numero1 = partes[0];
            let numero2 = partes[1];
            pantalla.value = (numero1 * numero2) / 100;
        }
    }

    function retroceder() {
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
    }

    function resultado() {
        if (pantalla.value.includes("%")){
            calcularPorcentaje();
        }

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
            pantalla.value = eval(pantalla.value);
        }
    }

    function parentesis() {
        //redondea el valor de la pantalla entre parentesis
        // mediante los template literals (plantillas literales)
        pantalla.value = `(${pantalla.value})`;
    }

    function numeros() {
        let valorBoton = this.innerText;

        switch (valorBoton) {
            case "«":
               retroceder();
                break;
            case "%":
               pantalla.value += "%";
                break;
            case "C":
                pantalla.value = "0"
                break;
            case "=":
               resultado();
                break;
            case "()":
               parentesis();
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