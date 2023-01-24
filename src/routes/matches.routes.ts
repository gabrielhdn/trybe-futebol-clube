import { Router } from 'express';
import MatchController from '../controllers/match.controller';
import MatchService from '../services/match.service';
import authMiddleware from '../middlewares/auth.middleware';

const router = Router();
const matchService = new MatchService();
const matchController = new MatchController(matchService);

router.get(
  '/matches',
  (req, res) => matchController.getAll(req, res),
);

router.post(
  '/matches',
  authMiddleware,
  (req, res) => matchController.create(req, res),
);

router.patch(
  '/matches/:id/finish',
  (req, res) => matchController.endGame(req, res),
);

router.patch(
  '/matches/:id',
  (req, res) => matchController.updateGame(req, res),
);

export default router;
