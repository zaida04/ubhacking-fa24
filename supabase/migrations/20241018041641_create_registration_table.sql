-- Create extension for UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create the registration table
CREATE TABLE registration (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- Account
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,  -- Note: In production, consider using Supabase Auth instead
    
    -- Personal
    name_first TEXT NOT NULL,
    name_last TEXT NOT NULL,
    dob DATE NOT NULL,
    phone TEXT,
    gender TEXT,
    race_ethnicity TEXT,
    country TEXT NOT NULL,
    
    -- Education
    school_name TEXT NOT NULL,
    school_major TEXT NOT NULL,
    level_of_study TEXT NOT NULL,
    graduation_year INTEGER NOT NULL,
    
    -- Shipping
    address_in_usa TEXT NOT NULL,
    address1 TEXT,
    city TEXT,
    state TEXT,
    zip_code TEXT,
    
    -- Logistics
    is_attending_in_person BOOLEAN,
    shirt_size TEXT NOT NULL,
    dietary_restrictions TEXT[],
    dietary_restrictions_other TEXT,
    allergies TEXT[],
    allergies_other TEXT,
    special_request TEXT,
    
    -- Other
	resume_url TEXT,
    how_you_heard TEXT,
    why_attend TEXT,
    code_of_conduct_ub_hacking BOOLEAN NOT NULL,
    code_of_conduct BOOLEAN NOT NULL,
    data_sharing BOOLEAN NOT NULL,
    communication BOOLEAN
);

-- Create index on email for faster lookups
CREATE INDEX idx_registration_email ON registration(email);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create a trigger to automatically update the updated_at timestamp
CREATE TRIGGER update_registration_modtime
BEFORE UPDATE ON registration
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();

-- Add any necessary comments
COMMENT ON TABLE registration IS 'Stores user registration information for the event';
COMMENT ON COLUMN registration.email IS 'Unique email address of the registrant';
COMMENT ON COLUMN registration.password IS 'Hashed password (if not using Supabase Auth)';
COMMENT ON COLUMN registration.level_of_study IS 'Current level of study (e.g., undergraduate, graduate)';
COMMENT ON COLUMN registration.address_in_usa IS 'Whether the registrant has a USA address';
COMMENT ON COLUMN registration.dietary_restrictions IS 'Array of dietary restrictions';
COMMENT ON COLUMN registration.allergies IS 'Array of allergies';
COMMENT ON COLUMN registration.resume_url IS 'URL to the uploaded resume file';
COMMENT ON COLUMN registration.why_attend IS 'Registrant''s reason for attending the event';
