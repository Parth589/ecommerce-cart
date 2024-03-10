import 'dotenv/config';
import type {Config} from 'drizzle-kit';

export default {
	schema: './db/schema.ts',
	out: './drizzle',
	driver: 'pg', // 'pg' | 'mysql2' | 'better-sqlite' | 'libsql' | 'turso'
	dbCredentials: {
		host: process.env.POSTGRES_HOST || "127.0.0.1",
		user: process.env.POSTGRES_USER,
		password: process.env.POSTGRES_PASSWORD,
		database: process.env.POSTGRES_DATABASE || "test",
	},
} satisfies Config;
