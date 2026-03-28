export interface User {
  id: string;
  name: string;
  age: number;
  university: string;
  course: string;
  year: string;
  bio: string;
  photos: string[];
  interests: string[];
  gender: string;
  lookingFor: string;
  hasPaid: boolean;
}

export interface Match {
  id: string;
  userId: string;
  name: string;
  age: number;
  university: string;
  photo: string;
  matchedAt: string;
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount?: number;
}

export interface Message {
  id: string;
  matchId: string;
  senderId: string;
  text: string;
  timestamp: string;
  read: boolean;
}

export interface PotentialMatch extends User {
  distance?: string;
}
