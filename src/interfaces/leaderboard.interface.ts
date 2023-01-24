export interface ILeaderboard {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: number,
}

export interface ILeaderboardService {
  getHomeLeaderboard(): Promise<ILeaderboard[]>,
  getAwayLeaderboard(): Promise<ILeaderboard[]>,
  getLeaderboard(): Promise<ILeaderboard[]>,
}
