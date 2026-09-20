package utn.estudiantes;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import utn.estudiantes.servicio.EstudianteServicio;

// Se configura e inicia la aplicación Spring Boot
// Este metodo de CommandLineRunner se ejecuta automáticamente después de que la app inicia
@SpringBootApplication
public class EstudiantesApplication implements CommandLineRunner {

	// Implementa el servicio de estudiantes para usarlo en la consola si es necesario
	@Autowired
	private EstudianteServicio estudianteServicio;
	// Herramienta para mostrar mensajes o logs en la consola
	private static final Logger logger = LoggerFactory.getLogger(EstudiantesApplication.class);

	String nl = System.lineSeparator();

	public static void main(String[] args) {
		logger.info("Iniciando la aplicación...");
		//Levantar la fábrica de Spring
		SpringApplication.run(EstudiantesApplication.class, args);
		logger.info("Aplicación Finalizada!");
	}

	@Override
	public void run(String... args) throws Exception {
		logger.info(nl+"Ejecutando el método run de Spring..."+nl);
	}
}
