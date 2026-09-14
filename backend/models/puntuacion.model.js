import pool from '../config/db.js';

const insertar = async (datos) => {
  const { jugador, videojuego, puntuacion } = datos;
  const [result] = await pool.query(
    'INSERT INTO puntuaciones (jugador, videojuego, puntuacion) VALUES (?, ?, ?)',
    [jugador, videojuego, puntuacion]
  );
  return result;
};

const obtenerRanking = async () => {
  const [rows] = await pool.query(`
    SELECT 
      ROW_NUMBER() OVER (ORDER BY p.puntuacion DESC) AS posicion,
      j.gamertag AS jugador,
      v.nombre AS videojuego,
      p.puntuacion
    FROM puntuaciones p
    JOIN usuarios j ON p.jugador = j.id
    JOIN videojuegos v ON p.videojuego = v.id
    ORDER BY p.puntuacion DESC
  `);
  return rows;
};

export default { insertar, obtenerRanking };
