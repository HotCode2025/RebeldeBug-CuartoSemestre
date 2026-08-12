from conexion import Conexion

try:
    conexion = Conexion.obtener_conexion()
    print("✅ CONEXIÓN EXITOSA A POSTGRESQL")

    Conexion.liberar_conexion(conexion)

except Exception as e:
    print("❌ ERROR DE CONEXIÓN:")
    print(e)

finally:
    Conexion.cerrar_conexiones()