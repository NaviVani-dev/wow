import videojuegoModel from '../models/videojuego.model.js';

const crear = async (datos) => {
  const { nombre, genero } = datos;

  const existe = await videojuegoModel.buscarPorNombre(nombre);
  if (existe) {
    const error = new Error('Ya existe un videojuego con ese nombre');
    error.status = 400;
    throw error;
  }

  return await videojuegoModel.insertar({ nombre, genero });
};

export default { crear };
