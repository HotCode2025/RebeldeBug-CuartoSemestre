import psycopg2
from psycopg2 import pool
from logger_base import logger


class Conexion:

    DATABASE = "laboratorio_usuarios"
    USERNAME = "postgres"
    PASSWORD = "M3l1n4"
    DB_PORT = "5432"
    HOST = "localhost"

    MIN_CON = 1
    MAX_CON = 5

    _pool = None

    @classmethod
    def obtener_pool(cls):
        if cls._pool is None:
            try:
                cls._pool = pool.SimpleConnectionPool(
                    cls.MIN_CON,
                    cls.MAX_CON,
                    database=cls.DATABASE,
                    user=cls.USERNAME,
                    password=cls.PASSWORD,
                    port=cls.DB_PORT,
                    host=cls.HOST
                )

                logger.info("Pool de conexiones creado.")

            except Exception as e:
                logger.error(f"Error al crear el pool: {e}")
                raise

        return cls._pool

    @classmethod
    def obtener_conexion(cls):
        try:
            conexion = cls.obtener_pool().getconn()
            logger.info("Conexión obtenida del pool.")
            return conexion

        except Exception as e:
            logger.error(f"Error al obtener conexión: {e}")
            raise

    @classmethod
    def liberar_conexion(cls, conexion):
        try:
            cls.obtener_pool().putconn(conexion)
            logger.info("Conexión devuelta al pool.")

        except Exception as e:
            logger.error(f"Error al liberar conexión: {e}")

    @classmethod
    def cerrar_conexiones(cls):
        try:
            if cls._pool is not None:
                cls._pool.closeall()
                logger.info("Pool de conexiones cerrado.")

        except Exception as e:
            logger.error(f"Error al cerrar conexiones: {e}")