import {Model, DataTypes, Op} from 'sequelize'
import { database } from './index'
import { TypeService } from './typeService';
import { StateService } from './stateService';
import { User } from './user';

class Service extends Model {
  public id!: string;
  public client!: string;
  public assignment!: string;
  public priority!: string;
  public type_service_id!: number;
  public state!: string;
  public city!: string;
  public street!: string;
  public district!: string;
  public client_number!: number;
  public latitude!: number;
  public longitude!: number;
  public user_id!: string;
  public organization_id!: string;
  public state_service_id!: number;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;
  public readonly deleted_at!: Date;
}

Service.init({
  id: {
    allowNull: false,
    autoIncrement: false,
    primaryKey: true,
    type: DataTypes.UUID,
  },
  client: {
    allowNull: false,
    type: new DataTypes.STRING(32),
  },
  assignment: {
    allowNull: false,
    type: DataTypes.STRING(500),
  },
  priority: {
    allowNull: false,
    type: DataTypes.STRING(15),
  },
  state: {
    allowNull: false,
    type: DataTypes.STRING(30),
  },
  city: {
    allowNull: false,
    type: DataTypes.STRING(30),
  },
  district: {
    allowNull: false,
    type: DataTypes.STRING(30),
  },
  street: {
    allowNull: false,
    type: DataTypes.STRING(30),
  },
  client_number: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  latitude: {
    allowNull: false, 
    type: DataTypes.DOUBLE,
  },
  longitude: {
    allowNull: false, 
    type: DataTypes.DOUBLE,
  },
  type_service_id: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  user_id: {
    allowNull: true,
    type: DataTypes.UUID,
  },
  state_service_id: {
    allowNull: true,
    type: DataTypes.INTEGER,
  },
  organization_id: {
    allowNull: false,
    type: DataTypes.UUID,
  },
}, {
  tableName: 'services',
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
  modelName: 'Service'
});

Service.belongsTo(TypeService, {
  foreignKey: 'type_service_id',
  as: 'typeService'
})

Service.belongsTo(StateService, {
  foreignKey: 'state_service_id',
  as: 'stateService'
})

Service.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user'
})

export { Service }