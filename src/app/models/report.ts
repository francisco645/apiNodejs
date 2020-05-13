import {Model, DataTypes, Op} from 'sequelize'
import { database } from './index';
import { Organization } from './organization';

class Report extends Model {
  public id!: number;
}

Report.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
}, {
  tableName: 'reports',
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
  modelName: 'Report'
});


Report.belongsTo(Organization, {
  foreignKey: 'organization_id',
  as: 'organization'
})

export { Report }