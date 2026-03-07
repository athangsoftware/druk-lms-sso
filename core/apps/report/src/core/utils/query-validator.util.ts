const DESTRUCTIVE_PATTERN =
  /\b(INSERT|UPDATE|DELETE|DROP|ALTER|TRUNCATE|CREATE|EXEC|EXECUTE|CALL|REPLACE|MERGE|GRANT|REVOKE|LOAD\s+DATA|OUTFILE|DUMPFILE)\b/i;

const SYSTEM_DB_PATTERN =
  /\b(information_schema|performance_schema|mysql|sys)\b/i;

const COLUMN_NAME_PATTERN = /^[a-zA-Z_][a-zA-Z0-9_.]*$/;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}(:\d{2})?)?$/;

const MAX_ROWS = 1000;
const MAX_FILTER_OPTIONS = 500;

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

function escapeString(value: string): string {
  return value.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

function escapeDate(value: string): string {
  if (!DATE_PATTERN.test(value.trim())) {
    throw new Error(
      `Invalid date format: ${value}. Expected YYYY-MM-DD or YYYY-MM-DDTHH:MM`,
    );
  }
  return escapeString(value.trim().substring(0, 10));
}

export interface FilterConditionInput {
  filterType: string;
  targetColumn: string;
  value: unknown;
}

export function buildFilterCondition(
  input: FilterConditionInput,
): string | null {
  const { filterType, targetColumn, value } = input;

  if (value === null || value === undefined || value === '') return null;

  if (!COLUMN_NAME_PATTERN.test(targetColumn)) {
    throw new Error(
      `Invalid column name: "${targetColumn}". Only alphanumeric characters, underscores, and dots are allowed.`,
    );
  }

  const col = `\`${targetColumn.replace(/\./g, '`.`')}\``;

  switch (filterType) {
    case 'MULTI_SELECT': {
      const vals = Array.isArray(value)
        ? value.map((v) => String(v).trim()).filter(Boolean)
        : String(value)
            .split(',')
            .map((v) => v.trim())
            .filter(Boolean);
      if (!vals.length) return null;
      const escaped = vals.map((v) => `'${escapeString(v)}'`).join(', ');
      return `AND ${col} IN (${escaped})`;
    }
    case 'SINGLE_SELECT': {
      const val = String(value).trim();
      if (!val) return null;
      return `AND ${col} = '${escapeString(val)}'`;
    }
    case 'DATE_RANGE': {
      const range = value as { startDate?: string; endDate?: string } | null;
      if (!range) return null;
      const { startDate, endDate } = range;
      if (startDate && endDate) {
        return `AND ${col} BETWEEN '${escapeDate(startDate)}' AND '${escapeDate(endDate)}'`;
      }
      if (startDate) return `AND ${col} >= '${escapeDate(startDate)}'`;
      if (endDate) return `AND ${col} <= '${escapeDate(endDate)}'`;
      return null;
    }
    case 'TEXT': {
      const val = String(value).trim();
      if (!val) return null;
      return `AND ${col} LIKE '%${escapeString(val)}%'`;
    }
    case 'NUMBER': {
      if (typeof value === 'number') {
        if (isNaN(value)) return null;
        return `AND ${col} = ${value}`;
      }
      const num = value as {
        operator?: string;
        value?: unknown;
        start?: unknown;
        end?: unknown;
      };
      const operator = num.operator ?? '=';
      if (operator === 'between') {
        const start = Number(num.start);
        const end = Number(num.end);
        if (isNaN(start) || isNaN(end)) return null;
        return `AND ${col} BETWEEN ${start} AND ${end}`;
      }
      const numVal = Number(num.value ?? value);
      if (isNaN(numVal)) return null;
      const allowedOps: Record<string, string> = {
        '=': '=',
        '>': '>',
        '<': '<',
        '>=': '>=',
        '<=': '<=',
      };
      const op = allowedOps[operator] ?? '=';
      return `AND ${col} ${op} ${numVal}`;
    }
    default:
      return null;
  }
}

export function injectFilters(sql: string, conditions: string[]): string {
  const trimmed = sql.trim().replace(/;\s*$/, '');
  if (!conditions.length) return trimmed;

  const filterBlock = conditions.join('\n');

  if (trimmed.includes('{{filters}}')) {
    return trimmed.replace('{{filters}}', filterBlock);
  }

  // Wrap in subquery when no placeholder is present
  return `SELECT * FROM (\n${trimmed}\n) AS _filtered_result WHERE 1=1\n${filterBlock}`;
}

export function injectSourceQueryLimit(sql: string): string {
  const trimmed = sql.trim().replace(/;\s*$/, '');
  const hasLimit = /\bLIMIT\b/i.test(trimmed);
  if (hasLimit) return trimmed;
  return `${trimmed} LIMIT ${MAX_FILTER_OPTIONS}`;
}
