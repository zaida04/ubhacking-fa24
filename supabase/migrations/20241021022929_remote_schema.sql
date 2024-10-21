alter table "public"."registration" drop constraint "registration_email_key";

drop index if exists "public"."registration_email_key";

drop index if exists "public"."idx_registration_email";

alter table "public"."registration" drop column "address_in_usa";

alter table "public"."registration" drop column "email";

alter table "public"."registration" drop column "password";

alter table "public"."registration" add column "contact_email" text not null;

alter table "public"."registration" add column "created_by" uuid not null;

alter table "public"."registration" alter column "country" drop not null;

alter table "public"."registration" alter column "graduation_year" set data type text using "graduation_year"::text;

alter table "public"."registration" alter column "school_major" drop not null;

CREATE INDEX idx_registration_email ON public.registration USING btree (contact_email);


