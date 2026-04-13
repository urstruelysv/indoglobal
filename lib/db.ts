import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

const databaseUrl = process.env.DATABASE_URL;
let hasWarnedMissingDatabaseUrl = false;
let db: ReturnType<typeof drizzle<typeof schema>> | null = null;

function warnMissingDatabaseUrl() {
  if (!hasWarnedMissingDatabaseUrl) {
    console.warn('⚠️ DATABASE_URL is not set. Database features will not work.');
    hasWarnedMissingDatabaseUrl = true;
  }
}

export function getDb() {
  if (!databaseUrl) {
    warnMissingDatabaseUrl();
    throw new Error('DATABASE_URL is not set');
  }

  if (!db) {
    const sql = neon(databaseUrl);
    db = drizzle(sql, { schema });
  }

  return db;
}
