import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

type DrizzleDb = ReturnType<typeof drizzle<typeof schema>>;

let _db: DrizzleDb | null = null;

function getRealDb(): DrizzleDb {
  if (_db) return _db;
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      'DATABASE_URL is not set. Configure it in your hosting environment (Hostinger / Vercel / .env).',
    );
  }
  const sql = neon(url);
  _db = drizzle(sql, { schema });
  return _db;
}

/**
 * Lazy proxy so `import { db } from '@/lib/db'` does NOT touch `neon()` at module load.
 * This keeps `next build` page-data collection from crashing when DATABASE_URL is
 * absent in the build environment (e.g. preview builds). Real calls at request
 * time still throw the clear error above if the env var is missing.
 */
export const db = new Proxy({} as DrizzleDb, {
  get(_target, prop, receiver) {
    const real = getRealDb() as unknown as Record<string | symbol, unknown>;
    const value = real[prop];
    return typeof value === 'function' ? (value as Function).bind(real) : value;
  },
}) as DrizzleDb;

// Export getDb for backward compatibility if needed, though 'db' proxy is preferred.
export function getDb() {
  return db;
}
