import { IMatch, IMatchToCreate, IScoreboard } from '../interfaces/match.interface';
import Match from '../database/models/Match';
import Team from '../database/models/Team';
import statusCodes from '../utils/statusCodes';
import { IError } from '../interfaces/error.interface';
import TeamService from './team.service';

class MatchService {
  private model = Match;
  private teamService = new TeamService();

  private validateTeams = (homeTeam: number, awayTeam: number): void => {
    if (homeTeam === awayTeam) {
      const err = {
        status: statusCodes.unprocessableEntity,
        message: 'It is not possible to create a match with two equal teams',
      };

      throw err as IError;
    }
  };

  private async validateIds(teams: number[]): Promise<void> {
    const teamsById = await Promise.all(teams.map((teamId) => this.teamService.getOne(teamId)));

    if (teamsById.some((team) => !team)) {
      const err = {
        status: statusCodes.notFound,
        message: 'There is no team with such id!',
      };

      throw err as IError;
    }
  }

  public async create(match: IMatchToCreate): Promise<IMatch> {
    const { homeTeam, awayTeam } = match;

    this.validateTeams(homeTeam, awayTeam);
    await this.validateIds([homeTeam, awayTeam]);

    const newMatch = await this.model.create({ ...match, inProgress: true });
    return newMatch;
  }

  public async getAll(inProgress?: boolean): Promise<IMatch[] | []> {
    const matches = await this.model.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });

    if (inProgress !== undefined) {
      return matches.filter((match) => match.inProgress === inProgress);
    }

    return matches;
  }

  public async endGame(id: number): Promise<void> {
    await this.model.update(
      { inProgress: false },
      { where: { id } },
    );
  }

  public async updateGame({ id, homeTeamGoals, awayTeamGoals }: IScoreboard): Promise<void> {
    await this.model.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id } },
    );
  }
}

export default MatchService;
