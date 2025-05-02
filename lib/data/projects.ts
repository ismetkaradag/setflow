export type ProjectType = 'film' | 'series';
export type ProjectStatus = 'planning' | 'pre_production' | 'active' | 'post_production' | 'completed';
export type ProjectPlatform = 'netflix' | 'prime' | 'disney' | 'tv' | 'cinema' | 'other';

export type Project = {
  id: string;
  title: string;
  type: ProjectType;
  status: ProjectStatus;
  director: string; // User ID
  startDate: string;
  endDate: string;
  platform: ProjectPlatform;
  description: string;
  budget?: number;
  image?: string;
  team?: Array<{
    userId: string;
    role: string;
    status: 'invited' | 'applied' | 'confirmed' | 'rejected';
  }>;
  callsheet?: any[];
  script?: string;
  timecode?: any[];
  continuity?: any[];
  preparationStatus?: any[];
  moodboard?: string[];
  equipment?: any[];
};

export const projects: Project[] = [
  {
    id: '1',
    title: 'İstanbul Rüyası',
    type: 'film',
    status: 'active',
    director: '1', // Derya Arslan
    startDate: '2025-05-15',
    endDate: '2025-07-30',
    platform: 'cinema',
    description: 'İstanbul\'un tarihi dokusunda geçen, kayıp bir tarihi eserin peşindeki iki arkadaşın hikayesi.',
    budget: 5000000,
    image: '/projects/istanbul.jpg',
    team: [
      { userId: '1', role: 'director', status: 'confirmed' },
      { userId: '2', role: 'assistant_director', status: 'confirmed' },
      { userId: '3', role: 'set_assistant', status: 'confirmed' },
      { userId: '4', role: 'lighting_chief', status: 'confirmed' }
    ],
    callsheet: [
      {
        date: '2025-05-15',
        location: 'Sultanahmet Meydanı',
        startTime: '07:00',
        endTime: '19:00',
        scenes: ['1A', '2B', '3C'],
        notes: 'Kalabalık sahneler için figüranlar hazır olacak.'
      }
    ],
    script: 'İSTANBUL RÜYASI\\n\\nSAHNE 1 - DIŞ/GÜN - SULTANAHMET MEYDANI\\n\\nALİ ve ZEYNEP kalabalık meydanda buluşurlar...',
    timecode: [
      { scene: '1A', startTime: '00:00:15:00', endTime: '00:04:23:10', status: 'completed' }
    ],
    moodboard: ['/moodboard/istanbul1.jpg', '/moodboard/istanbul2.jpg'],
    equipment: [
      { name: 'ARRI Alexa Mini', type: 'camera', quantity: 2 },
      { name: 'Kino Flo Diva-Lite LED', type: 'lighting', quantity: 8 }
    ]
  },
  {
    id: '2',
    title: 'Karanlık Sular',
    type: 'series',
    status: 'planning',
    director: '1', // Derya Arslan
    startDate: '2025-08-10',
    endDate: '2025-12-20',
    platform: 'netflix',
    description: 'Karadeniz\'de bir sahil kasabasında yaşanan gizemli olayları araştıran dedektif Kemal\'in hikayesi.',
    budget: 12000000,
    image: '/projects/karanlik.jpg',
    team: [
      { userId: '1', role: 'director', status: 'confirmed' },
      { userId: '3', role: 'set_assistant', status: 'confirmed' },
      { userId: '4', role: 'lighting_chief', status: 'confirmed' }
    ]
  },
  {
    id: '3',
    title: 'Anadolu\'nun Sesi',
    type: 'film',
    status: 'pre_production',
    director: '5', // Başka bir yönetmen
    startDate: '2025-06-01',
    endDate: '2025-08-15',
    platform: 'cinema',
    description: 'Anadolu\'nun farklı yörelerinden müzisyenlerin hikayelerini anlatan belgesel film.',
    budget: 2500000,
    image: '/projects/anadolu.jpg',
    team: [
      { userId: '2', role: 'assistant_director', status: 'confirmed' },
      { userId: '4', role: 'lighting_chief', status: 'confirmed' }
    ]
  },
  {
    id: '4',
    title: 'Dijital Çağ',
    type: 'series',
    status: 'planning',
    director: '1', // Derya Arslan
    startDate: '2025-09-05',
    endDate: '2025-12-15',
    platform: 'prime',
    description: 'Teknoloji dünyasında devrim yaratmaya çalışan bir grup gencin hikayesi.',
    budget: 8000000,
    image: '/projects/digital.jpg',
    team: [
      { userId: '1', role: 'director', status: 'confirmed' }
    ]
  },
  {
    id: '5',
    title: 'Antik Kapı',
    type: 'film',
    status: 'post_production',
    director: '6', // Başka bir yönetmen
    startDate: '2024-11-10',
    endDate: '2025-01-20',
    platform: 'cinema',
    description: 'Antik bir mezarda bulunan gizemli bir kapının ardındaki sırları konu alan arkeoloji macerası.',
    budget: 6500000,
    image: '/projects/antik.jpg',
    team: []
  }
];

// Helper fonksiyonlar
export const getProjectTypeName = (type: ProjectType): string => {
  return type === 'film' ? 'Film' : 'Dizi';
};

export const getProjectStatusName = (status: ProjectStatus): string => {
  const statusNames = {
    planning: 'Planlama',
    pre_production: 'Ön Prodüksiyon',
    active: 'Aktif Çekim',
    post_production: 'Post Prodüksiyon',
    completed: 'Tamamlandı'
  };
  
  return statusNames[status];
};

export const getPlatformName = (platform: ProjectPlatform): string => {
  const platformNames = {
    netflix: 'Netflix',
    prime: 'Amazon Prime',
    disney: 'Disney+',
    tv: 'TV',
    cinema: 'Sinema',
    other: 'Diğer'
  };
  
  return platformNames[platform];
};