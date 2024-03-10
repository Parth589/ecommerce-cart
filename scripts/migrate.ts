import {migrate} from 'drizzle-orm/node-postgres/migrator';
import {drizzle} from 'drizzle-orm/node-postgres';
import * as schema from '@/db/schema';
// import 'dotenv/config';
require('dotenv').config({path:'./.env.local'});
const {Client} = require('pg');
console.log({
	host: process.env.POSTGRES_HOST,
	port: Number(process.env.POSTGRES_PORT),
	user: process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASSWORD,
	database: process.env.POSTGRES_DATABASE,
});
(async () => {

	const client = new Client({
		host: process.env.POSTGRES_HOST,
		port: Number(process.env.POSTGRES_PORT),
		user: process.env.POSTGRES_USER,
		password: process.env.POSTGRES_PASSWORD,
		database: process.env.POSTGRES_DATABASE,
	});
	await client.connect();
	const drizzleDB = drizzle(client, {schema: schema});
	console.log('connected to database');
	console.log('starting migrations');

	// This will run migrations on the database, skipping the ones already applied
	await migrate(drizzleDB, {migrationsFolder: './drizzle'});
	console.log('migrations success');

	// Don't forget to close the connection, otherwise the script will hang
	await client.end();
	console.log('connection closed');

})();
