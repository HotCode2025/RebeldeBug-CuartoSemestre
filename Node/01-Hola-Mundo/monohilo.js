console.log('Hola a toda la cohorte 2026')
var i = 0;

//Entendiendo el proceso
//1. Primero se abre un proceso de node, que va a interpretar todo el archivo "monohilo.js".
//2. Lo convierte a código máquina y ahí recién prepara todo lo que necesite para ejecutarse.
//3. Se ejecuta y pone en consola el mensaje.
//4. Se cierra la terminal y nos abre para hacer otra ejecución. 

setInterval(function(){
    console.log(i);
    i++;

   // if( i === 5){
    //    console.log('Forzamos un error')
    //    var a = 3 + z;
    //}


},1000); //Se repite el mensaje cada segundo

console.log('Segunda instruccion'); // Lo que ocurre aquí es que ejecuta las instrucciones, crea el iterador, pero no ejecuta, pasa a la segunda instrucciones y ahi va la función de números. 

