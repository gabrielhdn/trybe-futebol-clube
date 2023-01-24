import { Response, NextFunction } from 'express';
import { IRequest } from '../interfaces/user.interface';
import { validateToken } from '../utils/JWT';
import statusCodes from '../utils/statusCodes';

export default (req: IRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(statusCodes.unauthorized).json({ message: 'Token must be a valid token' });
  }

  try {
    const { id, role } = validateToken(token);
    req.userId = id;
    req.userRole = role;
    next();
  } catch (e) {
    res.status(statusCodes.unauthorized).json({ message: 'Token must be a valid token' });
  }
};
