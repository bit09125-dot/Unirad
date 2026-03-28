import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ArrowLeft, Send, MoreVertical } from 'lucide-react';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { storage } from '../utils/storage';
import { Match, Message } from '../types';
import { NavBar } from './NavBar';
import { formatDistanceToNow } from 'date-fns';

export function MessagesPage() {
  const navigate = useNavigate();
  const { matchId } = useParams();
  const [matches, setMatches] = useState<Match[]>([]);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const currentUser = storage.getCurrentUser();

  useEffect(() => {
    const allMatches = storage.getMatches();
    setMatches(allMatches);

    if (matchId) {
      const match = allMatches.find(m => m.id === matchId);
      if (match) {
        setSelectedMatch(match);
        loadMessages(matchId);
      }
    }
  }, [matchId]);

  const loadMessages = (mId: string) => {
    const msgs = storage.getMessages(mId);
    setMessages(msgs);
    setTimeout(() => scrollToBottom(), 100);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedMatch || !currentUser) return;

    const message: Message = {
      id: `msg_${Date.now()}`,
      matchId: selectedMatch.id,
      senderId: currentUser.id,
      text: newMessage,
      timestamp: new Date().toISOString(),
      read: false,
    };

    storage.addMessage(message);
    setMessages([...messages, message]);
    setNewMessage('');
    scrollToBottom();

    // Simulate response
    setTimeout(() => {
      const responses = [
        "That's awesome! 😊",
        "Haha I love that!",
        "Tell me more!",
        "Same here! 💕",
        "What are you up to today?",
        "That sounds great!",
        "I totally agree!",
      ];
      
      const response: Message = {
        id: `msg_${Date.now()}_response`,
        matchId: selectedMatch.id,
        senderId: selectedMatch.userId,
        text: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date().toISOString(),
        read: false,
      };

      storage.addMessage(response);
      setMessages(prev => [...prev, response]);
      scrollToBottom();
    }, 1000 + Math.random() * 2000);
  };

  const handleSelectMatch = (match: Match) => {
    setSelectedMatch(match);
    navigate(`/messages/${match.id}`);
  };

  if (matches.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <div className="flex-1 flex items-center justify-center p-4">
          <Card className="p-8 text-center max-w-md bg-gray-900 border-purple-800">
            <h2 className="text-2xl font-bold mb-2 text-purple-100">No messages yet</h2>
            <p className="text-purple-300 mb-6">
              Match with someone to start chatting!
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
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <div className="flex-1 flex overflow-hidden">
        {/* Matches list */}
        <div className={`${selectedMatch ? 'hidden md:block' : 'block'} w-full md:w-80 border-r border-purple-800 bg-gray-900 overflow-y-auto`}>
          <div className="p-4 border-b border-purple-800">
            <h2 className="text-xl font-bold text-purple-100">Messages</h2>
          </div>
          
          <div>
            {matches.map(match => (
              <button
                key={match.id}
                onClick={() => handleSelectMatch(match)}
                className={`w-full p-4 flex items-center gap-3 hover:bg-purple-900/50 transition-colors ${
                  selectedMatch?.id === match.id ? 'bg-purple-900/70' : ''
                }`}
              >
                <Avatar className="size-12">
                  <AvatarImage src={match.photo} alt={match.name} />
                  <AvatarFallback>{match.name[0]}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1 text-left overflow-hidden">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-semibold text-purple-100">{match.name}</span>
                    {match.lastMessageTime && (
                      <span className="text-xs text-purple-400">
                        {formatDistanceToNow(new Date(match.lastMessageTime), { addSuffix: true })}
                      </span>
                    )}
                  </div>
                  {match.lastMessage && (
                    <p className="text-sm text-purple-300 truncate">{match.lastMessage}</p>
                  )}
                </div>

                {match.unreadCount && match.unreadCount > 0 && (
                  <div className="bg-purple-600 text-white text-xs rounded-full size-5 flex items-center justify-center">
                    {match.unreadCount}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Chat area */}
        {selectedMatch ? (
          <div className="flex-1 flex flex-col bg-black">
            {/* Chat header */}
            <div className="bg-gray-900 border-b border-purple-800 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedMatch(null);
                    navigate('/messages');
                  }}
                  className="md:hidden text-purple-300 hover:bg-purple-900/50"
                >
                  <ArrowLeft className="size-5" />
                </Button>
                
                <Avatar className="size-10">
                  <AvatarImage src={selectedMatch.photo} alt={selectedMatch.name} />
                  <AvatarFallback>{selectedMatch.name[0]}</AvatarFallback>
                </Avatar>
                
                <div>
                  <h3 className="font-semibold text-purple-100">{selectedMatch.name}</h3>
                  <p className="text-sm text-purple-400">{selectedMatch.university}</p>
                </div>
              </div>

              <Button variant="ghost" size="sm" className="text-purple-300 hover:bg-purple-900/50">
                <MoreVertical className="size-5" />
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-purple-300">
                    You matched with {selectedMatch.name}!
                  </p>
                  <p className="text-purple-400 mt-1">Send a message to break the ice 👋</p>
                </div>
              )}

              {messages.map(message => {
                const isMine = message.senderId === currentUser?.id;
                return (
                  <div
                    key={message.id}
                    className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                        isMine
                          ? 'bg-gradient-to-r from-purple-600 to-purple-500 text-white'
                          : 'bg-gray-900 text-purple-100 border border-purple-800'
                      }`}
                    >
                      <p>{message.text}</p>
                      <p className={`text-xs mt-1 ${isMine ? 'text-purple-200' : 'text-purple-400'}`}>
                        {formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Message input */}
            <div className="bg-gray-900 border-t border-purple-800 p-4">
              <div className="flex gap-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type a message..."
                  className="flex-1 bg-gray-800 border-purple-700 text-purple-100 placeholder:text-purple-500"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600"
                >
                  <Send className="size-5" />
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="hidden md:flex flex-1 items-center justify-center bg-black">
            <div className="text-center text-purple-400">
              <p>Select a match to start chatting</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}