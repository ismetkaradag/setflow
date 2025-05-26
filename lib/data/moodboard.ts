// Moodboard veri modeli

export type MediaItemType = 'image' | 'video' | 'text' | 'link';

export interface MediaItem {
  id: string;
  type: MediaItemType;
  title: string;
  url?: string; // Görsel veya video URL'i
  content?: string; // Metin içerik
  createdAt: string;
  createdBy: string; // Kullanıcı ID
  tags?: string[];
}

export interface MoodboardAlbum {
  id: string;
  scene: string; // Hangi sahne için
  title: string;
  description?: string;
  thumbnailUrl?: string;
  mediaItems: MediaItem[];
  createdAt: string;
  updatedAt: string;
  createdBy: string; // Kullanıcı ID
}

// Demo moodboard albümleri
export const moodboardAlbums: MoodboardAlbum[] = [
  {
    id: '1',
    scene: '1A',
    title: 'Sultanahmet Meydanı - Ana Karşılaşma',
    description: 'Ali ve Zeynep\'in ilk karşılaşması için referanslar ve ışık ayarları',
    thumbnailUrl: '/moodboard/istanbul1.jpeg',
    mediaItems: [
      {
        id: '101',
        type: 'image',
        title: 'Meydanda Gün Batımı Işığı',
        url: '/moodboard/istanbul1.jpeg',
        createdAt: '2024-05-01T10:30:00',
        createdBy: '4', // Hasan Vardar (Işık Şefi)
        tags: ['dış çekim', 'gün batımı', 'ışık']
      },
      {
        id: '102',
        type: 'image',
        title: 'Kalabalık Meydan',
        url: '/moodboard/istanbul2.jpeg',
        createdAt: '2024-05-01T11:45:00',
        createdBy: '1', // Derya Arslan (Yönetmen)
        tags: ['kalabalık', 'meydan']
      },
      {
        id: '103',
        type: 'text',
        title: 'Işık Notu',
        content: 'Kalabalık sahnede arka plan için yumuşak gün batımı ışığı kullanılacak. Karakterler için yüz aydınlatması için porta light gerekli.',
        createdAt: '2024-05-02T09:15:00',
        createdBy: '4', // Hasan Vardar
        tags: ['ışık notu', 'ekipman']
      }
    ],
    createdAt: '2024-05-01T10:00:00',
    updatedAt: '2024-05-02T14:30:00',
    createdBy: '1' // Derya Arslan
  },
  {
    id: '2',
    scene: '2B',
    title: 'Kapalıçarşı - Takip Sahnesi',
    description: 'Ali\'nin Zeynep\'i takip ettiği çarşı içi sahneleri için referanslar',
    thumbnailUrl: '/moodboard/kapalicarsi.jpeg',
    mediaItems: [
      {
        id: '201',
        type: 'image',
        title: 'Çarşı Koridoru',
        url: '/moodboard/kapalicarsi.jpeg',
        createdAt: '2024-05-03T14:20:00',
        createdBy: '1', // Derya Arslan
        tags: ['iç mekan', 'çarşı', 'koridor']
      },
      {
        id: '202',
        type: 'video',
        title: 'Kamera Hareketi Test',
        url: '/moodboard/kamera_test.mp4',
        createdAt: '2024-05-03T16:45:00',
        createdBy: '3', // Kaan Aytekin (Reji Asistanı)
        tags: ['kamera', 'test', 'hareket']
      },
      {
        id: '203',
        type: 'text',
        title: 'Yönetmen Notu',
        content: 'Takip sahnesi için steadicam kullanılacak. Çarşı içindeki ışık değişimlerine dikkat edilmeli. Bazı bölümlerde takviye ışık gerekebilir.',
        createdAt: '2024-05-04T08:30:00',
        createdBy: '1', // Derya Arslan
        tags: ['yönetmen notu', 'steadicam']
      },
      {
        id: '204',
        type: 'link',
        title: 'Referans Film',
        url: 'https://www.youtube.com/watch?v=example',
        content: 'Istanbul Heist filmindeki çarşı takip sahnesine benzer bir kamera hareketi planlıyoruz.',
        createdAt: '2024-05-04T09:15:00',
        createdBy: '1', // Derya Arslan
        tags: ['referans', 'film']
      }
    ],
    createdAt: '2024-05-03T14:00:00',
    updatedAt: '2024-05-04T10:30:00',
    createdBy: '1' // Derya Arslan
  },
  {
    id: '3',
    scene: '3C',
    title: 'Ayasofya - Karşılaşma',
    description: 'Ali ve Zeynep\'in Ayasofya önündeki önemli diyalog sahnesi',
    thumbnailUrl: '/moodboard/ayasofya.jpeg',
    mediaItems: [
      {
        id: '301',
        type: 'image',
        title: 'Ayasofya Dış Görünüm',
        url: '/moodboard/ayasofya.jpeg',
        createdAt: '2024-05-05T11:30:00',
        createdBy: '1', // Derya Arslan
        tags: ['dış mekan', 'ayasofya', 'tarihi']
      },
      {
        id: '302',
        type: 'text',
        title: 'Kamera Açıları',
        content: 'Konuşma sırasında 3 farklı açı kullanılacak: genel plan (arka planda Ayasofya görünecek şekilde), orta plan konuşma, ve yakın plan tepki çekimleri.',
        createdAt: '2024-05-06T09:20:00',
        createdBy: '1', // Derya Arslan
        tags: ['kamera', 'açı', 'plan']
      }
    ],
    createdAt: '2024-05-05T11:00:00',
    updatedAt: '2024-05-06T14:00:00',
    createdBy: '1' // Derya Arslan
  }
];