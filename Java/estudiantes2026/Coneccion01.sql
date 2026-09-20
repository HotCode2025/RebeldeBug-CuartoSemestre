
use estudiantes2026;
-- Comenzamos con el CRUD: create(insertar), read(leer), update(actualizar), delete(eliminar)
-- Listar los estudiantes (read)
Select*from estudiantes2026 order by idestudiantes2026;
-- Insertar Estudiante
Insert into estudiantes2026(nombre, apellido, telefono,email) VALUES('Juan', 'Perez', '26343434', 'juan@gmail.com');
-- Update (modificar)
UPDATE estudiantes2026 SET nombre='Juan Carlos', apellido='Garcia' WHERE idestudiantes2026= 1;
-- Delete (eliminar)
DELETE FROM estudiantes2026 where idestudiantes2026=3;
-- Para modificar el idestudiante2026 y comience en 1
ALTER TABLE estudiantes2026 AUTO_INCREMENT = 1;