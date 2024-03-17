import {migrate} from 'drizzle-orm/vercel-postgres/migrator';
import {drizzle} from 'drizzle-orm/vercel-postgres';
import * as schema from '@/db/schema';
import {sql} from "@vercel/postgres";
require('dotenv').config();
console.log({env: process.env});
(async () => {

	const drizzleDB = drizzle(sql, {schema: schema});
	console.log('connected to database');
	console.log('starting migrations');
	// This will run migrations on the database, skipping the ones already applied
	await migrate(drizzleDB, {migrationsFolder: './drizzle'});
	console.log('migrations success');

	// Don't forget to close the connection, otherwise the script will hang
	await sql.end();
	console.log('connection closed');

})();
