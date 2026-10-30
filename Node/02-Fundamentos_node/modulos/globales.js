
// this === global = true

//Mostrar algo en consola
//console.log();

//Mostrar un mensaje en forma de error
//console.error();

//Ejecutar un coigo despues de un intervalo de tiempo
//setTimeout(() => {});

//Ejecutar un codigo cada intervalo de tiempo
//setInterval(() => {});

//setImmediate(() =>{});

//console.log(setInterval);

//let i = 0;
//let intervalo = setInterval(() => {
//    console.log('Hola');
//    if (i === 3) {
//        clearInterval(intervalo); //detenmos la funcion
//    }
//    i++;
//
//}, 1000);

setImmediate(() =>{
    console.log('Saludo inmediato');
})

//require();

console.log(__filename);

global.miVariable = 'mi variable global';
console.log(miVariable);