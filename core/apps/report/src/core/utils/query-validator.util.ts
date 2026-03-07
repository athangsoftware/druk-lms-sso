const DESTRUCTIVE_PATTERN =
  /\b(INSERT|UPDATE|DELETE|DROP|ALTER|TRUNCATE|CREATE|EXEC|EXECUTE|CALL|REPLACE|MERGE|GRANT|REVOKE|LOAD\s+DATA|OUTFILE|DUMPFILE)\b/i;

const SYSTEM_DB_PATTERN =
  /\b(information_schema|performance_schema|mysql|sys)\b/i;

const MAX_ROWS = 1000;

export function validateQuery(sql: string): void {
  const trimmed = sql.trim();

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

export function injectLimit(sql: string, maxRows: number = MAX_ROWS): string {
  const trimmed = sql.trim().replace(/;\s*$/, '');
  const hasLimit = /\bLIMIT\b/i.test(trimmed);

  if (hasLimit) {
    return trimmed;
  }

  return `${trimmed} LIMIT ${maxRows}`;
}
