package utn.estudiantes.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import utn.estudiantes.modelo.Estudiante;

//Al definir la interface, ya se obtiene de
//forma automática las funcionalidades del proyecto

public interface EstudianteRepositorio extends JpaRepository<Estudiante, Integer> {
}
