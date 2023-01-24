import { Router } from 'express';
import LoginService from '../services/login.service';
import LoginController from '../controllers/login.controller';
import loginMiddleware from '../middlewares/login.middleware';
import authMiddleware from '../middlewares/auth.middleware';

const router = Router();
const loginService = new LoginService();
const loginController = new LoginController(loginService);

router.post(
  '/login',
  loginMiddleware,
  (req, res) => loginController.login(req, res),
);

router.get(
  '/login/validate',
  authMiddleware,
  (req, res) => loginController.auth(req, res),
);

export default router;
