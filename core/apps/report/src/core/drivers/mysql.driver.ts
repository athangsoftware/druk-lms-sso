import { createConnection, Connection } from 'mysql2/promise';
import {
  DatabaseDriver,
  QueryResult,
  SchemaMetadata,
  TableInfo,
} from './database-driver.interface';

const DEFAULT_MAX_ROWS = 1000;
const DEFAULT_TIMEOUT_MS = 30_000;

interface MySqlConnectionParams {
  host: string;
  port: number;
  databaseName: string;
  username: string;
  password: string;
}

export class MySqlDriver extends DatabaseDriver {
  constructor(private readonly params: MySqlConnectionParams) {
    super();
  }

  private async getConnection(): Promise<Connection> {
    return createConnection({
      host: this.params.host,
      port: this.params.port,
      database: this.params.databaseName,
      user: this.params.username,
      password: this.params.password,
      connectTimeout: DEFAULT_TIMEOUT_MS,
    });
  }

  async testConnection(): Promise<boolean> {
    let conn: Connection | undefined;
    try {
      conn = await this.getConnection();
      await conn.ping();
      return true;
    } catch {
      return false;
    } finally {
      if (conn) {
        await conn.end();
      }
    }
  }

  async runQuery(
    sql: string,
    maxRows: number = DEFAULT_MAX_ROWS,
    timeoutMs: number = DEFAULT_TIMEOUT_MS,
  ): Promise<QueryResult> {
    let conn: Connection | undefined;
    try {
      conn = await this.getConnection();

      await conn.query(`SET SESSION MAX_EXECUTION_TIME = ${timeoutMs}`);

      const [rows, fields] = await conn.query({
        sql,
        timeout: timeoutMs,
      });

      const rowsArray = Array.isArray(rows)
        ? (rows as Record<string, unknown>[]).slice(0, maxRows)
        : [];

      const columns = fields
        ? (fields as { name: string }[]).map((f) => f.name)
        : rowsArray.length > 0
          ? Object.keys(rowsArray[0])
          : [];

      return {
        columns,
        rows: rowsArray,
        rowCount: rowsArray.length,
      };
    } finally {
      if (conn) {
        await conn.end();
      }
    }
  }

  async getSchemaMetadata(): Promise<SchemaMetadata> {
    let conn: Connection | undefined;
    try {
      conn = await this.getConnection();

      const [pkRows] = await conn.query<any[]>(
        `SELECT k.TABLE_NAME, k.COLUMN_NAME
         FROM information_schema.TABLE_CONSTRAINTS t
         JOIN information_schema.KEY_COLUMN_USAGE k
           ON t.CONSTRAINT_NAME = k.CONSTRAINT_NAME
          AND t.TABLE_SCHEMA = k.TABLE_SCHEMA
          AND t.TABLE_NAME = k.TABLE_NAME
         WHERE t.TABLE_SCHEMA = ?
           AND t.CONSTRAINT_TYPE = 'PRIMARY KEY'
         ORDER BY k.TABLE_NAME, k.ORDINAL_POSITION`,
        [this.params.databaseName],
      );

      const [fkRows] = await conn.query<any[]>(
        `SELECT TABLE_NAME, COLUMN_NAME, REFERENCED_TABLE_NAME, REFERENCED_COLUMN_NAME
         FROM information_schema.KEY_COLUMN_USAGE
         WHERE TABLE_SCHEMA = ?
           AND REFERENCED_TABLE_NAME IS NOT NULL
         ORDER BY TABLE_NAME, ORDINAL_POSITION`,
        [this.params.databaseName],
      );

      const primaryKeysByTable = new Map<string, string[]>();
      for (const row of pkRows) {
        const tableName: string = row['TABLE_NAME'];
        const columnName: string = row['COLUMN_NAME'];
        const current = primaryKeysByTable.get(tableName) ?? [];
        current.push(columnName);
        primaryKeysByTable.set(tableName, current);
      }

      const foreignKeysByTable = new Map<
        string,
        { columnName: string; referencedTableName: string; referencedColumnName: string }[]
      >();
      for (const row of fkRows) {
        const tableName: string = row['TABLE_NAME'];
        const current = foreignKeysByTable.get(tableName) ?? [];
        current.push({
          columnName: row['COLUMN_NAME'],
          referencedTableName: row['REFERENCED_TABLE_NAME'],
          referencedColumnName: row['REFERENCED_COLUMN_NAME'],
        });
        foreignKeysByTable.set(tableName, current);
      }

      const [tableRows] = await conn.query<any[]>(
        `SELECT TABLE_NAME FROM information_schema.TABLES
         WHERE TABLE_SCHEMA = ? AND TABLE_TYPE = 'BASE TABLE'
         ORDER BY TABLE_NAME`,
        [this.params.databaseName],
      );

      const tables: TableInfo[] = [];

      for (const tableRow of tableRows) {
        const tableName: string = tableRow['TABLE_NAME'];

        const [columnRows] = await conn.query<any[]>(
          `SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE
           FROM information_schema.COLUMNS
           WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ?
           ORDER BY ORDINAL_POSITION`,
          [this.params.databaseName, tableName],
        );

        tables.push({
          tableName,
          columns: columnRows.map((col) => ({
            columnName: col['COLUMN_NAME'],
            dataType: col['DATA_TYPE'],
            isNullable: col['IS_NULLABLE'] === 'YES',
          })),
          primaryKeys: primaryKeysByTable.get(tableName) ?? [],
          foreignKeys: foreignKeysByTable.get(tableName) ?? [],
        });
      }

      return {
        databaseName: this.params.databaseName,
        tables,
      };
    } finally {
      if (conn) {
        await conn.end();
      }
    }
  }
}
