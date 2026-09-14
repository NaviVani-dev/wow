import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import jugadoresRoutes from './routes/jugadores.routes.js';
import videojuegosRoutes from './routes/videojuegos.routes.js';
import puntuacionesRoutes from './routes/puntuaciones.routes.js';
import estadisticasRoutes from './routes/estadisticas.routes.js';
import authRoutes from './routes/auth.routes.js';

const app = express();

app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());

app.use('/jugadores', jugadoresRoutes);
app.use('/videojuegos', videojuegosRoutes);
app.use('/puntuaciones', puntuacionesRoutes);
app.use('/estadisticas', estadisticasRoutes);
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
