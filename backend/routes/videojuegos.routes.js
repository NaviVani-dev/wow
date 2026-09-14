import { Router } from 'express';
import videojuegosController from '../controllers/videojuegos.controller.js';
import validarCampos from '../middlewares/validaciones.js';
import autenticarAnfitrion from '../middlewares/autenticacion.js';

const router = Router();

router.get('/', autenticarAnfitrion, videojuegosController.consultar);
router.post('/', autenticarAnfitrion, validarCampos(['nombre', 'genero']), videojuegosController.registrar);

export default router;
