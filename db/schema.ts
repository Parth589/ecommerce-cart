import {
	timestamp,
	pgTable,
	text,
	primaryKey,
	integer,
	decimal,
	uuid,
	date
} from "drizzle-orm/pg-core"
import type {AdapterAccount} from '@auth/core/adapters'

// * default schema for next-auth
export const users = pgTable("user", {
	id: text("id").notNull().primaryKey(),
	name: text("name"),
	email: text("email").notNull(),
	emailVerified: timestamp("emailVerified", {mode: "date"}),
	image: text("image"),
});

export const accounts = pgTable(
	"account",
	{
		userId: text("userId")
		.notNull()
		.references(() => users.id, {onDelete: "cascade"}),
		type: text("type").$type<AdapterAccount["type"]>().notNull(),
		provider: text("provider").notNull(),
		providerAccountId: text("providerAccountId").notNull(),
		refresh_token: text("refresh_token"),
		access_token: text("access_token"),
		expires_at: integer("expires_at"),
		token_type: text("token_type"),
		scope: text("scope"),
		id_token: text("id_token"),
		session_state: text("session_state"),
	},
	(account) => ({
		compoundKey: primaryKey({columns: [account.provider, account.providerAccountId]}),
	})
);

export const sessions = pgTable("session", {
	sessionToken: text("sessionToken").notNull().primaryKey(),
	userId: text("userId")
	.notNull()
	.references(() => users.id, {onDelete: "cascade"}),
	expires: timestamp("expires", {mode: "date"}).notNull(),
});

export const verificationTokens = pgTable(
	"verificationToken",
	{
		identifier: text("identifier").notNull(),
		token: text("token").notNull(),
		expires: timestamp("expires", {mode: "date"}).notNull(),
	},
	(vt) => ({
		compoundKey: primaryKey({columns: [vt.identifier, vt.token]}),
	})
);

// * custom schema for application
export const brands = pgTable("brand", {
	id: uuid("id").defaultRandom().notNull().primaryKey(),
	name: text('name').notNull()
});

export const categories = pgTable("category", {
	id: uuid("id").defaultRandom().notNull().primaryKey(),
	name: text("name")
});

export const products = pgTable("product", {
	id: uuid('id')
	.defaultRandom()
	.notNull()
	.primaryKey(),
	brandId: uuid('brandId')
	.notNull()
	.references(() => brands.id, {onDelete: "cascade"}),
	categoryId: uuid("categoryId")
	.notNull()
	.references(() => categories.id, {onDelete: "cascade"}),
	price: decimal("price", {
		precision: 2
	}).notNull(),
	name: text('name').notNull(),
	description: text('description'),
	quantity: integer('quantity').notNull(),
	image: text('image').notNull()
});

export const cartItems = pgTable('cartItems', {
	id: uuid('id').defaultRandom().notNull().primaryKey(),
	userId: text('userId')
	.notNull()
	.references(() => users.id, {onDelete: 'cascade'}),
	productId: uuid('productId')
	.notNull()
	.references(() => products.id, {onDelete: 'cascade'}),
	quantity: integer('quantity').notNull(),
});

export const reviews = pgTable('review', {
	id: uuid('id').defaultRandom().notNull().primaryKey(),
	ratings: decimal('ratings'),
	productId: uuid('productId')
	.notNull()
	.references(() => products.id, {onDelete: 'cascade'}),
	userId: text('userId')
	.notNull()
	.references(() => users.id, {onDelete: "cascade"}),
	date: date('date', {mode: 'string'}),
	// description: text('description')
});

