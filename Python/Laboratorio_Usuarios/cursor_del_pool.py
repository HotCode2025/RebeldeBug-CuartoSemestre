from conexion import Conexion
from logger_base import logger


class CursorDelPool:

    def __init__(self):
        self._conn = None
        self._cursor = None

    def __enter__(self):

        try:
            self._conn = Conexion.obtener_conexion()
            self._cursor = self._conn.cursor()

            logger.info("Cursor obtenido correctamente.")

            return self._cursor

        except Exception as e:
            logger.error(f"Error al obtener cursor: {e}")

            if self._conn is not None:
                Conexion.liberar_conexion(self._conn)

            raise

    def __exit__(self, tipo_exception, valor_exception, detalle_exception):

        try:

            if tipo_exception:
                self._conn.rollback()
                logger.error(
                    f"Error en la operación. Rollback realizado: "
                    f"{valor_exception}"
                )
            else:
                self._conn.commit()

        except Exception as e:
            logger.error(f"Error durante commit/rollback: {e}")

        finally:

            if self._cursor is not None:
                self._cursor.close()

            if self._conn is not None:
                Conexion.liberar_conexion(self._conn)

            logger.info("Cursor y conexión liberados.")