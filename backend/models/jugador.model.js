import pool from '../config/db.js';

const insertar = async (jugador) => {
  const { nombre, gamertag, correo } = jugador;
  const [result] = await pool.query(
    'INSERT INTO jugadores (nombre, gamertag, correo) VALUES (?, ?, ?)',
    [nombre, gamertag, correo]
  );
  return result;
};

const buscarPorGamertag = async (gamertag) => {
  const [rows] = await pool.query(
    'SELECT id FROM jugadores WHERE gamertag = ?',
    [gamertag]
  );
  return rows[0];
};

const obtenerTodos = async () => {
  const [rows] = await pool.query(
    'SELECT gamertag, correo, fecha_registro FROM jugadores'
  );
  return rows;
};

export default { insertar, buscarPorGamertag, obtenerTodos };
