import {drizzle} from "drizzle-orm/node-postgres";
import {Client} from "pg";
import * as schema from '../db/schema';

// const client = new Client({
// 	connectionString: "postgres://user:password@host:port/db",
// });

// or
const client = new Client({
	host: process.env.POSTGRES_HOST,
	port: Number(process.env.POSTGRES_PORT),
	user: process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASSWORD,
	database: process.env.POSTGRES_DATABASE,
});
const f = async () => {
	await client.connect();
	console.log('connected to database');
}
f();
export const db = drizzle(client, {schema});
