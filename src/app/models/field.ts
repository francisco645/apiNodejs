import {Model, DataTypes, Op} from 'sequelize'
import { database } from './index'
import { Type } from './type'
import { Report } from './report';

class Field extends Model {
  public id!: number;
  public title!: string;
  public optional!: boolean;
  public type_id!: number;
  public report_id!: number;
}

Field.init({
  id: {
    allowNull: false,
    autoIncrement: false,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  title: {
    allowNull: false, 
    type: DataTypes.STRING(100),
  },
  optional: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
  },
  type_id: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  report_id: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
}, {
  tableName: 'fields',
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
  modelName: 'Field'
});

Field.belongsTo(Type, {
  foreignKey: 'type_id',
  as: 'type'
})

Field.belongsTo(Report, {
  foreignKey: 'report_id',
  as: 'report'
})

export { Field }