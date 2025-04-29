import type { Actions } from './$types';

export const actions = {
        default: async ({ request }) => {
                // TODO: create new hypaste
                const data = await request.formData()
                data.entries().forEach(item => console.log(item))
        }
} satisfies Actions;
