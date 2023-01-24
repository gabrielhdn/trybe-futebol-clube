export interface IMatch {
  id: number,
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamGoals: number,
  inProgress: boolean,
}

export interface IMatchToCreate {
  homeTeam: number,
  awayTeam: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
}

export interface IScoreboard {
  id: string,
  homeTeamGoals: number,
  awayTeamGoals: number,
}

export interface IMatchService {
  create(match: IMatchToCreate): Promise<IMatch>,
  getAll(inProgress?: boolean): Promise<IMatch[]>,
  endGame(id: number): Promise<void>,
  updateGame(scoreboard: IScoreboard): Promise<void>,
}
