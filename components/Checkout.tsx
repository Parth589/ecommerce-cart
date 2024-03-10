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
import {Button} from "@/components/ui/button";

const Checkout = ({disableCheckout}:{disableCheckout:boolean}) => {
	const {toast} = useToast();
	return (
		<AlertDialog>
			<AlertDialogTrigger disabled={disableCheckout}>
				<Button disabled={disableCheckout} variant={'default'} size={'lg'}>
					Checkout
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>You are going to checkout. proceed?</AlertDialogTitle>
					<AlertDialogDescription>
						In the next page Enter your payment method and do as given on that page.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction onClick={async () => {
						toast({title: 'I dont have time to implement payments'});
					}}>Continue</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>

	);
};

export default Checkout;