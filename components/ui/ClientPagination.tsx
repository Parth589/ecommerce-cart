'use client'
import React, {useCallback} from 'react';
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink
} from "@/components/ui/pagination";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {Button} from "@/components/ui/button";
import Link from "next/link";

const ClientPagination = ({disableNext}:{disableNext:boolean}) => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const page = Number(searchParams.get('page'));
	const createQueryString = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams.toString())
			params.set(name, value)

			return params.toString()
		},
		[searchParams]
	)
	return (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<Button
						disabled={page === 0}
						variant={'link'}
					>
						<Link href={`${pathname}?${createQueryString('page', (page - 1).toString())}`}>
							Previous
						</Link>
					</Button>
				</PaginationItem>
				<PaginationItem>
					<PaginationLink>{page}</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<Button
						variant={'link'}
						disabled={disableNext}
					>
						<Link href={`${pathname}?${createQueryString('page', (page + 1).toString())}`}>
							Next
						</Link>
					</Button>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
};

export default ClientPagination;