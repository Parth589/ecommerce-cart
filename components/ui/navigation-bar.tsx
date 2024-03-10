'use client';
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList, navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/next.svg";
import * as React from "react";
import {cn} from "@/lib/utils";
import {ToggleTheme} from "@/components/ui/ToggleTheme";

export default () => {
	return (
		<div className={'flex w-full justify-between'}>
			<NavigationMenu>
				<NavigationMenuList>
					<NavigationMenuItem className={'mr-3 md:mr-8'}>
						<Link href={'/'}>
							<Image src={Logo} alt={'logo'} width={130} className={'dark:invert'}/>
						</Link>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<Link href="/" legacyBehavior passHref>
							<NavigationMenuLink className={navigationMenuTriggerStyle()}>
								Home
							</NavigationMenuLink>
						</Link>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<Link href="/products" legacyBehavior passHref>
							<NavigationMenuLink className={navigationMenuTriggerStyle()}>
								Products
							</NavigationMenuLink>
						</Link>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<Link href="/cart" legacyBehavior passHref>
							<NavigationMenuLink className={navigationMenuTriggerStyle()}>
								Your Cart
							</NavigationMenuLink>
						</Link>
					</NavigationMenuItem>

				</NavigationMenuList>
			</NavigationMenu>
			<ToggleTheme/>
		</div>
	)
}
const ListItem = React.forwardRef<
	React.ElementRef<"a">,
	React.ComponentPropsWithoutRef<"a">
>(({className, title, children, ...props}, ref) => {
	return (
		<li>
			<NavigationMenuLink asChild>
				<a
					ref={ref}
					className={cn(
						"block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
						className
					)}
					{...props}
				>
					<div className="text-sm font-medium leading-none">{title}</div>
					<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
						{children}
					</p>
				</a>
			</NavigationMenuLink>
		</li>
	)
})
ListItem.displayName = "ListItem"