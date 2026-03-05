import path from 'node:path';
import { defineConfig, env } from 'prisma/config';
import 'dotenv/config';

export default defineConfig({
  schema: path.join(__dirname, 'libs/prisma/schema'),
  datasource: {
    url: env('DATABASE_URL'),
  },
});
