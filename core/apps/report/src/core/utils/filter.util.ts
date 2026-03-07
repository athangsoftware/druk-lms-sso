import { FilterType, MissingColumnBehavior } from '@app/prisma';
import { SchemaMetadata } from '../drivers/database-driver.interface';

const VALID_COLUMN_NAME = /^[a-zA-Z_][a-zA-Z0-9_.]*$/;
const FILTERS_PLACEHOLDER = '{{filters}}';

export interface FilterDefinition {
  id: string;
  filterType: FilterType;
  targetColumn: string;
}

export function validateColumnName(column: string): void {
  if (!VALID_COLUMN_NAME.test(column)) {
    throw new Error(`Invalid column name: ${column}`);
  }
}

export function escapeValue(value: string): string {
  return value.replace(/'/g, "''").replace(/\\/g, '\\\\');
}

export function buildFilterSql(
  definitions: FilterDefinition[],
  values: Record<string, unknown>,
): string {
  const clauses: string[] = [];

  for (const def of definitions) {
    const raw = values[def.id];
    if (raw === undefined || raw === null || raw === '') continue;

    validateColumnName(def.targetColumn);
    const col = def.targetColumn;

    switch (def.filterType) {
      case 'MULTI_SELECT': {
        const arr = Array.isArray(raw) ? raw : [raw];
        const filtered = arr.filter((v) => v !== null && v !== undefined && v !== '');
        if (!filtered.length) continue;
        const escaped = filtered.map((v) => `'${escapeValue(String(v))}'`).join(',');
        clauses.push(`${col} IN (${escaped})`);
        break;
      }

      case 'SINGLE_SELECT': {
        clauses.push(`${col} = '${escapeValue(String(raw))}'`);
        break;
      }

      case 'DATE_RANGE': {
        const range = raw as { startDate?: string; endDate?: string };
        if (range.startDate && range.endDate) {
          clauses.push(
            `${col} BETWEEN '${escapeValue(range.startDate)}' AND '${escapeValue(range.endDate)}'`,
          );
        } else if (range.startDate) {
          clauses.push(`${col} >= '${escapeValue(range.startDate)}'`);
        } else if (range.endDate) {
          clauses.push(`${col} <= '${escapeValue(range.endDate)}'`);
        }
        break;
      }

      case 'TEXT': {
        const textVal = String(raw);
        if (!textVal.trim()) continue;
        clauses.push(`${col} LIKE '%${escapeValue(textVal)}%'`);
        break;
      }

      case 'NUMBER': {
        const num = raw as { operator?: string; value?: number; min?: number; max?: number };
        if (num.operator === 'range' && num.min !== undefined && num.max !== undefined) {
          clauses.push(`${col} BETWEEN ${Number(num.min)} AND ${Number(num.max)}`);
        } else if (num.operator === 'gt' && num.value !== undefined) {
          clauses.push(`${col} > ${Number(num.value)}`);
        } else if (num.operator === 'lt' && num.value !== undefined) {
          clauses.push(`${col} < ${Number(num.value)}`);
        } else if (num.operator === 'eq' && num.value !== undefined) {
          clauses.push(`${col} = ${Number(num.value)}`);
        } else if (num.value !== undefined) {
          clauses.push(`${col} = ${Number(num.value)}`);
        }
        break;
      }
    }
  }

  if (!clauses.length) return '';

  return clauses.map((c) => `AND ${c}`).join('\n');
}

export function injectFilters(sql: string, filterFragment: string): string {
  if (!filterFragment) return sql;

  if (sql.includes(FILTERS_PLACEHOLDER)) {
    return sql.replace(FILTERS_PLACEHOLDER, filterFragment);
  }

  // Auto-append: find the last WHERE clause and inject before GROUP BY / ORDER BY / LIMIT / HAVING or at end
  const insertPoints = /\b(GROUP\s+BY|ORDER\s+BY|HAVING|LIMIT)\b/i;
  const match = insertPoints.exec(sql);
  if (match) {
    const idx = match.index;
    return `${sql.slice(0, idx)}\n${filterFragment}\n${sql.slice(idx)}`;
  }

  // Check if query has a WHERE clause at all
  if (/\bWHERE\b/i.test(sql)) {
    const trimmed = sql.replace(/;\s*$/, '');
    return `${trimmed}\n${filterFragment}`;
  }

  // No WHERE clause — add one
  const trimmed = sql.replace(/;\s*$/, '');
  // Replace the leading AND with WHERE
  const fragment = filterFragment.replace(/^AND\s+/i, '');
  return `${trimmed}\nWHERE ${fragment}`;
}

/**
 * Validate that a target column reference (e.g. "table.column" or "column")
 * actually exists in the given database schema.
 * Returns an object with `valid` boolean and a human-readable `message`.
 */
export function validateColumnAgainstSchema(
  targetColumn: string,
  schema: SchemaMetadata,
): { valid: boolean; message: string; suggestions: string[] } {
  const allColumns = buildColumnIndex(schema);

  // exact match "table.column"
  if (targetColumn.includes('.')) {
    const [tablePart, colPart] = targetColumn.split('.', 2);
    const table = schema.tables.find(
      (t) => t.tableName.toLowerCase() === tablePart.toLowerCase(),
    );
    if (!table) {
      const tableNames = schema.tables.map((t) => t.tableName);
      const suggestions = findClosest(tablePart, tableNames, 3);
      return {
        valid: false,
        message: `Table "${tablePart}" does not exist in database "${schema.databaseName}".`,
        suggestions: suggestions.map((s) => `${s}.${colPart}`),
      };
    }
    const col = table.columns.find(
      (c) => c.columnName.toLowerCase() === colPart.toLowerCase(),
    );
    if (!col) {
      const colNames = table.columns.map((c) => `${table.tableName}.${c.columnName}`);
      return {
        valid: false,
        message: `Column "${colPart}" does not exist in table "${table.tableName}".`,
        suggestions: findClosest(`${tablePart}.${colPart}`, colNames, 3),
      };
    }
    return { valid: true, message: 'OK', suggestions: [] };
  }

  // bare column name — look across all tables
  const matches = allColumns.filter(
    (c) => c.column.toLowerCase() === targetColumn.toLowerCase(),
  );
  if (matches.length > 0) {
    return { valid: true, message: 'OK', suggestions: [] };
  }
  // not found — suggest closest
  const allNames = allColumns.map((c) => c.column);
  return {
    valid: false,
    message: `Column "${targetColumn}" does not exist in any table.`,
    suggestions: findClosest(targetColumn, allNames, 3).map((s) => {
      const entry = allColumns.find((c) => c.column === s);
      return entry ? `${entry.table}.${entry.column}` : s;
    }),
  };
}

/**
 * Validate a source query by running an EXPLAIN / dry run.
 * Returns null if valid, or an error message.
 */
export async function validateSourceQuery(
  sourceQuery: string,
  driver: { runQuery: (sql: string, maxRows?: number, timeoutMs?: number) => Promise<unknown> },
): Promise<string | null> {
  try {
    // wrap with LIMIT 0 so we don't actually fetch rows
    const testSql = `SELECT * FROM (${sourceQuery.replace(/;\s*$/, '')}) AS __validate LIMIT 0`;
    await driver.runQuery(testSql, 0, 5000);
    return null;
  } catch (error: any) {
    return error.message ?? 'Source query is invalid.';
  }
}

// --- internal helpers ---

interface ColumnEntry {
  table: string;
  column: string;
}

function buildColumnIndex(schema: SchemaMetadata): ColumnEntry[] {
  const entries: ColumnEntry[] = [];
  for (const table of schema.tables) {
    for (const col of table.columns) {
      entries.push({ table: table.tableName, column: col.columnName });
    }
  }
  return entries;
}

/** Simple Levenshtein-based closest match finder */
function findClosest(input: string, candidates: string[], max: number): string[] {
  const scored = candidates.map((c) => ({
    value: c,
    distance: levenshtein(input.toLowerCase(), c.toLowerCase()),
  }));
  scored.sort((a, b) => a.distance - b.distance);
  return scored.slice(0, max).filter((s) => s.distance <= input.length).map((s) => s.value);
}

function levenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
      );
    }
  }
  return dp[m][n];
}

// --- Global Filter utilities ---

export interface GlobalFilterDefinition {
  id: string;
  columnName: string;
  columnValue: string;
  missingColumnBehavior: MissingColumnBehavior | null;
  isEnabled: boolean;
}

export interface GlobalFilterOverrideDefinition {
  globalFilterId: string;
  isDisabled: boolean;
  columnValue: string | null;
  missingColumnBehavior: MissingColumnBehavior | null;
}

export interface GlobalFilterResult {
  /** SQL fragment with AND clauses, empty string if no filters apply */
  sql: string;
  /** true if any filter with HIDE_DATA targets a missing column — query should return empty */
  blocked: boolean;
}

/**
 * Build SQL filter fragment from global filters.
 * @param filters - all enabled global filters
 * @param overrides - per-dashboard overrides (keyed by globalFilterId)
 * @param schemaColumns - set of all column names (lowercase) in the target database
 */
export function buildGlobalFilterSql(
  filters: GlobalFilterDefinition[],
  overrides: Map<string, GlobalFilterOverrideDefinition>,
  schemaColumns: Set<string>,
): GlobalFilterResult {
  const clauses: string[] = [];

  for (const gf of filters) {
    if (!gf.isEnabled) continue;

    const override = overrides.get(gf.id);
    if (override?.isDisabled) continue;

    const columnName = gf.columnName;
    validateColumnName(columnName);

    // Resolve effective value and behavior
    const effectiveValue = override?.columnValue ?? gf.columnValue;
    const effectiveBehavior = override?.missingColumnBehavior ?? gf.missingColumnBehavior;

    if (!effectiveValue) continue;

    // Check column existence (case-insensitive)
    const colLower = columnName.toLowerCase();
    const columnExists = schemaColumns.has(colLower);

    if (!columnExists) {
      if (effectiveBehavior === 'HIDE_DATA') {
        return { sql: '', blocked: true };
      }
      // SHOW_ALL or null (default) → skip this filter
      continue;
    }

    // Build clause — support comma-separated values for IN()
    const values = effectiveValue.split(',').map((v) => v.trim()).filter((v) => v !== '');
    if (values.length === 0) continue;

    if (values.length === 1) {
      clauses.push(`${columnName} = '${escapeValue(values[0])}'`);
    } else {
      const escaped = values.map((v) => `'${escapeValue(v)}'`).join(',');
      clauses.push(`${columnName} IN (${escaped})`);
    }
  }

  if (!clauses.length) return { sql: '', blocked: false };

  return {
    sql: clauses.map((c) => `AND ${c}`).join('\n'),
    blocked: false,
  };
}

/**
 * Extract a flat set of column names (lowercase) from schema metadata.
 */
export function extractSchemaColumnNames(schema: SchemaMetadata): Set<string> {
  const cols = new Set<string>();
  for (const table of schema.tables) {
    for (const col of table.columns) {
      cols.add(col.columnName.toLowerCase());
    }
  }
  return cols;
}
