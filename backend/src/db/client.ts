
import { Pool } from 'pg'
import { env } from '../utils/env.js'

export const db = new Pool({
  connectionString: env.DATABASE_URL
})
