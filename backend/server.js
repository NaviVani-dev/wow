import express from 'express';
import 'dotenv/config';
import jugadoresRoutes from './routes/jugadores.routes.js';
import videojuegosRoutes from './routes/videojuegos.routes.js';
import puntuacionesRoutes from './routes/puntuaciones.routes.js';
import estadisticasRoutes from './routes/estadisticas.routes.js';

const app = express();
// Permite que el frontend de Next.js consuma la API durante el desarrollo.
const frontendOrigins = (process.env.FRONTEND_ORIGIN || 'http://localhost:3000,http://192.168.1.74:3000')
  .split(',')
  .map((origin) => origin.trim());
app.use((req, res, next) => {
  const origin = req.get('Origin');
  if (!origin || frontendOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin || frontendOrigins[0]);
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  }

  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});
app.use(express.json());

app.use('/jugadores', jugadoresRoutes);
app.use('/videojuegos', videojuegosRoutes);
app.use('/puntuaciones', puntuacionesRoutes);
app.use('/estadisticas', estadisticasRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
