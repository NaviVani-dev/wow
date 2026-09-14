import { Router } from 'express';
import puntuacionesController from '../controllers/puntuaciones.controller.js';
import validarCampos from '../middlewares/validaciones.js';

const router = Router();

router.post('/', validarCampos(['jugador', 'videojuego', 'puntuacion']), puntuacionesController.registrar);

export default router;
