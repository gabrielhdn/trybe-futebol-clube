import { Request, Response } from 'express';
import statusCodes from '../utils/statusCodes';
import { IMatchService } from '../interfaces/match.interface';

class MatchController {
  private service: IMatchService;

  constructor(service: IMatchService) {
    this.service = service;
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const newMatch = await this.service.create(req.body);
    return res.status(statusCodes.created).json(newMatch);
  }

  public async getAll(req: Request, res: Response): Promise<Response> {
    const { inProgress } = req.query;
    let matches;

    if (inProgress) {
      const bool = inProgress === 'true';
      matches = await this.service.getAll(bool);
    } else {
      matches = await this.service.getAll();
    }

    return res.status(statusCodes.ok).json(matches);
  }

  public async endGame(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    await this.service.endGame(+id);

    return res.status(statusCodes.ok).json({ message: 'Finished' });
  }

  public async updateGame(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    await this.service.updateGame({ id, ...req.body });

    return res.status(statusCodes.ok).json({ message: 'Updated' });
  }
}

export default MatchController;
