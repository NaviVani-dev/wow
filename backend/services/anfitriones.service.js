import bcrypt from 'bcryptjs';
import anfitrionModel from '../models/anfitrion.model.js';
import { crearToken } from '../utils/token.js';

const iniciarSesion = async ({ correo, password }) => {
  const anfitrion = await anfitrionModel.buscarPorCorreo(correo.trim().toLowerCase());
  const credencialesInvalidas = new Error('Correo o contraseña incorrectos');
  credencialesInvalidas.status = 401;

  if (!anfitrion || !anfitrion.activo || !(await bcrypt.compare(password, anfitrion.password_hash))) {
    throw credencialesInvalidas;
  }

  await anfitrionModel.actualizarUltimoAcceso(anfitrion.id);
  const sesion = { id: anfitrion.id, nombre: anfitrion.nombre, correo: anfitrion.correo };
  return { anfitrion: sesion, token: crearToken(sesion) };
};

export default { iniciarSesion };
