// Captura de elementos del HTML
const inputNombrePersonaje = document.getElementById('nombre-personaje');
const botonCrearPersonaje = document.getElementById('boton-crear-personaje');
const botonVolverCrearPersonaje = document.getElementById('boton-volver-personajes');
const mensajePersonajeCreado = document.getElementById('mensaje-personaje-creado');

// Función principal para crear personaje
function crearNuevoPersonaje() {
    const nombre = inputNombrePersonaje.value.trim();
    const poderSeleccionado = document.querySelector('input[name="poder"]:checked');

    if (nombre === '') {
        mostrarMensaje('❌ Debes escribir un nombre.');
        return;
    }
    if (!poderSeleccionado) {
        mostrarMensaje('❌ Debes elegir un poder.');
        return;
    }

    const poder = poderSeleccionado.value;

    const imagen = `./assets/${poder.toLowerCase()}.jpg`; 

    // Crear y guardar
    const nuevoPersonaje = new Avatar(nombre, poder, imagen);
    avatares.push(nuevoPersonaje);
    
    // Guardar en memoria
    localStorage.setItem("avatares", JSON.stringify(avatares.slice(4)));
    
    mostrarMensaje(`✅ ¡Personaje "${nombre}" guardado correctamente!`);
    
    // Limpiar formulario
    inputNombrePersonaje.value = '';
    poderSeleccionado.checked = false;

}

// Funciones de mensajes
function mostrarMensaje(texto) {
    mensajePersonajeCreado.textContent = texto;
    mensajePersonajeCreado.classList.add('mensaje-visible');
}

function ocultarMensaje() {
    mensajePersonajeCreado.textContent = '';
    mensajePersonajeCreado.classList.remove('mensaje-visible');
}

// Event Listeners
botonCrearPersonaje.addEventListener('click', crearNuevoPersonaje);
botonVolverCrearPersonaje.addEventListener('click', () => {
    ocultarMensaje();
    volverSeleccionPersonaje();
});