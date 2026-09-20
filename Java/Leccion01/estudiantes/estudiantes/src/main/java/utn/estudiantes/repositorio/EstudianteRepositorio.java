package utn.estudiantes.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import utn.estudiantes.modelo.Estudiantes2026;

//Al definir la interface, ya se obtiene de
//forma automática las funcionalidades del proyecto

public interface EstudianteRepositorio extends JpaRepository<Estudiantes2026, Integer> {
}
