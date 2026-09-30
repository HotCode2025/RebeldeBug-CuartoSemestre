# 🔍 Informe de Investigación: Análisis de E-Commerce en Python
**Materia:** Programación / Entornos de Desarrollo
**Objetivo:** Analizar el proyecto de Virginia Castellano, identificar sus tecnologías y conectar su despliegue con herramientas de monitorización (PM2).

---

## 🧭 ¿Cómo llegué a estas conclusiones? (Bitácora de Descubrimiento)
Para una persona que está explorando este entorno por primera vez, el código puede parecer un laberinto. Mi proceso de investigación para reconocer las tecnologías fue el siguiente:

1. **El Descubrimiento de Django:** Al abrir la carpeta del proyecto, lo primero que saltó a la vista fue un archivo llamado `manage.py` y una carpeta llamada `migrations`. Al investigar en la documentación de Python, descubrí que estos archivos son las "huellas dactilares" exclusivas de **Django**, el framework de desarrollo web más utilizado en el mundo corporativo.
2. **Reconociendo la Base de Datos (`models.py`):** Al abrir este archivo, vi que no había consultas SQL tradicionales (como `SELECT * FROM`). En su lugar, había clases de Python que heredaban de `models.Model`. Así comprendí que Django utiliza un **ORM** (Mapeador del Entorno Relacional), que traduce código Python directamente a tablas de bases de datos de forma automática.
3. **Entendiendo las Vistas y la Lógica (`views.py`):** Al revisar las funciones, noté que muchas tenían la palabra `View` y usaban métodos como `def get` y `def post`. Esto me reveló que el proyecto está estructurado con **Vistas Basadas en Clases (CBV)**, aplicando Programación Orientada a Objetos para separar cuando un usuario solo "mira" la página (`GET`) de cuando "envía" datos como un pago o un registro (`POST`).
4. **Rastreando la Seguridad (`urls.py`):** Al analizar las rutas de navegación, encontré importaciones como `auth_view`. Esto me demostró que el proyecto no inventa la rueda desde cero, sino que aprovecha los sistemas criptográficos y de autenticación nativos de Django para proteger el inicio de sesión y el restablecimiento de contraseñas.

---

## 🛠️ Análisis de Tecnologías y Nivel del Proyecto
El proyecto alcanza un nivel **Intermediate (Full-Stack Jr. Avanzado)** debido a la complejidad de sus componentes:

*   **Django Framework:** Núcleo del proyecto. Su elección en el ámbito laboral se debe a su alta seguridad nativa contra ataques web comunes (como CSRF o Inyecciones SQL).
*   **Integridad Referencial (`on_delete=models.CASCADE`):** Mecanismo que asegura que si un cliente elimina su cuenta, sus carritos de compra asociados se borren automáticamente, evitando saturar la base de datos con información basura.
*   **Cálculo Dinámico en Memoria (`@property`):** Lógica avanzada que calcula los precios totales del carrito al vuelo sin guardarlos físicamente en el disco, optimizando el rendimiento del servidor.
*   **Pasarela de Pagos (API de Razorpay):** El código contiene estructuras para conectarse con servicios financieros externos. Integrar pagos en vivo es una de las habilidades más demandadas y mejor pagadas en el mercado laboral actual.

---

## 🚀 Conexión Final con la Monitorización (PM2)
Aunque este proyecto está escrito en Python y herramientas como **PM2** nacieron en el entorno de Node.js, en la industria tecnológica actual ambas herramientas se complementan perfectamente en producción:

Un desarrollador backend no ejecuta las aplicaciones de forma manual en su terminal. En un servidor real, se utiliza **PM2** como un gestor de procesos global. PM2 se encarga de:
1.  **Mantener la tienda viva 24/7:** Si el e-commerce sufre una sobrecarga de usuarios comprando al mismo tiempo y el backend de Python falla, PM2 lo detecta en milisegundos y reinicia el servidor automáticamente.
2.  **Monitorear en Vivo:** Mediante comandos como `pm2 monitor`, el equipo técnico puede vigilar cuánta memoria RAM y CPU consume la lógica del carrito de compras de Django en tiempo real.
3.  **Auditoría con Logs:** Centraliza todos los registros de errores en un solo lugar, permitiendo solucionar fallas en las pasarelas de pago sin interrumpir la navegación de los clientes.

---

## 🤖 Extensión de Investigación: Desarrollo de E-Commerce con IA y Despliegue

### 1. Herramientas de IA sugeridas para producción:
*   **Cursor / VS Code + GitHub Copilot:** Actúan como asistentes dentro del editor, leyendo todo el proyecto para autocompletar la lógica de negocio (`views.py`) basándose en la estructura de la base de datos (`models.py`).
*   **v0.dev / Lovable.dev:** Herramientas generativas para el maquetado del *Frontend* (HTML/CSS del catálogo y carrito) mediante lenguaje natural.
*   **ChatGPT / Claude:** Ideales para actuar como arquitectos de software, depurar errores (*debugging*) y optimizar consultas.

### 2. Prompt Maestro para la estructura inicial:
> *"Actúa como un Desarrollador Backend Senior experto en Python y Django. Necesito crear la estructura inicial para una tienda de comercio electrónico orientada al mercado de Argentina. Genérame el código completo para el archivo `models.py` que incluya: 1. Un modelo `Product` con manejo de precios y descuentos. 2. Un modelo `Customer` con un selector para las 23 provincias argentinas. 3. Un modelo `Cart` y un modelo `OrderPlaced` vinculados al usuario nativo de Django, utilizando un decorador `@property` para calcular el costo total dinámicamente en memoria. Asegúrate de incluir las relaciones de clave foránea con borrado en cascada (`on_delete=models.CASCADE`). Dame el código limpio y estructurado bajo buenas prácticas de PEP 8."*

### 3. Flujo metodológico hasta el funcionamiento sin errores:
1.  **Inicialización:** Configurar el entorno virtual de Python, instalar dependencias y plasmar el código base generado por la IA en la estructura de Django.
2.  **Migración de Capa de Datos:** Ejecutar `python manage.py makemigrations` y `python manage.py migrate` para que Django interprete el código de la IA y construya físicamente las tablas en la base de datos sin errores de sintaxis.
3.  **Ciclo de Testing y Depuración:** Levantar el servidor local. Ante cualquier fallo o *Bug* en la lógica de compras, se introduce el rastro del error (*stack trace*) en la IA para obtener una corrección quirúrgica inmediata.
4.  **Paso a Producción y Estabilización con PM2:** Una vez validada la aplicación a nivel local, se despliega en el servidor productivo bajo el control de **PM2** (`pm2 start manage.py --name "ecommerce" --interpreter python`). Dado que los entornos reales sufren picos de estrés o saturación de hardware (como el uso de disco al 100%), PM2 garantiza la resiliencia levantando el proceso en milisegundos si este llega a fallar, manteniendo la tienda online disponible 24/7.
