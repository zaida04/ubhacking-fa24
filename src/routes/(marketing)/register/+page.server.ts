import { registerUserSchema } from "$form/register/schema";
import { zod } from "sveltekit-superforms/adapters";
import type { PageServerLoad } from "./$types";
import { fail, superValidate } from "sveltekit-superforms";
import { redirect, type Actions } from "@sveltejs/kit";
import { supabase } from "$lib/supabase";
import { isDev } from "$lib/utils";

export const load: PageServerLoad = async (ctx) => {
	const getCurrentUser = await ctx.locals.safeGetSession();
	const userId = getCurrentUser?.session?.user?.id;

	if (!userId && !isDev) {
		return redirect(302, "/login");
	}
	const getExistingSubsmission = await supabase
		.from('registration')
		.select()
		.eq('created_by', userId);

	return {
		form: await superValidate(zod(registerUserSchema)),
		existingSubmission: getExistingSubsmission.data?.[0] || null
	};
};


export const actions: Actions = {
	default: async ({ request, locals }) => {
		const form = await superValidate(request, zod(registerUserSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		const getCurrentUser = await locals.safeGetSession();
		const userId = getCurrentUser?.session?.user?.id;

		if (!userId) {
			return fail(401, { form, error: "You must be logged in to submit the form." });
		}


		try {
			const formData = getFormData(form);
			// Insert data into Supabase
			const { data, error } = await supabase
				.from('registration')
				.insert([{
					...formData,
					created_by: userId,
				}])
				.select();

			if (error) {
				throw error;
			}
		} catch (e) {
			console.error(e);
			return fail(500, { form, error: "An error occurred while submitting the form." });
		}

		throw redirect(302, "/confirmed");
	}
};

const getFormData = (form: any) => {
	return {
		contact_email: form.data.contactEmail,
		name_first: form.data.nameFirst,
		name_last: form.data.nameLast,
		dob: form.data.dob,
		phone: form.data.phone,
		gender: form.data.gender,
		race_ethnicity: form.data.raceEthnicity,
		country: form.data.country,
		school_name: form.data.schoolName,
		school_major: form.data.schoolMajor,
		level_of_study: form.data.levelOfStudy,
		graduation_year: form.data.graduationYear,
		address1: form.data.address1,
		city: form.data.city,
		state: form.data.state,
		zip_code: form.data.zipCode,
		is_attending_in_person: form.data.isAttendingInPerson,
		shirt_size: form.data.shirtSize,
		dietary_restrictions: form.data.dietaryRestrictions,
		dietary_restrictions_other: form.data.dietaryRestrictionsOther,
		allergies: form.data.allergies,
		allergies_other: form.data.allergiesOther,
		special_request: form.data.specialRequest,
		how_you_heard: form.data.howYouHeard,
		why_attend: form.data.whyAttend,
		code_of_conduct_ub_hacking: form.data.codeOfConductUBHacking,
		code_of_conduct: form.data.codeOfConductMLH,
		data_sharing: form.data.dataSharingMLH,
		communication: form.data.communicationMLH
	}
}
