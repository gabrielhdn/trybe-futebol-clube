import { verify, sign, SignOptions } from 'jsonwebtoken';
import { IUserToken, IDecoded } from '../interfaces/user.interface';

const SECRET = process.env.JWT_SECRET as string;

export const createToken = (payload: IUserToken) => {
  const jwtConfig: SignOptions = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const token = sign(payload, SECRET, jwtConfig);
  return token;
};

export const validateToken = (token: string): IDecoded => verify(token, SECRET) as IDecoded;
