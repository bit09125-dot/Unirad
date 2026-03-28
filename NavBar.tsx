import { useNavigate, useLocation } from 'react-router';
import { Flame, MessageCircle, User, Heart } from 'lucide-react';
import { Badge } from './ui/badge';
import { storage } from '../utils/storage';

export function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const matches = storage.getMatches();
  const unreadCount = matches.filter(m => m.unreadCount && m.unreadCount > 0).length;

  const navItems = [
    { path: '/discover', icon: Flame, label: 'Discover' },
    { path: '/matches', icon: Heart, label: 'Matches', badge: matches.length },
    { path: '/messages', icon: MessageCircle, label: 'Messages', badge: unreadCount },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="bg-gray-900 border-b border-purple-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-purple-600 to-purple-400 p-2 rounded-lg">
              <Heart className="size-6 text-white fill-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-purple-200 bg-clip-text text-transparent">
              Unirade
            </span>
          </div>

          <div className="flex gap-1">
            {navItems.map(({ path, icon: Icon, label, badge }) => (
              <button
                key={path}
                onClick={() => navigate(path)}
                className={`relative px-4 py-2 rounded-lg transition-colors ${
                  location.pathname === path
                    ? 'bg-purple-800 text-purple-100'
                    : 'text-purple-300 hover:bg-purple-900/50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon className="size-5" />
                  <span className="hidden sm:inline text-sm font-medium">{label}</span>
                  {badge !== undefined && badge > 0 && (
                    <Badge className="bg-purple-600 text-white text-xs px-1.5 py-0 min-w-5 h-5 flex items-center justify-center">
                      {badge > 99 ? '99+' : badge}
                    </Badge>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}