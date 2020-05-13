import {Model, DataTypes, Op} from 'sequelize'
import { database } from './index'
import { Organization } from './organization';
import { Report } from './report';

class TypeService extends Model {
  public id!: number;
  public name!: string;
  public report_id!: number;
}

TypeService.init({
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
  report_id: {
    allowNull: true,
    type: DataTypes.INTEGER,
  },
}, {
  tableName: 'typesServices',
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
  modelName: 'TypeService'
});

TypeService.belongsTo(Report, {
  foreignKey: 'report_id',
  as: 'report'
})

export { TypeService }