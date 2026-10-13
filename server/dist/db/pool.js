import pg from 'pg';
import { config } from '../config.js';
/**
 * Database connection pool.
 *
 * Uses pg.Pool for connection pooling. The DATABASE_URL comes from .env
 * and is validated at startup by the config module.
 */
export const pool = new pg.Pool({
    connectionString: config.DATABASE_URL,
    max: 20,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 5_000,
});
/** Convenience wrapper — usage: `const { rows } = await query('SELECT ...', [param])` */
export function query(text, params) {
    return pool.query(text, params);
}
//# sourceMappingURL=pool.js.map