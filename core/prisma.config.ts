import path from 'node:path';
import { defineConfig } from 'prisma/config';
import dotenv from 'dotenv';

const target = process.env.PRISMA_SCHEMA || 'sso';

const schemas: Record<string, { schemaPath: string; envPath: string }> = {
  sso: {
    schemaPath: path.join(__dirname, 'apps/sso/prisma/schema'),
    envPath: path.join(__dirname, 'apps/sso/.env'),
  },
  report: {
    schemaPath: path.join(__dirname, 'apps/report/prisma/schema'),
    envPath: path.join(__dirname, 'apps/report/.env'),
  },
};

const selected = schemas[target];

if (!selected) {
  throw new Error(
    `Unknown PRISMA_SCHEMA: "${target}". Use "sso" or "report".`,
  );
}

// Load DATABASE_URL from the selected app's .env file
dotenv.config({ path: selected.envPath });

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error(
    `DATABASE_URL is not set. Check ${selected.envPath}`,
  );
}

export default defineConfig({
  schema: selected.schemaPath,
  datasource: {
    url: databaseUrl,
  },
});
