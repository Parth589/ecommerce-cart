import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import FallBackAvatar from "@/public/vercel.svg";
import {useSession} from "next-auth/react";
// @ts-ignore
import {session} from "@auth/core/lib/actions";
import Link from "next/link";
import {Button} from "@/components/ui/button";

const UserAvatar = ({session}: { session: session }) => {
	return (
		<HoverCard>
			<HoverCardTrigger>
				<Avatar className={'w-10 aspect-square cursor-pointer'}>
					<AvatarImage src={session.user.image || FallBackAvatar}/>
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>
			</HoverCardTrigger>
			<HoverCardContent>
				<div className={'flex gap-3'}>
					<Avatar className={'w-10 aspect-square cursor-pointer'}>
						<AvatarImage src={session.user.image || FallBackAvatar}/>
						<AvatarFallback>CN</AvatarFallback>

					</Avatar>
					<div className={'flex flex-col gap-2'}>
						<span>{session.user.name}</span>
						<Link href={`mailto:${session.user.email}`}
						      className={'text-muted-foreground'}>{session.user.email}</Link>
						<Link className={'self-end'} href={'/api/auth/signout'}>
							<Button variant={'link'}>Log out</Button>
						</Link>
					</div>
				</div>
			</HoverCardContent>
		</HoverCard>
	);
};

export default UserAvatar;