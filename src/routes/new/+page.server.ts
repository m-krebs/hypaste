import { db } from '$lib/server/db';
import type { Actions } from './$types';

export const actions = {
  default: async ({ request }) => {
    // TODO: create new hypaste
    const data = await request.formData()

    db.insert()
  }
} satisfies Actions;
