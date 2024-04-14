"use client";
import {Button} from "@/components/ui/button";
import {insertItemsToCart} from "@/actions";
import {useToast} from "@/components/ui/use-toast"

export default ({productID}: { productID: string }) => {
	const {toast} = useToast();
	return (
		<>
			<Button onClick={async () => {
				const {success, message} = await insertItemsToCart(productID);
				if (success) {
					// setShowToast(true);
					toast({
						title: 'Added item to Cart'
					})
				} else {
					toast({
						title: message || 'Something Unexpected occurred.'
					})
				}
			}}>Add to Cart</Button>
		</>
	)
}