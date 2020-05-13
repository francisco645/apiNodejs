import {Model, DataTypes, Op} from 'sequelize'
import { database } from './index'
import { FieldAnswer } from './fieldAnswer';

class ItemAnswer extends Model {
  public id!: string;
  public item!: string;
  public fieldAnswer_id!: string;
}

ItemAnswer.init({
  id: {
    allowNull: false,
    autoIncrement: false,
    primaryKey: true,
    type: DataTypes.UUID,
  },
  item: {
    allowNull: false, 
    type: DataTypes.STRING,
  },
  fieldAnswer_id: {
    allowNull: false,
    type: DataTypes.UUID,
  },
}, {
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
  tableName: 'itemsAnswers',
  timestamps: false,
  modelName: 'ItemAnswer'
});

ItemAnswer.belongsTo(FieldAnswer, {
  foreignKey: 'fieldAnswer_id',
  as: 'fieldAnswer'
})

export { ItemAnswer }