/* Tarea
 function seleccionarPersonajeJugador() {

    let inputZuko = document.getElementById('zuko')
    let inputKatara = document.getElementById('katara')
    let inputAang = document.getElementById('aang')
    let inputToph = document.getElementById('toph')

    if (inputZuko.checked) {
        alert('Seleccionaste a Zuko 🔥')
    }
    else if (inputKatara.checked) {
        alert('Seleccionaste a Katara 💧')
    }
    else if (inputAang.checked) {
        alert('Seleccionaste a Aang 💨')
    }
    else if (inputToph.checked) {
        alert('Seleccionaste a Toph 🌱')
    }
    else {
        alert('Selecciona un personaje')
    }
}

let botonPersonajeJugador = document.getElementById('boton-personaje')

botonPersonajeJugador.addEventListener('click', seleccionarPersonajeJugador);*/

// Variables globales de las secciones y botones
let sectionSeleccionarAtaque
let sectionReiniciar
let botonPersonajeJugador
let botonReiniciar

// Botones de ataque del jugador
let botonFuego
let botonAgua
let botonTierra
let botonAire

// Variables para guardar los ataques y las vidas
let ataqueJugador
let ataqueEnemigo
let vidasJugador = 3
let vidasEnemigo = 3

// Función principal que arranca el juego
function iniciarJuego() {
    sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
    sectionReiniciar = document.getElementById('reiniciar')
    botonPersonajeJugador = document.getElementById('boton-personaje')
    botonReiniciar = document.getElementById('boton-reiniciar')

    botonFuego = document.getElementById('boton-fuego')
    botonAgua = document.getElementById('boton-agua')
    botonTierra = document.getElementById('boton-tierra')
    botonAire = document.getElementById('boton-aire')

    // Ocultamos las secciones que no se necesitan al principio
    sectionSeleccionarAtaque.style.display = 'none'
    sectionReiniciar.style.display = 'none'

    // Escuchamos los clics iniciales
    botonPersonajeJugador.addEventListener('click', seleccionarPersonajeJugador)
    botonReiniciar.addEventListener('click', reiniciarJuego)
    
    // Escuchamos los clics de los ataques
    botonFuego.addEventListener('click', ataqueFuego)
    botonAgua.addEventListener('click', ataqueAgua)
    botonTierra.addEventListener('click', ataqueTierra)
    botonAire.addEventListener('click', ataqueAire)
}

// Función para seleccionar el personaje
function seleccionarPersonajeJugador() {
    let inputZuko = document.getElementById('zuko')
    let inputKatara = document.getElementById('katara')
    let inputAang = document.getElementById('aang')
    let inputToph = document.getElementById('toph')
    let personajeJugador = document.getElementById('personaje-jugador')

    let seSeleccionoPersonaje = true

    if (inputZuko.checked) {
        personajeJugador.innerHTML = 'Seleccionaste a Zuko 🔥'
    } else if (inputKatara.checked) {
        personajeJugador.innerHTML = 'Seleccionaste a Katara 💧'
    } else if (inputAang.checked) {
        personajeJugador.innerHTML = 'Seleccionaste a Aang 💨'
    } else if (inputToph.checked) {
        personajeJugador.innerHTML = 'Seleccionaste a Toph 🌱'
    } else {
        personajeJugador.innerHTML = 'Selecciona un personaje'
        seSeleccionoPersonaje = false
    }

    if (seSeleccionoPersonaje) {
        sectionSeleccionarAtaque.style.display = 'block'
    }
}

// Ataques del jugador
function ataqueFuego() {
    ataqueJugador = 'FUEGO 🔥'
    ataqueAleatorioEnemigo()
}
function ataqueAgua() {
    ataqueJugador = 'AGUA 💧'
    ataqueAleatorioEnemigo()
}
function ataqueTierra() {
    ataqueJugador = 'TIERRA 🌱'
    ataqueAleatorioEnemigo()
}
function ataqueAire() {
    ataqueJugador = 'AIRE 💨'
    ataqueAleatorioEnemigo()
}

// Ataque aleatorio del enemigo
function aleatorio(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(1, 4)
    
    if (ataqueAleatorio == 1) {
        ataqueEnemigo = 'FUEGO 🔥'
    } else if (ataqueAleatorio == 2) {
        ataqueEnemigo = 'AGUA 💧'
    } else if (ataqueAleatorio == 3) {
        ataqueEnemigo = 'TIERRA 🌱'
    } else {
        ataqueEnemigo = 'AIRE 💨'
    }

    combate()
}

// NUEVA FUNCIÓN: Lógica de combate (Quién gana a quién)
function combate() {
    let spanVidaJugador = document.getElementById('vidas-jugador') // Mantengo tu id "vidas" del HTML
    let spanVidaEnemigo = document.getElementById('vidas-enemigo')
    let resultado

    if (ataqueJugador == ataqueEnemigo) {
        resultado = "¡EMPATE! 🤝"
    } else if (
        (ataqueJugador == 'FUEGO 🔥' && ataqueEnemigo == 'TIERRA 🌱') ||
        (ataqueJugador == 'AGUA 💧' && ataqueEnemigo == 'FUEGO 🔥') ||
        (ataqueJugador == 'TIERRA 🌱' && ataqueEnemigo == 'AIRE 💨') ||
        (ataqueJugador == 'AIRE 💨' && ataqueEnemigo == 'AGUA 💧')
    ) {
        resultado = "¡GANASTE ESTA RONDA! 🎉"
        vidasEnemigo--
        spanVidaEnemigo.innerHTML = vidasEnemigo
    } else {
        resultado = "¡PERDISTE ESTA RONDA! 😢"
        vidasJugador--
        spanVidaJugador.innerHTML = vidasJugador
    }

    crearMensaje(resultado)
    revisarVidas()
}

// Función para mostrar el historial
function crearMensaje(resultado) {
    let sectionMensajes = document.getElementById('mensajes')
    let parrafo = document.createElement('p')
    parrafo.innerHTML = `Atacaste con ${ataqueJugador}, el enemigo atacó con ${ataqueEnemigo}. ${resultado}`
    sectionMensajes.appendChild(parrafo)
}

// NUEVA FUNCIÓN: Revisa si alguien se quedó sin vidas para terminar el juego
function revisarVidas() {
    if (vidasJugador == 0) {
        crearMensajeFinal("Lo siento... ¡HAS PERDIDO EL COMBATE! 💀")
    } else if (vidasEnemigo == 0) {
        crearMensajeFinal("¡FELICITACIONES! ¡HAS GANADO EL COMBATE! 🏆")
    }
}

// NUEVA FUNCIÓN: Bloquea los ataques y muestra el botón reiniciar
function crearMensajeFinal(resultadoFinal) {
    let sectionMensajes = document.getElementById('mensajes')
    let parrafo = document.createElement('p')
    parrafo.innerHTML = `<strong>${resultadoFinal}</strong>`
    sectionMensajes.appendChild(parrafo)

    // Deshabilitamos los botones de ataque para que no sigan atacando
    botonFuego.disabled = true
    botonAgua.disabled = true
    botonTierra.disabled = true
    botonAire.disabled = true

    // Mostramos el botón de reiniciar
    sectionReiniciar.style.display = 'block'
}

// NUEVA FUNCIÓN: Resetea el juego por completo
function reiniciarJuego() {

    // Recargamos la página web para limpiar todo de forma rápida y efectiva

    location.reload()
}

// ESCUCHADOR GLOBAL

window.addEventListener('load', iniciarJuego)