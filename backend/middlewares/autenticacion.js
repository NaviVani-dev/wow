import { verificarToken } from '../utils/token.js';

const obtenerCookie = (header, nombre) => {
  const cookie = header?.split(';').map((value) => value.trim()).find((value) => value.startsWith(`${nombre}=`));
  return cookie?.slice(nombre.length + 1);
};

const autenticarAnfitrion = (req, res, next) => {
  try {
    const anfitrion = verificarToken(obtenerCookie(req.headers.cookie, 'anfitrion_token'));
    if (!anfitrion) return res.status(401).json({ ok: false, error: 'Sesión no válida o expirada' });
    req.anfitrion = anfitrion;
    next();
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};

export default autenticarAnfitrion;
