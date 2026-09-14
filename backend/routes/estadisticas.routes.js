import { Router } from 'express';
import estadisticasController from '../controllers/estadisticas.controller.js';

const router = Router();

router.get('/', estadisticasController.consultar);

export default router;
