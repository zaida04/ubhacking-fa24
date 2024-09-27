import { z } from 'zod';

export const registerUserSchema = z.object({
  // Account 
  email: z.string().email(),
  password: z.string().min(6),
  passwordConfirm: z.string().min(6),
  
  // Personal
  nameFirst: z.string().min(2),
  nameLast: z.string().min(2),
  dob: z.string(), // Changed to accept date format from input
  phone: z.string(), // Changed to accept various phone formats
  gender: z.string().min(2),
  raceEthnicity: z.string().min(2),
  country: z.string().min(2),
  
  // Education
  schoolName: z.string().min(2),
  schoolMajor: z.string().min(2),
  levelOfStudy: z.enum(['middle school', 'high school', 'undergraduation / bachelors', 'graduation / masters', 'phd / doctorate', 'post doctorate']),
  graduationYear: z.number().int().positive(),
  
  // Shipping
  addressInUSA: z.enum(['yes', 'no']),
  address1: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
  
  // Logistics
  isAttendingInPerson: z.boolean().optional(),
  shirtSize: z.enum(['XS', 'S', 'M', 'L', 'XL', 'XXL']),
  dietaryRestrictions: z.array(z.enum(['vegetarian', 'vegan', 'halal', 'kosher', 'pescatarian', 'gluten free'])).optional(),
  dietaryRestrictionsOther: z.string().optional(),
  specialRequest: z.string().optional(),
  
  // Other
  resume: z.instanceof(File),
  howYouHeard: z.string(),
  whyAttend: z.string().max(1000),
  codeOfConductUBHacking: z.boolean(),
  codeOfConduct: z.boolean(),
  dataSharing: z.boolean(),
  communication: z.boolean().optional(),
});

export type RegisterUserSchema = z.infer<typeof registerUserSchema>;
