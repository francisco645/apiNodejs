import {Model, DataTypes, Op} from 'sequelize'
import { database } from './index'
import { Type } from './type'
import { Answer } from './answer';

class FieldAnswer extends Model {
  public id!: string;
  public type_id!: number;
  public answer_id!: string;
}

FieldAnswer.init({
  id: {
    allowNull: false,
    autoIncrement: false,
    primaryKey: true,
    type: DataTypes.UUID,
  },
  type_id: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  answer_id: {
    allowNull: false,
    type: DataTypes.UUID,
  },
}, {
  tableName: 'fieldsAnswers',
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
  modelName: 'FieldAnswer'
});

FieldAnswer.belongsTo(Type, {
  foreignKey: 'type_id',
  as: 'type'
})

FieldAnswer.belongsTo(Answer, {
  foreignKey: 'answer_id',
  as: 'answer'
})

export { FieldAnswer }