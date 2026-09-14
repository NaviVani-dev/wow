import { Router } from 'express';
import puntuacionesController from '../controllers/puntuaciones.controller.js';
import validarCampos from '../middlewares/validaciones.js';
import autenticarAnfitrion from '../middlewares/autenticacion.js';

const router = Router();

router.get('/', autenticarAnfitrion, puntuacionesController.consultarRanking);
router.post('/', autenticarAnfitrion, validarCampos(['jugador', 'videojuego', 'puntuacion']), puntuacionesController.registrar);

export default router;
