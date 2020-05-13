import {Model, DataTypes} from 'sequelize'
import { database } from './index'

class StateService extends Model {
  public id!: Number;
  public name!: string;
}

StateService.init({
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
  tableName: 'statesServices',
  sequelize: database,
  timestamps: false,
  modelName: 'StateService'
});

export { StateService }