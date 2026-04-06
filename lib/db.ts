import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.warn('⚠️ DATABASE_URL is not set. Database features will not work.');
}

// Fallback for build time or missing env
const sql = neon(databaseUrl || 'postgresql://localhost:5432/placeholder');
export const db = drizzle(sql, { schema });
