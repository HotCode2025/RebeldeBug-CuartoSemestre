package utn.tienda_libros.servicio;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import utn.tienda_libros.modelo.Libro;
import utn.tienda_libros.repositorio.LibroRepositorio;

@Service 
public class LibroServicio implements ILibroServicio{

    @Autowired
    private LibroRepositorio libroRepositorio;

    @Override 
    public List<Libro> listarLibros() {
        return libroRepositorio.findAll(); //Regresa una lista con todos los libros
    }

    @Override 
    public Libro buscarLibroPorId(Integer idLibro) {
        Libro libro = libroRepositorio.findById(idLibro).orElse(null); //Busca un libro por id
        return libro;
    }

    @Override 
    public void guardarLibro(Libro libro) {
        libroRepositorio.save(libro); //Guarda un libro
    }

    @Override 
    public void eliminarLibro(Integer idLibro) {
        libroRepositorio.deleteById(idLibro); //Elimina un libro por id
    }
}
