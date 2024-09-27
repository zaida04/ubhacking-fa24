import { registerUserSchema } from "$form/register/schema";
import { zod } from "sveltekit-superforms/adapters";
import type { PageServerLoad } from "./$types";
import { superValidate } from "sveltekit-superforms";

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(registerUserSchema)),
	};
};

