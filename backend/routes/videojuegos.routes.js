import { Router } from 'express';
import videojuegosController from '../controllers/videojuegos.controller.js';
import validarCampos from '../middlewares/validaciones.js';

const router = Router();

router.get('/', videojuegosController.consultar);
router.post('/', validarCampos(['nombre', 'genero']), videojuegosController.registrar);

export default router;
