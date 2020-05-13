import {Model, DataTypes, Op} from 'sequelize'
import { database } from './index';
import { Report } from './report';

class Answer extends Model {
  public id!: string;
  public service_id!: string;
  public report_id!: number;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;
  public readonly deleted_at!: Date;
}

Answer.init({
  id: {
    allowNull: false,
    autoIncrement: false,
    primaryKey: true,
    type: DataTypes.UUID,
  },
  service_id: {
    allowNull: false,
    type: DataTypes.UUID,
  },
  report_id: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
}, {
  tableName: 'answers',
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
  updatedAt: 'updated_at',
  createdAt: 'created_at',
  deletedAt: 'deleted_at',
  paranoid: true,
  timestamps: true,
  modelName: 'Answer'
});


Answer.belongsTo(Report, {
  foreignKey: 'report_id',
  as: 'report'
})

export { Answer }