from usuario import Usuario
from usuario_dao import UsuarioDao


class MenuAppUsuario:

    @staticmethod
    def mostrar_menu():

        while True:

            print("\n==============================")
            print("       MENÚ DE USUARIOS")
            print("==============================")
            print("1. Listar usuarios")
            print("2. Agregar usuario")
            print("3. Modificar usuario")
            print("4. Eliminar usuario")
            print("5. Salir")
            print("==============================")

            opcion = input("Seleccione una opción: ")

            if opcion == "1":
                MenuAppUsuario.listar_usuarios()

            elif opcion == "2":
                MenuAppUsuario.agregar_usuario()

            elif opcion == "3":
                MenuAppUsuario.modificar_usuario()

            elif opcion == "4":
                MenuAppUsuario.eliminar_usuario()

            elif opcion == "5":
                print("\nPrograma finalizado.")
                break

            else:
                print("\nOpción inválida.")


    @staticmethod
    def listar_usuarios():

        print("\n=== LISTA DE USUARIOS ===")

        usuarios = UsuarioDao.seleccionar()

        if not usuarios:
            print("No hay usuarios registrados.")
            return

        for usuario in usuarios:
            print(usuario)


    @staticmethod
    def agregar_usuario():

        print("\n=== AGREGAR USUARIO ===")

        username = input("Ingrese username: ")
        password = input("Ingrese password: ")

        usuario = Usuario(
            username=username,
            password=password
        )

        UsuarioDao.insertar(usuario)

        print("Usuario agregado correctamente.")


    @staticmethod
    def modificar_usuario():

        print("\n=== MODIFICAR USUARIO ===")

        id_usuario = int(input("Ingrese el ID del usuario: "))
        username = input("Ingrese el nuevo username: ")
        password = input("Ingrese la nueva password: ")

        usuario = Usuario(
            id_usuario=id_usuario,
            username=username,
            password=password
        )

        UsuarioDao.actualizar(usuario)

        print("Usuario actualizado correctamente.")


    @staticmethod
    def eliminar_usuario():

        print("\n=== ELIMINAR USUARIO ===")

        id_usuario = int(input("Ingrese el ID del usuario: "))

        usuario = Usuario(
            id_usuario=id_usuario
        )

        UsuarioDao.eliminar(usuario)

        print("Usuario eliminado correctamente.")