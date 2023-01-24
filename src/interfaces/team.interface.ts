export interface ITeam {
  id: number,
  teamName: string,
}

export interface ITeamService {
  getAll(): Promise<ITeam[]>,
  getOne(id: number): Promise<ITeam | null>,
}
