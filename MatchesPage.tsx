import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Heart, MessageCircle } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { storage } from '../utils/storage';
import { Match } from '../types';
import { NavBar } from './NavBar';
import { formatDistanceToNow } from 'date-fns';

export function MatchesPage() {
  const navigate = useNavigate();
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    setMatches(storage.getMatches());
  }, []);

  if (matches.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <div className="flex-1 flex items-center justify-center p-4">
          <Card className="p-8 text-center max-w-md bg-gray-900 border-purple-800">
            <Heart className="size-16 text-purple-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2 text-purple-100">No matches yet</h2>
            <p className="text-purple-300 mb-6">
              Start swiping to find your perfect match!
            </p>
            <Button
              onClick={() => navigate('/discover')}
              className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600"
            >
              Start Swiping
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <NavBar />
      
      <div className="max-w-4xl mx-auto p-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2 text-purple-100">Your Matches</h1>
          <p className="text-purple-300">
            You have {matches.length} {matches.length === 1 ? 'match' : 'matches'}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {matches.map(match => (
            <Card key={match.id} className="overflow-hidden hover:shadow-lg transition-shadow border-purple-800">
              <div className="relative aspect-[3/4]">
                <img
                  src={match.photo}
                  alt={match.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="text-xl font-bold mb-1">
                    {match.name}, {match.age}
                  </h3>
                  <p className="text-sm opacity-90 mb-3">{match.university}</p>
                  
                  {match.lastMessage && (
                    <div className="bg-purple-900/40 backdrop-blur-sm rounded-lg p-2 mb-3 border border-purple-700/30">
                      <p className="text-xs truncate">{match.lastMessage}</p>
                      {match.lastMessageTime && (
                        <p className="text-xs opacity-75 mt-1">
                          {formatDistanceToNow(new Date(match.lastMessageTime), { addSuffix: true })}
                        </p>
                      )}
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button
                      onClick={() => navigate(`/messages/${match.id}`)}
                      className="flex-1 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600"
                    >
                      <MessageCircle className="size-4 mr-2" />
                      Message
                    </Button>
                  </div>

                  <p className="text-xs opacity-75 mt-2">
                    Matched {formatDistanceToNow(new Date(match.matchedAt), { addSuffix: true })}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}