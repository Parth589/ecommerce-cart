import React from 'react';
import Image from "next/image";
import {Button} from "@/components/ui/button";
import AddToCart from "@/components/AddToCart";
import Link from "next/link";

const ProductCard = ({imageURL, productName, price, productID}: {
	imageURL?: string,
	productName: string,
	price: number,
	productID: string
}) => {
	return (

		<div className={'flex flex-col rounded-lg overflow-hidden shadow-lg w-52 '}>
			<Link href={`/products/${productID}`}>
				<Image
					src={imageURL || 'https://images.unsplash.com/photo-1596265371388-43edbaadab94?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
					width={500} height={500} alt={'product name'} className={'object-cover aspect-square'}/>
			</Link>
			<div className={'p-4 flex flex-col gap-4 bg-card border-accent border-2 rounded-b-lg'}>
				<span className={'text-lg text-card-foreground'}>{productName}</span>
				<span className={'font-bold'}>$ {price}</span>
				<AddToCart productID={productID}/>
			</div>
		</div>
	);
};

export default ProductCard;