import {CardContent, CardDescription, CardTitle} from "@/components/ui/card";
import CartItem from "@/components/ui/CartItem";
import {Button} from "@/components/ui/button";
import {getCartItems} from "@/actions";
import Checkout from "@/components/Checkout";

const Page = async () => {
	const cartItems = await getCartItems();
	return (
		<main className={'p-10'}>
			<div className={'flex flex-col max-w-5xl mx-auto'}>
				<div className="grid gap-1 mb-10">
					<CardTitle>Shopping Cart</CardTitle>
					<CardDescription>Your items are waiting for you</CardDescription>
				</div>
				<CardContent className={'flex flex-col gap-7'}>
					{(!cartItems || cartItems?.length === 0) && (<h3 className={'text-xl'}>No products in cart</h3>)}
					{cartItems?.map(item => {
						return (
							<CartItem key={item.cartItems.id} product={{
								...item.product,
								quantity: item.cartItems.quantity,
								brand: item.brand.name,
								category: item.category.name as string
							}}/>
						)
					})}
				</CardContent>
				<div className={'self-end'}>
					<Checkout disableCheckout={!cartItems || cartItems?.length === 0}/>
				</div>
			</div>
		</main>
	);
};

export default Page;