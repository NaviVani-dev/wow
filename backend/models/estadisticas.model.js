import pool from '../config/db.js';

const obtenerTotales = async () => {
  const [rows] = await pool.query(`
    SELECT 
      (SELECT COUNT(*) FROM jugadores) AS total_jugadores,
      (SELECT COUNT(*) FROM videojuegos) AS total_videojuegos,
      (SELECT COUNT(*) FROM puntuaciones) AS total_puntuaciones,
      (SELECT COALESCE(ROUND(AVG(puntuacion), 2), 0) FROM puntuaciones) AS puntuacion_promedio
  `);
  return rows[0];
};

export default { obtenerTotales };
