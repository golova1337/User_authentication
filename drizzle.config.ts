import 'dotenv/config';

import { defineConfig } from 'drizzle-kit';
export default defineConfig({
  out: './drizzle',
  dialect: 'postgresql',
  schema: './src/user/entities/*',
  dbCredentials: {
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT, 10),
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  },
});
