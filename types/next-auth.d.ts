declare module 'next-auth' {
	interface Session {
		user: {
			id: string;
		} & DefaultSession['user'];
	}
}
import {NextAuthConfig as nac} from "next-auth";
export type NextAuthConfig = nac;