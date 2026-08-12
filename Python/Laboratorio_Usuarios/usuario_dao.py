from cursor_del_pool import CursorDelPool
from usuario import Usuario
from logger_base import logger


class UsuarioDao:

    SELECCIONAR = """
        SELECT id_usuario, username, password
        FROM usuario
        ORDER BY id_usuario
    """

    INSERTAR = """
        INSERT INTO usuario (username, password)
        VALUES (%s, %s)
    """

    ACTUALIZAR = """
        UPDATE usuario
        SET username = %s,
            password = %s
        WHERE id_usuario = %s
    """

    ELIMINAR = """
        DELETE FROM usuario
        WHERE id_usuario = %s
    """

    @classmethod
    def seleccionar(cls):

        usuarios = []

        try:

            with CursorDelPool() as cursor:

                cursor.execute(cls.SELECCIONAR)

                registros = cursor.fetchall()

                for registro in registros:

                    usuario = Usuario(
                        registro[0],
                        registro[1],
                        registro[2]
                    )

                    usuarios.append(usuario)

        except Exception as e:
            logger.error(f"Error al seleccionar usuarios: {e}")
            raise

        return usuarios

    @classmethod
    def insertar(cls, usuario):

        try:

            with CursorDelPool() as cursor:

                cursor.execute(
                    cls.INSERTAR,
                    (
                        usuario.username,
                        usuario.password
                    )
                )

                logger.info("Usuario insertado correctamente.")

        except Exception as e:
            logger.error(f"Error al insertar usuario: {e}")
            raise

    @classmethod
    def actualizar(cls, usuario):

        try:

            with CursorDelPool() as cursor:

                cursor.execute(
                    cls.ACTUALIZAR,
                    (
                        usuario.username,
                        usuario.password,
                        usuario.id_usuario
                    )
                )

                logger.info("Usuario actualizado correctamente.")

        except Exception as e:
            logger.error(f"Error al actualizar usuario: {e}")
            raise

    @classmethod
    def eliminar(cls, usuario):

        try:

            with CursorDelPool() as cursor:

                cursor.execute(
                    cls.ELIMINAR,
                    (usuario.id_usuario,)
                )

                logger.info("Usuario eliminado correctamente.")

        except Exception as e:
            logger.error(f"Error al eliminar usuario: {e}")
            raise