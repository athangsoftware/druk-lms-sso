import { Injectable, signal, computed } from '@angular/core';

/**
 * Tenant context interface
 */
export interface TenantContext {
    tenantId?: string;
    userId?: string;
    userRole?: string;
    organizationName?: string;
}

/**
 * Service for managing tenant context in Angular applications
 * 
 * Usage:
 * ```typescript
 * // In a component or service
 * const tenantService = inject(TenantService);
 * 
 * // Set tenant context (usually after login)
 * tenantService.setContext({
 *     tenantId: 'tenant-123',
 *     userId: 'user-456',
 *     userRole: 'admin',
 * });
 * 
 * // Get current tenant ID
 * const tenantId = tenantService.tenantId();
 * 
 * // Clear context on logout
 * tenantService.clearContext();
 * ```
 */
@Injectable({
    providedIn: 'root',
})
export class TenantService {
    private readonly STORAGE_KEY = 'tenant_context';

    // Signals for reactive state
    private _context = signal<TenantContext>({});

    // Computed signals for easy access
    readonly tenantId = computed(() => this._context().tenantId);
    readonly userId = computed(() => this._context().userId);
    readonly userRole = computed(() => this._context().userRole);
    readonly organizationName = computed(() => this._context().organizationName);
    readonly isAuthenticated = computed(() => !!this._context().tenantId);

    constructor() {
        // Restore context from storage on initialization
        this.restoreContext();
    }

    /**
     * Set the tenant context
     * Typically called after user authentication
     */
    setContext(context: TenantContext): void {
        this._context.set(context);
        this.persistContext(context);
    }

    /**
     * Update specific context fields
     */
    updateContext(partial: Partial<TenantContext>): void {
        const current = this._context();
        const updated = { ...current, ...partial };
        this._context.set(updated);
        this.persistContext(updated);
    }

    /**
     * Get the current tenant context
     */
    getContext(): TenantContext {
        return this._context();
    }

    /**
     * Clear the tenant context (logout)
     */
    clearContext(): void {
        this._context.set({});
        this.removePersistedContext();
    }

    /**
     * Check if user has a specific role
     */
    hasRole(role: string): boolean {
        return this._context().userRole === role;
    }

    /**
     * Check if user has any of the specified roles
     */
    hasAnyRole(roles: string[]): boolean {
        const currentRole = this._context().userRole;
        return currentRole ? roles.includes(currentRole) : false;
    }

    /**
     * Persist context to session storage
     */
    private persistContext(context: TenantContext): void {
        try {
            sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(context));
        } catch {
            // Storage might be disabled
            console.warn('Unable to persist tenant context to storage');
        }
    }

    /**
     * Restore context from session storage
     */
    private restoreContext(): void {
        try {
            const stored = sessionStorage.getItem(this.STORAGE_KEY);
            if (stored) {
                const context = JSON.parse(stored) as TenantContext;
                this._context.set(context);
            }
        } catch {
            // Storage might be disabled or corrupted
            console.warn('Unable to restore tenant context from storage');
        }
    }

    /**
     * Remove persisted context from storage
     */
    private removePersistedContext(): void {
        try {
            sessionStorage.removeItem(this.STORAGE_KEY);
        } catch {
            // Storage might be disabled
        }
    }
}
