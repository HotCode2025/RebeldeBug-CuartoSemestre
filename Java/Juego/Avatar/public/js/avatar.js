const FUEGO = "FUEGO 🔥";
const AGUA = "AGUA 💧";
const TIERRA = "TIERRA 🌱";
const AIRE = "AIRE 💨";
const VIDAS_INICIALES = 3;
const seccionSeleccionarPersonaje =
    document.getElementById("seleccionar-personaje");

const listaPersonajes =
    document.getElementById("lista-personajes");

const botonPersonaje =
    document.getElementById("boton-personaje");

const botonMostrarCrear =
    document.getElementById("boton-mostrar-crear");

const botonMostrarCreados =
    document.getElementById("boton-mostrar-creados");

const seccionPersonajesCreados =
    document.getElementById("personajes-creados");

const listaPersonajesCreados =
    document.getElementById("lista-personajes-creados");

const botonVolverPersonajesCreados =
    document.getElementById("boton-volver-personajes-creados");

const seccionCrearPersonaje =
    document.getElementById("crear-personaje");

const seccionAtaque =
    document.getElementById("seleccionar-ataque");

const personajeJugadorElemento =
    document.getElementById("personaje-jugador");

const ataqueEnemigoElemento =
    document.getElementById("ataque-enemigo");

const vidasJugadorElemento =
    document.getElementById("vidas-jugador");

const vidasEnemigoElemento =
    document.getElementById("vidas-enemigo");

const botonFuego =
    document.getElementById("boton-fuego");

const botonAgua =
    document.getElementById("boton-agua");

const botonTierra =
    document.getElementById("boton-tierra");

const botonAire =
    document.getElementById("boton-aire");

const seccionMensajes =
    document.getElementById("mensajes");

const seccionReiniciar =
    document.getElementById("reiniciar");

const botonReiniciar =
    document.getElementById("boton-reiniciar");


// ==========================================
// PERSONAJE ELEGIDO
// ==========================================

const personajeElegidoElemento =
    document.createElement("p");

personajeElegidoElemento.id =
    "personaje-elegido";

seccionSeleccionarPersonaje.insertBefore(
    personajeElegidoElemento,
    document.getElementById("botones-personaje")
);


// ==========================================
// CLASE AVATAR
// ==========================================

class Avatar {

    constructor(nombre, poder, imagen) {

        this.nombre = nombre;
        this.poder = poder;
        this.imagen = imagen;
        this.vida = 5;
        this.ataques = []; //Esto es lo de hoy 16/09

    }

}


// ==========================================
// PERSONAJES ORIGINALES
// ==========================================

const aang =
    new Avatar(
        "Aang",
        AIRE,
        "./assets/aang.jpg"
    );

const katara =
    new Avatar(
        "Katara",
        AGUA,
        "./assets/katara.jpg"
    );

const zuko =
    new Avatar(
        "Zuko",
        FUEGO,
        "./assets/zuko.jpg"
    );

const toph =
    new Avatar(
        "Toph",
        TIERRA,
        "./assets/toph.jpg"
    );


// ==========================================
// LISTA DE PERSONAJES
// ==========================================

let avatares = [
    aang,
    katara,
    zuko,
    toph
];


// ==========================================
// CARGAR PERSONAJES CREADOS
// ==========================================

const personajesGuardados =
    JSON.parse(
        localStorage.getItem("avatares")
    );

if (personajesGuardados) {

    personajesGuardados.forEach(
        personaje => {

            avatares.push(
                new Avatar(
                    personaje.nombre,
                    personaje.poder,
                    personaje.imagen
                )
            );

        }
    );

}


// ==========================================
// VARIABLES DEL COMBATE
// ==========================================

let avatarJugador = null;
let avatarEnemigo = null;

let vidasJugador =
    VIDAS_INICIALES;

let vidasEnemigo =
    VIDAS_INICIALES;


// ==========================================
// FUNCIÓN PARA COLOR DE TARJETA
// ==========================================

function aplicarColorPoder(
    tarjeta,
    personaje
) {

    if (personaje.poder === FUEGO) {

        tarjeta.classList.add(
            "tarjeta-fuego"
        );

    }

    else if (personaje.poder === AGUA) {

        tarjeta.classList.add(
            "tarjeta-agua"
        );

    }

    else if (personaje.poder === TIERRA) {

        tarjeta.classList.add(
            "tarjeta-tierra"
        );

    }

    else if (personaje.poder === AIRE) {

        tarjeta.classList.add(
            "tarjeta-aire"
        );

    }

}


// ==========================================
// MOSTRAR PERSONAJES ORIGINALES
// ==========================================

function mostrarPersonajes() {

    listaPersonajes.innerHTML = "";


    for (let i = 0; i < 4; i++) {

        const personaje =
            avatares[i];


        const tarjeta =
            document.createElement("div");


        tarjeta.classList.add(
            "tarjeta-personaje"
        );


        aplicarColorPoder(
            tarjeta,
            personaje
        );


        tarjeta.innerHTML = `

            <img
                src="${personaje.imagen}"
                alt="${personaje.nombre}"
            >

            <h3>
                ${personaje.nombre}
            </h3>

            <p>
                ${personaje.poder}
            </p>

        `;


        tarjeta.addEventListener(
            "click",
            () => {

                avatarJugador =
                    personaje;

                mostrarPersonajeElegido();

            }
        );


        listaPersonajes.appendChild(
            tarjeta
        );

    }

}


// ==========================================
// MOSTRAR PERSONAJE ELEGIDO
// ==========================================

function mostrarPersonajeElegido() {

    if (!avatarJugador) {

        personajeElegidoElemento.textContent =
            "Ningún personaje ha sido elegido";

        personajeElegidoElemento.classList.remove(
            "personaje-seleccionado"
        );

        return;

    }


    personajeElegidoElemento.textContent =
        `Personaje elegido: ${avatarJugador.nombre}`;

    personajeElegidoElemento.classList.add(
        "personaje-seleccionado"
    );

}


// ==========================================
// MOSTRAR PERSONAJES CREADOS
// ==========================================

function renderizarPersonajesCreados() {

    listaPersonajesCreados.innerHTML = "";


    const personajesCreados =
        avatares.slice(4);


    if (personajesCreados.length === 0) {

        listaPersonajesCreados.innerHTML = `
            <p>
                No hay personajes creados todavía.
            </p>
        `;

        return;

    }


    personajesCreados.forEach(
        personaje => {

            const tarjeta =
                document.createElement("div");


            tarjeta.classList.add(
                "tarjeta-personaje"
            );


            aplicarColorPoder(
                tarjeta,
                personaje
            );


            tarjeta.innerHTML = `

                <img
                    src="${personaje.imagen}"
                    alt="${personaje.nombre}"
                >

                <h3>
                    ${personaje.nombre}
                </h3>

                <p>
                    ${personaje.poder}
                </p>

            `;


            const botonEliminar =
                document.createElement("button");


            botonEliminar.textContent =
                "✕";


            botonEliminar.classList.add(
                "boton-eliminar"
            );


            botonEliminar.addEventListener(
                "click",
                event => {

                    event.stopPropagation();


                    const indiceReal =
                        avatares.indexOf(
                            personaje
                        );


                    if (indiceReal !== -1) {

                        avatares.splice(
                            indiceReal,
                            1
                        );


                        localStorage.setItem(
                            "avatares",
                            JSON.stringify(
                                avatares.slice(4)
                            )
                        );


                        renderizarPersonajesCreados();

                    }

                }
            );


            tarjeta.appendChild(
                botonEliminar
            );


            tarjeta.addEventListener(
                "click",
                () => {

                    avatarJugador =
                        personaje;

                    mostrarPersonajeElegido();

                    volverSeleccionPersonaje();

                }
            );


            listaPersonajesCreados.appendChild(
                tarjeta
            );

        }
    );

}


// ==========================================
// VOLVER A SELECCIÓN
// ==========================================

function volverSeleccionPersonaje() {

    seccionSeleccionarPersonaje.style.display =
        "block";

    seccionPersonajesCreados.style.display =
        "none";

    seccionCrearPersonaje.style.display =
        "none";

    seccionAtaque.style.display =
        "none";

    seccionMensajes.style.display =
        "none";

    seccionReiniciar.style.display =
        "none";


    mostrarPersonajes();

    mostrarPersonajeElegido();

}


// ==========================================
// MOSTRAR CREAR PERSONAJE
// ==========================================

function mostrarCrearPersonaje() {

    seccionSeleccionarPersonaje.style.display =
        "none";

    seccionPersonajesCreados.style.display =
        "none";

    seccionCrearPersonaje.style.display =
        "block";

    seccionAtaque.style.display =
        "none";

    seccionMensajes.style.display =
        "none";

    seccionReiniciar.style.display =
        "none";


    // ==========================================
    // LIMPIAR EL NOMBRE ANTERIOR
    // ==========================================

    document.getElementById(
        "nombre-personaje"
    ).value = "";


    // ==========================================
    // DESMARCAR EL PODER ANTERIOR
    // ==========================================

    const poderes =
        document.querySelectorAll(
            '#crear-personaje input[type="radio"]'
        );


    poderes.forEach(
        poder => {

            poder.checked = false;

        }
    );

}


// ==========================================
// MOSTRAR PERSONAJES CREADOS
// ==========================================

function mostrarSeccionPersonajesCreados() {

    seccionSeleccionarPersonaje.style.display =
        "none";

    seccionPersonajesCreados.style.display =
        "block";

    seccionCrearPersonaje.style.display =
        "none";

    seccionAtaque.style.display =
        "none";

    seccionMensajes.style.display =
        "none";

    seccionReiniciar.style.display =
        "none";


    renderizarPersonajesCreados();

}


// ==========================================
// INICIAR COMBATE
// ==========================================

function iniciarCombate() {

    if (!avatarJugador) {

        alert(
            "Primero selecciona un personaje."
        );

        return;

    }


    vidasJugador =
        VIDAS_INICIALES;

    vidasEnemigo =
        VIDAS_INICIALES;


    vidasJugadorElemento.textContent =
        vidasJugador;

    vidasEnemigoElemento.textContent =
        vidasEnemigo;


    elegirEnemigo();

}


// ==========================================
// ELEGIR ENEMIGO
// ==========================================

function elegirEnemigo() {

    const posiblesEnemigos =
        avatares.filter(
            personaje =>
                personaje !== avatarJugador
        );


    const indice =
        Math.floor(
            Math.random() *
            posiblesEnemigos.length
        );


    avatarEnemigo =
        posiblesEnemigos[indice];


    vidasEnemigo =
        VIDAS_INICIALES;


    vidasEnemigoElemento.textContent =
        vidasEnemigo;


    mostrarPantallaAtaque();

}


// ==========================================
// MOSTRAR PANTALLA ATAQUE
// ==========================================

function mostrarPantallaAtaque() {

    seccionSeleccionarPersonaje.style.display =
        "none";

    seccionPersonajesCreados.style.display =
        "none";

    seccionCrearPersonaje.style.display =
        "none";

    seccionAtaque.style.display =
        "block";

    seccionMensajes.style.display =
        "none";

    seccionReiniciar.style.display =
        "none";


    // ==========================================
    // MOSTRAR TU PERSONAJE
    // ==========================================

    personajeJugadorElemento.textContent =
        `Tu personaje: ${avatarJugador.nombre}`;


    // ==========================================
    // OCULTAR AL ENEMIGO
    // ==========================================

    ataqueEnemigoElemento.textContent =
        "";

    ataqueEnemigoElemento.style.display =
        "none";


    // ==========================================
    // VIDAS
    // ==========================================

    vidasJugadorElemento.textContent =
        vidasJugador;

    vidasEnemigoElemento.textContent =
        vidasEnemigo;

}


// ==========================================
// ATAQUE ALEATORIO
// ==========================================

function ataqueAleatorio() {

    const ataques = [
        FUEGO,
        AGUA,
        TIERRA,
        AIRE
    ];


    const indice =
        Math.floor(
            Math.random() *
            ataques.length
        );


    return ataques[indice];

}


// ==========================================
// REALIZAR ATAQUE
// ==========================================

function realizarAtaque(
    ataqueJugador
) {

    const ataqueEnemigo =
        ataqueAleatorio();


    let resultado = "";


    if (
        ataqueJugador ===
        ataqueEnemigo
    ) {

        resultado =
            "¡Empate! ⚔️";

    }

    else if (

        (
            ataqueJugador === FUEGO &&
            ataqueEnemigo === TIERRA
        )

        ||

        (
            ataqueJugador === AGUA &&
            ataqueEnemigo === FUEGO
        )

        ||

        (
            ataqueJugador === TIERRA &&
            ataqueEnemigo === AIRE
        )

        ||

        (
            ataqueJugador === AIRE &&
            ataqueEnemigo === AGUA
        )

    ) {

        vidasEnemigo--;

        resultado =
            "¡Ganaste esta ronda! 🎉";

    }

    else {

        vidasJugador--;

        resultado =
            "¡Perdiste esta ronda! 😢";

    }


    vidasJugadorElemento.textContent =
        vidasJugador;

    vidasEnemigoElemento.textContent =
        vidasEnemigo;


    mostrarResultadoRonda(
        resultado,
        ataqueJugador,
        ataqueEnemigo
    );

}


// ==========================================
// MOSTRAR RESULTADO
// ==========================================

function mostrarResultadoRonda(
    resultado,
    ataqueJugador,
    ataqueEnemigo
) {

    seccionAtaque.style.display =
        "none";

    seccionMensajes.style.display =
        "block";


    seccionMensajes.innerHTML = `

        <h2>
            ⚔️ Combate
        </h2>

        <div id="resultado-ronda">

            <div class="resultado-emojis">
                ${ataqueJugador}
                ⚔️
                ${ataqueEnemigo}
            </div>

            <p>
                ${resultado}
            </p>

            <p>
                ❤️ Tus vidas:
                ${vidasJugador}
            </p>

            <p>
                ❤️ Vidas del enemigo:
                ${vidasEnemigo}
            </p>

            <button id="boton-reiniciar-resultado">
                🔄 Reiniciar
            </button>

        </div>

    `;


    document
        .getElementById(
            "boton-reiniciar-resultado"
        )
        .addEventListener(
            "click",
            volverSeleccionPersonaje
        );

}


// ==========================================
// BOTONES
// ==========================================

botonPersonaje.addEventListener(
    "click",
    iniciarCombate
);


botonMostrarCrear.addEventListener(
    "click",
    mostrarCrearPersonaje
);


botonMostrarCreados.addEventListener(
    "click",
    mostrarSeccionPersonajesCreados
);


botonVolverPersonajesCreados.addEventListener(
    "click",
    volverSeleccionPersonaje
);


botonFuego.addEventListener(
    "click",
    () => realizarAtaque(FUEGO)
);


botonAgua.addEventListener(
    "click",
    () => realizarAtaque(AGUA)
);


botonTierra.addEventListener(
    "click",
    () => realizarAtaque(TIERRA)
);


botonAire.addEventListener(
    "click",
    () => realizarAtaque(AIRE)
);


botonReiniciar.addEventListener(
    "click",
    volverSeleccionPersonaje
);


// ==========================================
// INICIAR
// ==========================================

mostrarPersonajes();

mostrarPersonajeElegido();


// ==========================================
// ASEGURAR PANTALLA INICIAL
// ==========================================

seccionSeleccionarPersonaje.style.display =
    "block";

seccionPersonajesCreados.style.display =
    "none";

seccionCrearPersonaje.style.display =
    "none";

seccionAtaque.style.display =
    "none";

seccionMensajes.style.display =
    "none";

seccionReiniciar.style.display =
    "none";

