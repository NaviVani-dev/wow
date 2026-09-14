import estadisticasService from '../services/estadisticas.service.js';

const consultar = async (req, res) => {
  try {
    const estadisticas = await estadisticasService.obtener();
    res.json({ ok: true, estadisticas });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};

export default { consultar };
