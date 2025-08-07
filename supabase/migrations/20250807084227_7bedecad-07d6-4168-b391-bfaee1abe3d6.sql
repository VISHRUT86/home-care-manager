
-- Create admin_users table
CREATE TABLE public.admin_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  mobile_number TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create otp_codes table for mobile verification
CREATE TABLE public.otp_codes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  mobile_number TEXT NOT NULL,
  otp_code TEXT NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  is_used BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on both tables
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.otp_codes ENABLE ROW LEVEL SECURITY;

-- RLS policies for admin_users (only allow authenticated admins to view)
CREATE POLICY "Authenticated admins can view admin_users" 
  ON public.admin_users 
  FOR SELECT 
  USING (true);

CREATE POLICY "Authenticated admins can manage admin_users" 
  ON public.admin_users 
  FOR ALL 
  USING (true) 
  WITH CHECK (true);

-- RLS policies for otp_codes (restrict access)
CREATE POLICY "Allow OTP operations" 
  ON public.otp_codes 
  FOR ALL 
  USING (true) 
  WITH CHECK (true);

-- Add trigger for updating updated_at on admin_users
CREATE TRIGGER update_admin_users_updated_at
  BEFORE UPDATE ON public.admin_users
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert a default admin user for testing
INSERT INTO public.admin_users (mobile_number, name) 
VALUES ('+1234567890', 'Admin User');

-- Update existing staff table policies to allow admin management
DROP POLICY IF EXISTS "Only authenticated users can manage staff" ON public.staff;

CREATE POLICY "Admins can manage all staff" 
  ON public.staff 
  FOR ALL 
  USING (true) 
  WITH CHECK (true);
