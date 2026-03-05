import {
    HttpInterceptorFn,
    HttpRequest,
    HttpHandlerFn,
    HttpEvent,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { TenantService } from './tenant.service';

/**
 * HTTP Interceptor that automatically adds tenant headers to all outgoing requests
 * 
 * Headers added:
 * - X-Tenant-ID: Current tenant identifier
 * - X-User-ID: Current user identifier (if available)
 * - X-Correlation-ID: Unique request identifier for tracing
 * 
 * Usage:
 * ```typescript
 * // In app.config.ts
 * import { provideTenantInterceptor } from '@shared-lib';
 * 
 * export const appConfig: ApplicationConfig = {
 *     providers: [
 *         provideHttpClient(withInterceptors([tenantInterceptor])),
 *     ]
 * };
 * ```
 */
export const tenantInterceptor: HttpInterceptorFn = (
    req: HttpRequest<unknown>,
    next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
    const tenantService = inject(TenantService);
    const context = tenantService.getContext();

    // Skip interceptor for external URLs
    if (isExternalUrl(req.url)) {
        return next(req);
    }

    // Build headers
    const headers: Record<string, string> = {};

    if (context.tenantId) {
        headers['X-Tenant-ID'] = context.tenantId;
    }

    if (context.userId) {
        headers['X-User-ID'] = context.userId;
    }

    // Add correlation ID for request tracing
    headers['X-Correlation-ID'] = generateCorrelationId();

    // Clone request with new headers
    const modifiedReq = req.clone({
        setHeaders: headers,
    });

    return next(modifiedReq);
};

/**
 * Check if URL is external (not our API)
 */
function isExternalUrl(url: string): boolean {
    if (url.startsWith('http://') || url.startsWith('https://')) {
        // Check if it's not our API base URL
        const apiBase = getApiBaseUrl();
        return !url.startsWith(apiBase);
    }
    return false;
}

/**
 * Get API base URL from environment
 */
function getApiBaseUrl(): string {
    // This can be configured via environment injection
    return (window as any).__API_BASE_URL__ || '';
}

/**
 * Generate unique correlation ID for request tracing
 */
function generateCorrelationId(): string {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
}
