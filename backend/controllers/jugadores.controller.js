import jugadoresService from '../services/jugadores.service.js';

const registrar = async (req, res) => {
  try {
    const resultado = await jugadoresService.crear(req.body);
    res.status(201).json({ ok: true, id: resultado.insertId });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ ok: false, error: error.message });
  }
};

export default { registrar };
