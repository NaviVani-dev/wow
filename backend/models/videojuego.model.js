import pool from '../config/db.js';

const insertar = async (videojuego) => {
  const { nombre, genero } = videojuego;
  const [result] = await pool.query(
    'INSERT INTO videojuegos (nombre, genero) VALUES (?, ?)',
    [nombre, genero]
  );
  return result;
};

const buscarPorNombre = async (nombre) => {
  const [rows] = await pool.query(
    'SELECT id FROM videojuegos WHERE nombre = ?',
    [nombre]
  );
  return rows[0];
};

export default { insertar, buscarPorNombre };
