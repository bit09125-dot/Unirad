import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Settings, Edit, MapPin, GraduationCap, Heart } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { storage } from '../utils/storage';
import { User } from '../types';
import { NavBar } from './NavBar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner';

export function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedBio, setEditedBio] = useState('');

  useEffect(() => {
    const currentUser = storage.getCurrentUser();
    setUser(currentUser);
    if (currentUser) {
      setEditedBio(currentUser.bio);
    }
  }, []);

  const handleSaveBio = () => {
    if (user) {
      const updatedUser = { ...user, bio: editedBio };
      storage.setCurrentUser(updatedUser);
      setUser(updatedUser);
      setIsEditing(false);
      toast.success('Bio updated!');
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <div className="flex-1 flex items-center justify-center">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <NavBar />
      
      <div className="max-w-4xl mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-purple-100">My Profile</h1>
          <Button
            variant="outline"
            onClick={() => navigate('/settings')}
            className="border-purple-700 text-purple-300 hover:bg-purple-900/50"
          >
            <Settings className="size-4 mr-2" />
            Settings
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Photos */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-purple-100">Photos</h2>
            <div className="grid grid-cols-2 gap-4">
              {user.photos.map((photo, index) => (
                <Card key={index} className="overflow-hidden aspect-square border-purple-800">
                  <img
                    src={photo}
                    alt={`Photo ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </Card>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="space-y-6">
            <Card className="p-6 bg-gray-900 border-purple-800">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold mb-1 text-purple-100">
                    {user.name}, {user.age}
                  </h2>
                  <div className="flex items-center gap-2 text-purple-300 mb-2">
                    <GraduationCap className="size-4" />
                    <span>{user.course} • {user.year}</span>
                  </div>
                  <div className="flex items-center gap-2 text-purple-300">
                    <MapPin className="size-4" />
                    <span>{user.university}</span>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-purple-100">About Me</h3>
                  <Dialog open={isEditing} onOpenChange={setIsEditing}>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm" className="text-purple-300 hover:bg-purple-900/50">
                        <Edit className="size-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-gray-900 border-purple-800">
                      <DialogHeader>
                        <DialogTitle className="text-purple-100">Edit Bio</DialogTitle>
                        <DialogDescription className="text-purple-300">
                          Tell others about yourself
                        </DialogDescription>
                      </DialogHeader>
                      <Textarea
                        value={editedBio}
                        onChange={(e) => setEditedBio(e.target.value)}
                        rows={4}
                        maxLength={500}
                        className="bg-gray-800 border-purple-700 text-purple-100"
                      />
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setIsEditing(false)} className="border-purple-700 text-purple-300 hover:bg-purple-900/50">
                          Cancel
                        </Button>
                        <Button onClick={handleSaveBio} className="bg-purple-600 hover:bg-purple-700">
                          Save
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                <p className="text-purple-300">{user.bio}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2 text-purple-100">Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {user.interests.map(interest => (
                    <Badge key={interest} className="bg-purple-800 text-purple-100">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>

            {/* Stats */}
            <Card className="p-6 bg-gray-900 border-purple-800">
              <h3 className="font-semibold mb-4 text-purple-100">Statistics</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-purple-300">Total Matches</span>
                  <span className="font-bold text-lg text-purple-400">
                    {storage.getMatches().length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-purple-300">Profile Views</span>
                  <span className="font-bold text-lg text-purple-400">
                    {Math.floor(Math.random() * 100) + 50}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-purple-300">Likes Received</span>
                  <span className="font-bold text-lg text-purple-400">
                    {Math.floor(Math.random() * 50) + 20}
                  </span>
                </div>
              </div>
            </Card>

            {/* Preferences */}
            <Card className="p-6 bg-gray-900 border-purple-800">
              <h3 className="font-semibold mb-4 text-purple-100">Preferences</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-purple-300">Looking for</span>
                  <span className="font-medium text-purple-100">{user.lookingFor}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-purple-300">Age range</span>
                  <span className="font-medium text-purple-100">18-25</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-purple-300">Max distance</span>
                  <span className="font-medium text-purple-100">50 km</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}