CREATE TABLE tareas (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(225) UNIQUE NOT NULL,
    descripcion TEXT
);