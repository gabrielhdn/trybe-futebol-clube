import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class Team extends Model {
  declare id: number;
  declare teamName: string;
}

Team.init({
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: INTEGER,
  },
  teamName: STRING,
}, {
  sequelize: db,
  tableName: 'teams',
  underscored: true,
  timestamps: false,
});

export default Team;
