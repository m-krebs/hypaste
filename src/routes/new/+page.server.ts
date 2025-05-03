import { db } from '$lib/server/db';
import { author, paste } from '$lib/server/db/schema';
import { parseDurationString } from '$lib/utils';
import type { Actions } from './$types';

export const actions = {
	default: async ({ request }) => {
		// TODO: create new hypaste
		const data = await request.formData();
		console.log(data);

		await db.insert(author).values({ id: 1 }).onConflictDoNothing(); // TODO: remove me

		const now = new Date();

		const parsed = parseDurationString(data.get('ttk')?.toString() || '5m');

		let multiplier = 1;

		switch (parsed?.unit) {
			case 'd':
				multiplier = 24 * 60 * 60 * 1000;
				break;
			case 'h':
				multiplier = 60 * 60 * 1000;
				break;
			case 'm':
				multiplier = 60 * 1000;
				break;
		}

		const deleteInMs = parsed?.value || 1 * multiplier;

		await db.insert(paste).values({
			authorId: 1,
			content: data.get('paste'),
			created: now,
			deleteAt: new Date(now.getTime() + deleteInMs)
		});
	}
} satisfies Actions;
