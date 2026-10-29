// ==========================================
// CONSTANTES GLOBALES
// ==========================================
const FUEGO = "FUEGO";
const AGUA = "AGUA";
const TIERRA = "TIERRA";
const AIRE = "AIRE";
const VIDAS_INICIALES = 3;

// ==========================================
// CAPTURA DE ELEMENTOS HTML
// ==========================================
const seccionSeleccionarPersonaje = document.getElementById("seleccionar-personaje");
const listaPersonajes = document.getElementById("lista-personajes");
const botonPersonaje = document.getElementById("boton-personaje");
const botonMostrarCrear = document.getElementById("boton-mostrar-crear");
const botonMostrarCreados = document.getElementById("boton-mostrar-creados");
const seccionPersonajesCreados = document.getElementById("personajes-creados");
const listaPersonajesCreados = document.getElementById("lista-personajes-creados");
const botonVolverPersonajesCreados = document.getElementById("boton-volver-personajes-creados");
const seccionCrearPersonaje = document.getElementById("crear-personaje");

const seccionVerMapa = document.getElementById("ver-mapa");
const mapa = document.getElementById("mapa");
let lienzo = mapa.getContext("2d");

const seccionAtaque = document.getElementById("seleccionar-ataque");
const personajeJugadorElemento = document.getElementById("personaje-jugador");
const personajeEnemigoElemento = document.getElementById("personaje-enemigo");
const imgJugadorCombate = document.getElementById("img-jugador-combate");
const imgEnemigoCombate = document.getElementById("img-enemigo-combate");
const tarjetaJugadorCombate = document.getElementById("tarjeta-jugador-combate");
const tarjetaEnemigoCombate = document.getElementById("tarjeta-enemigo-combate");
const vidasJugadorElemento = document.getElementById("vidas-jugador");
const vidasEnemigoElemento = document.getElementById("vidas-enemigo");
const botonFuego = document.getElementById("boton-fuego");
const botonAgua = document.getElementById("boton-agua");
const botonTierra = document.getElementById("boton-tierra");
const botonAire = document.getElementById("boton-aire");

const seccionMensajes = document.getElementById("mensajes");
const ataquesResumen = document.getElementById("ataques-resumen");
const resultadoRonda = document.getElementById("resultado-ronda");
const vidasJugadorResumen = document.getElementById("vidas-jugador-resumen");
const vidasEnemigoResumen = document.getElementById("vidas-enemigo-resumen");
const botonSiguienteRonda = document.getElementById("boton-siguiente-ronda");
const botonReiniciar = document.getElementById("boton-reiniciar");

// ==========================================
// CLASE AVATAR ACTUALIZADA
// ==========================================
class Avatar {
    constructor(nombre, poder, imagen, x = 10, y = 10) {
        this.nombre = nombre;
        this.poder = poder;
        this.imagen = imagen;
        this.x = x;
        this.y = y;
        this.ancho = 40;
        this.alto = 40;
        this.velocidadX = 0;
        this.velocidadY = 0;
        this.mapaFoto = new Image();
        this.mapaFoto.src = imagen;
    }
    
    pintarAvatares() {
        lienzo.drawImage(this.mapaFoto, this.x, this.y, this.ancho, this.alto);
    }
}

// ==========================================
// INSTANCIAS Y ENEMIGOS DEL MAPA
// ==========================================
const aang = new Avatar("Aang", AIRE, "./assets/aang.jpg");
const katara = new Avatar("Katara", AGUA, "./assets/katara.jpg");
const zuko = new Avatar("Zuko", FUEGO, "./assets/zuko.jpg");
const toph = new Avatar("Toph", TIERRA, "./assets/toph.jpg");

let avatares = [aang, katara, zuko, toph];

// Enemigos con sus posiciones específicas
let zukoEnemigo = new Avatar('Zuko', FUEGO, './assets/zuko.jpg', 80, 120);
let kataraEnemigo = new Avatar('Katara', AGUA, './assets/katara.jpg', 150, 95);
let aangEnemigo = new Avatar('Aang', AIRE, './assets/aang.jpg', 200, 190);
let tophEnemigo = new Avatar('Toph', TIERRA, './assets/toph.jpg', 210, 200);

let avatarJugador = null;
let avatarEnemigo = null;
let vidasJugador = VIDAS_INICIALES;
let vidasEnemigo = VIDAS_INICIALES;
let intervalo;
let mapaBackground = new Image();
mapaBackground.src = './assets/mapa.jpg';

// ==========================================
// RENDERIZADO INICIAL Y MENÚS
// ==========================================
const personajeElegidoElemento = document.createElement("p");
personajeElegidoElemento.id = "personaje-elegido";
seccionSeleccionarPersonaje.insertBefore(personajeElegidoElemento, document.getElementById("botones-personaje"));

function aplicarColorPoder(tarjeta, personaje) {
    if (personaje.poder === FUEGO) tarjeta.classList.add("tarjeta-fuego");
    else if (personaje.poder === AGUA) tarjeta.classList.add("tarjeta-agua");
    else if (personaje.poder === TIERRA) tarjeta.classList.add("tarjeta-tierra");
    else if (personaje.poder === AIRE) tarjeta.classList.add("tarjeta-aire");
}

function mostrarPersonajes() {
    listaPersonajes.innerHTML = "";
    avatares.forEach((personaje) => {
        if (avatares.indexOf(personaje) >= 4) return;
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("tarjeta-personaje");
        aplicarColorPoder(tarjeta, personaje);
        tarjeta.innerHTML = `
            <img src="${personaje.imagen}" alt="${personaje.nombre}">
            <h3>${personaje.nombre}</h3>
            <p>${personaje.poder}</p>
        `;
        tarjeta.addEventListener("click", () => {
            avatarJugador = personaje;
            mostrarPersonajeElegido();
        });
        listaPersonajes.appendChild(tarjeta);
    });
}

function mostrarPersonajeElegido() {
    if (!avatarJugador) {
        personajeElegidoElemento.textContent = "Ningún personaje ha sido elegido";
        return;
    }
    personajeElegidoElemento.textContent = `Personaje elegido: ${avatarJugador.nombre}`;
}

function volverSeleccionPersonaje() {
    if (intervalo) clearInterval(intervalo);
    seccionSeleccionarPersonaje.style.display = "block";
    seccionPersonajesCreados.style.display = "none";
    seccionCrearPersonaje.style.display = "none";
    seccionVerMapa.style.display = "none";
    seccionAtaque.style.display = "none";
    seccionMensajes.style.display = "none";
    mostrarPersonajes();
    mostrarPersonajeElegido();
}

function mostrarSeccionPersonajesCreados() {
    seccionSeleccionarPersonaje.style.display = "none";
    seccionPersonajesCreados.style.display = "block";
    listaPersonajesCreados.innerHTML = "";
    const creados = avatares.slice(4);
    if (creados.length === 0) {
        listaPersonajesCreados.innerHTML = `<p>No hay personajes creados todavía</p>`;
        return;
    }
    creados.forEach(personaje => {
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("tarjeta-personaje");
        aplicarColorPoder(tarjeta, personaje);
        tarjeta.innerHTML = `
            <img src="${personaje.imagen}" alt="${personaje.nombre}">
            <h3>${personaje.nombre}</h3>
            <p>${personaje.poder}</p>
        `;
        const botonEliminar = document.createElement("button");
        botonEliminar.innerHTML = "✖"; 
        botonEliminar.classList.add("boton-eliminar");
        botonEliminar.addEventListener("click", (event) => {
            event.stopPropagation(); 
            const indiceReal = avatares.indexOf(personaje);
            if (indiceReal !== -1) {
                avatares.splice(indiceReal, 1);
                localStorage.setItem("avatares", JSON.stringify(avatares.slice(4))); 
                mostrarSeccionPersonajesCreados(); 
            }
        });
        tarjeta.appendChild(botonEliminar);
        tarjeta.addEventListener("click", () => {
            avatarJugador = personaje;
            mostrarPersonajeElegido();
            volverSeleccionPersonaje();
        });
        listaPersonajesCreados.appendChild(tarjeta);
    });
}

function seleccionarPersonajeJugador() {
    if (!avatarJugador) {
        alert("Primero selecciona un personaje.");
        return;
    }
    seccionSeleccionarPersonaje.style.display = 'none';
    seccionVerMapa.style.display = 'flex';
    iniciarMapa();
}

// ==========================================
// FUNCIONES DEL MAPA Y COLISIONES
// ==========================================
function iniciarMapa() {
    mapa.width = 320;
    mapa.height = 240;
    vidasJugador = VIDAS_INICIALES;
    
    // Reiniciar posiciones de los enemigos 
    zukoEnemigo.x = 20; zukoEnemigo.y = 120;   
    kataraEnemigo.x = 140; kataraEnemigo.y = 40;  
    aangEnemigo.x = 250; aangEnemigo.y = 100;  
    tophEnemigo.x = 160; tophEnemigo.y = 180;   
    
    intervalo = setInterval(pintarPersonaje, 50);
    window.addEventListener('keydown', sePresionoUnaTecla);
    window.addEventListener('keyup', detenerMovimiento);
}

function pintarPersonaje() {
    avatarJugador.x += avatarJugador.velocidadX; 
    avatarJugador.y += avatarJugador.velocidadY;

    lienzo.clearRect(0, 0, mapa.width, mapa.height);
    lienzo.drawImage(mapaBackground, 0, 0, mapa.width, mapa.height);

    avatarJugador.pintarAvatares();
    zukoEnemigo.pintarAvatares();
    kataraEnemigo.pintarAvatares();
    aangEnemigo.pintarAvatares();
    tophEnemigo.pintarAvatares();

    if (avatarJugador.velocidadX !== 0 || avatarJugador.velocidadY !== 0) {
        revisarColision(zukoEnemigo);
        revisarColision(kataraEnemigo);
        revisarColision(aangEnemigo);
        revisarColision(tophEnemigo);
    }
}

function revisarColision(enemigo) {
    const arribaEnemigo = enemigo.y;
    const abajoEnemigo = enemigo.y + enemigo.alto;
    const derechaEnemigo = enemigo.x + enemigo.ancho;
    const izquierdaEnemigo = enemigo.x;

    const arribaPersonaje = avatarJugador.y;
    const abajoPersonaje = avatarJugador.y + avatarJugador.alto;
    const derechaPersonaje = avatarJugador.x + avatarJugador.ancho;
    const izquierdaPersonaje = avatarJugador.x;

    if (
        abajoPersonaje < arribaEnemigo ||
        arribaPersonaje > abajoEnemigo ||
        derechaPersonaje < izquierdaEnemigo ||
        izquierdaPersonaje > derechaEnemigo
    ) {
        return; 
    }

    // SI HAY COLISIÓN
    detenerMovimiento();
    clearInterval(intervalo);
    avatarEnemigo = enemigo;
    vidasEnemigo = VIDAS_INICIALES; 
    mostrarPantallaAtaque();
}

function moverDerecha() { avatarJugador.velocidadX = 5; }
function moverIzquierda() { avatarJugador.velocidadX = -5; }
function moverAbajo() { avatarJugador.velocidadY = 5; }
function moverArriba() { avatarJugador.velocidadY = -5; }
function detenerMovimiento() {
    if(avatarJugador) {
        avatarJugador.velocidadX = 0;
        avatarJugador.velocidadY = 0;
    }
}
function sePresionoUnaTecla(event) {
    switch (event.key) {
        case 'ArrowUp': moverArriba(); break;
        case 'ArrowDown': moverAbajo(); break;
        case 'ArrowLeft': moverIzquierda(); break;
        case 'ArrowRight': moverDerecha(); break;
    }
}

// ==========================================
// LÓGICA DE COMBATE MULTI-RONDA Y ANIMACIONES
// ==========================================
function mostrarPantallaAtaque() {
    seccionVerMapa.style.display = 'none';
    seccionMensajes.style.display = 'none';
    seccionAtaque.style.display = 'flex';
    
    // Asignar nombres y fotos en la arena
    personajeJugadorElemento.textContent = avatarJugador.nombre;
    imgJugadorCombate.src = avatarJugador.imagen;
    
    personajeEnemigoElemento.textContent = avatarEnemigo.nombre;
    imgEnemigoCombate.src = avatarEnemigo.imagen;
    
    actualizarVidasUI();
    
    // Limpiar clases de animación previas por si acaso
    tarjetaJugadorCombate.className = "tarjeta-combate";
    tarjetaEnemigoCombate.className = "tarjeta-combate";
}

function obtenerEmoji(poder) {
    if (poder === FUEGO) return "🔥";
    if (poder === AGUA) return "💧";
    if (poder === TIERRA) return "🌱";
    if (poder === AIRE) return "💨";
    return "";
}

function realizarAtaque(poderJugador) {
    const ataques = [FUEGO, AGUA, TIERRA, AIRE];
    const poderEnemigo = ataques[Math.floor(Math.random() * ataques.length)];
    
    let resultado = "";
    
    // Limpiamos animaciones viejas
    tarjetaJugadorCombate.className = "tarjeta-combate";
    tarjetaEnemigoCombate.className = "tarjeta-combate";
    
    // Forzamos un pequeño reflujo (reflow) para reiniciar las animaciones
    void tarjetaJugadorCombate.offsetWidth;
    void tarjetaEnemigoCombate.offsetWidth;

    // Evaluamos el resultado y asignamos animaciones
    if (poderJugador === poderEnemigo) {
        resultado = "¡Empate! 😐";
        tarjetaJugadorCombate.classList.add("animacion-empate");
        tarjetaEnemigoCombate.classList.add("animacion-empate");
    } else if (
        (poderJugador === FUEGO && poderEnemigo === TIERRA) ||
        (poderJugador === AGUA && poderEnemigo === FUEGO) ||
        (poderJugador === TIERRA && poderEnemigo === AIRE) ||
        (poderJugador === AIRE && poderEnemigo === AGUA)
    ) {
        resultado = "¡Ganaste esta ronda! 🥳";
        vidasEnemigo--;
        tarjetaJugadorCombate.classList.add("animacion-ataque");
        tarjetaEnemigoCombate.classList.add("animacion-daño");
    } else {
        resultado = "¡Perdiste esta ronda! 🤕";
        vidasJugador--;
        tarjetaEnemigoCombate.classList.add("animacion-ataque");
        tarjetaJugadorCombate.classList.add("animacion-daño");
    }

    actualizarVidasUI();
    
    // Pausamos 800 milisegundos para que el usuario disfrute la animación
    // antes de ocultar la arena y mostrar el mensaje final
    setTimeout(() => {
        mostrarMensajeRonda(poderJugador, poderEnemigo, resultado);
    }, 800);
}

function actualizarVidasUI() {
    vidasJugadorElemento.textContent = vidasJugador;
    vidasEnemigoElemento.textContent = vidasEnemigo;
    vidasJugadorResumen.textContent = vidasJugador;
    vidasEnemigoResumen.textContent = vidasEnemigo;
}

function mostrarMensajeRonda(poderJugador, poderEnemigo, resultado) {
    seccionAtaque.style.display = 'none';
    seccionMensajes.style.display = 'flex';
    
    ataquesResumen.textContent = `${poderJugador} ${obtenerEmoji(poderJugador)} ⚔️ ${poderEnemigo} ${obtenerEmoji(poderEnemigo)}`;
    resultadoRonda.textContent = resultado;
    
    if (vidasJugador === 0 || vidasEnemigo === 0) {
        botonSiguienteRonda.style.display = 'none';
        botonReiniciar.style.display = 'block';
        
        if (vidasJugador === 0) {
            resultadoRonda.textContent = "☠️ ¡HAS PERDIDO LA BATALLA! ☠️";
        } else {
            // Mandamos al enemigo fuera del mapa para que desaparezca al volver a jugar
            avatarEnemigo.x = -500; 
            resultadoRonda.textContent = "🏆 ¡HAS GANADO LA BATALLA! 🏆";
        }
    } else {
        botonSiguienteRonda.style.display = 'block';
        botonReiniciar.style.display = 'none';
    }
}

// ==========================================
// EVENT LISTENERS DE BOTONES
// ==========================================
botonPersonaje.addEventListener("click", seleccionarPersonajeJugador);
botonMostrarCrear.addEventListener("click", () => {
    seccionSeleccionarPersonaje.style.display = "none";
    seccionCrearPersonaje.style.display = "block";
});
botonMostrarCreados.addEventListener("click", mostrarSeccionPersonajesCreados);
botonVolverPersonajesCreados.addEventListener("click", volverSeleccionPersonaje);

botonFuego.addEventListener("click", () => realizarAtaque(FUEGO));
botonAgua.addEventListener("click", () => realizarAtaque(AGUA));
botonTierra.addEventListener("click", () => realizarAtaque(TIERRA));
botonAire.addEventListener("click", () => realizarAtaque(AIRE));

botonSiguienteRonda.addEventListener("click", mostrarPantallaAtaque);
botonReiniciar.addEventListener("click", () => {
    if(vidasJugador === 0) {
        location.reload(); // Si mueres, recarga todo
    } else {
        // Si ganas, volves al mapa para pelear con otro
        seccionMensajes.style.display = 'none';
        seccionVerMapa.style.display = 'flex';
        iniciarMapa();
    }
});

// Cargar personajes en localStorage
const creados = JSON.parse(localStorage.getItem("avatares"));
if (creados) {
    creados.forEach(personaje => {
        avatares.push(new Avatar(personaje.nombre, personaje.poder, personaje.imagen));
    });
}

volverSeleccionPersonaje();