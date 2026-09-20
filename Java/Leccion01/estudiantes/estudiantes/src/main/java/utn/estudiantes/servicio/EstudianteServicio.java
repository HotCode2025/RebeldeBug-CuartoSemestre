package utn.estudiantes.servicio;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import utn.estudiantes.modelo.Estudiantes2026;
import utn.estudiantes.repositorio.EstudianteRepositorio;


import java.util.List;

// Indica a Spring que esta clase es un servicio (contiene la lógica de la aplicación)
@Service
public class EstudianteServicio implements IEstudianteServicio {

    //Conecta automáticamente el repositorio para poder usar sus métodos de Base de Datos
    @Autowired
    private EstudianteRepositorio estudianteRepositorio;

    // Obtiene y devuelve la lista completa de todos los estudiantes
    @Override
    public List<Estudiantes2026> listarEstudiantes() {
        List<Estudiantes2026> estudiantes = estudianteRepositorio.findAll();
        return estudiantes;
    }

    // Busca un estudiante por su ID. Si no lo encuentra, devuelve null
    @Override
    public Estudiantes2026 buscarEstudiantePorId(Integer idEstudiantes2026) {
        Estudiantes2026 estudiante =  estudianteRepositorio.findById(idEstudiantes2026).orElse(null);
        return estudiante;
    }

    // Guarda un nuevo estudiante o actualiza uno existente
    @Override
    public void guardarEstudiante(Estudiantes2026 estudiante) {
        estudianteRepositorio.save(estudiante);
    }

    // Elimina el estudiante
    @Override
    public void eliminarEstudiante(Estudiantes2026 estudiante) {
        estudianteRepositorio.delete(estudiante);
    }
    //Se implementó lo de la interface de IEstudianteServicio
}
