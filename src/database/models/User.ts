import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class User extends Model {
  declare id: number;
  declare username: string;
  declare role: string;
  declare email: string;
  declare password: string;
}

User.init({
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: INTEGER,
  },
  username: STRING,
  role: STRING,
  email: STRING,
  password: STRING,
}, {
  sequelize: db,
  tableName: 'users',
  timestamps: false,
});

export default User;
