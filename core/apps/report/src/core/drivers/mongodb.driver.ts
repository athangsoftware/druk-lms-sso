import { MongoClient } from 'mongodb';
import {
  DatabaseDriver,
  QueryResult,
  SchemaMetadata,
  TableInfo,
} from './database-driver.interface';

const DEFAULT_MAX_ROWS = 1000;
const DEFAULT_TIMEOUT_MS = 30_000;
const SAMPLE_SIZE_FOR_SCHEMA = 100;

interface MongoDbConnectionParams {
  host: string;
  port: number;
  databaseName: string;
  username: string;
  password: string;
}

export class MongoDbDriver extends DatabaseDriver {
  constructor(private readonly params: MongoDbConnectionParams) {
    super();
  }

  private buildUri(): string {
    const { username, password, host, port } = this.params;
    const encodedUser = encodeURIComponent(username);
    const encodedPass = encodeURIComponent(password);
    return `mongodb://${encodedUser}:${encodedPass}@${host}:${port}`;
  }

  private async getClient(): Promise<MongoClient> {
    return new MongoClient(this.buildUri(), {
      connectTimeoutMS: DEFAULT_TIMEOUT_MS,
      serverSelectionTimeoutMS: DEFAULT_TIMEOUT_MS,
    });
  }

  async testConnection(): Promise<boolean> {
    let client: MongoClient | undefined;
    try {
      client = await this.getClient();
      await client.connect();
      await client.db(this.params.databaseName).command({ ping: 1 });
      return true;
    } catch {
      return false;
    } finally {
      if (client) {
        await client.close();
      }
    }
  }

  /**
   * Runs a MongoDB aggregation pipeline.
   * The `query` parameter must be a JSON string with shape:
   *   { "collection": "collectionName", "pipeline": [ ...stages ] }
   *
   * A simple find can be expressed as:
   *   { "collection": "users", "pipeline": [{ "$match": { "age": { "$gt": 25 } } }] }
   */
  async runQuery(
    query: string,
    maxRows: number = DEFAULT_MAX_ROWS,
    timeoutMs: number = DEFAULT_TIMEOUT_MS,
  ): Promise<QueryResult> {
    let client: MongoClient | undefined;
    try {
      const parsed = JSON.parse(query);
      const collectionName = parsed.collection;
      const pipeline: Record<string, unknown>[] = parsed.pipeline ?? [];

      if (!collectionName || typeof collectionName !== 'string') {
        throw new Error(
          'MongoDB query must include a "collection" field.',
        );
      }
      if (!Array.isArray(pipeline)) {
        throw new Error(
          'MongoDB query "pipeline" must be an array of aggregation stages.',
        );
      }

      // Enforce a $limit stage at the end if not present
      const hasLimit = pipeline.some((stage) => '$limit' in stage);
      if (!hasLimit) {
        pipeline.push({ $limit: maxRows });
      }

      client = await this.getClient();
      await client.connect();
      const db = client.db(this.params.databaseName);

      const rows = await db
        .collection(collectionName)
        .aggregate(pipeline, { maxTimeMS: timeoutMs })
        .toArray();

      const limitedRows = rows.slice(0, maxRows);

      // Derive columns from the first row or return empty
      const columns =
        limitedRows.length > 0
          ? Object.keys(limitedRows[0]).map((k) => String(k))
          : [];

      // Convert ObjectId / Date to strings for serialisation
      const serialisedRows = limitedRows.map((row) => {
        const out: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(row)) {
          out[key] =
            value !== null && typeof value === 'object' && typeof (value as any).toHexString === 'function'
              ? (value as any).toHexString()
              : value instanceof Date
                ? value.toISOString()
                : value;
        }
        return out;
      });

      return {
        columns,
        rows: serialisedRows,
        rowCount: serialisedRows.length,
      };
    } finally {
      if (client) {
        await client.close();
      }
    }
  }

  async getSchemaMetadata(): Promise<SchemaMetadata> {
    let client: MongoClient | undefined;
    try {
      client = await this.getClient();
      await client.connect();
      const db = client.db(this.params.databaseName);

      const collections = await db.listCollections().toArray();
      const tables: TableInfo[] = [];

      for (const col of collections) {
        if (col.name.startsWith('system.')) continue;

        // Sample documents to infer field names and types
        const docs = await db
          .collection(col.name)
          .aggregate([{ $sample: { size: SAMPLE_SIZE_FOR_SCHEMA } }])
          .toArray();

        const fieldMap = new Map<string, string>();
        for (const doc of docs) {
          for (const [key, value] of Object.entries(doc)) {
            if (!fieldMap.has(key)) {
              fieldMap.set(key, inferBsonType(value));
            }
          }
        }

        tables.push({
          tableName: col.name,
          columns: Array.from(fieldMap.entries()).map(([name, type]) => ({
            columnName: name,
            dataType: type,
            isNullable: true, // MongoDB fields are inherently nullable
          })),
        });
      }

      return {
        databaseName: this.params.databaseName,
        tables,
      };
    } finally {
      if (client) {
        await client.close();
      }
    }
  }
}

function inferBsonType(value: unknown): string {
  if (value === null || value === undefined) return 'null';
  if (typeof value === 'string') return 'string';
  if (typeof value === 'number') return Number.isInteger(value) ? 'int' : 'double';
  if (typeof value === 'boolean') return 'bool';
  if (value instanceof Date) return 'date';
  if (Array.isArray(value)) return 'array';
  if (typeof value === 'object' && typeof (value as any).toHexString === 'function') return 'objectId';
  if (typeof value === 'object') return 'object';
  return 'unknown';
}
