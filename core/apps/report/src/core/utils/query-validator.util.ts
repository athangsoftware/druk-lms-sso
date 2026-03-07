import { DbType } from '@app/prisma-report';

const DESTRUCTIVE_PATTERN =
  /\b(INSERT|UPDATE|DELETE|DROP|ALTER|TRUNCATE|CREATE|EXEC|EXECUTE|CALL|REPLACE|MERGE|GRANT|REVOKE|LOAD\s+DATA|OUTFILE|DUMPFILE)\b/i;

const SYSTEM_DB_PATTERN =
  /\b(information_schema|performance_schema|mysql|sys)\b/i;

const MONGO_BLOCKED_OPERATORS = ['$out', '$merge'];

const MAX_ROWS = 1000;

export function validateQuery(query: string, dbType: DbType = 'MYSQL'): void {
  if (dbType === 'MONGODB') {
    return validateMongoQuery(query);
  }

  const trimmed = query.trim();

  if (!trimmed.toLowerCase().startsWith('select')) {
    throw new Error(
      'Only SELECT queries are allowed for chart data retrieval.',
    );
  }

  if (DESTRUCTIVE_PATTERN.test(trimmed)) {
    throw new Error(
      'Query contains disallowed operations. Only SELECT statements are permitted.',
    );
  }

  if (SYSTEM_DB_PATTERN.test(trimmed)) {
    throw new Error(
      'Queries against system databases are not allowed.',
    );
  }
}

function validateMongoQuery(query: string): void {
  let parsed: any;
  try {
    parsed = JSON.parse(query);
  } catch {
    throw new Error(
      'MongoDB query must be valid JSON with "collection" and "pipeline" fields.',
    );
  }

  if (!parsed.collection || typeof parsed.collection !== 'string') {
    throw new Error('MongoDB query must include a "collection" string field.');
  }

  if (!Array.isArray(parsed.pipeline)) {
    throw new Error('MongoDB query "pipeline" must be an array of aggregation stages.');
  }

  // Block destructive stages ($out, $merge)
  for (const stage of parsed.pipeline) {
    const keys = Object.keys(stage);
    for (const key of keys) {
      if (MONGO_BLOCKED_OPERATORS.includes(key)) {
        throw new Error(
          `MongoDB aggregation stage "${key}" is not allowed. Only read operations are permitted.`,
        );
      }
    }
  }
}

export function injectLimit(sql: string, maxRows: number = MAX_ROWS, dbType: DbType = 'MYSQL'): string {
  // MongoDB driver handles $limit internally
  if (dbType === 'MONGODB') return sql;

  const trimmed = sql.trim().replace(/;\s*$/, '');
  const hasLimit = /\bLIMIT\b/i.test(trimmed);

  if (hasLimit) {
    return trimmed;
  }

  return `${trimmed} LIMIT ${maxRows}`;
}
