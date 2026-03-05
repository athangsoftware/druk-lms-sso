import { Injectable, OnModuleInit, OnModuleDestroy, Inject, Optional } from '@nestjs/common';
import { PrismaClient } from '../../generated/client/client';
import type { PrismaLibConfig } from '../types';
import { DEFAULT_CONFIG } from '../types';
import { getExtendedPrismaClient } from '../extensions/extend';
import { createPrismaClient } from '../client/prisma-client.factory';
import { PRISMA_CONFIG } from './constants';

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
    private prismaClient: PrismaClient;
    private config: PrismaLibConfig;

    constructor(
        @Optional() @Inject(PRISMA_CONFIG) config?: PrismaLibConfig
    ) {
        this.config = { ...DEFAULT_CONFIG, ...(config || {}) };
        this.prismaClient = createPrismaClient(this.config);
    }

    async onModuleInit(): Promise<void> {
        await this.prismaClient.$connect();
        console.log('✅ Prisma connected to database');
    }

    async onModuleDestroy(): Promise<void> {
        await this.prismaClient.$disconnect();
        console.log('❌ Prisma disconnected from database');
    }

    getRawClient(): PrismaClient {
        return this.prismaClient;
    }

    async client<T>(
        callback: (tx: { dbContext: ReturnType<typeof getExtendedPrismaClient> }) => Promise<T>,
        options: { isTransaction?: boolean; isTenantFilter?: boolean } = {}
    ): Promise<T> {
        const { isTransaction = true, isTenantFilter = true } = options;

        if (isTransaction) {
            try {
                console.log('🔄 Starting transaction...');

                const result = await this.prismaClient.$transaction(
                    async (prismaTx) => {
                        const tx = getExtendedPrismaClient(this.prismaClient, prismaTx, isTenantFilter, this.config);
                        return await callback({ dbContext: tx });
                    },
                    {
                        timeout: this.config.transactionTimeout || DEFAULT_CONFIG.transactionTimeout,
                    }
                );

                console.log('✅ Transaction completed successfully');
                return result;
            } catch (error) {
                console.error('❌ Transaction rolled back due to error:', error);
                throw error;
            }
        } else {
            console.log('📝 Executing non-transactional operation...');
            const tx = getExtendedPrismaClient(this.prismaClient, this.prismaClient, isTenantFilter, this.config);
            return await callback({ dbContext: tx });
        }
    }
}
