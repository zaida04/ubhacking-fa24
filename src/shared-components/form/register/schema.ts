import { z } from 'zod';

export const registerUserSchema = z.object({
  // Personal
  contactEmail: z.string().email(),
  nameFirst: z.string().min(2),
  nameLast: z.string().min(2),
  dob: z.string(), // Changed to accept date format from input
  phone: z.string(), // Changed to accept various phone formats
  gender: z.string().optional(),
  raceEthnicity: z.string().min(2).optional(),
  country: z.string().min(2).optional(),

  // Education
  schoolName: z.string().min(2),
  schoolMajor: z.string().min(2).optional(),
  levelOfStudy: z.string().optional(),
  graduationYear: z.string().optional(),

  // Shipping
  address1: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),

  // Logistics
  isAttendingInPerson: z.boolean().optional(),
  shirtSize: z.enum(['XS', 'S', 'M', 'L', 'XL', 'XXL']),
  dietaryRestrictions: z.string().optional(),
  dietaryRestrictionsOther: z.string().optional(),
  allergies: z.array(z.string()).optional(),
  allergiesOther: z.string().optional(),
  specialRequest: z.string().optional(),

  // Other
  resume: z.instanceof(File).optional(),
  howYouHeard: z.string().max(200),
  whyAttend: z.string().max(1000),
  codeOfConductUBHacking: z.boolean(),

  // MLH
  codeOfConductMLH: z.boolean(),
  dataSharingMLH: z.boolean(),
  communicationMLH: z.boolean().default(false),
});

export type RegisterUserSchema = z.infer<typeof registerUserSchema>;
