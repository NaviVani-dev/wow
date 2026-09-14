import { Router } from 'express';
import jugadoresController from '../controllers/jugadores.controller.js';
import validarCampos from '../middlewares/validaciones.js';
import autenticarAnfitrion from '../middlewares/autenticacion.js';

const router = Router();

router.get('/', autenticarAnfitrion, jugadoresController.consultar);
router.get('/buscar', autenticarAnfitrion, jugadoresController.buscar);
router.post('/', validarCampos(['nombre', 'gamertag', 'correo']), jugadoresController.registrar);

export default router;
