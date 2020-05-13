import {Model, DataTypes} from 'sequelize'
import { database } from './index'

class Organization extends Model {
  public id!: string;
  public name!: string;
  public cnpj!: string;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;
  public readonly deleted_at!: Date;
}

Organization.init({
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: new DataTypes.STRING(32),
    allowNull: false,
  },
  cnpj:{
    allowNull: false,
    type: DataTypes.STRING(14),
    unique: true,
  },
}, {
  tableName: 'organizations',
  sequelize: database,
  updatedAt: 'updated_at',
  createdAt: 'created_at',
  deletedAt: 'deleted_at',
  paranoid: true,
  timestamps: true,
  modelName: 'Organization'
});

export { Organization }