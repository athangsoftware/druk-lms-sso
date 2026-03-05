import { PrismaClient } from '../../generated/client/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { format } from 'sql-formatter';
import { PrismaLibConfig, DEFAULT_CONFIG } from '../types';
import { TerminalStyles } from '../utils';

/**
 * Base strategy class for creating Prisma clients
 */
export abstract class BasePrismaStrategy {
    protected config: PrismaLibConfig;

    constructor(config: PrismaLibConfig = {}) {
        this.config = { ...DEFAULT_CONFIG, ...config };
    }

    protected createAdapter(databaseUrl: string): PrismaMariaDb {
        const url = new URL(databaseUrl);
        return new PrismaMariaDb({
            host: url.hostname,
            port: parseInt(url.port) || 3306,
            user: url.username,
            password: url.password,
            database: url.pathname.slice(1),
            connectionLimit: this.config.connectionLimit || DEFAULT_CONFIG.connectionLimit,
        });
    }

    protected createBaseClient(databaseUrl: string): PrismaClient {
        const adapter = this.createAdapter(databaseUrl);

        const prismaClient = new PrismaClient({
            adapter,
            log: this.config.enableQueryLogging
                ? [
                    { emit: 'event', level: 'query' },
                    { emit: 'event', level: 'info' },
                    { emit: 'event', level: 'warn' },
                    { emit: 'event', level: 'error' },
                ]
                : [],
            transactionOptions: {
                timeout: this.config.transactionTimeout || DEFAULT_CONFIG.transactionTimeout,
            },
        });

        if (this.config.enableQueryLogging) {
            this.setupQueryLogging(prismaClient);
        }

        return prismaClient;
    }

    protected setupQueryLogging(prismaClient: PrismaClient): void {
        (prismaClient as any).$on('query', (event: any) => {
            if (
                event.query.includes('BEGIN') ||
                event.query.includes('COMMIT') ||
                event.query.includes('ROLLBACK') ||
                event.query.includes('SELECT 1')
            ) {
                return;
            }

            console.log(TerminalStyles.blue('===================================='));
            console.log(TerminalStyles.green(format(event.query)));

            if (event.params && event.params.length > 0) {
                console.log(TerminalStyles.gray('------------------------------------'));
                console.log(TerminalStyles.yellow('Parameters:'));
                console.log(TerminalStyles.cyan(event.params));
            }

            console.log(TerminalStyles.gray('------------------------------------'));
            console.log(TerminalStyles.yellow('Duration:'));
            console.log(TerminalStyles.magenta(`${event.duration} ms\n`));
        });
    }

    protected getDatabaseUrl(): string {
        const databaseUrl = this.config.databaseUrl || process.env.DATABASE_URL;

        if (!databaseUrl) {
            throw new Error(
                'DATABASE_URL is required. Set it in environment variables or pass via config.databaseUrl'
            );
        }

        return databaseUrl;
    }

    abstract create(): PrismaClient;
    abstract getName(): string;
}
