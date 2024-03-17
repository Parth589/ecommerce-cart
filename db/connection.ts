import {drizzle} from "drizzle-orm/vercel-postgres";
import * as schema from '@/db/schema';
import {sql} from "@vercel/postgres";

console.log('connected to database');
export const db = drizzle(sql, {schema});
