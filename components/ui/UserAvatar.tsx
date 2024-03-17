import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import FallBackAvatar from "@/public/angryimg.png";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import Image from "next/image";
import {Session} from "next-auth";

const UserAvatar = ({session}: { session: Session | null }) => {
	return (
		<HoverCard>
			<HoverCardTrigger>
				<Avatar className={'w-10 aspect-square cursor-pointer'}>
					<AvatarImage src={session?.user?.image || FallBackAvatar}/>
					<AvatarFallback>
						<Image src={FallBackAvatar} width={100} height={100} alt={''}/>
					</AvatarFallback>
				</Avatar>
			</HoverCardTrigger>
			<HoverCardContent>
				{
					(!session || !session.user) ? (<div className={'flex w-fit justify-between gap-2 items-center'}>
							<span>Not Logged in</span>
							<Button variant={'link'}>
								<Link href={'/api/auth/signin'}>Log in</Link>
							</Button>
						</div>) :
						(
							<div className={'flex gap-3'}>
								<Avatar className={'w-10 aspect-square cursor-pointer'}>
									<AvatarImage src={session?.user?.image}/>
									<AvatarFallback>
										<Image src={FallBackAvatar} width={100} height={100} alt={''}/>
									</AvatarFallback>
								</Avatar>
								<div className={'flex flex-col gap-2'}>
									<span>{session?.user?.name}</span>
									<Link href={`mailto:${session?.user?.email}`}
									      className={'text-muted-foreground'}>{session?.user?.email}</Link>
									<Link className={'self-end'} href={'/api/auth/signout'}>
										<Button variant={'link'}>Log out</Button>
									</Link>
								</div>
							</div>
						)}
			</HoverCardContent>
		</HoverCard>
	);
};

export default UserAvatar;