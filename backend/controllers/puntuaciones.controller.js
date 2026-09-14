import puntuacionesService from '../services/puntuaciones.service.js';

const registrar = async (req, res) => {
  try {
    const resultado = await puntuacionesService.crear(req.body);
    res.status(201).json({ ok: true, id: resultado.insertId });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ ok: false, error: error.message });
  }
};

const consultarRanking = async (req, res) => {
  try {
    const ranking = await puntuacionesService.listarRanking();
    res.json({ ok: true, ranking });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};

export default { registrar, consultarRanking };
