import { DbType } from '@app/prisma-report';
import { SchemaMetadata } from '../drivers/database-driver.interface';

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

function normalizeIdentifier(value: string): string {
  return value
    .trim()
    .replace(/^`|`$/g, '')
    .replace(/^"|"$/g, '')
    .replace(/^\[|\]$/g, '');
}

function extractReferencedTables(sql: string): string[] {
  const matches = new Set<string>();
  const tablePattern = /\b(?:FROM|JOIN)\s+((?:`[^`]+`|[A-Za-z0-9_]+)(?:\.(?:`[^`]+`|[A-Za-z0-9_]+))?)/gi;

  let match: RegExpExecArray | null;
  while ((match = tablePattern.exec(sql)) !== null) {
    const raw = match[1];
    const [left, right] = raw.split('.');

    const tableName = right
      ? normalizeIdentifier(right)
      : normalizeIdentifier(left);

    if (tableName) {
      matches.add(tableName);
    }
  }

  return Array.from(matches);
}

function levenshteinDistance(a: string, b: string): number {
  const dp: number[][] = Array.from({ length: a.length + 1 }, () =>
    Array.from({ length: b.length + 1 }, () => 0),
  );

  for (let i = 0; i <= a.length; i += 1) {
    dp[i][0] = i;
  }
  for (let j = 0; j <= b.length; j += 1) {
    dp[0][j] = j;
  }

  for (let i = 1; i <= a.length; i += 1) {
    for (let j = 1; j <= b.length; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost,
      );
    }
  }

  return dp[a.length][b.length];
}

function suggestClosestTableName(
  missingTable: string,
  knownTables: string[],
): string | undefined {
  const target = missingTable.toLowerCase();
  const ranked = knownTables
    .map((tableName) => ({
      tableName,
      distance: levenshteinDistance(target, tableName.toLowerCase()),
    }))
    .sort((a, b) => a.distance - b.distance);

  const best = ranked[0];
  if (!best) {
    return undefined;
  }

  // Conservative threshold to avoid noisy suggestions.
  const threshold = Math.max(2, Math.floor(target.length * 0.35));
  if (best.distance <= threshold) {
    return best.tableName;
  }

  return undefined;
}

export function validateSqlTablesAgainstSchema(
  query: string,
  schema: SchemaMetadata,
): void {
  const referencedTables = extractReferencedTables(query);
  if (referencedTables.length === 0) {
    return;
  }

  const knownTables = schema.tables.map((table) => table.tableName);
  const knownTableSet = new Set(knownTables.map((tableName) => tableName.toLowerCase()));

  const missingTables = referencedTables.filter(
    (tableName) => !knownTableSet.has(tableName.toLowerCase()),
  );

  if (missingTables.length === 0) {
    return;
  }

  const details = missingTables.map((tableName) => {
    const suggestion = suggestClosestTableName(tableName, knownTables);
    if (suggestion) {
      return `"${tableName}" (did you mean "${suggestion}"?)`;
    }
    return `"${tableName}"`;
  });

  throw new Error(
    `Query references table(s) not found in this connection schema: ${details.join(', ')}.`,
  );
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
