import ProductCard from "@/components/ui/ProductCard";
import {getProducts} from "@/actions";
import ClientPagination from "@/components/ui/ClientPagination";
import Search from "@/components/Search";

const Page = async ({searchParams}: { searchParams: { [key: string]: string | undefined } }) => {
	const products = await getProducts(Number(searchParams['page']) || 0, searchParams['search']);
	return (
		<main className={'flex flex-col p-24 max-w-7xl mx-auto'}>
			<Search/>
			<div
				className={'grid grid-cols-1 place-items-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 py-10'}>
				{/*<pre>*/}
				{/*{JSON.stringify(products,null,2)}*/}
				{/*</pre>*/}
				{products?.length == 0 && (
					<h3 className={'text-xl '}>No Products found at this page</h3>
				)}
				{products?.map(product => (
					<ProductCard key={product.id} productID={product.id} productName={product.name} price={Number(product.price)} imageURL={product.image}/>
				))}
			</div>
			<ClientPagination disableNext={Number(products?.length) < 10}/>

		</main>
	);
};

export default Page;