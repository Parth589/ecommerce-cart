'use server';
import {eq, ilike, or, and} from 'drizzle-orm';
import {db} from '@/db/connection';
import {brands, cartItems, categories, products, reviews} from '@/db/schema';
import {avg} from "drizzle-orm/sql/functions/aggregate";
import {auth} from "@/auth";
import {revalidatePath} from "next/cache";

export async function getProducts(pageNo: number, searchTerm?: string) {
	const offset = pageNo * 10;
	console.log({offset});
	try {
		if (searchTerm) {
			const res = await db.select({
				id: products.id,
				price: products.price,
				name: products.name,
				image: products.image,
			}).from(products)
			.innerJoin(brands,
				eq(products.brandId, brands.id)
			).innerJoin(categories,
				eq(products.categoryId, categories.id)
			).where(
				or(
					ilike(products.name, `%${searchTerm}%`),
					ilike(categories.name, `%${searchTerm}%`),
					ilike(brands.name, `%${searchTerm}%`),
				)
			).limit(10).offset(offset);
			return {success: true, data: res, message: null};
		}
		const res = await db.select().from(products).limit(10).offset(offset);
		return {success: true, data: res, message: null};
	} catch (e) {
		console.log(`Error in retrieving products`, e);
		return {success: false, message: 'Unexpected Error', data: null};
	}
}

export async function getProductDetails(productId: string) {
	try {
		console.log({productId})
		const uuidRegEx = new RegExp('^[0-9a-fA-F]{8}\\b-[0-9a-fA-F]{4}\\b-[0-9a-fA-F]{4}\\b-[0-9a-fA-F]{4}\\b-[0-9a-fA-F]{12}$')
		if (!uuidRegEx.test(productId)) {
			return {success: false, message: 'Invalid Product ID', data: null};
		}
		const res = await db.select().from(products).innerJoin(brands, eq(brands.id, products.brandId)).innerJoin(categories, eq(categories.id, products.categoryId)).where(eq(products.id, productId));
		return {success: true, data: res, message: null};
	} catch (e) {
		console.log(`Error in getting details for product with id ${productId}`, e)
		return {success: false, message: 'Unexpected Error', data: null};
	}
}

// TODO: use these server actions in next update
export async function getProductReviews(productId: string) {
	try {
		return await db.select({ratings: avg(reviews.ratings)}).from(reviews).where(eq(reviews.productId, productId));
	} catch (e) {
		console.log(`Error in getting reviews for product with id ${productId}`, e)
	}
}

export async function createReview(productId: string, ratings: number) {
	const session = await auth();
	if (!(session?.user)) {
		console.log('unauthorized user');
		return 'Error Fetching session';
	}
	try {
		return await db.insert(reviews).values({
			productId,
			userId: session.user.id,
			ratings: ratings.toString()
		}).returning();
	} catch (e) {
		console.log(`Error in creating review for product ${productId}`);
	}
}

export async function getCartItems() {
	const session = await auth();
	if (!(session?.user)) {
		console.log('unauthorized user');
		return {success: false, message: 'You are not logged in', data: null};
	}
	try {
		const res = await db.select().from(cartItems).innerJoin(products, eq(cartItems.productId, products.id)).innerJoin(brands, eq(brands.id, products.brandId)).innerJoin(categories, eq(categories.id, products.categoryId)).where(eq(cartItems.userId, session.user.id));
		return {success: true, data: res, message: null};
	} catch (e) {
		console.log(`Error in fetching cart`);
		return {success: false, message: 'Unexpected Error', data: null};
	}
}

export async function insertItemsToCart(productId: string) {
	const session = await auth();
	if (!(session?.user)) {
		console.log('unauthorized user');
		return {success: false, message: 'You are not logged in', data: null};
	}
	try {
		const conflictingRow = await db.query.cartItems.findFirst({
			where: and(eq(cartItems.productId, productId), eq(cartItems.userId, session.user.id))
		});
		let res;
		if (!conflictingRow) {
			res = await db.insert(cartItems)
			.values({
				userId: session.user.id,
				productId: productId,
				quantity: 1
			}).returning();
		} else {
			res = await db.update(cartItems)
			.set({quantity: conflictingRow.quantity + 1})
			.where(and(eq(cartItems.productId, productId), eq(cartItems.userId, session.user.id)))
			.returning();
		}
		console.log('inserted cart item', {res})
		revalidatePath('/cart');
		return {success: true, data: res, message: null};
	} catch (e) {
		console.log(`Error in adding items to cart`, e);
		return {success: false, message: 'Unexpected Error', data: null};
	}
}

export async function removeItemFromCart(productID: string) {
	const session = await auth();
	if (!(session?.user)) {
		console.log('unauthorized user');
		return {success: false, message: 'You are not logged in', data: null};
	}
	try {
		const res = await db.delete(cartItems).where(and(eq(cartItems.productId, productID), eq(cartItems.userId, session.user.id))).returning();
		console.log('removed cart item', {res})
		revalidatePath('/cart');
		return {success: true, data: res, message: null};
	} catch (e) {
		console.log(`Error in removing items to cart`, e);
		return {success: false, message: 'Unexpected Error', data: null};
	}
}

export async function decrementQty(productID: string) {
	const session = await auth();
	if (!(session?.user)) {
		console.log('unauthorized user');
		return {success: false, message: 'You are not logged in', data: null};
	}
	try {
		const prev = await db.query.cartItems.findFirst({
			where: and(eq(cartItems.productId, productID), eq(cartItems.userId, session.user.id))
		});
		if (!prev) {
			throw new Error('No previous column was found');
		}
		if (prev.quantity <= 1) {
			const res = await db.delete(cartItems).where(and(eq(cartItems.productId, productID), eq(cartItems.userId, session.user.id))).returning();
			revalidatePath('/cart');
			return {success: true, data: res, message: null};
		}
		const res = await db.update(cartItems).set({quantity: prev?.quantity - 1}).where(and(eq(cartItems.productId, productID), eq(cartItems.userId, session.user.id))).returning();
		console.log('decreased cart item', {res})
		revalidatePath('/cart');
		return {success: true, data: res, message: null};
	} catch (e) {
		console.log(`Error in removing items to cart`, e);
		return {success: false, message: 'Unexpected Error', data: null};
	}
}