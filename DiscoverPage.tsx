import { useState, useEffect } from 'react';
import { Heart, X, Star, MapPin, GraduationCap, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { toast } from 'sonner';
import { storage } from '../utils/storage';
import { generateMockUsers } from '../utils/mockData';
import { PotentialMatch } from '../types';
import { NavBar } from './NavBar';

export function DiscoverPage() {
  const [users, setUsers] = useState<PotentialMatch[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    const swipedUsers = storage.getSwipedUsers();
    const newUsers = generateMockUsers(20, swipedUsers);
    setUsers(newUsers);
  }, []);

  const currentUser = users[currentIndex];

  const handleSwipe = (liked: boolean) => {
    if (!currentUser) return;

    storage.addSwipedUser(currentUser.id);

    if (liked) {
      // Simulate match (30% chance)
      const isMatch = Math.random() > 0.7;
      
      if (isMatch) {
        const match = {
          id: `match_${Date.now()}`,
          userId: currentUser.id,
          name: currentUser.name,
          age: currentUser.age,
          university: currentUser.university,
          photo: currentUser.photos[0],
          matchedAt: new Date().toISOString(),
        };
        storage.addMatch(match);
        toast.success(`It's a Match! 💕 You and ${currentUser.name} liked each other!`);
      } else {
        toast.success('Liked! 💗');
      }
    }

    setCurrentIndex(currentIndex + 1);
    setShowInfo(false);

    // Load more users when running low
    if (currentIndex >= users.length - 3) {
      const swipedUsers = storage.getSwipedUsers();
      const moreUsers = generateMockUsers(20, swipedUsers);
      setUsers([...users, ...moreUsers]);
    }
  };

  const handleSuperLike = () => {
    if (!currentUser) return;
    
    storage.addSwipedUser(currentUser.id);
    
    // Super like has higher match chance (50%)
    const isMatch = Math.random() > 0.5;
    
    if (isMatch) {
      const match = {
        id: `match_${Date.now()}`,
        userId: currentUser.id,
        name: currentUser.name,
        age: currentUser.age,
        university: currentUser.university,
        photo: currentUser.photos[0],
        matchedAt: new Date().toISOString(),
      };
      storage.addMatch(match);
      toast.success(`It's a Match! 💕 ${currentUser.name} saw your Super Like!`);
    } else {
      toast.success('Super Liked! ⭐');
    }

    setCurrentIndex(currentIndex + 1);
    setShowInfo(false);
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <div className="flex-1 flex items-center justify-center">
          <Card className="p-8 text-center bg-gray-900 border-purple-800">
            <p className="text-xl mb-4 text-purple-100">No more users to show right now</p>
            <p className="text-purple-300">Check back later for new matches!</p>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col pb-20">
      <NavBar />
      
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentUser.id}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative"
            >
              <Card className="overflow-hidden shadow-2xl border-purple-800">
                {/* Photo */}
                <div className="relative h-[600px]">
                  <img
                    src={currentUser.photos[0]}
                    alt={currentUser.name}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Info button */}
                  <button
                    onClick={() => setShowInfo(!showInfo)}
                    className="absolute top-4 right-4 bg-purple-600/40 backdrop-blur-sm text-white p-2 rounded-full hover:bg-purple-600/60"
                  >
                    <Info className="size-5" />
                  </button>

                  {/* Basic info overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h2 className="text-3xl font-bold mb-2">
                      {currentUser.name}, {currentUser.age}
                    </h2>
                    <div className="flex items-center gap-2 mb-2">
                      <GraduationCap className="size-4" />
                      <span>{currentUser.course} • {currentUser.year}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <MapPin className="size-4" />
                      <span className="text-sm">{currentUser.university}</span>
                    </div>
                    {currentUser.distance && (
                      <p className="text-sm opacity-80">{currentUser.distance}</p>
                    )}
                  </div>
                </div>

                {/* Detailed info panel */}
                {showInfo && (
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="p-6 bg-gray-900 border-t border-purple-800"
                  >
                    <div className="mb-4">
                      <h3 className="font-semibold mb-2 text-purple-100">About</h3>
                      <p className="text-purple-300">{currentUser.bio}</p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-2 text-purple-100">Interests</h3>
                      <div className="flex flex-wrap gap-2">
                        {currentUser.interests.map(interest => (
                          <Badge key={interest} className="bg-purple-800 text-purple-100">
                            {interest}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </Card>

              {/* Action buttons */}
              <div className="flex justify-center items-center gap-4 mt-6">
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => handleSwipe(false)}
                  className="size-16 rounded-full border-2 border-red-500 hover:bg-red-50 bg-gray-900"
                >
                  <X className="size-8 text-red-500" />
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  onClick={handleSuperLike}
                  className="size-16 rounded-full border-2 border-blue-500 hover:bg-blue-50 bg-gray-900"
                >
                  <Star className="size-8 text-blue-500 fill-blue-500" />
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => handleSwipe(true)}
                  className="size-16 rounded-full border-2 border-purple-500 hover:bg-purple-50 bg-gray-900"
                >
                  <Heart className="size-8 text-purple-500" />
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}