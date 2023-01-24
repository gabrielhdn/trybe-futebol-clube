import { compare } from 'bcryptjs';
import statusCodes from '../utils/statusCodes';
import User from '../database/models/User';
import { IUser } from '../interfaces/user.interface';
import { IError } from '../interfaces/error.interface';
import { createToken } from '../utils/JWT';

class LoginService {
  private model = User;

  public async login({ email, password }: IUser): Promise<string> {
    const foundUser = await this.model.findOne({ where: { email } });

    if (!foundUser) {
      const err = { status: statusCodes.unauthorized, message: 'Incorrect email or password' };
      throw err as IError;
    }

    const isPasswordValid = await compare(password, foundUser.password);

    if (!isPasswordValid) {
      const err = { status: statusCodes.unauthorized, message: 'Incorrect email or password' };
      throw err as IError;
    }

    const { id, role } = foundUser;
    const token = createToken({ id, role });
    return token;
  }
}

export default LoginService;
