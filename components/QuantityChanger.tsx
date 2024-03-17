'use client'
import React from 'react';
import {Button} from "@/components/ui/button";
import {decrementQty, insertItemsToCart} from "@/actions";
import {useToast} from "@/components/ui/use-toast";


const QuantityChanger = ({quantity, productID}: { quantity: number, productID: string }) => {
	const {toast} = useToast();
	return (
		<div className="flex items-center gap-2">
			<Button size="icon" variant="outline" onClick={async () => {
				const res = await decrementQty(productID);
				if (res === null) {
					toast({title: 'Error removing item'});
				}
			}}>
				<MinusIcon className="w-4 h-4"/>
				<span className="sr-only">Remove one</span>
			</Button>
			<span className={'mx-3 block'}>{quantity}</span>
			<Button size="icon" variant="outline"
			        onClick={async () => {
				        const res = await insertItemsToCart(productID);
				        if (res === null) {
					        toast({title: 'Error removing item'});
				        }
			        }}>
				<PlusIcon className="w-4 h-4"/>
				<span className="sr-only">Add one</span>
			</Button>
		</div>
	);
};

// @ts-ignore


// @ts-ignore
function MinusIcon(props) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M5 12h14"/>
		</svg>
	)
}


// @ts-ignore
function PlusIcon(props) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M5 12h14"/>
			<path d="M12 5v14"/>
		</svg>
	)
}

export default QuantityChanger;