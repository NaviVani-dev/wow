import anfitrionesService from '../services/anfitriones.service.js';

const cookieOptions = (maxAge) => [
  'HttpOnly',
  'SameSite=Lax',
  'Path=/',
  `Max-Age=${maxAge}`,
  process.env.NODE_ENV === 'production' ? 'Secure' : '',
].filter(Boolean).join('; ');

const login = async (req, res) => {
  try {
    const { anfitrion, token } = await anfitrionesService.iniciarSesion(req.body);
    const maxAge = (Number(process.env.AUTH_TOKEN_HOURS) || 8) * 60 * 60;
    res.setHeader('Set-Cookie', `anfitrion_token=${token}; ${cookieOptions(maxAge)}`);
    res.json({ ok: true, anfitrion });
  } catch (error) {
    res.status(error.status || 500).json({ ok: false, error: error.message });
  }
};

const sesion = (req, res) => res.json({ ok: true, anfitrion: req.anfitrion });

const logout = (_req, res) => {
  res.setHeader('Set-Cookie', `anfitrion_token=; ${cookieOptions(0)}`);
  res.json({ ok: true });
};

export default { login, sesion, logout };
