import {Button} from "@/components/ui/button";
import {ToggleTheme} from "@/components/ui/ToggleTheme"
import {NavBar} from "@/components/ui/NavBar";
import Link from "next/link";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center p-24">
			<h1 className={'text-foreground text-5xl font-semibold tracking-wider'}>An eye catching headline</h1>
			<p className={'mt-8 text-muted-foreground text-center max-w-5xl'}>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores molestiae nisi veritatis.
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores molestiae nisi veritatis.
			</p>
			<div className={'flex gap-8 mt-12'}>
				<Link href={'/api/auth/signin'}>
					<Button>Login</Button>
				</Link>
				<Link href={'/api/auth/signin'}>

					<Button>Signup</Button>
				</Link>
			</div>
		</main>
	);
}
