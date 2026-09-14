import pool from '../config/db.js';

const insertar = async (jugador) => {
  const { nombre, gamertag, correo } = jugador;
  const [result] = await pool.query(
    'INSERT INTO usuarios (nombre, gamertag, correo) VALUES (?, ?, ?)',
    [nombre, gamertag, correo]
  );
  return result;
};

const buscarPorGamertag = async (gamertag) => {
  const [rows] = await pool.query(
    'SELECT id FROM usuarios WHERE gamertag = ?',
    [gamertag]
  );
  return rows[0];
};

const buscarPorCorreo = async (correo) => {
  const [rows] = await pool.query(
    'SELECT id FROM usuarios WHERE correo = ? LIMIT 1',
    [correo]
  );
  return rows[0];
};

const obtenerTodos = async () => {
  const [rows] = await pool.query(
    'SELECT id, nombre, gamertag, correo, fecha_registro FROM usuarios'
  );
  return rows;
};

const buscarPorNombreOGamertag = async (termino) => {
  const [rows] = await pool.query(
    'SELECT id, nombre, gamertag, correo, fecha_registro FROM usuarios WHERE nombre LIKE ? OR gamertag LIKE ?',
    [`%${termino}%`, `%${termino}%`]
  );
  return rows;
};

export default { insertar, buscarPorGamertag, buscarPorCorreo, obtenerTodos, buscarPorNombreOGamertag };
