import * as React from "react"
import NavigationBar from "@/components/ui/navigation-bar";
import {auth} from "@/auth";
import UserAvatar from "@/components/ui/UserAvatar";

export async function NavBar() {
	const session = await auth();
	return (
		<nav className={'flex gap-4 justify-between items-center py-3 px-5 md:px-10'}>
			<NavigationBar/>
			<UserAvatar session={session}/>
		</nav>
	)
}