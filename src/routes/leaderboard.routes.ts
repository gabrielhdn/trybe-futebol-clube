import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboard.controller';
import LeaderboardService from '../services/leaderboard.service';

const router = Router();
const leaderboardService = new LeaderboardService();
const leaderboardController = new LeaderboardController(leaderboardService);

router.get(
  '/leaderboard/home',
  (req, res) => leaderboardController.getHomeLeaderboard(req, res),
);

router.get(
  '/leaderboard/away',
  (req, res) => leaderboardController.getAwayLeaderboard(req, res),
);

router.get(
  '/leaderboard',
  (req, res) => leaderboardController.getLeaderboard(req, res),
);

export default router;
