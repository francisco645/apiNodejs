import { Sequelize, Options, Dialect } from 'sequelize'
import * as dotenv from 'dotenv'
import { environment } from '../../config/environment'

dotenv.config()

const options: Options = {
  host: environment.db.HOSTNAME,
  dialect: environment.db.DIALECT as Dialect,
  port: environment.db.PORT as number,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  logging: console.log
}

export const database = new Sequelize(
  environment.db.NAME,
  environment.db.USERNAME,
  environment.db.PASSWORD,
  options
)