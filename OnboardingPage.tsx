import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ChevronRight, Upload, X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { toast } from 'sonner';
import { storage } from '../utils/storage';
import { KENYAN_UNIVERSITIES, COURSES, INTERESTS } from '../utils/mockData';

export function OnboardingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    university: '',
    course: '',
    year: '',
    bio: '',
    lookingFor: '',
    interests: [] as string[],
    photos: [] as string[],
  });

  const handleNext = () => {
    if (step === 1) {
      if (!formData.name || !formData.age || !formData.gender) {
        toast.error('Please fill in all fields');
        return;
      }
    } else if (step === 2) {
      if (!formData.university || !formData.course || !formData.year) {
        toast.error('Please fill in all fields');
        return;
      }
    } else if (step === 3) {
      if (!formData.bio || formData.interests.length < 3) {
        toast.error('Please add a bio and at least 3 interests');
        return;
      }
    } else if (step === 4) {
      if (formData.photos.length < 2) {
        toast.error('Please add at least 2 photos');
        return;
      }
    }
    
    if (step < 4) {
      setStep(step + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    const currentUser = storage.getCurrentUser();
    if (currentUser) {
      const updatedUser = {
        ...currentUser,
        name: formData.name,
        age: parseInt(formData.age),
        gender: formData.gender,
        university: formData.university,
        course: formData.course,
        year: formData.year,
        bio: formData.bio,
        lookingFor: formData.lookingFor,
        interests: formData.interests,
        photos: formData.photos,
      };
      storage.setCurrentUser(updatedUser);
      toast.success('Profile created! Welcome to UniDate 🎉');
      navigate('/discover');
    }
  };

  const toggleInterest = (interest: string) => {
    if (formData.interests.includes(interest)) {
      setFormData({
        ...formData,
        interests: formData.interests.filter(i => i !== interest),
      });
    } else {
      if (formData.interests.length < 10) {
        setFormData({
          ...formData,
          interests: [...formData.interests, interest],
        });
      }
    }
  };

  const addPhoto = () => {
    // Simulate photo upload with placeholder images
    const photoUrls = [
      'https://images.unsplash.com/photo-1631131426242-0abfa7f209c2?w=400',
      'https://images.unsplash.com/photo-1611877247362-93a1536ad38e?w=400',
      'https://images.unsplash.com/photo-1645736593731-4eef033ac37a?w=400',
      'https://images.unsplash.com/photo-1729691032175-d6edd1581a31?w=400',
    ];
    
    if (formData.photos.length < 6) {
      const newPhoto = photoUrls[formData.photos.length % photoUrls.length];
      setFormData({
        ...formData,
        photos: [...formData.photos, newPhoto],
      });
      toast.success('Photo added!');
    }
  };

  const removePhoto = (index: number) => {
    setFormData({
      ...formData,
      photos: formData.photos.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full bg-gray-900 border-purple-800">
        <CardHeader>
          <div className="flex justify-between items-center mb-2">
            <CardTitle className="text-purple-100">Create Your Profile</CardTitle>
            <span className="text-sm text-purple-400">Step {step} of 4</span>
          </div>
          <div className="w-full bg-gray-700 h-2 rounded-full">
            <div 
              className="bg-gradient-to-r from-purple-600 to-purple-400 h-2 rounded-full transition-all"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <CardDescription className="text-purple-300">Let's start with the basics</CardDescription>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-purple-200">Full Name</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your full name"
                  className="bg-gray-800 border-purple-700 text-purple-100 placeholder:text-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-purple-200">Age</label>
                <Input
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  placeholder="Enter your age"
                  min="18"
                  max="30"
                  className="bg-gray-800 border-purple-700 text-purple-100 placeholder:text-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-purple-200">Gender</label>
                <Select value={formData.gender} onValueChange={(value) => setFormData({ ...formData, gender: value })}>
                  <SelectTrigger className="bg-gray-800 border-purple-700 text-purple-100">
                    <SelectValue placeholder="Select your gender" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-purple-700">
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-purple-200">Looking For</label>
                <Select value={formData.lookingFor} onValueChange={(value) => setFormData({ ...formData, lookingFor: value })}>
                  <SelectTrigger className="bg-gray-800 border-purple-700 text-purple-100">
                    <SelectValue placeholder="Who are you looking for?" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-purple-700">
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Everyone">Everyone</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <CardDescription className="text-purple-300">Tell us about your education</CardDescription>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-purple-200">University</label>
                <Select value={formData.university} onValueChange={(value) => setFormData({ ...formData, university: value })}>
                  <SelectTrigger className="bg-gray-800 border-purple-700 text-purple-100">
                    <SelectValue placeholder="Select your university" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-purple-700">
                    {KENYAN_UNIVERSITIES.map(uni => (
                      <SelectItem key={uni} value={uni}>{uni}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-purple-200">Course</label>
                <Select value={formData.course} onValueChange={(value) => setFormData({ ...formData, course: value })}>
                  <SelectTrigger className="bg-gray-800 border-purple-700 text-purple-100">
                    <SelectValue placeholder="Select your course" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-purple-700">
                    {COURSES.map(course => (
                      <SelectItem key={course} value={course}>{course}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-purple-200">Year of Study</label>
                <Select value={formData.year} onValueChange={(value) => setFormData({ ...formData, year: value })}>
                  <SelectTrigger className="bg-gray-800 border-purple-700 text-purple-100">
                    <SelectValue placeholder="Select your year" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-purple-700">
                    <SelectItem value="1st Year">1st Year</SelectItem>
                    <SelectItem value="2nd Year">2nd Year</SelectItem>
                    <SelectItem value="3rd Year">3rd Year</SelectItem>
                    <SelectItem value="4th Year">4th Year</SelectItem>
                    <SelectItem value="5th Year">5th Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <CardDescription className="text-purple-300">Make your profile stand out</CardDescription>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-purple-200">Bio</label>
                <Textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Tell us about yourself..."
                  rows={4}
                  maxLength={500}
                  className="bg-gray-800 border-purple-700 text-purple-100 placeholder:text-purple-500"
                />
                <p className="text-xs text-purple-400 mt-1">{formData.bio.length}/500 characters</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-purple-200">
                  Interests (Select 3-10)
                </label>
                <div className="flex flex-wrap gap-2">
                  {INTERESTS.map(interest => (
                    <Badge
                      key={interest}
                      variant={formData.interests.includes(interest) ? "default" : "outline"}
                      className={`cursor-pointer ${formData.interests.includes(interest) ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'border-purple-700 text-purple-300 hover:bg-purple-900/50'}`}
                      onClick={() => toggleInterest(interest)}
                    >
                      {interest}
                    </Badge>
                  ))}
                </div>
                <p className="text-xs text-purple-400 mt-2">
                  {formData.interests.length} selected
                </p>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <CardDescription className="text-purple-300">Add your best photos (2-6 photos)</CardDescription>
              
              <div className="grid grid-cols-3 gap-4">
                {formData.photos.map((photo, index) => (
                  <div key={index} className="relative aspect-square">
                    <img
                      src={photo}
                      alt={`Photo ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <button
                      onClick={() => removePhoto(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                    >
                      <X className="size-4" />
                    </button>
                  </div>
                ))}
                
                {formData.photos.length < 6 && (
                  <button
                    onClick={addPhoto}
                    className="aspect-square border-2 border-dashed border-purple-700 rounded-lg flex flex-col items-center justify-center hover:border-purple-500 hover:bg-purple-900/30 transition-colors"
                  >
                    <Upload className="size-8 text-purple-400 mb-2" />
                    <span className="text-sm text-purple-400">Add Photo</span>
                  </button>
                )}
              </div>
              
              <p className="text-xs text-purple-400">
                In a real app, you would upload your own photos. Click "Add Photo" to use demo images.
              </p>
            </div>
          )}

          <div className="flex gap-4">
            {step > 1 && (
              <Button
                variant="outline"
                onClick={() => setStep(step - 1)}
                className="flex-1 border-purple-700 text-purple-300 hover:bg-purple-900/50"
              >
                Back
              </Button>
            )}
            <Button
              onClick={handleNext}
              className="flex-1 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600"
            >
              {step === 4 ? 'Complete' : 'Next'}
              <ChevronRight className="size-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}