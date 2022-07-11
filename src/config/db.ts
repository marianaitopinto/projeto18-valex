import "dotenv/config";
import pg from "pg";

const { Pool } = pg;
console.log(process.env.DATABASE_URL)
export const connection = new Pool({
  connectionString: process.env.DATABASE_URL,
});