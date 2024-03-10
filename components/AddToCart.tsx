"use client";
import {Button} from "@/components/ui/button";
import {insertItemsToCart} from "@/actions";
import {useToast} from "@/components/ui/use-toast"

export default ({productID}: { productID: string }) => {
	const {toast} = useToast();
	return (
		<>
			<Button onClick={async () => {
				const res = await insertItemsToCart(productID);
				if (res !== null) {
					// setShowToast(true);
					toast({
						title: 'Added item to Cart'
					})
				}else{
					toast({
						title: 'We\'re having error adding item to Cart'
					})
				}
			}}>Add to Cart</Button>
		</>
	)
}