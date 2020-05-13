import {Model, DataTypes, Op} from 'sequelize'
import { database } from './index'
import { Service } from './Service';

class Location extends Model {
  public id!: string;
  public latitude!: number;
  public longitude!: number;
  public service_id!: string;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;
  public readonly deleted_at!: Date;
}

Location.init({
  id: {
    allowNull: false,
    autoIncrement: false,
    primaryKey: true,
    type: DataTypes.UUID,
  },
  latitude: {
    allowNull: false, 
    type: DataTypes.DOUBLE,
  },
  longitude: {
    allowNull: false, 
    type: DataTypes.DOUBLE,
  },
  service_id: {
    allowNull: false,
    type: DataTypes.UUID,
  },
}, {
  tableName: 'locations',
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
  modelName: 'Location'
});

Location.belongsTo(Service, {
  foreignKey: 'service_id',
  as: 'service'
})

export { Location }