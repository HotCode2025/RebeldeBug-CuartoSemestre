# 🎮 Avatar: La Leyenda de Aang

## 📌 Descripción del Proyecto

Este proyecto es un videojuego web interactivo desarrollado con **HTML, CSS y JavaScript**, inspirado en el universo de *Avatar: La Leyenda de Aang*. 

En esta versión avanzada, el jugador no solo selecciona un personaje, sino que explora un **mapa interactivo en 2D**, choca contra enemigos para iniciar combates, y tiene la capacidad de **crear sus propios personajes** personalizados que se guardan en la memoria del navegador.

El combate se define utilizando distintos tipos de ataques elementales:
- 🔥 Fuego
- 💧 Agua
- 🌱 Tierra
- 💨 Aire

El objetivo es reducir las 3 vidas del enemigo a cero a través de múltiples rondas de combate.

# 🌐 ¿Qué es el DOM?

El **DOM (Document Object Model)** es una representación en forma de árbol de todos los elementos HTML de una página web.

Gracias al DOM, JavaScript puede:

- Acceder a elementos HTML.
- Modificar contenido.
- Mostrar u ocultar secciones.
- Responder a acciones del usuario.
- Crear elementos dinámicamente.

Ejemplo utilizado en el proyecto:

```javascript
document.getElementById('boton-personaje')
```

Este método permite obtener un elemento HTML mediante su identificador (`id`) para manipularlo desde JavaScript.

---

# 🔗 Relación entre HTML y JavaScript

El archivo HTML contiene la estructura visual del juego:

- Selección de personaje.
- Botones de ataque.
- Contador de vidas.
- Historial de combate.
- Botón de reinicio.
- Mapa interactivo con movimiento

El archivo JavaScript contiene toda la lógica del juego:

- Inicio de la partida.
- Selección del personaje.
- Sistema de ataques.
- Combate.
- Control de vidas.
- Mensajes de victoria o derrota.

La conexión entre ambos archivos se realiza mediante:

```html
<script src="./js/avatar.js"></script>
```

---

# 🧩 Tecnologías Utilizadas

- **HTML5**: Estructura semántica del juego.
- **CSS3**: Estilos avanzados, animaciones de fondo (efecto lava), flexbox, botones interactivos y efectos de neón.
- **JavaScript (ES6+)**: Lógica del juego, Programación Orientada a Objetos (POO).
- **DOM (Document Object Model)**: Manipulación de la interfaz en tiempo real.
- **HTML5 Canvas API**: Renderizado del mapa en 2D y movimiento de personajes.
- **LocalStorage**: Persistencia de datos para los personajes creados por el usuario.

---

# 🏗️ Programación Orientada a Objetos (POO)

El juego utiliza clases para estructurar la información de manera ordenada y escalable.

```javascript
class Avatar {
    constructor(nombre, poder, imagen, x = 20, y = 30) {
        this.nombre = nombre;
        this.poder = poder;
        this.imagen = imagen;
        this.x = x;
        this.y = y;
        this.velocidadX = 0;
        this.velocidadY = 0;
        this.mapaFoto = new Image();
        this.mapaFoto.src = imagen;
    }
}
```
Esto permite instanciar múltiples personajes (tanto originales como creados por el usuario) con sus propias coordenadas y velocidades dentro del mapa.

---

# 💾 Creación de Personajes y LocalStorage

El juego permite la creación dinámica de personajes. Una vez que el usuario ingresa un nombre y elige un elemento, el objeto se agrega al arreglo `avatares` y se guarda en el navegador:

```javascript
localStorage.setItem("avatares", JSON.stringify(avatares.slice(4)));
```
Al recargar la página, el juego recupera (`JSON.parse`) estos datos para que los personajes creados sigan disponibles. Además, se incluyó una función con `event.stopPropagation()` para eliminar personajes específicos mediante un botón dinámico (✖).

---

# 🗺️ Exploración y HTML5 Canvas

Se integró una etiqueta `<canvas>` para dibujar un mapa 2D. 

```javascript
let lienzo = mapa.getContext("2d");
```
El bucle principal del juego se ejecuta utilizando `setInterval(pintarPersonaje, 50)`, actualizando la posición `x` e `y` del personaje en base a su `velocidadX` y `velocidadY`. 

El jugador puede moverse utilizando:
1. **Botones en pantalla:** Escuchando eventos `mousedown` y `mouseup`.
2. **Teclado:** Escuchando eventos `keydown` y `keyup` (flechas direccionales).

---

# 💥 Sistema de Colisiones

El combate ya no es automático. El jugador debe buscar al enemigo en el mapa. La función `revisarColision()` evalúa constantemente si los bordes del avatar del jugador se superponen con los bordes de un enemigo:

```javascript
if (
    abajoAvatar < arribaEnemigo ||
    arribaAvatar > abajoEnemigo ||
    derechaAvatar < izquierdaEnemigo ||
    izquierdaAvatar > derechaEnemigo
) {
    return; // No hay choque
}
// SI HAY CHOQUE -> Inicia el Combate
```

---

# ⚔️ Sistema de Combate Multi-Ronda

Una vez que ocurre el choque con un personaje, se abre la "Arena de Combate". Las reglas elementales son:

| Ataque del jugador | Derrota a |
|-------------------|-----------|
| 🔥 Fuego | 🌱 Tierra |
| 💧 Agua | 🔥 Fuego |
| 🌱 Tierra | 💨 Aire |
| 💨 Aire | 💧 Agua |

La lógica compara el ataque del jugador con un ataque aleatorio del enemigo. Tras cada choque, se actualizan las vidas en la interfaz de usuario dinámicamente mediante el DOM y se habilita un botón de **"Siguiente Ronda"** hasta que las vidas de algún jugador lleguen a cero.

---

# 🎨 Interfaz y DOM Dinámico

En lugar de tener una página estática, JavaScript renderiza las tarjetas de los personajes utilizando *Template Literals* y la iteración `forEach()`:

```javascript
avatares.forEach(personaje => {
    tarjeta.innerHTML = `
        <img src="${personaje.imagen}" alt="${personaje.nombre}">
        <h3>${personaje.nombre}</h3>
        <p>${personaje.poder}</p>
    `;
    listaPersonajes.appendChild(tarjeta);
});
```

Dependiendo de la fase del juego (Selección, Mapa o Combate), el código manipula la propiedad CSS `display` (`none`, `block`, `flex`) para crear la ilusión de cambio de pantallas sin recargar el navegador web.

---

# 📚 Conceptos Aplicados

Durante el desarrollo de esta versión avanzada, dominamos:
- **Lógica de programación:** Variables, funciones, condicionales, bucles (`forEach`, `for`).
- **Programación Orientada a Objetos (POO):** Clases, Constructores y Objetos.
- **Manejo del DOM:** Captura de elementos (`getElementById`), creación (`createElement`), inserción (`appendChild`) y eventos.
- **Eventos Avanzados:** `click`, `mousedown`, `mouseup`, `keydown`, `keyup` y propagación (`stopPropagation`).
- **Canvas API:** Renderizado de gráficos en 2D, imágenes (`drawImage`) y limpieza del lienzo (`clearRect`).
- **Videojuegos 2D:** Bucle de juego (`setInterval`), movimiento por velocidad cartesiana (x, y) y detección de colisiones por Cajas delimitadoras (Bounding Box).
- **Almacenamiento Local:** Lectura y escritura con `localStorage` y JSON.

---

# 🎯 Conclusión

El proyecto evolucionó de una lucha estática a un videojuego interactivo con exploración espacial, gestión de memoria local y un sistema de combate estructurado. Es la demostración práctica que tiene combinar HTML, CSS y JavaScript para el desarrollo web interactivo.