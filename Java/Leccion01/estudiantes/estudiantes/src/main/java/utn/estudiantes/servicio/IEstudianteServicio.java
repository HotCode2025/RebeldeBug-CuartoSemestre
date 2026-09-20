package utn.estudiantes.servicio;

import utn.estudiantes.modelo.Estudiantes2026;

import java.util.List;

public interface IEstudianteServicio {
    public List<Estudiantes2026> listarEstudiantes();
    public Estudiantes2026 buscarEstudiantePorId(Integer idEstudiantes2026);
    public void guardarEstudiante(Estudiantes2026 estudiante);
    public void eliminarEstudiante(Estudiantes2026 estudiante);
}
