import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Signal, signal, computed } from '@angular/core';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { TenantService } from '../tenant/tenant.service';

/**
 * Pagination parameters for list queries
 */
export interface PaginationParams {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

/**
 * Paginated response wrapper
 */
export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

/**
 * API response wrapper (optional, based on your API structure)
 */
export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
    errors?: string[];
}

/**
 * Data service options
 */
export interface DataServiceOptions {
    /** Base API URL, defaults to environment apiUrl */
    baseUrl?: string;
    /** Resource path (e.g., 'users', 'products') */
    resourcePath: string;
    /** Whether to include tenant headers automatically */
    includeTenantHeaders?: boolean;
}

/**
 * Base data service for CRUD operations
 * Provides consistent API interaction patterns across the application
 * 
 * Usage:
 * ```typescript
 * @Injectable({ providedIn: 'root' })
 * export class UserService extends BaseDataService<User> {
 *     constructor() {
 *         super({ resourcePath: 'users' });
 *     }
 *     
 *     // Add custom methods
 *     getUsersByRole(role: string) {
 *         return this.getMany({ role });
 *     }
 * }
 * 
 * // In component
 * const userService = inject(UserService);
 * const users = await firstValueFrom(userService.getAll());
 * ```
 */
export abstract class BaseDataService<T extends { id?: string | number }> {
    protected http = inject(HttpClient);
    protected tenantService = inject(TenantService);

    protected baseUrl: string;
    protected resourcePath: string;
    protected includeTenantHeaders: boolean;

    // Loading state signals
    private _isLoading = signal(false);
    private _error = signal<string | null>(null);

    readonly isLoading: Signal<boolean> = this._isLoading.asReadonly();
    readonly error: Signal<string | null> = this._error.asReadonly();

    constructor(options: DataServiceOptions) {
        this.baseUrl = options.baseUrl || this.getDefaultBaseUrl();
        this.resourcePath = options.resourcePath;
        this.includeTenantHeaders = options.includeTenantHeaders ?? true;
    }

    /**
     * Get full API URL for the resource
     */
    protected get apiUrl(): string {
        return `${this.baseUrl}/${this.resourcePath}`;
    }

    /**
     * Get default base URL from environment
     */
    protected getDefaultBaseUrl(): string {
        // Override in subclass or configure via environment
        return (window as any).__API_BASE_URL__ || '/api';
    }

    // ==================== READ OPERATIONS ====================

    /**
     * Get all records
     */
    getAll(params?: Record<string, any>): Observable<T[]> {
        return this.request<T[]>('GET', this.apiUrl, { params });
    }

    /**
     * Get paginated records
     */
    getPaginated(
        pagination: PaginationParams = {},
        filters?: Record<string, any>
    ): Observable<PaginatedResponse<T>> {
        const params = {
            page: pagination.page || 1,
            limit: pagination.limit || 10,
            ...(pagination.sortBy && { sortBy: pagination.sortBy }),
            ...(pagination.sortOrder && { sortOrder: pagination.sortOrder }),
            ...filters,
        };

        return this.request<PaginatedResponse<T>>('GET', this.apiUrl, { params });
    }

    /**
     * Get a single record by ID
     */
    getById(id: string | number): Observable<T> {
        return this.request<T>('GET', `${this.apiUrl}/${id}`);
    }

    /**
     * Get records matching criteria
     */
    getMany(filters: Record<string, any>): Observable<T[]> {
        return this.request<T[]>('GET', this.apiUrl, { params: filters });
    }

    /**
     * Find first record matching criteria
     */
    findOne(filters: Record<string, any>): Observable<T | null> {
        return this.request<T[]>('GET', this.apiUrl, { params: { ...filters, limit: 1 } }).pipe(
            map((items) => items[0] || null)
        );
    }

    // ==================== WRITE OPERATIONS ====================

    /**
     * Create a new record
     */
    create(data: Partial<T>): Observable<T> {
        return this.request<T>('POST', this.apiUrl, { body: data });
    }

    /**
     * Create multiple records
     */
    createMany(data: Partial<T>[]): Observable<T[]> {
        return this.request<T[]>('POST', `${this.apiUrl}/bulk`, { body: data });
    }

    /**
     * Update an existing record
     */
    update(id: string | number, data: Partial<T>): Observable<T> {
        return this.request<T>('PATCH', `${this.apiUrl}/${id}`, { body: data });
    }

    /**
     * Replace an existing record (full update)
     */
    replace(id: string | number, data: T): Observable<T> {
        return this.request<T>('PUT', `${this.apiUrl}/${id}`, { body: data });
    }

    /**
     * Update multiple records
     */
    updateMany(ids: (string | number)[], data: Partial<T>): Observable<number> {
        return this.request<{ count: number }>('PATCH', `${this.apiUrl}/bulk`, {
            body: { ids, data },
        }).pipe(map((res) => res.count));
    }

    // ==================== DELETE OPERATIONS ====================

    /**
     * Delete a record by ID
     */
    delete(id: string | number): Observable<void> {
        return this.request<void>('DELETE', `${this.apiUrl}/${id}`);
    }

    /**
     * Delete multiple records
     */
    deleteMany(ids: (string | number)[]): Observable<number> {
        return this.request<{ count: number }>('DELETE', `${this.apiUrl}/bulk`, {
            body: { ids },
        }).pipe(map((res) => res.count));
    }

    // ==================== UTILITY METHODS ====================

    /**
     * Check if a record exists
     */
    exists(id: string | number): Observable<boolean> {
        return this.request<T>('HEAD', `${this.apiUrl}/${id}`).pipe(
            map(() => true),
            catchError(() => [false])
        );
    }

    /**
     * Count records matching criteria
     */
    count(filters?: Record<string, any>): Observable<number> {
        return this.request<{ count: number }>('GET', `${this.apiUrl}/count`, {
            params: filters,
        }).pipe(map((res) => res.count));
    }

    // ==================== PROTECTED HELPERS ====================

    /**
     * Make HTTP request with loading state management
     */
    protected request<R>(
        method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD',
        url: string,
        options: {
            body?: any;
            params?: Record<string, any>;
        } = {}
    ): Observable<R> {
        this._isLoading.set(true);
        this._error.set(null);

        // Build HTTP params
        let httpParams = new HttpParams();
        if (options.params) {
            Object.entries(options.params).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    httpParams = httpParams.set(key, String(value));
                }
            });
        }

        // Make request based on method
        let request$: Observable<R>;

        switch (method) {
            case 'GET':
                request$ = this.http.get<R>(url, { params: httpParams });
                break;
            case 'POST':
                request$ = this.http.post<R>(url, options.body, { params: httpParams });
                break;
            case 'PUT':
                request$ = this.http.put<R>(url, options.body, { params: httpParams });
                break;
            case 'PATCH':
                request$ = this.http.patch<R>(url, options.body, { params: httpParams });
                break;
            case 'DELETE':
                request$ = this.http.delete<R>(url, { params: httpParams, body: options.body });
                break;
            case 'HEAD':
                request$ = this.http.head<R>(url, { params: httpParams });
                break;
        }

        return request$.pipe(
            tap(() => this._isLoading.set(false)),
            catchError((err) => {
                this._isLoading.set(false);
                this._error.set(err.message || 'An error occurred');
                return throwError(() => err);
            })
        );
    }

    /**
     * Build query string from object
     */
    protected buildQueryString(params: Record<string, any>): string {
        return Object.entries(params)
            .filter(([, value]) => value !== undefined && value !== null)
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
            .join('&');
    }
}
