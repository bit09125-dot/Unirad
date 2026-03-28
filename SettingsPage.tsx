import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Bell, Shield, Eye, CreditCard, HelpCircle, LogOut, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Switch } from './ui/switch';
import { Slider } from './ui/slider';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from './ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';
import { toast } from 'sonner';
import { storage } from '../utils/storage';
import { NavBar } from './NavBar';

export function SettingsPage() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    notifications: true,
    newMatches: true,
    messages: true,
    promotions: false,
    showOnline: true,
    showDistance: true,
    ageRange: [18, 25],
    maxDistance: 50,
  });

  const handleLogout = () => {
    storage.clearAll();
    toast.success('Logged out successfully');
    navigate('/');
  };

  const handleDeleteAccount = () => {
    storage.clearAll();
    toast.success('Account deleted');
    navigate('/');
  };

  return (
    <div className="min-h-screen">
      <NavBar />
      
      <div className="max-w-4xl mx-auto p-4">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/profile')}
            className="text-purple-300 hover:bg-purple-900/50"
          >
            <ArrowLeft className="size-5" />
          </Button>
          <h1 className="text-3xl font-bold text-purple-100">Settings</h1>
        </div>

        <div className="space-y-6">
          {/* Notifications */}
          <Card className="bg-gray-900 border-purple-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-100">
                <Bell className="size-5" />
                Notifications
              </CardTitle>
              <CardDescription className="text-purple-300">Manage your notification preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-purple-100">Push Notifications</p>
                  <p className="text-sm text-purple-400">Enable all push notifications</p>
                </div>
                <Switch
                  checked={settings.notifications}
                  onCheckedChange={(checked) => 
                    setSettings({ ...settings, notifications: checked })
                  }
                />
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-purple-100">New Matches</p>
                  <p className="text-sm text-purple-400">Get notified about new matches</p>
                </div>
                <Switch
                  checked={settings.newMatches}
                  onCheckedChange={(checked) => 
                    setSettings({ ...settings, newMatches: checked })
                  }
                />
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-purple-100">Messages</p>
                  <p className="text-sm text-purple-400">Get notified about new messages</p>
                </div>
                <Switch
                  checked={settings.messages}
                  onCheckedChange={(checked) => 
                    setSettings({ ...settings, messages: checked })
                  }
                />
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-purple-100">Promotions</p>
                  <p className="text-sm text-purple-400">Receive promotional offers</p>
                </div>
                <Switch
                  checked={settings.promotions}
                  onCheckedChange={(checked) => 
                    setSettings({ ...settings, promotions: checked })
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Discovery Settings */}
          <Card className="bg-gray-900 border-purple-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-100">
                <Eye className="size-5" />
                Discovery Settings
              </CardTitle>
              <CardDescription className="text-purple-300">Control who can see you and who you see</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="font-medium text-purple-100">Age Range</p>
                    <p className="text-sm text-purple-400">
                      {settings.ageRange[0]} - {settings.ageRange[1]} years
                    </p>
                  </div>
                </div>
                <Slider
                  value={settings.ageRange}
                  onValueChange={(value) => 
                    setSettings({ ...settings, ageRange: value })
                  }
                  min={18}
                  max={30}
                  step={1}
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="font-medium text-purple-100">Maximum Distance</p>
                    <p className="text-sm text-purple-400">{settings.maxDistance} km</p>
                  </div>
                </div>
                <Slider
                  value={[settings.maxDistance]}
                  onValueChange={(value) => 
                    setSettings({ ...settings, maxDistance: value[0] })
                  }
                  min={5}
                  max={100}
                  step={5}
                />
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-purple-100">Show Distance</p>
                  <p className="text-sm text-purple-400">Display distance on profiles</p>
                </div>
                <Switch
                  checked={settings.showDistance}
                  onCheckedChange={(checked) => 
                    setSettings({ ...settings, showDistance: checked })
                  }
                />
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-purple-100">Show Online Status</p>
                  <p className="text-sm text-purple-400">Let others see when you're online</p>
                </div>
                <Switch
                  checked={settings.showOnline}
                  onCheckedChange={(checked) => 
                    setSettings({ ...settings, showOnline: checked })
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Privacy & Security */}
          <Card className="bg-gray-900 border-purple-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-100">
                <Shield className="size-5" />
                Privacy & Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-start border-purple-700 text-purple-300 hover:bg-purple-900/50">
                Blocked Users
              </Button>
              <Button variant="outline" className="w-full justify-start border-purple-700 text-purple-300 hover:bg-purple-900/50">
                Privacy Policy
              </Button>
              <Button variant="outline" className="w-full justify-start border-purple-700 text-purple-300 hover:bg-purple-900/50">
                Terms of Service
              </Button>
            </CardContent>
          </Card>

          {/* Payment */}
          <Card className="bg-gray-900 border-purple-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-100">
                <CreditCard className="size-5" />
                Subscription
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-purple-900/30 border border-purple-700 rounded-lg p-4">
                <p className="font-medium text-purple-200 mb-1">Active Account</p>
                <p className="text-sm text-purple-300">
                  You have full access to Unirade Kenya
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Support */}
          <Card className="bg-gray-900 border-purple-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-100">
                <HelpCircle className="size-5" />
                Support
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-start border-purple-700 text-purple-300 hover:bg-purple-900/50">
                Help Center
              </Button>
              <Button variant="outline" className="w-full justify-start border-purple-700 text-purple-300 hover:bg-purple-900/50">
                Contact Support
              </Button>
              <Button variant="outline" className="w-full justify-start border-purple-700 text-purple-300 hover:bg-purple-900/50">
                Report a Problem
              </Button>
            </CardContent>
          </Card>

          {/* Account Actions */}
          <Card className="bg-gray-900 border-purple-800">
            <CardHeader>
              <CardTitle className="text-purple-100">Account</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" className="w-full justify-start border-purple-700 text-purple-300 hover:bg-purple-900/50">
                    <LogOut className="size-4 mr-2" />
                    Log Out
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-gray-900 border-purple-800">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-purple-100">Log out?</AlertDialogTitle>
                    <AlertDialogDescription className="text-purple-300">
                      Are you sure you want to log out of your account?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="border-purple-700 text-purple-300 hover:bg-purple-900/50">Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleLogout} className="bg-purple-600 hover:bg-purple-700">
                      Log Out
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" className="w-full justify-start border-red-700 text-red-400 hover:bg-red-900/30">
                    <Trash2 className="size-4 mr-2" />
                    Delete Account
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-gray-900 border-purple-800">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-purple-100">Delete account?</AlertDialogTitle>
                    <AlertDialogDescription className="text-purple-300">
                      This action cannot be undone. This will permanently delete your
                      account and remove all your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="border-purple-700 text-purple-300 hover:bg-purple-900/50">Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDeleteAccount}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Delete Account
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
          </Card>

          <div className="text-center text-sm text-purple-400 py-4">
            Unirade Kenya v1.0.0
          </div>
        </div>
      </div>
    </div>
  );
}