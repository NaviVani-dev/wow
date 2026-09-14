import crypto from 'crypto';

const getSecret = () => {
  if (!process.env.AUTH_SECRET || process.env.AUTH_SECRET.length < 32) {
    throw new Error('AUTH_SECRET debe tener al menos 32 caracteres');
  }
  return process.env.AUTH_SECRET;
};

const encode = (value) => Buffer.from(JSON.stringify(value)).toString('base64url');
const sign = (value) => crypto.createHmac('sha256', getSecret()).update(value).digest('base64url');

export const crearToken = (anfitrion) => {
  const expiresInHours = Number(process.env.AUTH_TOKEN_HOURS) || 8;
  const payload = encode({ sub: anfitrion.id, nombre: anfitrion.nombre, correo: anfitrion.correo, exp: Date.now() + expiresInHours * 60 * 60 * 1000 });
  return `${payload}.${sign(payload)}`;
};

export const verificarToken = (token) => {
  if (!token || !token.includes('.')) return null;
  const [payload, signature] = token.split('.');
  const expected = sign(payload);
  const actualBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);
  if (actualBuffer.length !== expectedBuffer.length || !crypto.timingSafeEqual(actualBuffer, expectedBuffer)) return null;

  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    return data.exp > Date.now() ? data : null;
  } catch {
    return null;
  }
};
