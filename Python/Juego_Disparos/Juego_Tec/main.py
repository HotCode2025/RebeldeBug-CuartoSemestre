
import pygame
import sys
import random
import os

from personaje import Personaje, Enemigo, Explosion
from constantes import SCREEN_WIDTH, SCREEN_HEIGHT, ASSETS_PATH

def cargar_imagen(nombre, tamano=None):
    ruta = os.path.join(ASSETS_PATH, "images", nombre)
    imagen = pygame.image.load(ruta).convert_alpha()

    if tamano:
        imagen = pygame.transform.scale(imagen, tamano)

    return imagen


def cargar_sonido(nombre):
    ruta = os.path.join(ASSETS_PATH, "sounds", nombre)

    try:
        return pygame.mixer.Sound(ruta)
    except (pygame.error, FileNotFoundError) as error:
        print(f"No se pudo cargar {nombre}: {error}")
        return None


def texto_centrado(screen, texto, fuente, color, y):
    superficie = fuente.render(texto, True, color)
    rect = superficie.get_rect(
        center=(SCREEN_WIDTH // 2, y)
    )
    screen.blit(superficie, rect)


def dibujar_boton(screen, texto, rect, mouse_pos, fuente):
    color = VIOLETA if rect.collidepoint(mouse_pos) else CELESTE

    pygame.draw.rect(screen, NEGRO, rect, border_radius=12)
    pygame.draw.rect(screen, color, rect, 3, border_radius=12)

    etiqueta = fuente.render(texto, True, BLANCO)
    screen.blit(etiqueta, etiqueta.get_rect(center=rect.center))


def dibujar_fondo_oscuro(screen):
    capa = pygame.Surface(
        (SCREEN_WIDTH, SCREEN_HEIGHT),
        pygame.SRCALPHA
    )
    capa.fill((3, 5, 25, 165))
    screen.blit(capa, (0, 0))

def menu_principal(screen, fondo, reloj):
    fuente_titulo = pygame.font.Font(None, 68)
    fuente_subtitulo = pygame.font.Font(None, 28)
    fuente_boton = pygame.font.Font(None, 42)

    boton_jugar = pygame.Rect(
        SCREEN_WIDTH // 2 - 120,
        SCREEN_HEIGHT // 2,
        240, 60
    )

    boton_salir = pygame.Rect(
        SCREEN_WIDTH // 2 - 120,
        SCREEN_HEIGHT // 2 + 80,
        240, 60
    )

    while True:
        mouse_pos = pygame.mouse.get_pos()

        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                return False

            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_ESCAPE:
                    return False
                if event.key == pygame.K_RETURN:
                    return True

            if event.type == pygame.MOUSEBUTTONDOWN and event.button == 1:
                if boton_jugar.collidepoint(event.pos):
                    return True
                if boton_salir.collidepoint(event.pos):
                    return False

        screen.blit(fondo, (0, 0))
        dibujar_fondo_oscuro(screen)

        texto_centrado(
            screen, "AMENAZA FANTASMA",
            fuente_titulo, CELESTE, SCREEN_HEIGHT // 3
        )

        texto_centrado(
            screen, "La galaxia necesita un piloto",
            fuente_subtitulo, BLANCO, SCREEN_HEIGHT // 3 + 50
        )

        dibujar_boton(screen, "JUGAR", boton_jugar, mouse_pos, fuente_boton)
        dibujar_boton(screen, "SALIR", boton_salir, mouse_pos, fuente_boton)

        pygame.display.flip()
        reloj.tick(60)


def seleccionar_nivel(screen, fondo, reloj):
    fuente_titulo = pygame.font.Font(None, 60)
    fuente_boton = pygame.font.Font(None, 38)
    fuente_texto = pygame.font.Font(None, 25)

    ancho_boton = 260
    alto_boton = 55
    centro_x = SCREEN_WIDTH // 2

    botones = [
        (
            pygame.Rect(centro_x - ancho_boton // 2,
                        SCREEN_HEIGHT // 2 - 55,
                        ancho_boton, alto_boton),
            "FACIL", "facil"
        ),
        (
            pygame.Rect(centro_x - ancho_boton // 2,
                        SCREEN_HEIGHT // 2 + 15,
                        ancho_boton, alto_boton),
            "MEDIO", "medio"
        ),
        (
            pygame.Rect(centro_x - ancho_boton // 2,
                        SCREEN_HEIGHT // 2 + 85,
                        ancho_boton, alto_boton),
            "DIFICIL", "dificil"
        )
    ]

    while True:
        mouse_pos = pygame.mouse.get_pos()

        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                return None

            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_ESCAPE:
                    return None
                if event.key == pygame.K_1:
                    return "facil"
                if event.key == pygame.K_2:
                    return "medio"
                if event.key == pygame.K_3:
                    return "dificil"

            if event.type == pygame.MOUSEBUTTONDOWN and event.button == 1:
                for rect, texto, dificultad in botones:
                    if rect.collidepoint(event.pos):
                        return dificultad

        screen.blit(fondo, (0, 0))
        dibujar_fondo_oscuro(screen)

        texto_centrado(
            screen, "SELECCIONA LA DIFICULTAD",
            fuente_titulo, CELESTE, SCREEN_HEIGHT // 3 - 10
        )

        texto_centrado(
            screen, "Elige como quieres jugar",
            fuente_texto, BLANCO, SCREEN_HEIGHT // 3 + 35
        )

        for rect, texto, dificultad in botones:
            dibujar_boton(screen, texto, rect, mouse_pos, fuente_boton)

        pygame.display.flip()
        reloj.tick(60)

BLANCO = (245, 248, 255)
CELESTE = (60, 200, 255)
VIOLETA = (145, 90, 255)
NEGRO = (5, 8, 25)
ROJO = (255, 65, 75)
VERDE = (40, 230, 130)


def dibujar_interfaz(screen, personaje, puntos, nivel, fuente):
    # Panel superior
    pygame.draw.rect(
        screen, NEGRO,
        (0, 0, SCREEN_WIDTH, 90)
    )

    fuente_interfaz = pygame.font.Font(None, 30)

    # VIDA
    energia = max(0, min(100, personaje.energia))
    x, y = 20, 48
    ancho, alto = 180, 22

    pygame.draw.rect(
        screen, (150, 35, 45),
        (x, y, ancho, alto)
    )

    if energia > 0:
        color_vida = VERDE if energia > 30 else ROJO
        pygame.draw.rect(
            screen, color_vida,
            (x, y, int(ancho * energia / 100), alto)
        )

    pygame.draw.rect(
        screen, BLANCO,
        (x, y, ancho, alto), 2
    )

    texto_vida = fuente_interfaz.render(
        f"VIDA: {energia}%", True, BLANCO
    )
    screen.blit(texto_vida, (20, 12))

    # PUNTOS
    texto_puntos = fuente_interfaz.render(
        f"PUNTOS: {puntos}", True, BLANCO
    )
    screen.blit(
        texto_puntos,
        texto_puntos.get_rect(
            center=(SCREEN_WIDTH // 2, 45)
        )
    )

    # NIVEL
    texto_nivel = fuente_interfaz.render(
        f"NIVEL: {nivel}", True, CELESTE
    )
    screen.blit(
        texto_nivel,
        texto_nivel.get_rect(
            midright=(SCREEN_WIDTH - 20, 45)
        )
    )




def pantalla_game_over(screen, fondo, reloj, puntos):
    fuente_grande = pygame.font.Font(None, 74)
    fuente_pequena = pygame.font.Font(None, 34)

    esperando = True

    while esperando:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                esperando = False
            elif event.type == pygame.KEYDOWN:
                if event.key in (pygame.K_ESCAPE, pygame.K_RETURN):
                    esperando = False

        screen.blit(fondo, (0, 0))
        dibujar_fondo_oscuro(screen)

        texto_centrado(
            screen, "GAME OVER",
            fuente_grande, ROJO, SCREEN_HEIGHT // 2 - 55
        )

        texto_centrado(
            screen, f"Puntuacion final: {puntos}",
            fuente_pequena, BLANCO, SCREEN_HEIGHT // 2
        )

        texto_centrado(
            screen, "Presiona ENTER o ESC para salir",
            fuente_pequena, BLANCO, SCREEN_HEIGHT // 2 + 45
        )

        pygame.display.flip()
        reloj.tick(60)



def main():
    pygame.init()

    try:
        pygame.mixer.init()
    except pygame.error as error:
        print("El audio no está disponible:", error)

    screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
    pygame.display.set_caption("Amenaza Fantasma")
    reloj = pygame.time.Clock()


    try:
        fondo2 = cargar_imagen(
            "fondo2.jfif", (SCREEN_WIDTH, SCREEN_HEIGHT)
        )
        fondo3 = cargar_imagen(
            "fondo3.jpg", (SCREEN_WIDTH, SCREEN_HEIGHT)
        )

        try:
            pygame.display.set_icon(cargar_imagen("001.jfif"))
        except (pygame.error, FileNotFoundError) as error:
            print("No se pudo cargar el icono:", error)

    except (pygame.error, FileNotFoundError) as error:
        print("Error al cargar los fondos:", error)
        pygame.quit()
        return

    sonido_laser = cargar_sonido("laserdis.mp3")
    sonido_explosion = cargar_sonido("explosion.mp3")

    if sonido_laser:
        sonido_laser.set_volume(0.20)

    if sonido_explosion:
        sonido_explosion.set_volume(0.30)

    
    ruta_musica = os.path.join(ASSETS_PATH, "sounds", "efectos.mp3")

    try:
        pygame.mixer.music.load(ruta_musica)
        pygame.mixer.music.set_volume(0.20)
        pygame.mixer.music.play(-1)
    except (pygame.error, FileNotFoundError) as error:
        print("No se pudo cargar la música:", error)

   
    if not menu_principal(screen, fondo3, reloj):
        pygame.quit()
        return

    dificultad = seleccionar_nivel(screen, fondo3, reloj)

    if dificultad is None:
        pygame.quit()
        return

    dificultades = {
        "facil": (0.012, 0.002, 0.045),
        "medio": (0.020, 0.003, 0.080),
        "dificil": (0.035, 0.005, 0.120)
    }

    probabilidad_inicial, incremento, probabilidad_maxima = dificultades[dificultad]

    personaje = Personaje(
        SCREEN_WIDTH // 2,
        SCREEN_HEIGHT - 100
    )

    enemigos = []
    explosiones = []

    puntos = 0
    nivel = 1
    siguiente_nivel = 250
    siguiente_cambio_fondo = 250

    fondo_actual = fondo2
    fuente = pygame.font.Font(None, 27)

    running = True
    personaje_muerto = False

    ultimo_disparo = 0
    intervalo_disparo = 250

    while running:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
            elif event.type == pygame.KEYDOWN:
                if event.key == pygame.K_ESCAPE:
                    running = False

        if not running:
            break

        
        keys = pygame.key.get_pressed()
        dx = 0
        dy = 0

        if keys[pygame.K_LEFT]:
            dx -= 5
        if keys[pygame.K_RIGHT]:
            dx += 5
        if keys[pygame.K_UP]:
            dy -= 5
        if keys[pygame.K_DOWN]:
            dy += 5

        personaje.mover(dx, dy)

        personaje.shape.clamp_ip(
            pygame.Rect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT)
        )

     
        tiempo_actual = pygame.time.get_ticks()

        if (
            keys[pygame.K_SPACE]
            and tiempo_actual - ultimo_disparo >= intervalo_disparo
        ):
            personaje.lanzar_laser()
            ultimo_disparo = tiempo_actual

            if sonido_laser:
                sonido_laser.play()

        
        for enemigo in enemigos[:]:
            enemigo.mover()

            if enemigo.rect.top > SCREEN_HEIGHT:
                enemigos.remove(enemigo)
                continue

            if enemigo.rect.colliderect(personaje.shape):
                personaje.energia = 0
                personaje_muerto = True
                running = False
                break

            for laser in personaje.lasers[:]:
                if enemigo.rect.colliderect(laser.rect):
                    explosiones.append(
                        Explosion(
                            enemigo.rect.centerx,
                            enemigo.rect.centery
                        )
                    )

                    if enemigo in enemigos:
                        enemigos.remove(enemigo)

                    if laser in personaje.lasers:
                        personaje.lasers.remove(laser)

                    puntos += 10

                    if sonido_explosion:
                        sonido_explosion.play()

                    break

        if not running:
            break

        # APARICION DE ENEMIGOS
        probabilidad = min(
            probabilidad_inicial + (nivel - 1) * incremento,
            probabilidad_maxima
        )

        if random.random() < probabilidad:
            x = random.randint(0, SCREEN_WIDTH - 80)
            enemigos.append(Enemigo(x, 0))

        # ELIMINAR LASERES QUE SALEN DE PANTALLA
        personaje.lasers = [
            laser for laser in personaje.lasers
            if laser.rect.bottom > 0
        ]

        # EXPLOSIONES
        explosiones = [
            explosion for explosion in explosiones
            if explosion.actualizar()
        ]

        # SUBIR DE NIVEL
        while puntos >= siguiente_nivel:
            nivel += 1
            siguiente_nivel += 250

        # CAMBIAR FONDO
        while puntos >= siguiente_cambio_fondo:
            fondo_actual = fondo3 if fondo_actual == fondo2 else fondo2
            siguiente_cambio_fondo += 250

        
        screen.blit(fondo_actual, (0, 0))

        personaje.dibujar(screen)

        for enemigo in enemigos:
            enemigo.dibujar(screen)

        for explosion in explosiones:
            explosion.dibujar(screen)

        
        dibujar_interfaz(
            screen, personaje, puntos, nivel, fuente
        )

        pygame.display.flip()
        reloj.tick(60)

    if personaje_muerto:
        pantalla_game_over(
            screen, fondo_actual, reloj, puntos
        )

    pygame.quit()


if __name__ == "__main__":
    main()
