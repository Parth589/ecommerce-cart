import NextAuth, {NextAuthConfig} from "next-auth"
import Google from "next-auth/providers/google";
import {DrizzleAdapter} from "@auth/drizzle-adapter";
import {db} from "@/db/connection";

const authConfig =
	{
		adapter: DrizzleAdapter(db),
		providers: [
			// * Don't try to add more than one provider as it is causing serious problems (bcz ive used email to be unique identifier. and with different providers, it can violate this constraint)
			Google({clientId: process.env.GOOGLE_CLIENT_ID, clientSecret: process.env.GOOGLE_CLIENT_SECRET})
		],
		callbacks: {
// @ts-ignore
			session: async ({session, user}) => {
				if (!session) return;
				session.user.id = user.id;
			}
		}
	} satisfies NextAuthConfig;

export const {
	handlers:{GET,POST},
	auth,
} = NextAuth(authConfig);
