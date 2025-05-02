export type UserRole = 'director' | 'assistant_director' | 'set_assistant' | 'lighting_chief';

export type User = {
  id: string;
  name: string;
  surname: string;
  email: string;
  role: UserRole;
  avatar?: string;
  skills?: string[];
  bio?: string;
  completedProfile: boolean;
  projects?: string[];
};

export const users: User[] = [
  {
    id: '1',
    name: 'Derya',
    surname: 'Arslan',
    email: 'derya.arslan@email.com',
    role: 'director',
    avatar: '/avatars/derya.jpg',
    skills: ['Yönetmenlik', 'Senaryo Yazımı', 'Kurgu', 'Proje Yönetimi'],
    bio: 'Son 10 yıldır dizi ve film sektöründe yönetmen olarak çalışıyorum. 3 uzun metraj film ve 5 dizi projesi yönettim.',
    completedProfile: true,
    projects: ['1', '2', '4']
  },
  {
    id: '2',
    name: 'Elif',
    surname: 'Bayraktar',
    email: 'elif.bayraktar@email.com',
    role: 'assistant_director',
    avatar: '/avatars/elif.jpg',
    skills: ['İletişim', 'Organizasyon', 'Zaman Yönetimi', 'Ekip Yönetimi'],
    bio: '7 yıllık yardımcı yönetmenlik tecrübem var. Büyük prodüksiyonlarda ve bağımsız yapımlarda çalıştım.',
    completedProfile: true,
    projects: ['1', '3']
  },
  {
    id: '3',
    name: 'Kaan',
    surname: 'Aytekin',
    email: 'kaan.aytekin@email.com',
    role: 'set_assistant',
    avatar: '/avatars/kaan.jpg',
    skills: ['Set Düzeni', 'Devamlılık', 'Timecode Yönetimi', 'Dokümantasyon'],
    bio: '4 yıldır reji asistanı olarak çalışıyorum. Detaylara özen gösterir, set düzenini en verimli şekilde sağlarım.',
    completedProfile: true,
    projects: ['1', '2']
  },
  {
    id: '4',
    name: 'Hasan',
    surname: 'Vardar',
    email: 'hasan.vardar@email.com',
    role: 'lighting_chief',
    avatar: '/avatars/hasan.jpg',
    skills: ['Işık Tasarımı', 'Renk Yönetimi', 'Ekipman Bilgisi', 'Moodboard Hazırlama'],
    bio: '8 yıldır ışık şefi olarak çalışıyorum. Dramatik ve belgesel tarzı yapımlar konusunda uzmanım.',
    completedProfile: true,
    projects: ['1', '2', '3']
  }
];

// Kullanıcı rolü adlarını Türkçe olarak döndüren yardımcı fonksiyon
export const getRoleName = (role: UserRole): string => {
  const roleNames = {
    director: 'Yönetmen/Yapımcı',
    assistant_director: 'Yardımcı Yönetmen',
    set_assistant: 'Reji Asistanı',
    lighting_chief: 'Işık Şefi'
  };
  
  return roleNames[role];
};