// ==========================================
// ELEMENTOS DEL HTML
// ==========================================

const inputNombrePersonaje =
    document.getElementById('nombre-personaje')

const botonCrearPersonaje =
    document.getElementById('boton-crear-personaje')

const botonVolverCrearPersonaje =
    document.getElementById('boton-volver-personajes')

const mensajePersonajeCreado =
    document.getElementById('mensaje-personaje-creado')


// ==========================================
// CREAR NUEVO PERSONAJE
// ==========================================

function crearNuevoPersonaje() {

    const nombre =
        inputNombrePersonaje.value.trim()

    const poderSeleccionado =
        document.querySelector(
            'input[name="poder"]:checked'
        )


    // ==========================================
    // COMPROBAR NOMBRE
    // ==========================================

    if (nombre === '') {

        mostrarMensaje(
            '⚠️ Debes escribir un nombre.'
        )

        return
    }


    // ==========================================
    // COMPROBAR PODER
    // ==========================================

    if (!poderSeleccionado) {

        mostrarMensaje(
            '⚠️ Debes elegir un poder.'
        )

        return
    }


    const poder =
        poderSeleccionado.value


    // ==========================================
    // ELEGIR IMAGEN SEGÚN EL PODER
    // ==========================================

    let imagen = ''


    if (poder === FUEGO) {

        imagen =
            './assets/fuego.jpg'

    }

    else if (poder === AGUA) {

        imagen =
            './assets/agua.jpg'

    }

    else if (poder === TIERRA) {

        imagen =
            './assets/tierra.jpg'

    }

    else if (poder === AIRE) {

        imagen =
            './assets/aire.jpg'

    }


    // ==========================================
    // CREAR PERSONAJE
    // ==========================================

    const nuevoPersonaje =
        new Avatar(
            nombre,
            poder,
            imagen
        )


    // ==========================================
    // AGREGAR A LA LISTA
    // ==========================================

    avatares.push(
        nuevoPersonaje
    )


    // ==========================================
    // GUARDAR EN LOCALSTORAGE
    // ==========================================

    guardarPersonajes()


    // ==========================================
    // ACTUALIZAR PERSONAJES CREADOS
    // ==========================================

    renderizarPersonajesCreados()


    // ==========================================
    // LIMPIAR FORMULARIO
    // ==========================================

    inputNombrePersonaje.value = ''

    poderSeleccionado.checked = false


    // ==========================================
    // MOSTRAR CARTEL GRANDE
    // ==========================================

    mostrarMensaje(
        `✅ ¡Personaje "${nombre}" guardado correctamente! 🎉`
    )


    // ==========================================
    // ESPERAR 3 SEGUNDOS
    // ==========================================

    setTimeout(
        function () {

            ocultarMensaje()

            volverSeleccionPersonaje()

        },
        3000
    )
}


// ==========================================
// MOSTRAR MENSAJE
// ==========================================

function mostrarMensaje(texto) {

    mensajePersonajeCreado.textContent =
        texto

    mensajePersonajeCreado.classList.add(
        'mensaje-visible'
    )
}


// ==========================================
// OCULTAR MENSAJE
// ==========================================

function ocultarMensaje() {

    mensajePersonajeCreado.textContent =
        ''

    mensajePersonajeCreado.classList.remove(
        'mensaje-visible'
    )
}


// ==========================================
// BOTÓN CREAR PERSONAJE
// ==========================================

botonCrearPersonaje.addEventListener(
    'click',
    crearNuevoPersonaje
)


// ==========================================
// BOTÓN VOLVER
// ==========================================

botonVolverCrearPersonaje.addEventListener(
    'click',
    function () {

        ocultarMensaje()

        volverSeleccionPersonaje()

    }
)