//IMPLEMENTACIÓN DEL PATRÓN "ASYNC-WAIT".
/*En esta unidad vamos a avanzar en el conocimiento de la asincronía gracias al aprendizaje del patrón "async-wait,
disponible desde ECMAScript2017 y que ha tenido un gran éxito en su implementación en todo tipo de soluciones.
Para concluir, aprendremos cómo podemos manejar los errores generados por las promesas utilizadas en este patrón
con la implementación de bloques "try-catch".*/

/*Patrón "async-wait:
Es una característica sintáctica de muchos lenguajes para la ejecución de instrucciones no bloqueantes del programa
que permiten implementar bloques long-running(tardan mucho en ejecutrase); el programa, mientras, continúa la ejecución
del resto de instrucciones.
El objetivo fundamental de este patrón es que los desarrolladores puedan escribir código asíncrono como si fuera síncrono, 
simplificando el uso tanto de funciones callback como de promesas, y es una alternaiva a estas últimas con un código más 
legible y de fácil mantenimiento.*/
    function getUser(){
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve({name: 'Sara', language: 'es'}), 2000)
        })
    }
//Declaramos un proceso asíncrono que tardará dos segundos en ejecutarse.
/*Se implementa el patrón "async-await" declarando una función precedida de la palabra reservada "async",
que le especificará al intérprete JavaScript que dentro del cuerpo de esa función se ejecutarán procesos asíncronos.
La sintaxis se complementa con el uso de la palabra reservada "await" en las instruciones que ejecuten un proceso asíncrono.*/
async function setMessage() {
    let user = await getUser();
    console.log(user.name);
}
setMessage();
/*Además,podemos combinar denro de la función asíncrona "setMessage" el uso de promesas con instrucciones asíncronas.
Ejemplo: */
function getPilot(){
    return new Promise ((resolve, reject)=>{
        setTimeout(()=>resolve({name:'Max', language:'en'}),2000)
    })
}

function getMessage(language){
    if(language === 'es'){
        return 'Hola;'
    }
    if(language === 'en'){
        return 'Hello';
    }
}

async function messageSet(){
    let pilot=await getPilot();
    let message = getMessage(pilot.language);
    console.log(message, pilot.name);
}   
messageSet();

//Manejo de errores en el patrón "async-await":
/*Como las promesas en JavaScript permiten la gestión de errores (recordemos, gracias al uso del método "reject*),
si estas son implementadas en el patrón "async-await" también podemos capturar esos erroress para programar su manejo;
en este caso, se implementan mediante los bloques "try-catch".

La forma de utilizar el bloque es incluirlo como primer nivel del cuerpo de la función "async" e introducir dentro del
bloque "try" la ejecución de las funciones asíncronas con "await". En el caso de que se produzcan errorees serán capturados
por el bloque "catch".*/
//Ejemplo:
function getAircraft() {
    return new Promise((resolve, reject) => {
        // Lógica para obtener la aeronave
        let aircraft = { name: 'Harrier', typeofWing: 'fix' };

        if (aircraft === '' || typeof aircraft !== 'object' || typeof aircraft.typeofWing !== 'string' || (aircraft.typeofWing !== 'rot' && aircraft.typeofWing !== 'fix')) {
            reject({ mensaje: `${aircraft.name}: No es una aeronave.` });
        }

        setTimeout(() => resolve(aircraft), 2000);
    });
}

function getMessage1(typeofWing) {
    if (typeofWing === 'rot') {
        return 'Rotary wing';
    }
    if (typeofWing === 'fix') {
        return 'Fix wing';
    }
}

async function setWing() {
    try {
        let aircraft = await getAircraft(); // Esperar a que la promesa se resuelva
        let wing = getMessage1(aircraft.typeofWing);
        console.log(aircraft.name + ' - ' + wing);
    } catch (err) {
        console.error(err);
    }
}

setWing();
/*El patrón async-await ha tenido un notable éxito en la comunidad de programadores y cada vez es más adoptado por todo tipo de librerías
y frameworks JavaScript; por ejemplo, la libreria mongoose.js, un ORM oara el cada vez más empleado sistema gestor de bases de datos MongoDB.*/