import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Heart, ShieldCheck, Users, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { toast } from 'sonner';
import { storage } from '../utils/storage';

export function PaymentPage() {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      toast.error('Please enter a valid phone number');
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      toast.success('Payment successful! 🎉');
      
      // Create user account
      const newUser = {
        id: `user_${Date.now()}`,
        name: '',
        age: 0,
        university: '',
        course: '',
        year: '',
        bio: '',
        photos: [],
        interests: [],
        gender: '',
        lookingFor: '',
        hasPaid: true,
      };
      
      storage.setCurrentUser(newUser);
      setIsProcessing(false);
      navigate('/onboarding');
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-purple-950 via-black to-purple-900">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-purple-600 to-purple-400 p-4 rounded-full">
              <Heart className="size-12 text-white fill-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-purple-200 bg-clip-text text-transparent mb-2">
            Unirade Kenya
          </h1>
          <p className="text-lg text-purple-200">
            The exclusive dating platform for Kenyan university students
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-gray-900/50 border-purple-800 backdrop-blur-sm">
            <CardHeader>
              <Users className="size-8 text-purple-400 mb-2" />
              <CardTitle className="text-purple-100">Verified Students</CardTitle>
              <CardDescription className="text-purple-300">
                Connect only with verified university students
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-gray-900/50 border-purple-800 backdrop-blur-sm">
            <CardHeader>
              <ShieldCheck className="size-8 text-purple-400 mb-2" />
              <CardTitle className="text-purple-100">Safe & Secure</CardTitle>
              <CardDescription className="text-purple-300">
                Your privacy and safety are our top priority
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-gray-900/50 border-purple-800 backdrop-blur-sm">
            <CardHeader>
              <Sparkles className="size-8 text-purple-400 mb-2" />
              <CardTitle className="text-purple-100">Smart Matching</CardTitle>
              <CardDescription className="text-purple-300">
                Advanced algorithm to find your perfect match
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Payment Card */}
        <Card className="border-2 border-purple-600 bg-gray-900/70 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-purple-100">Get Started Today</CardTitle>
            <CardDescription className="text-purple-300">
              One-time activation fee to join Kenya's premier university dating platform
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-5xl font-bold text-purple-400 mb-2">
                KSh 50
              </div>
              <p className="text-purple-300">One-time activation fee</p>
            </div>

            <div className="space-y-4">
              <div className="bg-purple-900/30 border border-purple-700 rounded-lg p-4">
                <p className="text-sm font-medium text-purple-200 mb-2">Payment Instructions:</p>
                <ol className="text-sm text-purple-300 space-y-1 list-decimal list-inside">
                  <li>Go to M-Pesa on your phone</li>
                  <li>Select Lipa na M-Pesa</li>
                  <li>Select Pay Bill</li>
                  <li>Enter Business Number: <span className="font-bold text-purple-100">0724006805</span></li>
                  <li>Account Number: <span className="font-bold text-purple-100">UNIRADE</span></li>
                  <li>Amount: <span className="font-bold text-purple-100">50</span></li>
                  <li>Enter your M-Pesa PIN and send</li>
                </ol>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-purple-200">
                  Your M-Pesa Phone Number
                </label>
                <Input
                  type="tel"
                  placeholder="0712345678"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="text-lg bg-gray-900/50 border-purple-700 text-purple-100 placeholder:text-purple-400"
                  maxLength={10}
                />
                <p className="text-xs text-purple-400 mt-1">
                  Enter the phone number you used to make the payment
                </p>
              </div>

              <Button
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white text-lg py-6"
              >
                {isProcessing ? 'Verifying Payment...' : 'I Have Paid - Continue'}
              </Button>
            </div>

            <div className="text-xs text-center text-purple-400">
              <p>By continuing, you agree to our Terms of Service and Privacy Policy</p>
              <p className="mt-1">This is a demo - payment verification is simulated</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}