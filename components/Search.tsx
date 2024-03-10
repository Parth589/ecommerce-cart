'use client';
import {Input} from "@/components/ui/input";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {Button} from "@/components/ui/button";
import {useCallback, useRef} from "react";
import Link from "next/link";

const Search = () => {
	const searchParams = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();
	// Get a new searchParams string by merging the current
	// searchParams with a provided key/value pair
	const createQueryString = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams.toString())
			params.set(name, value)

			return params.toString()
		},
		[searchParams]
	)
	const inputRef = useRef(null);
	return (
		<form onSubmit={(e)=>{e.preventDefault()}}>
			<div className={'flex gap-4 max-w-7xl mx-auto'}>
				<Input onChange={(e) => {
				}} ref={inputRef} placeholder={'Search here'}/>
				<Button type={'submit'} onClick={() => {
					// @ts-ignore
					if (searchParams.get('search') !== inputRef?.current?.value)
					// @ts-ignore
						router.push(pathname + '?' + createQueryString('search', inputRef?.current?.value || ''));
				}}>
					Search
				</Button>
			</div>
		</form>
	);
};

export default Search;