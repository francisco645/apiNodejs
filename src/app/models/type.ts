import {Model, DataTypes, Op} from 'sequelize'
import { database } from './index';

class Type extends Model {
  public id!: Number;
  public name!: string;
}

Type.init({
  id: {
    allowNull: false,
    autoIncrement: false,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: new DataTypes.STRING(32),
  },
}, {
  tableName: 'types',
  sequelize: database,
  timestamps: false,
  modelName: 'Type'
});

export { Type }