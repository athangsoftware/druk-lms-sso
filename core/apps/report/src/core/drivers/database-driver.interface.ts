export interface ColumnInfo {
  columnName: string;
  dataType: string;
  isNullable: boolean;
}

export interface TableInfo {
  tableName: string;
  columns: ColumnInfo[];
}

export interface SchemaMetadata {
  databaseName: string;
  tables: TableInfo[];
}

export interface QueryResult {
  columns: string[];
  rows: Record<string, unknown>[];
  rowCount: number;
}

export abstract class DatabaseDriver {
  abstract testConnection(): Promise<boolean>;
  abstract runQuery(
    sql: string,
    maxRows?: number,
    timeoutMs?: number,
  ): Promise<QueryResult>;
  abstract getSchemaMetadata(): Promise<SchemaMetadata>;
}
