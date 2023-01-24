import { Request, Response } from 'express';
import { ITeamService } from '../interfaces/team.interface';
import statusCodes from '../utils/statusCodes';

class TeamController {
  private service: ITeamService;

  constructor(service: ITeamService) {
    this.service = service;
  }

  public async getAll(_req: Request, res: Response): Promise<Response> {
    const teams = await this.service.getAll();
    return res.status(statusCodes.ok).json(teams);
  }

  public async getOne(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const team = await this.service.getOne(+id);

    return res.status(statusCodes.ok).json(team);
  }
}

export default TeamController;
