# 🎮 Avatar: La Leyenda de Aang

## 📌 Descripción del Proyecto

Este proyecto consiste en un videojuego simple desarrollado con **HTML y JavaScript**, inspirado en los personajes de la serie *Avatar: La Leyenda de Aang*.

El jugador debe seleccionar un personaje y luego enfrentarse a un enemigo utilizando distintos tipos de ataques elementales:

- 🔥 Fuego
- 💧 Agua
- 🌱 Tierra
- 💨 Aire

Cada combatiente comienza con 3 vidas. El objetivo es reducir las vidas del enemigo a cero antes de perder todas las propias.

---

# 🧩 Tecnologías Utilizadas

- HTML5
- JavaScript
- DOM (Document Object Model)

---

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

# 🎯 Inicio del Juego

Cuando la página termina de cargarse, se ejecuta:

```javascript
window.addEventListener('load', iniciarJuego)
```

Esto significa que la función `iniciarJuego()` comienza automáticamente cuando el navegador carga completamente el documento.

---

# ⚡ Uso de addEventListener()

El proyecto utiliza varios eventos para detectar acciones del usuario.

Ejemplo:

```javascript
botonPersonajeJugador.addEventListener(
    'click',
    seleccionarPersonajeJugador
)
```

Cuando el usuario hace clic en el botón "Seleccionar", se ejecuta la función:

```javascript
seleccionarPersonajeJugador()
```

También se utilizan eventos para los ataques:

```javascript
botonFuego.addEventListener('click', ataqueFuego)
botonAgua.addEventListener('click', ataqueAgua)
botonTierra.addEventListener('click', ataqueTierra)
botonAire.addEventListener('click', ataqueAire)
```

Cada botón ejecuta una función distinta según el ataque elegido.

---

# 👤 Selección de Personaje

El jugador puede elegir uno de los siguientes personajes:

- Zuko 🔥
- Katara 💧
- Aang 💨
- Toph 🌱

Para verificar cuál fue seleccionado se utilizan botones de tipo radio:

```javascript
inputZuko.checked
```

Si un personaje fue seleccionado, el sistema muestra un mensaje confirmando la elección.

Además, se habilita la sección de ataques:

```javascript
sectionSeleccionarAtaque.style.display = 'block'
```

---

# ⚔️ Sistema de Ataques

Cada ataque tiene una función específica:

```javascript
ataqueFuego()
ataqueAgua()
ataqueTierra()
ataqueAire()
```

Estas funciones guardan el ataque elegido por el jugador y luego generan automáticamente un ataque aleatorio para el enemigo.

Ejemplo:

```javascript
ataqueJugador = 'FUEGO 🔥'
```

---

# 🎲 Ataque Aleatorio del Enemigo

El enemigo selecciona un ataque de manera aleatoria mediante:

```javascript
Math.random()
```

Implementado dentro de la función:

```javascript
aleatorio(min, max)
```

Esta función genera un número entre 1 y 4.

Según el número obtenido, el enemigo utilizará:

- Fuego
- Agua
- Tierra
- Aire

---

# 🏆 Sistema de Combate

La lógica principal se encuentra en:

```javascript
combate()
```

Las reglas son:

| Ataque del jugador | Derrota a |
|-------------------|-----------|
| 🔥 Fuego | 🌱 Tierra |
| 💧 Agua | 🔥 Fuego |
| 🌱 Tierra | 💨 Aire |
| 💨 Aire | 💧 Agua |

Si ambos ataques son iguales:

```javascript
resultado = "¡EMPATE!"
```

Si el jugador gana:

```javascript
vidasEnemigo--
```

Si el jugador pierde:

```javascript
vidasJugador--
```

---

# ❤️ Sistema de Vidas

Al comenzar la partida:

```javascript
let vidasJugador = 3
let vidasEnemigo = 3
```

Cada derrota reduce una vida.

Las vidas se actualizan dinámicamente en la página utilizando:

```javascript
innerHTML
```

Ejemplo:

```javascript
spanVidaEnemigo.innerHTML = vidasEnemigo
```

De esta manera el jugador puede ver en tiempo real cuántas vidas quedan.

---

# 📝 Historial de Combate

Después de cada ronda se crea un mensaje informativo:

```javascript
crearMensaje(resultado)
```

Ejemplo:

```
Atacaste con FUEGO 🔥,
el enemigo atacó con TIERRA 🌱.
¡GANASTE ESTA RONDA! 🎉
```

Los mensajes se agregan dinámicamente mediante:

```javascript
document.createElement('p')
```

y

```javascript
appendChild()
```

---

# 🏁 Finalización del Juego

La función:

```javascript
revisarVidas()
```

verifica constantemente si algún jugador llegó a cero vidas.

Si el jugador pierde:

```javascript
Lo siento... ¡HAS PERDIDO EL COMBATE! 💀
```

Si el jugador gana:

```javascript
¡FELICITACIONES! ¡HAS GANADO EL COMBATE! 🏆
```

---

# 🔒 Bloqueo de Ataques

Cuando termina la partida, los botones de ataque se deshabilitan:

```javascript
botonFuego.disabled = true
botonAgua.disabled = true
botonTierra.disabled = true
botonAire.disabled = true
```

Esto evita que se continúe jugando después del resultado final.

---

# 🔄 Reinicio de la Partida

El juego incluye un botón para reiniciar.

Al hacer clic se ejecuta:

```javascript
location.reload()
```

Esta instrucción recarga completamente la página y devuelve el juego a su estado inicial.

---

# 📚 Conceptos Aplicados

Durante el desarrollo de este proyecto se utilizaron los siguientes conceptos de JavaScript:

- Variables globales.
- Funciones.
- Condicionales (`if`, `else if`, `else`).
- Eventos.
- DOM.
- addEventListener().
- Manipulación de HTML mediante JavaScript.
- Creación dinámica de elementos.
- Generación de números aleatorios.
- Actualización de contenido con `innerHTML`.
- Control de flujo del juego.
- Recarga de página con `location.reload()`.

---

# 🎯 Conclusión

Este proyecto permitió aplicar conceptos fundamentales del desarrollo web interactivo utilizando JavaScript y el DOM. A través de eventos, funciones y manipulación dinámica de elementos HTML, se construyó un videojuego sencillo que incorpora selección de personajes, sistema de combate, control de vidas y reinicio de partida.