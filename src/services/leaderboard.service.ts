import { ILeaderboard } from '../interfaces/leaderboard.interface';
import sequelize from '../database/models';
import dbQueries from '../utils/dbQueries';

class LeaderboardService {
  private model = sequelize;

  public async getHomeLeaderboard(): Promise<ILeaderboard[]> {
    const [leaderboard] = await this.model.query(dbQueries.htLeaderboards);
    return leaderboard as ILeaderboard[];
  }

  public async getAwayLeaderboard(): Promise<ILeaderboard[]> {
    const [leaderboard] = await this.model.query(dbQueries.atLeaderboards);
    return leaderboard as ILeaderboard[];
  }

  public async getLeaderboard(): Promise<ILeaderboard[]> {
    const [leaderboard] = await this.model.query(dbQueries.leaderboards);
    return leaderboard as ILeaderboard[];
  }
}

export default LeaderboardService;
