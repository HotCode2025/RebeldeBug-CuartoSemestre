# Dar formato a un string

nombre = 'Ariel'
edad = 28
mensaje_con_formato = 'Mi nombre es %s y tengo %d años'% (nombre, edad)

# Creamos tupla

#persona = ('Carla', 'Gómez', 5000.00)
#mensaje_con_formato = 'Hola %s %s . Tu sueldo es %2.f' # %persona #Aqui le pasamos el objeto que es tupla
#print(mensaje_con_formato%persona)

nombre = 'Juan'
edad = 19
sueldo = 3000
#mensaje_con_formato = 'Nombre {} Edad {} Sueldo {:.2f}'.format(nombre, edad, sueldo)
#print(mensaje_con_formato)

#mensaje = 'Nombre {0} Edad {1} Sueldo {2:.2f}'.format(nombre, edad, sueldo)
#print(mensaje)

mensaje = 'Nombre {n} Edad {e} Sueldo {s}'.format(n=nombre, e=edad, s=sueldo)
print(mensaje)

diccionario = {'nombre': 'Iván', 'Edad': 35, 'Sueldo': 8000.00}
mensaje = 'Nombre {dic[nombre]} Edad {dic[Edad]} Sueldo {dic[Sueldo]:.2f}'.format(dic=diccionario)
print(mensaje)

