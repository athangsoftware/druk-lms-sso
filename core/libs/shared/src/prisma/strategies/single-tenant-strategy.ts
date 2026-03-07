import { PrismaLibConfig, DatabaseStrategy } from '../types';
import { BasePrismaStrategy } from './base-strategy';
import { TerminalStyles } from '../utils';

/**
 * Single Tenant Strategy - Dedicated database per application
 */
export class SingleTenantStrategy extends BasePrismaStrategy {
    constructor(config: PrismaLibConfig = {}) {
        super({ ...config, strategy: DatabaseStrategy.SINGLE_TENANT });
    }

    create(): any {
        const databaseUrl = this.getDatabaseUrl();
        
        console.log(TerminalStyles.cyan(`🏠 Creating Single-Tenant Prisma Client`));
        console.log(TerminalStyles.gray(`   Database: ${this.maskConnectionString(databaseUrl)}`));

        return this.createBaseClient(databaseUrl);
    }

    getName(): string {
        return 'SingleTenantStrategy';
    }

    private maskConnectionString(url: string): string {
        try {
            const parsed = new URL(url);
            return `${parsed.protocol}//${parsed.username}:****@${parsed.host}${parsed.pathname}`;
        } catch {
            return '****';
        }
    }
}
