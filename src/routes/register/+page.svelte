<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import Input from "$lib/components/ui/input/input.svelte";
	import Checkbox from "$lib/components/ui/checkbox/checkbox.svelte";
	import * as Form from "$lib/components/ui/form";
	import * as Select from "$lib/components/ui/select/index.js";

	import { zodClient } from "sveltekit-superforms/adapters";
	import SuperDebug, { superForm, type Infer, type SuperValidated } from "sveltekit-superforms";
    import { registerUserSchema, type RegisterUserSchema } from "$form/register/schema";
    import type { PageData } from "./$types";



    export let data: PageData
	const validatedForm: SuperValidated<Infer<typeof registerUserSchema>> = data.form

    const form = superForm(validatedForm, {
        validators: zodClient(registerUserSchema),
        onError({ result }) {
            alert(result.error.message);
        },
    });

    const { form: formData, enhance } = form;
</script>

<div class="container mx-auto p-10 space-y-6">
    <div class="space-y-0.5">
        <h2 class="text-2xl font-bold tracking-tight">Register</h2>
        <p class="text-muted-foreground">
            Fill out the form below to register for the event.
        </p>
    </div>

    <form method="POST" use:enhance>
        <!-- Account Section -->
        <div class="space-y-4">
            <h3 class="text-lg font-semibold">Account</h3>
            <Form.Field {form} name="email">
                <Form.Control let:attrs>
                    <Form.Label>Email</Form.Label>
                    <Input type="email" {...attrs} bind:value={$formData.email} />
                </Form.Control>
                <Form.FieldErrors />
            </Form.Field>

            <Form.Field {form} name="password">
                <Form.Control let:attrs>
                    <Form.Label>Password</Form.Label>
                    <Input type="password" {...attrs} bind:value={$formData.password} />
                </Form.Control>
                <Form.FieldErrors />
            </Form.Field>

            <Form.Field {form} name="passwordConfirm">
                <Form.Control let:attrs>
                    <Form.Label>Confirm Password</Form.Label>
                    <Input type="password" {...attrs} bind:value={$formData.passwordConfirm} />
                </Form.Control>
                <Form.FieldErrors />
            </Form.Field>
        </div>

        <!-- Personal Section -->
        <div class="space-y-4 mt-8">
            <h3 class="text-lg font-semibold">Personal Information</h3>
            <Form.Field {form} name="nameFirst">
                <Form.Control let:attrs>
                    <Form.Label>First Name</Form.Label>
                    <Input {...attrs} bind:value={$formData.nameFirst} />
                </Form.Control>
                <Form.FieldErrors />
            </Form.Field>

            <Form.Field {form} name="nameLast">
                <Form.Control let:attrs>
                    <Form.Label>Last Name</Form.Label>
                    <Input {...attrs} bind:value={$formData.nameLast} />
                </Form.Control>
                <Form.FieldErrors />
            </Form.Field>

            <Form.Field {form} name="dob">
                <Form.Control let:attrs>
                    <Form.Label>Date of Birth</Form.Label>
                    <Input type="date" {...attrs} bind:value={$formData.dob} />
                </Form.Control>
                <Form.FieldErrors />
            </Form.Field>

            <Form.Field {form} name="phone">
                <Form.Control let:attrs>
                    <Form.Label>Phone Number</Form.Label>
                    <Input type="tel" {...attrs} bind:value={$formData.phone} />
                </Form.Control>
                <Form.FieldErrors />
            </Form.Field>

            <Form.Field {form} name="gender">
                <Form.Control let:attrs>
                    <Form.Label>Gender</Form.Label>
                    <Input {...attrs} bind:value={$formData.gender} />
                </Form.Control>
                <Form.FieldErrors />
            </Form.Field>

            <Form.Field {form} name="raceEthnicity">
                <Form.Control let:attrs>
                    <Form.Label>Race/Ethnicity</Form.Label>
                    <Input {...attrs} bind:value={$formData.raceEthnicity} />
                </Form.Control>
                <Form.FieldErrors />
            </Form.Field>

            <Form.Field {form} name="country">
                <Form.Control let:attrs>
                    <Form.Label>Country</Form.Label>
                    <Input {...attrs} bind:value={$formData.country} />
                </Form.Control>
                <Form.FieldErrors />
            </Form.Field>
        </div>

        <!-- Education Section -->
        <div class="space-y-4 mt-8">
            <h3 class="text-lg font-semibold">Education</h3>
            <Form.Field {form} name="schoolName">
                <Form.Control let:attrs>
                    <Form.Label>School Name</Form.Label>
                    <Input {...attrs} bind:value={$formData.schoolName} />
                </Form.Control>
                <Form.FieldErrors />
            </Form.Field>

            <Form.Field {form} name="schoolMajor">
                <Form.Control let:attrs>
                    <Form.Label>Major</Form.Label>
                    <Input {...attrs} bind:value={$formData.schoolMajor} />
                </Form.Control>
                <Form.FieldErrors />
            </Form.Field>

            <Form.Field {form} name="levelOfStudy">
                <Form.Control let:attrs>
                    <Form.Label>Level of Study</Form.Label>
                    <Select {...attrs} bind:value={$formData.levelOfStudy}>
                        <option value="middle school">Middle School</option>
                        <option value="high school">High School</option>
                        <option value="undergraduation / bachelors">Undergraduation / Bachelors</option>
                        <option value="graduation / masters">Graduation / Masters</option>
                        <option value="phd / doctorate">PhD / Doctorate</option>
                        <option value="post doctorate">Post Doctorate</option>
                    </Select>
                </Form.Control>
                <Form.FieldErrors />
            </Form.Field>

            <Form.Field {form} name="graduationYear">
                <Form.Control let:attrs>
                    <Form.Label>Graduation Year</Form.Label>
                    <Input type="number" {...attrs} bind:value={$formData.graduationYear} />
                </Form.Control>
                <Form.FieldErrors />
            </Form.Field>
        </div>

        <!-- Shipping Section -->
        <div class="space-y-4 mt-8">
            <h3 class="text-lg font-semibold">Shipping</h3>
            <Form.Field {form} name="addressInUSA">
                <Form.Control let:attrs>
                    <Form.Label>Address in USA</Form.Label>
                    <Select {...attrs} bind:value={$formData.addressInUSA}>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </Select>
                </Form.Control>
                <Form.FieldErrors />
            </Form.Field>

            {#if $formData.addressInUSA === 'yes'}
                <Form.Field {form} name="address1">
                    <Form.Control let:attrs>
                        <Form.Label>Address Line 1</Form.Label>
                        <Input {...attrs} bind:value={$formData.address1} />
                    </Form.Control>
                    <Form.FieldErrors />
                </Form.Field>

                <Form.Field {form} name="city">
                    <Form.Control let:attrs>
                        <Form.Label>City</Form.Label>
                        <Input {...attrs} bind:value={$formData.city} />
                    </Form.Control>
                    <Form.FieldErrors />
                </Form.Field>

                <Form.Field {form} name="state">
                    <Form.Control let:attrs>
                        <Form.Label>State</Form.Label>
                        <Input {...attrs} bind:value={$formData.state} />
                    </Form.Control>
                    <Form.FieldErrors />
                </Form.Field>

                <Form.Field {form} name="zipCode">
                    <Form.Control let:attrs>
                        <Form.Label>Zip Code</Form.Label>
                        <Input {...attrs} bind:value={$formData.zipCode} />
                    </Form.Control>
                    <Form.FieldErrors />
                </Form.Field>
            {/if}
        </div>

        <!-- Logistics Section -->
        <div class="space-y-4 mt-8">
            <h3 class="text-lg font-semibold">Logistics</h3>
            <Form.Field {form} name="isAttendingInPerson">
                <Form.Control let:attrs>
                    <Checkbox {...attrs} bind:checked={$formData.isAttendingInPerson}>
                        Attending in person
                    </Checkbox>
                </Form.Control>
                <Form.FieldErrors />
            </Form.Field>

            <Form.Field {form} name="shirtSize">
                <Form.Control let:attrs>
                    <Form.Label>Shirt Size</Form.Label>
                    <Select {...attrs} bind:value={$formData.shirtSize}>
                        <option value="XS">XS</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                        <option value="XXL">XXL</option>
                    </Select>
                </Form.Control>
                <Form.FieldErrors />
            </Form.Field>

            <!-- Dietary restrictions would need a custom multi-select component -->
            <Form.Field {form} name="dietaryRestrictionsOther">
                <Form.Control let:attrs>
                    <Form.Label>Other Dietary Restrictions</Form.Label>
                    <Input {...attrs} bind:value={$formData.dietaryRestrictionsOther} />
                </Form.Control>
                <Form.FieldErrors />
            </Form.Field>

            <Form.Field {form} name="specialRequest">
                <Form.Control let:attrs>
                    <Form.Label>Special Requests</Form.Label>
                    <Input {...attrs} bind:value={$formData.specialRequest} />
                </Form.Control>
                <Form.FieldErrors />
            </Form.Field>
        </div>

        <!-- Other Section -->
        <div class="space-y-4 mt-8">
            <h3 class="text-lg font-semibold">Other Information</h3>
            <Form.Field {form} name="resume">
                <Form.Control let:attrs>
                    <Form.Label>Resume</Form.Label>
                    <Input type="file" {...attrs} bind:files={$formData.resume} />
                </Form.Control>
                <Form.FieldErrors />
            </Form.Field>

            <Form.Field {form} name="howYouHeard">
                <Form.Control let:attrs>
                    <Form.Label>How did you hear about us?</Form.Label>
                    <Input {...attrs} bind:value={$formData.howYouHeard} />
                </Form.Control>
                <Form.FieldErrors />
            </Form.Field>

            <Form.Field {form} name="whyAttend">
                <Form.Control let:attrs>
                    <Form.Label>Why do you want to attend?</Form.Label>
                    <Input {...attrs} bind:value={$formData.whyAttend} />
                </Form.Control>
                <Form.FieldErrors />
            </Form.Field>

            <Form.Field {form} name="codeOfConductUBHacking">
                <Form.Control let:attrs>
                    <Checkbox {...attrs} bind:checked={$formData.codeOfConductUBHacking}>
                        I agree to the UB Hacking Code of Conduct
                    </Checkbox>
                </Form.Control>
                <Form.FieldErrors />
            </Form.Field>

            <Form.Field {form} name="codeOfConduct">
                <Form.Control let:attrs>
                    <Checkbox {...attrs} bind:checked={$formData.codeOfConduct}>
                        I agree to the MLH Code of Conduct
                    </Checkbox>
                </Form.Control>
                <Form.FieldErrors />
            </Form.Field>

            <Form.Field {form} name="dataSharing">
                <Form.Control let:attrs>
                    <Checkbox {...attrs} bind:checked={$formData.dataSharing}>
                        I agree to the data sharing policy
                    </Checkbox>
                </Form.Control>
                <Form.FieldErrors />
            </Form.Field>

            <Form.Field {form} name="communication">
                <Form.Control let:attrs>
                    <Checkbox {...attrs} bind:checked={$formData.communication}>
                        I agree to receive communication
                    </Checkbox>
                </Form.Control>
                <Form.FieldErrors />
            </Form.Field>
        </div>

        <Button type="submit" class="mt-6">Register</Button>
    </form>
</div>

<SuperDebug data={$formData} />
