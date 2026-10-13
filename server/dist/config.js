import 'dotenv/config';
import { z } from 'zod';
/**
 * Server configuration — validated at startup.
 *
 * If a required env var is missing the server crashes immediately with a
 * descriptive error instead of failing mysteriously later.
 */
const envSchema = z.object({
    PORT: z.coerce.number().default(4000),
    NODE_ENV: z.enum(['development', 'production']).default('development'),
    DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
    GOOGLE_CLIENT_ID: z.string().min(1, 'GOOGLE_CLIENT_ID is required'),
    GOOGLE_CLIENT_SECRET: z.string().min(1, 'GOOGLE_CLIENT_SECRET is required'),
    JWT_SECRET: z.string().min(32, 'JWT_SECRET must be at least 32 characters'),
    CLIENT_URL: z.string().url().default('http://localhost:5173'),
});
const parsed = envSchema.safeParse(process.env);
if (!parsed.success) {
    console.error('❌ Invalid environment variables:');
    console.error(parsed.error.flatten().fieldErrors);
    process.exit(1);
}
export const config = parsed.data;
//# sourceMappingURL=config.js.map