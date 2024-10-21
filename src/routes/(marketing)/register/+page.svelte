<script lang="ts">
  import { superForm } from "sveltekit-superforms/client";
  import { Button } from "$lib/components/ui/button";
  import { Label } from "$lib/components/ui/label";
  import { Checkbox } from "$lib/components/ui/checkbox";
  import * as Form from "$lib/components/ui/form";
  import type { PageServerData } from "./$types";
  import MenuInput from "../_components/MenuInput.svelte";
  import FormSection from "../_components/FormSection.svelte";
    import { schools } from "./schools";
    import { countries } from "./countries";

  export let data: PageServerData;
  const { form, errors, enhance } = superForm(data.form, {
    invalidateAll: false,
    resetForm: false,
  });

  $: graduationYearOptions = Array.from({ length: 10 }, (_, i) => {
    const year = new Date().getFullYear() + i;
    return { value: year, label: year.toString() };
  });

  const shirtSizeOptions = [
    { value: "XS", label: "XS" },
    { value: "S", label: "S" },
    { value: "M", label: "M" },
    { value: "L", label: "L" },
    { value: "XL", label: "XL" },
    { value: "XXL", label: "XXL" },
  ];
  const dietaryRestrictionsOptions = [
    { value: "none", label: "None" },
	{ value: "gluten-free", label: "Gluten-Free" },
	{ value: "vegan", label: "Vegan" },
    { value: "halal", label: "Halal" },
    { value: "kosher", label: "Kosher" },
    { value: "vegetarian", label: "Vegetarian" },
  ];
  const levelOfStudy = [
    { value: "high school", label: "High School" },
    { value: "undergraduate", label: "Undergraduate" },
    { value: "masters", label: "Masters" },
  ];

  $: canSubmit = $form.codeOfConductUBHacking 
	  && $form.codeOfConductMLH 
	  && $form.dataSharingMLH
	  && $form.communicationMLH
</script>

<div class="bg-yellow-50 p-4 flex justify-center" id="bg">
  <div
    class="w-full md:w-[50rem] bg-white shadow-2xl p-8 -outline-offset-8 outline-double outline-black outline-4"
  >
    <h1 class="text-2xl text-center font-serif">UB Hacking Application</h1>

    <p class="text-center text-lg text-gray-600 italic font-serif mb-6">
      Please fill out the form below to apply for UB Hacking
    </p>

    <form class="space-y-6" method="POST" use:enhance>
      <FormSection title="Personal Information">
        <div class="space-y-2">
          <MenuInput
            id="nameFirst"
            required
            label="First Name"
            type="text"
            name="nameFirst"
            bind:value={$form.nameFirst}
          />
          <Form.Error error={$errors.nameFirst} />
        </div>
        <div class="space-y-2">
          <MenuInput
            id="nameLast"
            required
            label="Last Name"
            type="text"
            name="nameLast"
            bind:value={$form.nameLast}
          />
          <Form.Error error={$errors.nameLast} />
        </div>
        <div class="space-y-2">
          <MenuInput
            id="contactEmail"
            required
            label="Contact Email"
            type="email"
            name="contactEmail"
            placeholder="jane.doe@buffalo.edu"
            bind:value={$form.contactEmail}
          />
          <Form.Error error={$errors.contactEmail} />
        </div>
        <div class="space-y-2">
          <MenuInput
            id="dob"
            required
            label="Date of Birth"
            type="date"
            name="dob"
            bind:value={$form.dob}
          />
          <Form.Error error={$errors.dob} />
        </div>
        <div class="space-y-2">
          <MenuInput
            id="phone"
            required
            label="Phone"
            type="text"
            name="phone"
            placeholder="+1 (555) 123-4567"
            bind:value={$form.phone}
          />
          <Form.Error error={$errors.phone} />
        </div>
        <div class="space-y-2">
          <MenuInput
            id="gender"
            label="Pronouns / Gender"
            type="text"
            name="gender"
            bind:value={$form.gender}
          />
          <Form.Error error={$errors.gender} />
        </div>
        <div class="space-y-2">
          <MenuInput
            id="raceEthnicity"
            label="Race/Ethnicity"
            type="text"
            name="raceEthnicity"
            bind:value={$form.raceEthnicity}
          />
          <Form.Error error={$errors.raceEthnicity} />
        </div>
        <div class="space-y-2">
          <MenuInput
            id="country"
            label="Country"
            type="select"
            name="country"
            bind:value={$form.country}
			options={countries.map((name) => ({
					value: name,
					label: name
			}))}
          />
          <Form.Error error={$errors.country} />
        </div>
      </FormSection>

      <FormSection title="Education">
        <div class="space-y-2">
          <MenuInput
            id="schoolName"
            required
            label="School Name"
            type="select"
            name="schoolName"
			options={schools.map((name) => ({
			  value: name,
			  label: name
			  }))}
            bind:value={$form.schoolName}
          />
          <Form.Error error={$errors.schoolName} />
        </div>
        <div class="space-y-2">
          <MenuInput
            id="schoolMajor"
            label="Major"
            type="text"
            name="schoolMajor"
            bind:value={$form.schoolMajor}
          />
          <Form.Error error={$errors.schoolMajor} />
        </div>
        <div class="space-y-2">
          <MenuInput
            type="select"
            id="levelOfStudy"
            name="levelOfStudy"
            label="Level of Study"
            options={levelOfStudy.map((option) => ({
              value: option.value,
              label: option.label,
            }))}
            bind:value={$form.levelOfStudy}
            error={$errors.levelOfStudy}
            placeholder="Select your level of study"
          />
          <MenuInput
            type="select"
            id="graduationYear"
            name="graduationYear"
            label="Graduation Year"
            options={graduationYearOptions}
            bind:value={$form.graduationYear}
            error={$errors.graduationYear}
            placeholder="Select graduation year"
          />
        </div>
      </FormSection>

      <FormSection title="Shipping Information">
        <div class="space-y-2">
          <MenuInput
            id="address1"
            required
            label="Address"
            type="text"
            name="address1"
            bind:value={$form.address1}
          />
          <Form.Error error={$errors.address1} />
        </div>
        <div class="space-y-2">
          <MenuInput
            id="city"
            required
            label="City"
            type="text"
            name="city"
            bind:value={$form.city}
          />
          <Form.Error error={$errors.city} />
        </div>
        <div class="space-y-2">
          <MenuInput
            id="state"
            required
            label="State"
            type="text"
            name="state"
            bind:value={$form.state}
          />
          <Form.Error error={$errors.state} />
        </div>
        <div class="space-y-2">
          <MenuInput
            id="zipCode"
            required
            label="ZIP Code"
            type="text"
            name="zipCode"
            bind:value={$form.zipCode}
          />
          <Form.Error error={$errors.zipCode} />
        </div>
      </FormSection>

      <FormSection title="Logistics">
        <div class="space-y-2">
          <Label class="text-sm font-medium">Attending In Person?</Label>
          <Checkbox
            id="isAttendingInPerson"
            name="isAttendingInPerson"
            bind:checked={$form.isAttendingInPerson}
          />
        </div>
        <div class="space-y-2">
          <MenuInput
            type="select"
            id="shirtSize"
            name="shirtSize"
            label="Shirt Size"
            required={true}
            options={shirtSizeOptions.map((option) => ({
              value: option.value,
              label: option.label,
            }))}
            bind:value={$form.shirtSize}
            error={$errors.shirtSize}
            placeholder="Select your shirt size"
          />
        </div>
        <div class="space-y-2">
          <MenuInput
            id="specialRequest"
            label="Special Requests"
            type="text"
            name="specialRequest"
            bind:value={$form.specialRequest}
          />
          <Form.Error error={$errors.specialRequest} />
        </div>
        <div class="space-y-2">
          <MenuInput
            type="select"
            id="dietaryRestrictions"
            name="dietaryRestrictions"
            label="Dietary Restrictions"
            options={dietaryRestrictionsOptions.map((option) => ({
              value: option.value,
              label: option.label,
            }))}
            bind:value={$form.dietaryRestrictions}
            error={$errors.dietaryRestrictions}
            placeholder="Select dietary restriction"
          />
          <div class="space-y-2 mt-2">
            <MenuInput
              id="dietaryRestrictionsOther"
              label="Other Dietary Restrictions"
              type="text"
              name="dietaryRestrictionsOther"
              placeholder="(Please Specify)"
              bind:value={$form.dietaryRestrictionsOther}
            />
            <Form.Error error={$errors.dietaryRestrictionsOther} />
          </div>
        </div>
        <div class="space-y-2">
          <MenuInput
            id="allergiesOther"
            type="text"
            name="allergiesOther"
            label="Allergies"
            placeholder="(Please Specify)"
            bind:value={$form.allergiesOther}
            error={$errors.allergiesOther}
          />
        </div>
      </FormSection>

      <FormSection title="Other Information">
        <div class="space-y-2">
          <MenuInput
            id="howYouHeard"
            required
            label="How did you hear about us?"
            type="text"
            name="howYouHeard"
            bind:value={$form.howYouHeard}
          />
          <Form.Error error={$errors.howYouHeard} />
        </div>
        <div class="space-y-2">
          <MenuInput
            id="whyAttend"
            required
            label="Why do you want to attend?"
            type="text"
            name="whyAttend"
            bind:value={$form.whyAttend}
          />
          <Form.Error error={$errors.whyAttend} />
        </div>
		<hr>
        <div class="flex items-center space-x-2">
          <Checkbox
            id="codeOfConductUBHacking"
            name="codeOfConductUBHacking"
            required
            bind:checked={$form.codeOfConductUBHacking}
          />
          <Label for="codeOfConductUBHacking" class="text-sm font-medium">
            I agree to the UB Hacking Code of Conduct
          </Label>
        </div>
        <div class="flex items-center space-x-2">
          <Checkbox
            id="codeOfConductMLH"
            name="codeOfConductMLH"
            required
            bind:checked={$form.codeOfConductMLH}
          />
          <Label for="codeOfConductMLH" class="text-sm font-medium">
            I have read and agree to the 
			<a class="font-sans text-green-700"
			href="https://github.com/MLH/mlh-policies/blob/main/code-of-conduct.md">
			MLH Code of Conduct
			</a>.
          </Label>
        </div>
		<div class="flex items-center space-x-2">
		  <Checkbox
			id="dataSharingMLH"
			name="dataSharingMLH"
			required
			bind:checked={$form.dataSharingMLH}
		  />
		  <Label for="dataSharingMLH" class="text-sm font-medium">
			I authorize you to share my application/registration information with Major League Hacking for event administration, ranking, and MLH administration in-line with the{' '}
			<a class="font-sans text-green-700" href="https://github.com/MLH/mlh-policies/blob/main/privacy-policy.md">
			  MLH Privacy Policy
			</a>
			. I further agree to the terms of both the{' '}
			<a class="font-sans text-green-700" href="https://github.com/MLH/mlh-policies/blob/main/contest-terms.md">
			  MLH Contest Terms and Conditions
			</a>
			{' '}and the{' '}
			<a class="font-sans text-green-700" href="https://github.com/MLH/mlh-policies/blob/main/privacy-policy.md">
			  MLH Privacy Policy
			</a>
			.
		  </Label>
		</div>
		<div class="flex items-center space-x-2">
		  <Checkbox
			id="communicationMLH"
			name="communicationMLH"
			required
			bind:checked={$form.communicationMLH}
		  />
		  <Label for="communicationMLH" class="text-sm font-medium">
			I authorize MLH to send me occasional emails about relevant events, career opportunities, and community announcements.
		  </Label>
		</div>
      </FormSection>

      <!-- Submit Button -->
      <div class="pt-4">
        <Button
          type="submit"
          disabled={!canSubmit}
          size="lg"
        >
          Submit Application
        </Button>
      </div>
    </form>
  </div>
</div>

<style>
  #bg {
    background-color: hsl(34, 53%, 82%);
    background-image: repeating-linear-gradient(
        45deg,
        transparent 5px,
        hsla(197, 62%, 11%, 0.5) 5px,
        hsla(197, 62%, 11%, 0.5) 10px,
        hsla(5, 53%, 63%, 0) 10px,
        hsla(5, 53%, 63%, 0) 35px,
        hsla(5, 53%, 63%, 0.5) 35px,
        hsla(5, 53%, 63%, 0.5) 40px,
        hsla(197, 62%, 11%, 0.5) 40px,
        hsla(197, 62%, 11%, 0.5) 50px,
        hsla(197, 62%, 11%, 0) 50px,
        hsla(197, 62%, 11%, 0) 60px,
        hsla(5, 53%, 63%, 0.5) 60px,
        hsla(5, 53%, 63%, 0.5) 70px,
        hsla(35, 91%, 65%, 0.5) 70px,
        hsla(35, 91%, 65%, 0.5) 80px,
        hsla(35, 91%, 65%, 0) 80px,
        hsla(35, 91%, 65%, 0) 90px,
        hsla(5, 53%, 63%, 0.5) 90px,
        hsla(5, 53%, 63%, 0.5) 110px,
        hsla(5, 53%, 63%, 0) 110px,
        hsla(5, 53%, 63%, 0) 120px,
        hsla(197, 62%, 11%, 0.5) 120px,
        hsla(197, 62%, 11%, 0.5) 140px
      ),
      repeating-linear-gradient(
        135deg,
        transparent 5px,
        hsla(197, 62%, 11%, 0.5) 5px,
        hsla(197, 62%, 11%, 0.5) 10px,
        hsla(5, 53%, 63%, 0) 10px,
        hsla(5, 53%, 63%, 0) 35px,
        hsla(5, 53%, 63%, 0.5) 35px,
        hsla(5, 53%, 63%, 0.5) 40px,
        hsla(197, 62%, 11%, 0.5) 40px,
        hsla(197, 62%, 11%, 0.5) 50px,
        hsla(197, 62%, 11%, 0) 50px,
        hsla(197, 62%, 11%, 0) 60px,
        hsla(5, 53%, 63%, 0.5) 60px,
        hsla(5, 53%, 63%, 0.5) 70px,
        hsla(35, 91%, 65%, 0.5) 70px,
        hsla(35, 91%, 65%, 0.5) 80px,
        hsla(35, 91%, 65%, 0) 80px,
        hsla(35, 91%, 65%, 0) 90px,
        hsla(5, 53%, 63%, 0.5) 90px,
        hsla(5, 53%, 63%, 0.5) 110px,
        hsla(5, 53%, 63%, 0) 110px,
        hsla(5, 53%, 63%, 0) 140px,
        hsla(197, 62%, 11%, 0.5) 140px,
        hsla(197, 62%, 11%, 0.5) 160px
      );
  }

  #menu {
    background:
      linear-gradient(
        45deg,
        rgba(221, 204, 170, 0.05) 12%,
        transparent 0,
        transparent 88%,
        rgba(221, 204, 170, 0.05) 0
      ),
      linear-gradient(
        135deg,
        transparent 37%,
        rgba(170, 136, 85, 0.05) 0,
        rgba(170, 136, 85, 0.05) 63%,
        transparent 0
      ),
      linear-gradient(
          45deg,
          transparent 37%,
          rgba(221, 204, 170, 0.05) 0,
          rgba(221, 204, 170, 0.05) 63%,
          transparent 0
        )
        rgba(119, 85, 51, 0.05);
    background-size: 25px 25px;
  }
</style>
