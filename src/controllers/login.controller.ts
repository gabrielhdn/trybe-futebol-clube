import { Request, Response } from 'express';
import statusCodes from '../utils/statusCodes';
import { ILoginService, IRequest } from '../interfaces/user.interface';

class LoginController {
  private service: ILoginService;
  private userRole: string;

  constructor(service: ILoginService) {
    this.service = service;
  }

  public async login(req: Request, res: Response): Promise<Response> {
    const token = await this.service.login(req.body);
    return res.status(statusCodes.ok).json({ token });
  }

  public async auth(req: IRequest, res: Response): Promise<Response> {
    this.userRole = req.userRole as string;
    return res.status(statusCodes.ok).json({ role: this.userRole });
  }
}

export default LoginController;
