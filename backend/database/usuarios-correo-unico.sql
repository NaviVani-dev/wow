-- Ejecútalo después de corregir cualquier correo duplicado existente.
ALTER TABLE usuarios
  MODIFY correo VARCHAR(255) NOT NULL,
  ADD CONSTRAINT uq_usuarios_correo UNIQUE (correo);
