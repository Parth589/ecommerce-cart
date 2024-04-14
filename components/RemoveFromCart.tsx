'use client';
import React from 'react';
import {useToast} from "@/components/ui/use-toast";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {removeItemFromCart} from "@/actions";
import {Button} from "@/components/ui/button";

const RemoveFromCart = ({productID}: { productID: string }) => {
	const {toast} = useToast();

	return (
		<AlertDialog>
			<AlertDialogTrigger>
				<Button variant={'destructive'}>
					Remove
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently remove item from your cart.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction onClick={async () => {
						const {success, message} = await removeItemFromCart(productID);
						if (success) {
							toast({title: 'Removed Item form Cart'})
						} else {
							toast({title: message || 'we\'re Having Error removing cart item'})
						}
					}}>Continue</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>

	);
};

export default RemoveFromCart;