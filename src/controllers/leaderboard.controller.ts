import { Request, Response } from 'express';
import { ILeaderboardService } from '../interfaces/leaderboard.interface';
import statusCodes from '../utils/statusCodes';

class LeaderboardController {
  private service: ILeaderboardService;

  constructor(service: ILeaderboardService) {
    this.service = service;
  }

  public async getHomeLeaderboard(_req: Request, res: Response): Promise<Response> {
    const leaderboard = await this.service.getHomeLeaderboard();
    return res.status(statusCodes.ok).json(leaderboard);
  }

  public async getAwayLeaderboard(_req: Request, res: Response): Promise<Response> {
    const leaderboard = await this.service.getAwayLeaderboard();
    return res.status(statusCodes.ok).json(leaderboard);
  }

  public async getLeaderboard(_req: Request, res: Response): Promise<Response> {
    const leaderboard = await this.service.getLeaderboard();
    return res.status(statusCodes.ok).json(leaderboard);
  }
}

export default LeaderboardController;
