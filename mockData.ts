import { PotentialMatch } from '../types';

export const KENYAN_UNIVERSITIES = [
  'University of Nairobi',
  'Kenyatta University',
  'Moi University',
  'Egerton University',
  'Jomo Kenyatta University of Agriculture and Technology',
  'Strathmore University',
  'United States International University',
  'Technical University of Kenya',
  'Maseno University',
  'Masinde Muliro University of Science and Technology',
  'University of Eldoret',
  'Pwani University',
  'Dedan Kimathi University of Technology',
  'Chuka University',
  'Kisii University',
  'Karatina University',
  'Laikipia University',
  'Maasai Mara University',
  'Multimedia University of Kenya',
  'Muranga University of Technology',
  'South Eastern Kenya University',
  'Taita Taveta University',
  'University of Kabianga',
  'Garissa University',
  'Kirinyaga University',
  'Machakos University',
  'Kabianga University',
  'Jaramogi Oginga Odinga University of Science and Technology',
  'Murang\'a University of Technology',
  'Rongo University',
  'Mount Kenya University',
  'Kenya Methodist University',
  'Daystar University',
  'Catholic University of Eastern Africa',
  'Kabarak University',
  'Africa Nazarene University',
  'Pan Africa Christian University',
  'Zetech University',
  'Riara University',
  'KCA University',
];

export const COURSES = [
  'Computer Science',
  'Engineering',
  'Business Administration',
  'Medicine',
  'Law',
  'Architecture',
  'Psychology',
  'Economics',
  'Communications',
  'Education',
  'Nursing',
  'Agriculture',
  'Pharmacy',
  'Design',
  'Mathematics',
];

export const INTERESTS = [
  'Music',
  'Sports',
  'Reading',
  'Travel',
  'Photography',
  'Gaming',
  'Cooking',
  'Art',
  'Dancing',
  'Movies',
  'Fitness',
  'Technology',
  'Fashion',
  'Hiking',
  'Coffee',
  'Volunteering',
];

export const generateMockUsers = (count: number, excludeIds: string[] = []): PotentialMatch[] => {
  const firstNames = [
    'Amani', 'Baraka', 'Chipo', 'Dalila', 'Esi', 'Fahari', 'Grace', 'Hasani',
    'Imani', 'Jabari', 'Kendi', 'Latifa', 'Mwangi', 'Naima', 'Okoth', 'Pendo',
    'Rashid', 'Safiya', 'Tatu', 'Umi', 'Wambui', 'Zuri', 'Akinyi', 'Brian',
    'Catherine', 'Dennis', 'Elizabeth', 'Felix', 'Gloria', 'Harrison',
  ];

  const users: PotentialMatch[] = [];

  for (let i = 0; i < count; i++) {
    const id = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    if (excludeIds.includes(id)) continue;

    const name = firstNames[Math.floor(Math.random() * firstNames.length)];
    const age = Math.floor(Math.random() * 7) + 18; // 18-24
    const university = KENYAN_UNIVERSITIES[Math.floor(Math.random() * KENYAN_UNIVERSITIES.length)];
    const course = COURSES[Math.floor(Math.random() * COURSES.length)];
    const year = ['1st Year', '2nd Year', '3rd Year', '4th Year'][Math.floor(Math.random() * 4)];
    const gender = Math.random() > 0.5 ? 'Male' : 'Female';
    
    const numInterests = Math.floor(Math.random() * 5) + 3;
    const shuffledInterests = [...INTERESTS].sort(() => Math.random() - 0.5);
    const interests = shuffledInterests.slice(0, numInterests);

    const bios = [
      `${year} ${course} student. Love ${interests[0].toLowerCase()} and ${interests[1].toLowerCase()}. Let's grab coffee! ☕`,
      `Studying ${course} at ${university}. Looking for someone who shares my passion for ${interests[0].toLowerCase()}. 🌟`,
      `${year} student who enjoys ${interests[0].toLowerCase()}, ${interests[1].toLowerCase()}, and meeting new people! 💫`,
      `${course} major with a love for ${interests[0].toLowerCase()}. Swipe right if you can make me laugh! 😄`,
      `Just a ${year} student trying to balance studies and fun. Love ${interests[0].toLowerCase()} and ${interests[1].toLowerCase()}! 🎉`,
    ];

    users.push({
      id,
      name,
      age,
      university,
      course,
      year,
      bio: bios[Math.floor(Math.random() * bios.length)],
      photos: [
        `https://source.unsplash.com/400x600/?portrait,${gender.toLowerCase()},${i}`,
        `https://source.unsplash.com/400x600/?student,${gender.toLowerCase()},${i + 100}`,
        `https://source.unsplash.com/400x600/?university,person,${i + 200}`,
      ],
      interests,
      gender,
      lookingFor: gender === 'Male' ? 'Female' : 'Male',
      hasPaid: true,
      distance: `${Math.floor(Math.random() * 10) + 1} km away`,
    });
  }

  return users;
};