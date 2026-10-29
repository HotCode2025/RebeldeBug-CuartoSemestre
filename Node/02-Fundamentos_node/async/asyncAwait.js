//La palabra async no es necesaria en las funciones, porque ya son asincronas
//Igual proyectan sincronia visual

async function hola(nombre){
    return new Promise(function (resolve, reject){
        setTimeout(function(){
            console.log('Hola '+ nombre);
            resolve(nombre);
        }, 1000);
    });
}

async function hablar(nombre){
    return new Promise((resolve, reject) => { //Usamos la sintaxis ES6
        setTimeout(function(){
            console.log('bla bla bla bla');
            //resolve
            resolve(nombre);   
        }, 1000);
    });    
}

async function adios(nombre){
    return new Promise((resolve, reject) => {
        setTimeout(function(){
            console.log('Adios '+ nombre);
            reject('Hay un error');
        }, 1000);
    })
}

//await hola('Ariel'); //Es un ejemplo de mala sintaxis
// await solo es valido dentro de una funcion asincrona

async function main() {
    let nombre = await ('Ariel');
    await hablar();
    await hablar();
    await hablar();
    await adios(nombre);
    console.log('Termina el proceso...')
}

//console.log('Empezamos el prceso...')
//main();
//console.log('Este va a ser la segunda instruccion')


//Funciones en ingles
function sayHello(name){
    return new Promise((resolve, reject) => {
        setTimeout( function(){
            //validamos el error o aprobacion
            console.log('Adios' + nombre);
            //if(err) reject('Hay un error');
            resolve();
        }, 1000);
    });
}

function talk(name) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Bla bla bla bla");
            resolve(name);
        }, 1000);
    });
}

function sayBye(name) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Goodbye" + name);
            resolve(name);
        }, 1000);
    });
}

async function conversation(name) {
    console.log('Code in english');
    console.log("Starting async process...");
    await sayHello(name);
    await talk();
    await talk();
    await talk();
    await sayBye(name);
    console.log("Process completed");
}

conversation("Ariel");