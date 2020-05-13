import {Model, DataTypes} from 'sequelize'
import { database } from './index'

class Role extends Model {
  public id!: Number;
  public name!: string;
}

Role.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: new DataTypes.STRING(32),
    allowNull: false,
  },
}, {
  tableName: 'roles',
  sequelize: database,
  timestamps: false,
  modelName: 'Role'
});

export { Role }