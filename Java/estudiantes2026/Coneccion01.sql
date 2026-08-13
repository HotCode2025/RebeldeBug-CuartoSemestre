
use estudiantes2026;
-- Comenzamos con el CRUD: create(insertar), read(leer), update(actualizar), delete(eliminar)
-- Listar los estudiantes (read)
Select*from estudiantes2026;
-- Insertar Estudiante
 Insert into estudiantes2026(nombre, apellido, telefono,email) VALUES('Juan', 'Perez', '26343434', 'juan@gmail.com');
-- Update (modificar)
UPDATE estudiantes2026 SET nombre='Juan Carlos', apellido='Garcia' WHERE idestudiante2026= 1;
-- Delete (eliminar)
DELETE FROM estudiantes2026 where idestudiante2026 IN (1,2,3,4,5,6,7,8,9,10,11,12,13,14,15);
-- Para modificar el idestudiante2026 y comience en 1
ALTER TABLE estudiantes2026 AUTO_INCREMENT = 1;