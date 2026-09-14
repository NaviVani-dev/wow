import pool from '../config/db.js';

const insertar = async (datos) => {
  const { jugador, videojuego, puntuacion } = datos;
  const [result] = await pool.query(
    'INSERT INTO puntuaciones (jugador, videojuego, puntuacion) VALUES (?, ?, ?)',
    [jugador, videojuego, puntuacion]
  );
  return result;
};

export default { insertar };
