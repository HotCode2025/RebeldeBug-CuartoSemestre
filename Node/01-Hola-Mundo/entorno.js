let nombre = process.env.NOMBRE || 'Sin nombre'; //tenemos acceso al proceso, variable de entorno y el nombre de la variable
let web = process.env.WEB || 'No tengo web';
console.log('Hola '+nombre); // En el código no se guarda ningun tipo de credencial, ni valores que vayan a cambiar
console.log('Mi web es:  '+web);



//Manejo de variables de entorno 
//Enlace: https://jairofernandez.medium.com/manejo-de-variables-de-entorno-en-node-js-ac90f7a2c1e5

//Documentación node.js: https://nodejs.org/api/process.html

