import videojuegosService from '../services/videojuegos.service.js';

const registrar = async (req, res) => {
  try {
    const resultado = await videojuegosService.crear(req.body);
    res.status(201).json({ ok: true, id: resultado.insertId });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ ok: false, error: error.message });
  }
};

const consultar = async (req, res) => {
  try {
    const videojuegos = await videojuegosService.listar();
    res.json({ ok: true, videojuegos });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};

export default { registrar, consultar };
