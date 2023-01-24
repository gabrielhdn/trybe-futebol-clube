import { ITeam } from '../interfaces/team.interface';
import Team from '../database/models/Team';

class TeamService {
  private model = Team;

  public async getAll(): Promise<ITeam[]> {
    const teams = await this.model.findAll();
    return teams;
  }

  public async getOne(id: number): Promise<ITeam | null> {
    const team = await this.model.findOne({ where: { id } });
    return team;
  }
}

export default TeamService;
