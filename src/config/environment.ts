import * as dotenv from 'dotenv'

dotenv.config()

export const environment =  {
  db: {
    HOSTNAME: process.env.HOSTNAME || 'localhost',
    DIALECT: process.env.DIALECT || 'postgres',
    PORT: process.env.DB_PORT || 5432,
    NAME:  process.env.DB_NAME || 'postgres',
    USERNAME: process.env.DB_USERNAME || 'postgres',
    PASSWORD: process.env.DB_PASSWORD || 'postgres',
  },
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "5af80f29cae39ed8ca2413c580fbc806", 
  hash_salt: Number(process.env.HASH_SALT) || 0
}