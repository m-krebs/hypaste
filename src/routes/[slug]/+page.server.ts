import type { PageServerLoad } from './$types';
import * as schema from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { db } from '$lib/server/db';

export const load: PageServerLoad = async ({ params }) => {
	console.log(params);
	// TODO: laod paste from db
	const paste = await db.query.paste.findMany({
		where: eq(schema.paste.id, params.slug)
	});
	return {
		paste: paste
	};
};
