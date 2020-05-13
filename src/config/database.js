const dotenv = require('dotenv')
dotenv.config()

module.exports = {
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'postgres',
  host: process.env.HOSTNAME || 'localhost',
  dialect: 'postgres',
  port: process.env.DB_PORT || 5432
}