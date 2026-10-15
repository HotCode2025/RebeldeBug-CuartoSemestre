
import pygame
import os

from constantes import ASSETS_PATH


class Personaje:
    def __init__(self, x, y):
        ruta = os.path.join(
            ASSETS_PATH, "images", "Speeder.png"
        )
        self.image = pygame.image.load(ruta).convert_alpha()
        self.image = pygame.transform.scale(
            self.image, (95, 95)
        )
        self.shape = self.image.get_rect(center=(x, y))
        self.lasers = []
        self.energia = 100

    def mover(self, dx, dy):
        self.shape.x += dx
        self.shape.y += dy

    def lanzar_laser(self):
        laser = Laser(self.shape.centerx, self.shape.top)
        self.lasers.append(laser)

    def recibir_dano(self):
        self.energia = max(0, self.energia - 10)
        return self.energia > 0

    def dibujar(self, screen):
        screen.blit(self.image, self.shape.topleft)

        for laser in self.lasers:
            laser.dibujar(screen)
            laser.mover()


class Enemigo:
    def __init__(self, x, y):
        ruta = os.path.join(
            ASSETS_PATH, "images", "enemigo1.png"
        )
        self.image = pygame.image.load(ruta).convert_alpha()
        self.image = pygame.transform.scale(
            self.image, (80, 80)
        )
        self.rect = self.image.get_rect(topleft=(x, y))

    def mover(self):
        self.rect.y += 5

    def dibujar(self, screen):
        screen.blit(self.image, self.rect.topleft)


class Laser:
    def __init__(self, x, y):
        ruta = os.path.join(
            ASSETS_PATH, "images", "lase1.png"
        )
        self.image = pygame.image.load(ruta).convert_alpha()
        self.image = pygame.transform.scale(
            self.image, (12, 28)
        )
        self.rect = self.image.get_rect(center=(x, y))

    def mover(self):
        self.rect.y -= 10

    def dibujar(self, screen):
        screen.blit(self.image, self.rect.topleft)


class Explosion:
    def __init__(self, x, y):
        self.images = [
            pygame.transform.scale(
                pygame.image.load(
                    os.path.join(
                        ASSETS_PATH,
                        "images",
                        f"regularExplosion{i:03d}.png"
                    )
                ).convert_alpha(),
                (60, 60)
            )
            for i in range(9)
        ]

        self.index = 0
        self.image = self.images[self.index]
        self.rect = self.image.get_rect(center=(x, y))
        self.frame_rate = 0
        self.max_frames = 5

    def actualizar(self):
        self.frame_rate += 1

        if self.frame_rate >= self.max_frames:
            self.frame_rate = 0
            self.index += 1

            if self.index >= len(self.images):
                return False

            self.image = self.images[self.index]

        return True

    def dibujar(self, screen):
        screen.blit(self.image, self.rect.topleft)

