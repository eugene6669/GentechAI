import pg from 'pg';
/**
 * Database connection pool.
 *
 * Uses pg.Pool for connection pooling. The DATABASE_URL comes from .env
 * and is validated at startup by the config module.
 */
export declare const pool: import("pg").Pool;
/** Convenience wrapper — usage: `const { rows } = await query('SELECT ...', [param])` */
export declare function query<T extends pg.QueryResultRow = any>(text: string, params?: unknown[]): Promise<import("pg").QueryResult<T>>;
//# sourceMappingURL=pool.d.ts.map