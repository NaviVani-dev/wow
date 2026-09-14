import jugadorModel from '../models/jugador.model.js';

const crear = async (datos) => {
  const { nombre, gamertag } = datos;
  const correo = datos.correo.trim().toLowerCase();

  const [gamertagExistente, correoExistente] = await Promise.all([
    jugadorModel.buscarPorGamertag(gamertag),
    jugadorModel.buscarPorCorreo(correo),
  ]);
  if (gamertagExistente) {
    const error = new Error('El gamertag ya está en uso');
    error.status = 400;
    throw error;
  }
  if (correoExistente) {
    const error = new Error('El correo ya está registrado');
    error.status = 400;
    throw error;
  }

  try {
    return await jugadorModel.insertar({ nombre, gamertag, correo });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      const customError = new Error('El gamertag o correo ya está registrado');
      customError.status = 400;
      throw customError;
    }
    throw error;
  }
};

const listar = async () => {
  return await jugadorModel.obtenerTodos();
};

const buscar = async (termino) => {
  return await jugadorModel.buscarPorNombreOGamertag(termino);
};

export default { crear, listar, buscar };
