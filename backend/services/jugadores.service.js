import jugadorModel from '../models/jugador.model.js';

const crear = async (datos) => {
  const { nombre, gamertag, correo } = datos;

  const existe = await jugadorModel.buscarPorGamertag(gamertag);
  if (existe) {
    const error = new Error('El gamertag ya está en uso');
    error.status = 400;
    throw error;
  }

  return await jugadorModel.insertar({ nombre, gamertag, correo });
};

export default { crear };
