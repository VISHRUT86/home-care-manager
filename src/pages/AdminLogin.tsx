import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Smartphone, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import OTPInput from '@/components/OTPInput';

const AdminLogin = () => {
  const [step, setStep] = useState<'mobile' | 'otp'>('mobile');
  const [mobileNumber, setMobileNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { admin, sendOTP, verifyOTP } = useAdminAuth();

  useEffect(() => {
    // Redirect if already logged in
    if (admin) {
      navigate('/admin/dashboard');
    }
  }, [admin, navigate]);

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mobileNumber.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid mobile number.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const result = await sendOTP(mobileNumber);
      if (result.success) {
        setStep('otp');
        toast({
          title: "OTP Sent",
          description: result.message,
        });
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while sending OTP.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (otpCode: string) => {
    setIsLoading(true);
    try {
      const result = await verifyOTP(mobileNumber, otpCode);
      if (result.success) {
        toast({
          title: "Login Successful",
          description: "Welcome to the admin dashboard!",
        });
        navigate('/admin/dashboard');
      } else {
        toast({
          title: "Verification Failed",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred during verification.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToMobile = () => {
    setStep('mobile');
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 text-white/80 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Website</span>
        </button>

        {/* Login Card */}
        <div className="bg-white rounded-3xl shadow-[var(--shadow-large)] p-8">
          <div className="text-center mb-8">
            <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
              {step === 'mobile' ? (
                <Smartphone className="h-8 w-8 text-primary" />
              ) : (
                <Lock className="h-8 w-8 text-primary" />
              )}
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {step === 'mobile' ? 'Admin Login' : 'Verify OTP'}
            </h1>
            <p className="text-muted-foreground">
              {step === 'mobile' 
                ? 'Enter your mobile number to receive OTP'
                : `Enter the 6-digit OTP sent to ${mobileNumber}`
              }
            </p>
          </div>

          {step === 'mobile' ? (
            <form onSubmit={handleSendOTP} className="space-y-6">
              <div>
                <label htmlFor="mobile" className="block text-sm font-medium text-foreground mb-2">
                  Mobile Number
                </label>
                <div className="relative">
                  <Smartphone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    type="tel"
                    id="mobile"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="Enter your mobile number"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full btn-hero ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                    Sending OTP...
                  </>
                ) : (
                  'Send OTP'
                )}
              </button>
            </form>
          ) : (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-4 text-center">
                  Enter OTP
                </label>
                <OTPInput
                  length={6}
                  onComplete={handleVerifyOTP}
                  disabled={isLoading}
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleBackToMobile}
                  disabled={isLoading}
                  className="flex-1 px-4 py-3 border border-input rounded-lg text-foreground hover:bg-accent transition-all"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleSendOTP}
                  disabled={isLoading}
                  className="flex-1 px-4 py-3 text-primary border border-primary rounded-lg hover:bg-primary/10 transition-all"
                >
                  Resend OTP
                </button>
              </div>

              {isLoading && (
                <div className="text-center">
                  <div className="inline-flex items-center text-muted-foreground">
                    <div className="w-4 h-4 border-2 border-muted-foreground/30 border-t-muted-foreground rounded-full animate-spin mr-2"></div>
                    Verifying OTP...
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Demo Info */}
          <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
            <p className="text-xs text-muted-foreground text-center">
              <strong>Demo Mobile Number:</strong><br />
              +1234567890<br />
              OTP will be displayed in console for testing
            </p>
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs text-muted-foreground">
              Need help? Contact IT support at 
              <a href="mailto:it@careconnect.com" className="text-primary hover:underline ml-1">
                it@careconnect.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;