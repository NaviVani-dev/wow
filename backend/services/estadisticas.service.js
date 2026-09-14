import estadisticasModel from '../models/estadisticas.model.js';

const obtener = async () => {
  return await estadisticasModel.obtenerTotales();
};

export default { obtener };
