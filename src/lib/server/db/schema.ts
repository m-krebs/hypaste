import { sqliteTable, text, integer, blob, index } from 'drizzle-orm/sqlite-core';
import { createId } from '@paralleldrive/cuid2';
import { seed } from 'drizzle-seed';
import { db } from '.';

export const author = sqliteTable('author', {
	id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true })
});

export const paste = sqliteTable(
	'paste',
	{
		id: text('id').$defaultFn(() => createId()),
		created: integer('created', { mode: 'timestamp_ms' }),
		deleteAt: integer('deleteAt', { mode: 'timestamp_ms' }),
		authorId: integer('author_id').references(() => author.id),
		content: blob('content')
	},
	(table) => [index('delete_at_idx').on(table.deleteAt)]
);

// async function main() {
// 	await seed(db, { author })
// }
