import videojuegoModel from '../models/videojuego.model.js';

const crear = async (datos) => {
  const { nombre, genero } = datos;

  const existe = await videojuegoModel.buscarPorNombre(nombre);
  if (existe) {
    const error = new Error('Ya existe un videojuego con ese nombre');
    error.status = 400;
    throw error;
  }

  try {
    return await videojuegoModel.insertar({ nombre, genero });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      const customError = new Error('Ya existe un videojuego con ese nombre');
      customError.status = 400;
      throw customError;
    }
    throw error;
  }
};

const listar = async () => {
  return await videojuegoModel.obtenerTodos();
};

export default { crear, listar };
