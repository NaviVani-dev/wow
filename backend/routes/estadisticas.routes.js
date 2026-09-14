import { Router } from 'express';
import estadisticasController from '../controllers/estadisticas.controller.js';
import autenticarAnfitrion from '../middlewares/autenticacion.js';

const router = Router();

router.get('/', autenticarAnfitrion, estadisticasController.consultar);

export default router;
