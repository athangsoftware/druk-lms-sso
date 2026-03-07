/**
 * Utility functions for the prisma library
 */

/**
 * Get current date in UTC format
 */
export function getCurrentDateInUTC(): Date {
    return new Date();
}

/**
 * Deep equality check for objects
 */
export function deepEqual(obj1: any, obj2: any): boolean {
    if (obj1 === obj2) return true;

    if (typeof obj1 !== 'object' || typeof obj2 !== 'object') return false;
    if (obj1 === null || obj2 === null) return false;

    if (obj1 instanceof Date && obj2 instanceof Date) {
        return obj1.getTime() === obj2.getTime();
    }

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) return false;

    for (const key of keys1) {
        if (!keys2.includes(key)) return false;
        if (!deepEqual(obj1[key], obj2[key])) return false;
    }

    return true;
}

/**
 * Terminal styling utilities for query logging
 */
export const TerminalStyles = {
    blue: (text: string) => `\x1b[34m${text}\x1b[0m`,
    green: (text: string) => `\x1b[32m${text}\x1b[0m`,
    yellow: (text: string) => `\x1b[33m${text}\x1b[0m`,
    cyan: (text: string) => `\x1b[36m${text}\x1b[0m`,
    magenta: (text: string) => `\x1b[35m${text}\x1b[0m`,
    gray: (text: string) => `\x1b[90m${text}\x1b[0m`,
    red: (text: string) => `\x1b[31m${text}\x1b[0m`,
};
