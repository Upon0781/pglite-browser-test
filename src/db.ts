import { PGlite } from "@electric-sql/pglite"
import { integer, pgTable, text } from "drizzle-orm/pg-core"
import { drizzle } from "drizzle-orm/pglite"

export const schema = {
	count: pgTable("count", {
		name: text("name").notNull().primaryKey(),
		count: integer("count").notNull()
	}),
}

export const pg = await PGlite.create()
await pg.exec(`
	create table count (
		name text not null primary key,
		count integer not null
	);
`)

export const db = drizzle<typeof schema>(pg)
