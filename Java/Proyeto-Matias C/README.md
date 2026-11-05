# 💜 ToDo API

<p align="center">
  **Organizá tus tareas de forma simple y práctica.**
</p>

Una aplicación de gestión de tareas que permite crear, visualizar, completar y eliminar tareas mediante una interfaz intuitiva conectada a una API REST y una base de datos MySQL.

---

## ✨ Características principales

- ➕ Crear nuevas tareas.
- 📋 Visualizar todas las tareas registradas.
- ✅ Marcar tareas como completadas.
- 🗑️ Eliminar tareas.
- 🔄 Sincronización entre el frontend, backend y base de datos.
- 💾 Persistencia de información mediante MySQL.

## 🎨 Interfaz

La aplicación cuenta con una interfaz moderna en tonos violetas y lavanda, diseñada para facilitar la organización y el seguimiento de las actividades.

## 🛠️ Tecnologías utilizadas

| Tecnología | Utilización |
|---|---|
| Java 17 | Lenguaje del backend |
| Spring Boot | Desarrollo de la API REST |
| Spring Data JPA | Acceso a datos |
| MySQL | Base de datos |
| Maven | Gestión de dependencias |
| HTML | Estructura del frontend |
| CSS | Diseño y estilos |
| JavaScript | Interactividad y comunicación con la API |
| Swagger | Documentación y pruebas de endpoints |

## 📁 Estructura del proyecto

```text
ToDo API/
│
├── Back/
│   └── ToDo API/
│       └── src/
│           └── main/
│               ├── java/
│               └── resources/
│
└── Front/
    ├── index.html
    └── assets/
        ├── css/
        └── script/
```

## ⚙️ Configuración e instalación

### 1. Clonar el repositorio

```bash
git clone URL_DEL_REPOSITORIO
```

### 2. Configurar MySQL

Crear o permitir que la aplicación cree la base de datos:

```sql
CREATE DATABASE db_todo_api;
```

Configurar las credenciales de conexión en `application.properties`.

### 3. Ejecutar el backend

Abrir el proyecto backend en IntelliJ IDEA y ejecutar la clase principal:

`TodoAppApplication.java`

El servidor estará disponible en:

```text
http://localhost:8080
```

### 4. Abrir el frontend

Abrir el archivo `index.html` desde el navegador para utilizar la aplicación.

## 🔗 Endpoints de la API

| Método | Endpoint | Función |
|---|---|---|
| POST | `/api/v1/tasks/create` | Crear una tarea |
| GET | `/api/v1/tasks/all` | Listar tareas |
| PATCH | `/api/v1/tasks/mark_as_finished/{id}/{finished}` | Cambiar estado |
| DELETE | `/api/v1/tasks/delete/{id}` | Eliminar una tarea |

## 📖 Documentación Swagger

La API cuenta con documentación interactiva mediante Swagger UI.

Con el backend iniciado, ingresar a:

[http://localhost:8080/swagger-ui/index.html](http://localhost:8080/swagger-ui/index.html)

Desde allí es posible consultar y probar los distintos endpoints.

---

<p align="center">
  💜 **ToDo API**
  
  *Una forma más sencilla de organizar tus tareas.*
</p>