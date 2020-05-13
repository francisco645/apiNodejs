import {Model, DataTypes, Op} from 'sequelize'
import { database } from './index'

class InvalidToken extends Model {
  public id!: string;
  public token!: string;
  public data!: Date;
}

InvalidToken.init({
  id: {
    allowNull: false,
    autoIncrement: false,
    primaryKey: true,
    type: DataTypes.UUID,
  },
  token: {
    allowNull: false, 
    type: DataTypes.STRING,
  },
  data: {
    allowNull: false,
    type: DataTypes.DATE,
  },
}, {
  tableName: 'invalidTokens',
  scopes: {
    accessLevel (value: any) {
      return {
        where: {
          accessLevel: {
            [Op.gte]: value
          }
        }
      }
    }
  },
  sequelize: database,
  timestamps: false,
  modelName: 'InvalidToken'
});

export { InvalidToken }