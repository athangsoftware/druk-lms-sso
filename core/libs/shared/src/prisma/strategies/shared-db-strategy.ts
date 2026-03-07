import { PrismaLibConfig, DatabaseStrategy } from '../types';
import { BasePrismaStrategy } from './base-strategy';
import { TerminalStyles } from '../utils';

/**
 * Shared Database Strategy - For databases shared with other applications
 */
export class SharedDbStrategy extends BasePrismaStrategy {
    constructor(config: PrismaLibConfig = {}) {
        super({ ...config, strategy: DatabaseStrategy.SHARED_DB });
    }

    create(): any {
        const databaseUrl = this.getDatabaseUrl();
        
        this.preventMigrations();
        
        console.log(TerminalStyles.cyan(`📚 Creating Shared Database Prisma Client`));
        console.log(TerminalStyles.gray(`   Mode: Read/Write`));
        console.log(TerminalStyles.yellow(`   ⚠️  Prisma migrations disabled (use SQL)`));

        return this.createBaseClient(databaseUrl);
    }

    getName(): string {
        return 'SharedDbStrategy';
    }

    private preventMigrations(): void {
        const migrationCommands = ['migrate', 'db push', 'db pull'];
        const args = process.argv.join(' ').toLowerCase();
        
        if (migrationCommands.some(cmd => args.includes(cmd))) {
            if (args.includes('db pull')) {
                return;
            }
            
            throw new Error(
                '\n' +
                '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n' +
                '❌ MIGRATION BLOCKED: Shared Database Strategy\n' +
                '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'
            );
        }
    }
}
