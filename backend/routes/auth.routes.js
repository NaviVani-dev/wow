import { Router } from 'express';
import authController from '../controllers/auth.controller.js';
import autenticarAnfitrion from '../middlewares/autenticacion.js';
import validarCampos from '../middlewares/validaciones.js';

const router = Router();

router.post('/login', validarCampos(['correo', 'password']), authController.login);
router.get('/sesion', autenticarAnfitrion, authController.sesion);
router.post('/logout', autenticarAnfitrion, authController.logout);

export default router;
