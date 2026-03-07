import { DbConnection } from '@app/prisma';
import { DatabaseDriver } from './database-driver.interface';
import { MySqlDriver } from './mysql.driver';

export function createDatabaseDriver(
  connection: DbConnection,
  decryptedPassword: string,
): DatabaseDriver {
  switch (connection.dbType) {
    case 'MYSQL':
      return new MySqlDriver({
        host: connection.host,
        port: connection.port,
        databaseName: connection.databaseName,
        username: connection.username,
        password: decryptedPassword,
      });
    default:
      throw new Error(`Unsupported database type: ${connection.dbType}`);
  }
}
