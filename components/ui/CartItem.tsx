import Image from "next/image";
import RemoveFromCart from "@/components/RemoveFromCart";
import QuantityChanger from "@/components/QuantityChanger";

const CartItem = ({product}: {
	product: {
		id: string;
		image: string;
		name: string;
		brandId: string;
		brand: string;
		categoryId: string;
		category: string;
		price: string;
		description: string | null;
		quantity: number;
	}
}) => {
	console.log('final: ', {product})
	return (
		<div className="grid md:grid-cols-6 items-start gap-4">
			<div className="md:col-span-2">
				<Image
					alt="Sneaker"
					className="aspect-video overflow-hidden rounded-l-lg object-cover w-full"
					height={300}
					src={product.image}
					width={500}
				/>
			</div>
			<div className="md:col-span-4 flex justify-between items-end">
				<div className="grid gap-2 h-full">
					<h1 className="font-bold text-lg md:text-xl leading-none">{product.name}</h1>
					<p className="text-sm leading-none mt-3">By: {product.brand}</p>
					<p>Category: {product.category}</p>
					<QuantityChanger quantity={product.quantity} productID={product.id}/>
				</div>
				<div className="flex items-center gap-4">

					<div className="ml-auto text-lg font-semibold">$ {Number(product.price) * product.quantity}</div>
					<RemoveFromCart productID={product.id}/>
				</div>
			</div>
		</div>
	);
};
export default CartItem;