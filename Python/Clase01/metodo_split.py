#Convertimos una cadena a una lista (inverso al método join)
#help(str.split)
cursos = 'Java JavaScript Node Python Diseno'
lista_cursos = cursos.split()
print(f'Lista de cursos: {lista_cursos}')
print(type(lista_cursos))

cursos_separados_coma = 'Java,Python,Node,JavaScript,Spring' #Como no encuentra espacios, nos hizo una lista con un solo elemento
lista_cursos = cursos_separados_coma.split(',', 2) #por default busca los espacios pero aquí le estamos diciendo que el separador es una coma. El 2, crea 2 elementos.
print(f'Lista de cursos: {lista_cursos}')
print(len(lista_cursos))

