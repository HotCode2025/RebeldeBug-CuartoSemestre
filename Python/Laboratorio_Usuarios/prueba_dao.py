from usuario import Usuario
from usuario_dao import UsuarioDao


print("=== USUARIOS ACTUALES ===")

usuarios = UsuarioDao.seleccionar()

for usuario in usuarios:
    print(usuario)


print("\n=== ACTUALIZANDO USUARIO 6 ===")

usuario = Usuario(
    id_usuario=6,
    username="usuario_modificado",
    password="5678"
)

UsuarioDao.actualizar(usuario)

print("Usuario actualizado.")


print("\n=== USUARIOS DESPUÉS DE ACTUALIZAR ===")

usuarios = UsuarioDao.seleccionar()

for usuario in usuarios:
    print(usuario)

print("\n=== ELIMINANDO USUARIO 6 ===")

UsuarioDao.eliminar(usuario)

print("Usuario eliminado.")


print("\n=== USUARIOS FINALES ===")

usuarios = UsuarioDao.seleccionar()

for usuario in usuarios:
    print(usuario)
