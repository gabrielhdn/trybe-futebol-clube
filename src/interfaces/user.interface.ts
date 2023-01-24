import { Request } from 'express';

export interface IUser {
  email: string,
  password: string,
}

export interface ILoginService {
  login(user: IUser): Promise<string>,
}

export interface IUserToken {
  id: number,
  role: string,
}

export interface IDecoded {
  id: number,
  role: string,
  iat: number,
  exp: number,
}

export interface IRequest extends Request {
  userId?: number,
  userRole?: string,
}
