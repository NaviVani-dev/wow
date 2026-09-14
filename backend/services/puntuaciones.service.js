import puntuacionModel from '../models/puntuacion.model.js';

const crear = async (datos) => {
  const { jugador, videojuego, puntuacion } = datos;
  const puntuacionNumerica = Number(puntuacion);

  if (!Number.isInteger(puntuacionNumerica) || puntuacionNumerica < 0) {
    const error = new Error('La puntuación debe ser un número entero no negativo');
    error.status = 400;
    throw error;
  }

  try {
    return await puntuacionModel.insertar({ jugador, videojuego, puntuacion: puntuacionNumerica });
  } catch (error) {
    // Capturamos el error de llave foranea de MySQL si el jugador o videojuego no existen
    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
      const customError = new Error('El jugador o el videojuego no existen');
      customError.status = 400;
      throw customError;
    }
    throw error;
  }
};

const listarRanking = async () => {
  return await puntuacionModel.obtenerRanking();
};

export default { crear, listarRanking };
