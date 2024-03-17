import React from 'react';
import Image from "next/image";
import {getProductDetails} from "@/actions";
import {notFound} from "next/navigation";
import AddToCart from "@/components/AddToCart";

const dummyImageSRC = 'https://images.unsplash.com/photo-1596265371388-43edbaadab94'
const dummyProduct = {
	id: 'abc',
	image: dummyImageSRC,
	name: 'Dummy product',
	price: '500',
	description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text  '
}


const Page = async ({params}: { params: { id: string } }) => {
	try {
		const product = (await getProductDetails(params.id))?.[0];
		if (!product) throw new Error('product not found')
		return (
			<main className={'p-10 w-full flex justify-center items-center'}>
				<div className={'gap-7 grid md:grid-cols-2'}>
					<Image
						src={product?.product?.image || dummyProduct.image}
						width={500} height={500} alt={'product image'}
						className={'aspect-video md:aspect-auto overflow-hidden object-cover '}/>
					<div className={'flex flex-col gap-4 items-start py-6 w-full'}>
						<h2 className={'text-foreground text-3xl lg:text-4xl'}>{product?.product.name || dummyProduct.name}</h2>
						<p className={'text-muted-foreground text-lg w-full max-w-5xl'}>{product?.product.description || dummyProduct.description}</p>
						<span
							className={'text-xl font-semibold text-foreground'}>$ {product?.product.price || dummyProduct.price}</span>
						<AddToCart productID={params.id}/>
					</div>
				</div>

			</main>
		);
	} catch (e) {
		return notFound();
	}
};


export default Page;