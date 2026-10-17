package utn.tienda_libros.vista;

import java.awt.BorderLayout;
import java.awt.Dimension;
import java.awt.FlowLayout;
import java.awt.Font;
import java.awt.GridBagConstraints;
import java.awt.GridBagLayout;
import java.awt.Insets;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.util.List;

import javax.swing.BorderFactory;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.JTable;
import javax.swing.JTextField;
import javax.swing.ListSelectionModel;
import javax.swing.SwingConstants;
import javax.swing.table.DefaultTableModel;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import utn.tienda_libros.modelo.Libro;
import utn.tienda_libros.servicio.LibroServicio;

@Component
public class LibroForm extends JFrame {
    private final LibroServicio libroServicio;

    private JPanel panelPrincipal;
    private JTable tablaLibros;
    private DefaultTableModel tablaModeloLibros;
    private Integer idLibro; // Guarda el ID del libro seleccionado en la tabla

    // Cajas de texto
    private JTextField txtLibro;
    private JTextField txtAutor;
    private JTextField txtPrecio;
    private JTextField txtExistencias;

    // Botones
    private JButton btnAgregar;
    private JButton btnModificar;
    private JButton btnEliminar;

    @Autowired
    public LibroForm(LibroServicio libroServicio) {
        this.libroServicio = libroServicio;
        iniciarFormulario();
        listarLibros();
    }

    private void iniciarFormulario() {
        setTitle("Tienda de Libros");
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setSize(900, 600);
        setLocationRelativeTo(null);

        // Panel Principal con márgenes
        panelPrincipal = new JPanel(new BorderLayout(15, 15));
        panelPrincipal.setBorder(BorderFactory.createEmptyBorder(20, 20, 20, 20));

        // 1. TÍTULO SUPERIOR
        JLabel lblTitulo = new JLabel("Tienda de Libros", SwingConstants.CENTER);
        lblTitulo.setFont(new Font("Arial", Font.BOLD, 26));
        panelPrincipal.add(lblTitulo, BorderLayout.NORTH);

        // -- Panel Central que contendrá el Formulario y la Tabla --
        JPanel panelCentro = new JPanel(new BorderLayout(20, 0));

        // 2. FORMULARIO LATERAL (Izquierda)
        JPanel panelFormulario = new JPanel(new GridBagLayout());
        GridBagConstraints gbc = new GridBagConstraints();
        gbc.insets = new Insets(15, 10, 15, 10);
        gbc.fill = GridBagConstraints.HORIZONTAL;
        gbc.anchor = GridBagConstraints.WEST;

        gbc.gridx = 0; gbc.gridy = 0;
        JLabel lblLibro = new JLabel("Libro");
        lblLibro.setFont(new Font("Arial", Font.BOLD, 14));
        panelFormulario.add(lblLibro, gbc);
        gbc.gridx = 1; 
        txtLibro = new JTextField(15);
        panelFormulario.add(txtLibro, gbc);

        gbc.gridx = 0; gbc.gridy = 1;
        JLabel lblAutor = new JLabel("Autor");
        lblAutor.setFont(new Font("Arial", Font.BOLD, 14));
        panelFormulario.add(lblAutor, gbc);
        gbc.gridx = 1; 
        txtAutor = new JTextField(15);
        panelFormulario.add(txtAutor, gbc);

        gbc.gridx = 0; gbc.gridy = 2;
        JLabel lblPrecio = new JLabel("Precio");
        lblPrecio.setFont(new Font("Arial", Font.BOLD, 14));
        panelFormulario.add(lblPrecio, gbc);
        gbc.gridx = 1; 
        txtPrecio = new JTextField(15);
        panelFormulario.add(txtPrecio, gbc);

        gbc.gridx = 0; gbc.gridy = 3;
        JLabel lblExistencias = new JLabel("Existencias");
        lblExistencias.setFont(new Font("Arial", Font.BOLD, 14));
        panelFormulario.add(lblExistencias, gbc);
        gbc.gridx = 1; 
        txtExistencias = new JTextField(15);
        panelFormulario.add(txtExistencias, gbc);

        panelCentro.add(panelFormulario, BorderLayout.WEST);

        // 3. TABLA (Derecha / Centro)
        tablaModeloLibros = new DefaultTableModel(
                new Object[]{"Id", "Libro", "Autor", "Precio", "Existencias"}, 0
        ) {
            @Override
            public boolean isCellEditable(int row, int column) {
                return false;
            }
        };
        tablaLibros = new JTable(tablaModeloLibros);
        tablaLibros.setSelectionMode(ListSelectionModel.SINGLE_SELECTION);
        JScrollPane scrollPane = new JScrollPane(tablaLibros);
        panelCentro.add(scrollPane, BorderLayout.CENTER);

        panelPrincipal.add(panelCentro, BorderLayout.CENTER);

        // 4. BOTONES (Abajo)
        JPanel panelBotones = new JPanel(new FlowLayout(FlowLayout.CENTER, 40, 10));
        btnAgregar = new JButton("Agregar");
        btnModificar = new JButton("Modificar");
        btnEliminar = new JButton("Eliminar");

        Dimension dimBoton = new Dimension(140, 30);
        btnAgregar.setPreferredSize(dimBoton);
        btnModificar.setPreferredSize(dimBoton);
        btnEliminar.setPreferredSize(dimBoton);

        panelBotones.add(btnAgregar);
        panelBotones.add(btnModificar);
        panelBotones.add(btnEliminar);

        panelPrincipal.add(panelBotones, BorderLayout.SOUTH);

        add(panelPrincipal);

        // -------------------------------------------------------------
        // ASIGNACIÓN DE EVENTOS
        // -------------------------------------------------------------
        btnAgregar.addActionListener(e -> agregarLibro());
        btnModificar.addActionListener(e -> modificarLibro());
        btnEliminar.addActionListener(e -> eliminarLibro());
        
        // Evento para escuchar clics en la tabla
        tablaLibros.addMouseListener(new MouseAdapter() {
            @Override
            public void mouseClicked(MouseEvent e) {
                cargarLibroSeleccionado();
            }
        });
    }

    private void listarLibros() {
        tablaModeloLibros.setRowCount(0);
        List<Libro> libros = this.libroServicio.listarLibros();
        
        if (libros != null) {
            libros.forEach(libro -> {
                Object[] renglonLibro = {
                        libro.getIdLibro(),
                        libro.getNombreLibro(),
                        libro.getAutor(),
                        libro.getPrecio(),
                        libro.getExistencias()
                };
                this.tablaModeloLibros.addRow(renglonLibro);
            });
        }
    }

    private void agregarLibro() {
        if (txtLibro.getText().trim().isEmpty() || txtAutor.getText().trim().isEmpty()) {
            mostrarMensaje("Por favor ingresa el nombre del libro y el autor.");
            return;
        }

        try {
            Libro libro = new Libro();
            libro.setNombreLibro(txtLibro.getText().trim());
            libro.setAutor(txtAutor.getText().trim());
            // Convertimos los String de los input a Double e Integer
            libro.setPrecio(Double.parseDouble(txtPrecio.getText().trim()));
            libro.setExistencias(Integer.parseInt(txtExistencias.getText().trim()));

            // Se guarda en la DB
            this.libroServicio.guardarLibro(libro);
            
            mostrarMensaje("Libro agregado exitosamente.");
            limpiarFormulario();
            listarLibros(); // Refrescamos la tabla
        } catch (NumberFormatException e) {
            mostrarMensaje("Error: Precio o Existencias deben ser números válidos.");
        }
    }

    private void modificarLibro() {
        if (this.idLibro == null) {
            mostrarMensaje("Debe seleccionar un libro de la tabla para modificarlo.");
            return;
        }

        if (txtLibro.getText().trim().isEmpty()) {
            mostrarMensaje("El nombre del libro no puede estar vacío.");
            return;
        }

        try {
            Libro libro = new Libro();
            // Al asignar el ID, Spring Data JPA sabe que debe hacer un UPDATE y no un INSERT
            libro.setIdLibro(this.idLibro); 
            libro.setNombreLibro(txtLibro.getText().trim());
            libro.setAutor(txtAutor.getText().trim());
            libro.setPrecio(Double.parseDouble(txtPrecio.getText().trim()));
            libro.setExistencias(Integer.parseInt(txtExistencias.getText().trim()));

            this.libroServicio.guardarLibro(libro);
            mostrarMensaje("Libro modificado exitosamente.");
            limpiarFormulario();
            listarLibros();
        } catch (NumberFormatException e) {
            mostrarMensaje("Error: Precio o Existencias deben ser números válidos.");
        }
    }

    private void eliminarLibro() {
        if (this.idLibro == null) {
            mostrarMensaje("Debe seleccionar un libro de la tabla para eliminarlo.");
            return;
        }

        int confirmacion = JOptionPane.showConfirmDialog(this, 
            "¿Seguro que deseas eliminar el libro: " + txtLibro.getText() + "?", 
            "Confirmar", 
            JOptionPane.YES_NO_OPTION);

        if (confirmacion == JOptionPane.YES_OPTION) {
            this.libroServicio.eliminarLibro(this.idLibro);
            mostrarMensaje("Libro eliminado de la base de datos.");
            limpiarFormulario();
            listarLibros();
        }
    }

    private void cargarLibroSeleccionado() {
        int renglon = tablaLibros.getSelectedRow();
        if (renglon != -1) {
            // Obtenemos los valores de la fila seleccionada y los pasamos a las cajas de texto
            String id = tablaLibros.getModel().getValueAt(renglon, 0).toString();
            this.idLibro = Integer.parseInt(id);

            txtLibro.setText(tablaLibros.getModel().getValueAt(renglon, 1).toString());
            txtAutor.setText(tablaLibros.getModel().getValueAt(renglon, 2).toString());
            txtPrecio.setText(tablaLibros.getModel().getValueAt(renglon, 3).toString());
            txtExistencias.setText(tablaLibros.getModel().getValueAt(renglon, 4).toString());
        }
    }

    private void limpiarFormulario() {
        txtLibro.setText("");
        txtAutor.setText("");
        txtPrecio.setText("");
        txtExistencias.setText("");
        this.idLibro = null;
        tablaLibros.clearSelection();
    }

    private void mostrarMensaje(String mensaje) {
        JOptionPane.showMessageDialog(this, mensaje);
    }
}