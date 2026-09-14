import pool from '../config/db.js';

const buscarPorCorreo = async (correo) => {
  const [rows] = await pool.query(
    'SELECT id, nombre, correo, password_hash, activo FROM anfitriones WHERE correo = ? LIMIT 1',
    [correo]
  );
  return rows[0];
};

const actualizarUltimoAcceso = async (id) => {
  await pool.query('UPDATE anfitriones SET ultimo_acceso = CURRENT_TIMESTAMP WHERE id = ?', [id]);
};

export default { buscarPorCorreo, actualizarUltimoAcceso };
