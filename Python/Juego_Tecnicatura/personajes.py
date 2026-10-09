import pygame
import os # Proporciona las funcionalidades para interactuar con el sistema 
from constantes import ASSETS_PATH

class Personaje:
    def __init__(self, x, y):
        # Construye la ruta a la imagen del personaje
        self.image = pygame.image.load(os.path.join(ASSETS_PATH, "images", "personaje1.png"))
        self.image = pygame.transform.scale(self.image,(95, 95))
        self.shape = self.image.get_rect(center=(x, y))
        self.lasers = []
        self.energia = 100 # Barra de energía

    def mover(self, dx, dy): 
        self.shape.x += dx
        self.shape.y += dy

    def lanzar_laser(self):
        laser = Laser(self.shape.centerx, self.shape.top)
        self.lasers.append(laser)

    def recibir_dano(self):
        self.energia -= 10
        if self.energia <= 0:
            self.energia <= 0
            return False
        return True
    def dibujar(self, screen):
        screen.blit(self.image, self.shape.topleft)
        for laser in self.lasers:
            laser.dibujar(screen)
            laser.mover()
    # Dibujar la barra de energía
        pygame.draw.rect(screen,(255, 0, 0), (10, 10, 100, 10)) #Barra de fondo
        pygame.draw.rect(screen,(0, 255, 0), (10, 10, self.energia, 10))

class Enemigo:
    def __init__(self, x, y):
        self.image = pygame.image.load(os.path.join(ASSETS_PATH, 'images', 'enemigo1.png'))
        self.image = pygame.transform.scale(self.image,(80, 80))
        self.rect = self.image.get_rect(Topleft=(x, y))
    def mover(self): #Correcciones que no sé si están bien
        self.rect.y += 1
    def dibujar(self, screen):
        screen.blit(self.image, self.rect.topleft)

class Laser:
    def __init__(self, x, y):
        self.image = pygame.image.load(os.path.join(ASSETS_PATH, 'images', "Laser.png"))
        self.rect = self.image.get_rect(center=(x, y))
    def mover(self):
        self.rect.y -= 5
    def dibujar(self, screen) :
        screen.blit(self.image, self.rect.topleft)

class Explosion:
     
    def __init__(self, x, y):
        self.image = [pygame.image.load(os.path.join(ASSETS_PATH, 'images', f'regularExplosion{i:2}.png')) for i in range(9)]
        self.index = 0 # Indice de la animacion
        self.image = self.images[self.index]
        self.rect = self.image.get_rect(center=(x, y))
        self.frame_rate = 0 # Contador de los frames de la animacion
        self.max_frames = 20 # Frames por imagenes
    def actualizar(self):
        # Actualizar la animacion
        self.frame_rate += 1
        if self.frame_rate >= self.max_frames:
            self.frame_rate = 0
            self.index += 1
            if self.index >= len(self.images):
                return False # Retorna en falso porque aqui termina la animacion que va a ir de 0 a 9
            self.image = self.images[self.index]
            return True
    def dibujar(self, screen):
        # Dibujar la imagen en la pantalla
        screen.blit(self.image, self.rect.topleft)





