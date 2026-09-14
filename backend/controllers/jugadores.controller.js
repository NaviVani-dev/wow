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

const consultar = async (req, res) => {
  try {
    const jugadores = await jugadoresService.listar();
    res.json({ ok: true, jugadores });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};

export default { registrar, consultar };
