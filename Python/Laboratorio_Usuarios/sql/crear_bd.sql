
-- TABLA USUARIO

CREATE TABLE usuario (
    id_usuario SERIAL PRIMARY KEY,
    username VARCHAR(50),
    password VARCHAR(100)
);

-- DATOS INICIALES

INSERT INTO usuario (username, password)
VALUES
    ('juan', '1234'),
    ('maria', '5678'),
    ('pedro', 'abcd');