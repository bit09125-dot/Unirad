import { User, Match, Message } from '../types';

const STORAGE_KEYS = {
  CURRENT_USER: 'unidate_current_user',
  MATCHES: 'unidate_matches',
  MESSAGES: 'unidate_messages',
  SWIPED_USERS: 'unidate_swiped_users',
};

export const storage = {
  getCurrentUser: (): User | null => {
    const data = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return data ? JSON.parse(data) : null;
  },

  setCurrentUser: (user: User) => {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  },

  getMatches: (): Match[] => {
    const data = localStorage.getItem(STORAGE_KEYS.MATCHES);
    return data ? JSON.parse(data) : [];
  },

  setMatches: (matches: Match[]) => {
    localStorage.setItem(STORAGE_KEYS.MATCHES, JSON.stringify(matches));
  },

  addMatch: (match: Match) => {
    const matches = storage.getMatches();
    matches.unshift(match);
    storage.setMatches(matches);
  },

  getMessages: (matchId: string): Message[] => {
    const allMessages = localStorage.getItem(STORAGE_KEYS.MESSAGES);
    const messages: Message[] = allMessages ? JSON.parse(allMessages) : [];
    return messages.filter(m => m.matchId === matchId);
  },

  addMessage: (message: Message) => {
    const allMessages = localStorage.getItem(STORAGE_KEYS.MESSAGES);
    const messages: Message[] = allMessages ? JSON.parse(allMessages) : [];
    messages.push(message);
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
  },

  getSwipedUsers: (): string[] => {
    const data = localStorage.getItem(STORAGE_KEYS.SWIPED_USERS);
    return data ? JSON.parse(data) : [];
  },

  addSwipedUser: (userId: string) => {
    const swiped = storage.getSwipedUsers();
    swiped.push(userId);
    localStorage.setItem(STORAGE_KEYS.SWIPED_USERS, JSON.stringify(swiped));
  },

  clearAll: () => {
    Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
  },
};
