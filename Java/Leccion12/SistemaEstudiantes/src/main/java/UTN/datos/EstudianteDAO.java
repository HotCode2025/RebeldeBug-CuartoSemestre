package UTN.datos;
import UTN.dominio.Estudiante;
import static UTN.conexion.Conexion.getConnection;


import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class EstudianteDAO {
    //Metodo listar
    public List<Estudiante> listarEstudiantes(){
        List<Estudiante> estudiantes = new ArrayList<>();
        //Creamos algunos objetos que son necesarios para comunicarnos con la base de datos
        PreparedStatement ps; //nos ayuda a preparar la sentencia sql que vamos a ejecutar hacia la BD (introduce la sentencia)
        ResultSet rs; //objeto que nos permite almacenar el resultado obtenido de lo que es la base de datos (obtiene resultado)
        //Creamos un objeto de tipo conexion
        Connection con = getConnection();
        String sql = "SELECT * FROM estudiantes2026 ORDER BY idestudiante2026";
        try{
            ps = con.prepareStatement(sql);
            rs = ps.executeQuery();
            while(rs.next()){
                var estudiante = new Estudiante();
                estudiante.setIdEstudiante(rs.getInt("idestudiante2026"));
                estudiante.setNombre(rs.getString("nombre"));
                estudiante.setApellido(rs.getString("apellido"));
                estudiante.setTelefono(rs.getString("telefono"));
                estudiante.setEmail(rs.getString("email"));
                //Falta agregarlo a la lista
                estudiantes.add(estudiante);
            }
        } catch (Exception e){
            System.out.println("Ocurrio un error al seleccionar datos: "+e.getMessage());
        }
        finally {
            try {
                con.close();
            } catch (Exception e){
                System.out.println("Ocurrió un error al cerrar la conexion: "+e.getMessage());
            }
        }//fin finally
        return estudiantes;


    }//fin metodo listar

    //metodo por id -> fin by iid
    public boolean buscarEstudiantePorId(Estudiante estudiante){
        PreparedStatement ps;
        ResultSet rs;
        Connection con = getConnection();
        String sql = "SELECT * FROM estudiantes2026 WHERE idestudiante2026=?";
        try{
            ps = con.prepareStatement(sql);
            ps.setInt(1, estudiante.getIdEstudiante());
            rs = ps.executeQuery();
            if(rs.next()){
                estudiante.setNombre(rs.getString("Nombre"));
                estudiante.setApellido(rs.getString("apellido"));
                estudiante.setTelefono(rs.getString("telefono"));
                estudiante.setEmail(rs.getString("email"));
                return true; //se encontro un registro
            }//fin if

        } catch (Exception e){
            System.out.println("Ocurrio un error al buscar estudiante:"+e.getMessage());
        }
        finally {
            try{
                con.close();
            } catch (Exception e){
                System.out.println("Ocurrió un error al cerrar la conexion: "+e.getMessage());
            }//fin catch
        }//fin finally
        return false;
    }
    //Metodo agregar un nuevo estudiante
    public boolean agregarEstudiante(Estudiante estudiante){
        PreparedStatement ps;
        Connection con = getConnection();
        String sql = "INSERT INTO estudiantes2026 (nombre, apellido, telefono, email) VALUES (?, ?, ?, ?)";
        try{
            ps = con.prepareStatement(sql);
            ps.setString(1, estudiante.getNombre());
            ps.setString(2, estudiante.getApellido());
            ps.setString(3, estudiante.getTelefono());
            ps.setString(4, estudiante.getEmail());
            ps.execute();
            return true;
        }catch(Exception e){
            System.out.println("Ocurrio un error al agregar estudiante: "+e.getMessage());
        }//fin catch
        finally{
            try{
                con.close();
            }catch(Exception e){
                System.out.println("Error al cerrar la conexion: "+e.getMessage());
            }//fin catch
        }//fin finally
        return false;
    }//fin metodo agregarEstudiante

    //Metodo para modificar estudiante
    public boolean modificarEstudiante(Estudiante estudiante){
        PreparedStatement ps;
        Connection con = getConnection();
        String sql = "UPDATE estudiantes2026 SET nombre=?, apellido=?, telefono=?, email=? WHERE idestudiante2026=?";
        try{
            ps = con.prepareStatement(sql);
            ps.setString(1, estudiante.getNombre());
            ps.setString(2, estudiante.getApellido());
            ps.setString(3, estudiante.getTelefono());
            ps.setString(4, estudiante.getEmail());
            ps.setInt(5, estudiante.getIdEstudiante());
            ps.execute();
            return true;
        }catch(Exception e){
            System.out.println("Error al modificar estudiante: "+e.getMessage());
        }//fin catch
        finally{
            try{
                con.close();
            }catch(Exception e){
                System.out.println("Error al cerrar la conexion: "+e.getMessage());
            }//fin catch
        }//fin finally
        return false;
    }//fin metodo modificarEstudiante



    public static void main(String[] args) {
        var estudianteDao = new EstudianteDAO();
        //Modificar estudiante
        var estudianteModificado = new Estudiante(1, "Juan Carlos", "Juarez", "193939939393", "carlitoos@gmail.com");
        var modificado = estudianteDao.modificarEstudiante(estudianteModificado);
        if(modificado)
            System.out.println("Estudiante modificado: "+estudianteModificado);
        else System.out.println("No se modificó el estudiante: "+estudianteModificado);;
        //Agregar estudiante
        //var nuevoEstudiante = new Estudiante("Carlos", "Lara", "242949394", "carloslara@gmail.com");
        //var agregado = estudianteDao.agregarEstudiante(nuevoEstudiante);
        //if(agregado)
        //System.out.println("Estudiante agregado: "+nuevoEstudiante);
        //else
        // System.out.println("No se agregó estudiante: "+nuevoEstudiante);

        //listar los estudiantes


        System.out.println("Listado de estudiantes: ");
        List<Estudiante> estudiantes = estudianteDao.listarEstudiantes();
        estudiantes.forEach(System.out::println);//funcion lamba para imprimir



        //buscar por id
        //var estudiante1 = new Estudiante(1);
       // System.out.println("Estudiantes antes de la busqueda: "+estudiante1);
       // var encontrado = estudianteDao.buscarEstudiantePorId(estudiante1);
       // if(encontrado)
            //System.out.println("Estudiante encontrado: "+estudiante1);
           // else
               // System.out.println("No se encontró el estudiante: "+estudiante1.getIdEstudiante());

    }
}
