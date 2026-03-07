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
