import express from 'express';
import 'dotenv/config';
import jugadoresRoutes from './routes/jugadores.routes.js';
import videojuegosRoutes from './routes/videojuegos.routes.js';

const app = express();
app.use(express.json());

app.use('/jugadores', jugadoresRoutes);
app.use('/videojuegos', videojuegosRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));