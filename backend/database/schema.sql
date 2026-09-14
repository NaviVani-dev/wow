CREATE DATABASE IF NOT EXISTS torneo CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE torneo;

CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  gamertag VARCHAR(50) NOT NULL,
  correo VARCHAR(255) NOT NULL,
  fecha_registro DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT uq_usuarios_gamertag UNIQUE (gamertag),
  CONSTRAINT uq_usuarios_correo UNIQUE (correo)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS videojuegos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  genero VARCHAR(50) NOT NULL,
  CONSTRAINT uq_videojuegos_nombre UNIQUE (nombre)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS puntuaciones (
  id INT AUTO_INCREMENT PRIMARY KEY,
  jugador INT NOT NULL,
  videojuego INT NOT NULL,
  puntuacion INT NOT NULL,
  fecha DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT chk_puntuaciones_no_negativa CHECK (puntuacion >= 0),
  CONSTRAINT fk_puntuaciones_jugador FOREIGN KEY (jugador) REFERENCES usuarios (id),
  CONSTRAINT fk_puntuaciones_videojuego FOREIGN KEY (videojuego) REFERENCES videojuegos (id)
) ENGINE=InnoDB;

CREATE USER IF NOT EXISTS 'torneo'@'localhost' IDENTIFIED BY 'torneo123';
GRANT SELECT, INSERT, UPDATE, DELETE ON torneo.* TO 'torneo'@'localhost';
FLUSH PRIVILEGES;
