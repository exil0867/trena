import { Pool } from "pg";
import { env } from "./schema.js";

const pool = new Pool({
  host: env.DB_HOST,
  port: env.DB_PORT,
  user: 'exil0681',
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
});

export const query = (text: string, params?: any[]) => pool.query(text, params);

export default pool;
