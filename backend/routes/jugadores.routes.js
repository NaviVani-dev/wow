import { Router } from 'express';
import jugadoresController from '../controllers/jugadores.controller.js';
import validarCampos from '../middlewares/validaciones.js';

const router = Router();

router.post('/', validarCampos(['nombre', 'gamertag', 'correo']), jugadoresController.registrar);

export default router;
