import {Model, DataTypes, Op} from 'sequelize'
import { database } from './index'
import { Role } from './role';
import { Organization } from './organization';

class User extends Model {
  public id!: string;
  public name!: string;
  public email!: string;
  public password!: string;
  public is_active!: boolean;
  public role_id!: number;
  public cpf!: string;
  public organization_id!: string;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;
  public readonly deleted_at!: Date;
}

User.init({
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: new DataTypes.STRING(32),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate:{
      isEmail: true
    }
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  cpf:{
    allowNull: false,
    type: DataTypes.STRING(11),
    unique: true,
  },
  is_active:{
    allowNull: false,
    type: DataTypes.BOOLEAN,
  },
  role_id:{
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  organization_id: {
    allowNull: false,
    type: DataTypes.UUID,
  },
}, {
  tableName: 'users',
  defaultScope: {
    attributes: {
      exclude: [
        'password'
      ]
    }
  },
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
  modelName: 'User'
});

User.belongsTo(Role, {
  foreignKey: 'role_id',
  as: 'role'
})

User.belongsTo(Organization, {
  foreignKey: 'organization_id',
  as: 'organization'
})

export { User }