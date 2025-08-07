import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface AdminUser {
  id: string;
  mobile_number: string;
  name: string;
  is_active: boolean;
}

interface AdminAuthContextType {
  admin: AdminUser | null;
  isLoading: boolean;
  sendOTP: (mobileNumber: string) => Promise<{ success: boolean; message: string }>;
  verifyOTP: (mobileNumber: string, otpCode: string) => Promise<{ success: boolean; message: string; admin?: AdminUser }>;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if admin is already logged in
    const storedAdmin = localStorage.getItem('admin_user');
    if (storedAdmin) {
      setAdmin(JSON.parse(storedAdmin));
    }
    setIsLoading(false);
  }, []);

  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const sendOTP = async (mobileNumber: string): Promise<{ success: boolean; message: string }> => {
    try {
      // Check if mobile number exists in admin_users
      const { data: adminUser, error: adminError } = await supabase
        .from('admin_users')
        .select('*')
        .eq('mobile_number', mobileNumber)
        .eq('is_active', true)
        .single();

      if (adminError || !adminUser) {
        return { success: false, message: 'Mobile number not found or inactive admin user' };
      }

      const otpCode = generateOTP();
      const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now

      // Store OTP in database
      const { error: otpError } = await supabase
        .from('otp_codes')
        .insert({
          mobile_number: mobileNumber,
          otp_code: otpCode,
          expires_at: expiresAt.toISOString()
        });

      if (otpError) {
        return { success: false, message: 'Failed to generate OTP' };
      }

      // In a real app, send SMS here
      console.log(`OTP sent to ${mobileNumber}: ${otpCode}`);
      
      return { success: true, message: `OTP sent to ${mobileNumber}. For demo: ${otpCode}` };
    } catch (error) {
      return { success: false, message: 'An error occurred while sending OTP' };
    }
  };

  const verifyOTP = async (mobileNumber: string, otpCode: string): Promise<{ success: boolean; message: string; admin?: AdminUser }> => {
    try {
      // Verify OTP
      const { data: otpData, error: otpError } = await supabase
        .from('otp_codes')
        .select('*')
        .eq('mobile_number', mobileNumber)
        .eq('otp_code', otpCode)
        .eq('is_used', false)
        .gt('expires_at', new Date().toISOString())
        .single();

      if (otpError || !otpData) {
        return { success: false, message: 'Invalid or expired OTP' };
      }

      // Mark OTP as used
      await supabase
        .from('otp_codes')
        .update({ is_used: true })
        .eq('id', otpData.id);

      // Get admin user details
      const { data: adminUser, error: adminError } = await supabase
        .from('admin_users')
        .select('*')
        .eq('mobile_number', mobileNumber)
        .eq('is_active', true)
        .single();

      if (adminError || !adminUser) {
        return { success: false, message: 'Admin user not found' };
      }

      // Store admin in localStorage and state
      localStorage.setItem('admin_user', JSON.stringify(adminUser));
      setAdmin(adminUser);

      return { success: true, message: 'Login successful', admin: adminUser };
    } catch (error) {
      return { success: false, message: 'An error occurred during verification' };
    }
  };

  const logout = () => {
    localStorage.removeItem('admin_user');
    setAdmin(null);
  };

  return (
    <AdminAuthContext.Provider value={{ admin, isLoading, sendOTP, verifyOTP, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};