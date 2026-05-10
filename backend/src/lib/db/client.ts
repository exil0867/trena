
import { Pool } from 'pg'
import { env } from '../env.js'

export const db = new Pool({
  host: env.DB_HOST,
  port: env.DB_PORT,
  user: env.DB_USER,
  database: env.DB_NAME,
  password: env.DB_PASSWORD,
})
