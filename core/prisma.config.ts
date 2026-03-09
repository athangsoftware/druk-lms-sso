import path from 'node:path';
import { defineConfig, env } from 'prisma/config';
import 'dotenv/config';

const target = process.env.PRISMA_SCHEMA || 'sso';

const schemas: Record<string, { path: string; url: ReturnType<typeof env> }> = {
  sso: {
    path: path.join(__dirname, 'apps/sso/prisma/schema'),
    url: env('DATABASE_URL_SSO'),
  },
  report: {
    path: path.join(__dirname, 'apps/report/prisma/schema'),
    url: env('DATABASE_URL_REPORT'),
  },
};

const selected = schemas[target];

if (!selected) {
  throw new Error(
    `Unknown PRISMA_SCHEMA: "${target}". Use "sso" or "report".`
  );
}

export default defineConfig({
  schema: selected.path,
  datasource: {
    url: selected.url,
  },
});
