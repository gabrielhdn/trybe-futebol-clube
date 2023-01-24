import { Request, Response, NextFunction } from 'express';
import loginSchema from '../schemas/login.schema';
import statusCodes from '../utils/statusCodes';

const loginMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { error } = loginSchema.validate(req.body);

  if (error) return res.status(statusCodes.badRequest).json({ message: error.message });

  next();
};

export default loginMiddleware;
