export type ProjectType = 'film' | 'series' | 'digital' | 'commercial' | 'documentary' | 'music_video' | 'other';
export type ProjectStatus = 'planning' | 'pre_production' | 'active' | 'post_production' | 'completed';
export type ProjectPlatform = 'netflix' | 'prime' | 'disney' | 'tv' | 'cinema' | 'other';

export type Callsheet = {
  date: string;
  location: string;
  startTime: string;
  endTime: string;
  scenes: string[];
  notes?: string;
  cast?: Array<{
    actorName: string;
    character: string;
    callTime: string;
    notes?: string;
  }>;
  crew?: Array<{
    department: string;
    callTime: string;
    notes?: string;
  }>;
};

export type Timecode = {
  scene: string;
  startTime: string; // Format: HH:MM:SS:FF (Saat:Dakika:Saniye:Frame)
  endTime: string;
  status: 'completed' | 'pending' | 'in_progress';
  notes?: string;
  duration?: string; 
};

export type ContinuityItem = {
  scene: string;
  date: string;
  location: string;
  description: string;
  characters: Array<{
    character: string;
    costume: string;
    makeup: string;
    props?: string[];
    notes?: string;
  }>;
  props?: Array<{
    name: string;
    position: string;
    condition: string;
    notes?: string;
  }>;
  timeOfDay: string;
  weather?: string;
  images?: string[];
  notes?: string;
};

export type PreparationItem = {
  category: 'location' | 'costume' | 'props' | 'casting' | 'equipment' | 'logistics' | 'other';
  title: string;
  description: string;
  status: 'not_started' | 'in_progress' | 'completed' | 'delayed' | 'issue';
  dueDate?: string;
  assignedTo?: string; // User ID
  priority: 'low' | 'medium' | 'high' | 'urgent';
  notes?: string;
  createdAt: string;
  updatedAt: string;
};

export type Equipment = {
  name: string;
  type: 'camera' | 'lighting' | 'sound' | 'grip' | 'other';
  quantity: number;
  brand?: string;
  model?: string;
  specs?: string;
  rentalCompany?: string;
  dailyRate?: number;
  notes?: string;
};

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
  callsheet?: Callsheet[];
  script?: string;
  timecode?: Timecode[];
  continuity?: ContinuityItem[];
  preparationStatus?: PreparationItem[];
  moodboard?: string[];
  equipment?: Equipment[];
};

export const projects: Project[] = [
  {
    "id": "1",
    "title": "İstanbul Rüyası",
    "type": "film",
    "status": "active",
    "director": "1",
    "startDate": "2025-05-15",
    "endDate": "2025-07-30",
    "platform": "cinema",
    "description": "İstanbul'un tarihi dokusunda geçen, kayıp bir tarihi eserin peşindeki iki arkadaşın hikayesi.",
    "budget": 5000000,
    "image": "/projects/istanbul.jpeg",
    "team": [
      { "userId": "1", "role": "director", "status": "confirmed" },
      { "userId": "2", "role": "assistant_director", "status": "confirmed" },
      { "userId": "3", "role": "set_assistant", "status": "confirmed" },
      { "userId": "4", "role": "lighting_chief", "status": "confirmed" }
    ],
    "callsheet": [
      {
        "date": "2025-05-15",
        "location": "Sultanahmet Meydanı",
        "startTime": "07:00",
        "endTime": "19:00",
        "scenes": ["1A", "2B", "3C"],
        "notes": "Kalabalık sahneler için figüranlar hazır olacak.",
        "cast": [
          {
            "actorName": "Kerem Yılmaz",
            "character": "Ali",
            "callTime": "06:30",
            "notes": "Kostüm: Koyu mavi gömlek ve kot pantolon, saç dağınık"
          },
          {
            "actorName": "Selin Demirci",
            "character": "Zeynep",
            "callTime": "06:30",
            "notes": "Kostüm: Yeşil elbise, siyah ceket, saç toplu"
          }
        ],
        "crew": [
          { "department": "Kamera", "callTime": "06:00" },
          { "department": "Işık", "callTime": "05:30" },
          { "department": "Ses", "callTime": "06:00" }
        ]
      },
      {
        "date": "2025-05-16",
        "location": "Kapalıçarşı",
        "startTime": "08:00",
        "endTime": "20:00",
        "scenes": ["4A", "4B", "5A"],
        "notes": "Kapalıçarşı esnafı ile koordinasyon sağlanacak. Yoğun insan trafiği olabilir.",
        "cast": [
          {
            "actorName": "Kerem Yılmaz",
            "character": "Ali",
            "callTime": "07:30",
            "notes": "Kostüm: Gri tişört, siyah ceket, kot pantolon"
          },
          {
            "actorName": "Selin Demirci",
            "character": "Zeynep",
            "callTime": "07:30",
            "notes": "Kostüm: Kırmızı gömlek, siyah pantolon"
          },
          {
            "actorName": "Ahmet Yıldırım",
            "character": "Antikacı Kemal",
            "callTime": "09:00",
            "notes": "Kostüm: Kahverengi yelekli takım, gözlük"
          }
        ],
        "crew": [
          { "department": "Kamera", "callTime": "07:00" },
          { "department": "Işık", "callTime": "06:30" },
          { "department": "Ses", "callTime": "07:00" },
          { "department": "Kostüm", "callTime": "07:00" }
        ]
      }
    ],
    "script": "İSTANBUL RÜYASI\\n\\nSAHNE 1 - DIŞ/GÜN - SULTANAHMET MEYDANI\\n\\nALİ ve ZEYNEP kalabalık meydanda buluşurlar...\\n\\nALİ\\nZeynep, bu tarihi eser nerede?\\n\\nZEYNEP\\nBilmiyorum, ama peşindeyiz...\\n \\n\\nSAHNE 2 - İÇ/GÜNDÜZ - KAFETERYA\\n\\nALİ ve ZEYNEP kafede otururlar...\\n\\nALİ\\nBu iş çok tehlikeli...\\n\\nZEYNEP\\nAma bunu başarmalıyız...\\n \\n\\nSAHNE 3 - DIŞ/GÜNDÜZ - SULTANAHMET MEYDANI - ÇEŞME ÖNÜ\\n\\nALİ ve ZEYNEP çeşme önünde haritaya bakarlar.\\n\\nALİ\\nBu haritadaki işaretlere göre, eser Kapalıçarşı'nın bir dükkanında olmalı.\\n\\nZEYNEP\\nOraya gitmeden önce Kemal Bey'le konuşmalıyız. O bu konuda bize yardımcı olabilir.\\n\\nSAHNE 4 - İÇ/GÜNDÜZ - KAPALIÇARŞI - ANTİKACI DÜKKÂNI\\n\\nKEMAL BEY tezgahın arkasında antika bir saati incelerken, ALİ ve ZEYNEP dükkana girerler.\\n\\nKEMAL\\nSizi bekliyordum...",
    "timecode": [
      {
        "scene": "1A",
        "startTime": "00:00:15:00",
        "endTime": "00:04:23:10",
        "status": "completed",
        "notes": "Ana karakter tanıtım sahnesi"
      },
      {
        "scene": "2B",
        "startTime": "00:04:24:00",
        "endTime": "00:08:15:22",
        "status": "completed",
        "notes": "Kafede konuşma sahnesi"
      },
      {
        "scene": "3A",
        "startTime": "00:08:16:00",
        "endTime": "00:11:45:15",
        "status": "in_progress",
        "notes": "Çeşme önü harita inceleme sahnesi - Take 3 tercih edildi"
      },
      {
        "scene": "3B",
        "startTime": "00:11:46:00",
        "endTime": "00:13:30:05",
        "status": "pending",
        "notes": "Sahne henüz çekilmedi"
      }
    ],
    "continuity": [
      {
        "scene": "1A",
        "date": "2025-05-15",
        "location": "Sultanahmet Meydanı",
        "description": "Ali ve Zeynep'in ilk karşılaşma sahnesi",
        "timeOfDay": "Öğleden sonra, güneşli",
        "weather": "Açık, hafif rüzgarlı",
        "characters": [
          {
            "character": "Ali",
            "costume": "Koyu mavi gömlek, kot pantolon, kahverengi deri ayakkabı",
            "makeup": "Doğal görünüm, hafif terli",
            "props": ["Telefon", "Cüzdan", "Anahtarlık"],
            "notes": "Saç dağınık, sakalsız"
          },
          {
            "character": "Zeynep",
            "costume": "Yeşil elbise, siyah ceket, bej çanta, siyah topuklu ayakkabı",
            "makeup": "Doğal makyaj, açık pembe ruj",
            "props": ["Büyük omuz çantası", "Güneş gözlüğü", "Notebook"],
            "notes": "Saç toplu, altın küpeler"
          }
        ],
        "props": [
          {
            "name": "Eski harita",
            "position": "Zeynep'in çantasında, sonra masada açık",
            "condition": "Yıpranmış, kenarları yırtık",
            "notes": "Haritadaki işaretler kırmızı mürekkeple yapılmış"
          }
        ],
        "images": ["/continuity/scene1a_1.jpeg", "/continuity/scene1a_2.jpeg"],
        "notes": "Ali soldan, Zeynep sağdan sahneye giriyor. Karşılaşma anında Ali'nin elinde telefon var."
      },
      {
        "scene": "2B",
        "date": "2025-05-15",
        "location": "Sultanahmet - Kafeterya",
        "description": "Ali ve Zeynep'in kafede konuşma sahnesi",
        "timeOfDay": "Öğleden sonra, iç mekan",
        "characters": [
          {
            "character": "Ali",
            "costume": "Aynı kıyafetler (Sahne 1A ile devamlılık)",
            "makeup": "Hafif yorgun görünüm",
            "props": ["Kahve fincanı", "Telefon"],
            "notes": "Bir önceki sahneden yaklaşık 30 dakika sonra"
          },
          {
            "character": "Zeynep",
            "costume": "Yeşil elbise, siyah ceket (çıkarılmış masada asılı)",
            "makeup": "Aynı makyaj, hafif tazelenmiş",
            "props": ["Çay bardağı", "Eski harita", "Notebook"],
            "notes": "Saç hala toplu"
          }
        ],
        "props": [
          {
            "name": "Eski harita",
            "position": "Masada açık, Ali ve Zeynep'in arasında",
            "condition": "Yıpranmış durumda",
            "notes": "Harita dik açıdan görünecek şekilde masaya yerleştirildi"
          },
          {
            "name": "Cafe masası",
            "position": "Pencerenin yanında",
            "condition": "Ahşap, çizikler var",
            "notes": "Masada iki fincan, harita ve Zeynep'in notebooks'u bulunuyor"
          }
        ],
        "images": ["/continuity/scene2b_1.jpeg", "/continuity/scene2b_2.jpeg", "/continuity/scene2b_3.jpeg"],
        "notes": "Masa düzeni önemli, masanın üzerindeki nesnelerin pozisyonları takip edilmeli. Ali'nin telefonu sağ cebinde."
      }
    ],
    "preparationStatus": [
      {
        "category": "location",
        "title": "Sultanahmet Meydanı Çekim İzni",
        "description": "Sultanahmet Meydanı'nda çekim yapabilmek için gerekli izinlerin alınması",
        "status": "completed",
        "dueDate": "2025-05-01",
        "assignedTo": "2",
        "priority": "high",
        "notes": "İzinler alındı, çekim günü güvenlik görevlileri bilgilendirilecek",
        "createdAt": "2025-04-01T09:00:00",
        "updatedAt": "2025-04-28T14:30:00"
      },
      {
        "category": "costume",
        "title": "Ana Karakterlerin Kostümleri",
        "description": "Ali ve Zeynep karakterleri için gerekli kostümlerin hazırlanması",
        "status": "completed",
        "dueDate": "2025-05-10",
        "assignedTo": "3",
        "priority": "high",
        "notes": "Kostümler temin edildi, provalar tamamlandı",
        "createdAt": "2025-04-05T10:15:00",
        "updatedAt": "2025-05-08T16:45:00"
      },
      {
        "category": "props",
        "title": "Antika Eser Maketi",
        "description": "Filmde aranılan antika eserin gerçekçi maketinin hazırlanması",
        "status": "in_progress",
        "dueDate": "2025-05-20",
        "assignedTo": "3",
        "priority": "medium",
        "notes": "Maket yapım aşamasında, altın detayları için özel çalışma gerekiyor",
        "createdAt": "2025-04-10T11:30:00",
        "updatedAt": "2025-05-12T09:15:00"
      },
      {
        "category": "equipment",
        "title": "Steadicam Temini",
        "description": "Kapalıçarşı takip sahneleri için steadicam kiralanması",
        "status": "completed",
        "dueDate": "2025-05-14",
        "assignedTo": "4",
        "priority": "high",
        "notes": "Steadicam ve operatör ayarlandı",
        "createdAt": "2025-04-15T13:45:00",
        "updatedAt": "2025-05-10T10:30:00"
      },
      {
        "category": "casting",
        "title": "Figüran Seçimleri",
        "description": "Sultanahmet ve Kapalıçarşı sahneleri için 50 figüran seçimi",
        "status": "in_progress",
        "dueDate": "2025-05-12",
        "assignedTo": "2",
        "priority": "medium",
        "notes": "Şu ana kadar 35 figüran belirlendi, 15 daha gerekiyor",
        "createdAt": "2025-04-20T14:00:00",
        "updatedAt": "2025-05-08T17:30:00"
      }
    ],
    "moodboard": [
      "/moodboard/istanbul1.jpeg",
      "/moodboard/istanbul2.jpeg",
      "/moodboard/sultan_sunset.jpeg",
      "/moodboard/kapalicarsi.jpeg",
      "/moodboard/antique_map.jpeg",
      "/moodboard/mystery_artifact.jpeg"
    ],
    "equipment": [
      {
        "name": "ARRI Alexa Mini",
        "type": "camera",
        "quantity": 2,
        "brand": "ARRI",
        "model": "Alexa Mini",
        "specs": "4K, Super 35mm Sensor",
        "rentalCompany": "Istanbul Film Equipment",
        "dailyRate": 2500,
        "notes": "Ana kamera ve yedek kamera"
      },
      {
        "name": "Kino Flo Diva-Lite LED",
        "type": "lighting",
        "quantity": 8,
        "brand": "Kino Flo",
        "model": "Diva-Lite LED",
        "specs": "30x60cm panel, 100W",
        "rentalCompany": "Istanbul Film Equipment",
        "dailyRate": 300,
        "notes": "İç mekan sahneler için"
      },
      {
        "name": "Sony A7S III",
        "type": "camera",
        "quantity": 1,
        "brand": "Sony",
        "model": "A7S III",
        "specs": "4K, Full-frame, low-light",
        "rentalCompany": "Digital Vision",
        "dailyRate": 800,
        "notes": "B-roll çekimleri için"
      },
      {
        "name": "DJI Ronin 2",
        "type": "grip",
        "quantity": 1,
        "brand": "DJI",
        "model": "Ronin 2",
        "specs": "13.6kg taşıma kapasitesi",
        "rentalCompany": "Istanbul Film Equipment",
        "dailyRate": 450,
        "notes": "Hareketli sahneler için gimbal"
      },
      {
        "name": "Sennheiser MKH 416",
        "type": "sound",
        "quantity": 2,
        "brand": "Sennheiser",
        "model": "MKH 416",
        "specs": "Shotgun mikrofon",
        "rentalCompany": "Audio Pro",
        "dailyRate": 150,
        "notes": "Dış mekan ses kaydı için"
      }
    ]
  },
  {
    "id": "2",
    "title": "Karanlık Sular",
    "type": "series",
    "status": "planning",
    "director": "1",
    "startDate": "2025-08-10",
    "endDate": "2025-12-20",
    "platform": "netflix",
    "description": "Karadeniz'de bir sahil kasabasında yaşanan gizemli olayları araştıran dedektif Kemal'in hikayesi.",
    "budget": 12000000,
    "image": "/projects/karanlik.jpeg",
    "team": [
      { "userId": "1", "role": "director", "status": "confirmed" },
      { "userId": "3", "role": "set_assistant", "status": "confirmed" },
      { "userId": "4", "role": "lighting_chief", "status": "confirmed" },
      { "userId": "5", "role": "lead_actor", "status": "confirmed" },
      { "userId": "2", "role": "production_manager", "status": "invited" }
    ],
    "callsheet": [
      {
        "date": "2025-08-10",
        "location": "Trabzon - Sahil Kasabası",
        "startTime": "06:00",
        "endTime": "18:00",
        "scenes": ["1A", "1B"],
        "notes": "İlk gün çekimleri. Hava durumu kontrol edilecek.",
        "cast": [
          {
            "actorName": "Mert Yılmaz",
            "character": "Dedektif Kemal",
            "callTime": "05:30",
            "notes": "Kostüm: Koyu renk takım elbise, trençkot"
          },
          {
            "actorName": "Deniz Şahin",
            "character": "Ayşe (Kasaba Sakinesi)",
            "callTime": "07:00",
            "notes": "Kostüm: Yerel kıyafetler, başörtüsü"
          }
        ],
        "crew": [
          { "department": "Kamera", "callTime": "05:00" },
          { "department": "Işık", "callTime": "04:30" },
          { "department": "Ses", "callTime": "05:00" }
        ]
      },
      {
        "date": "2025-08-11",
        "location": "Trabzon - Balıkçı Limanı",
        "startTime": "05:30",
        "endTime": "19:00",
        "scenes": ["2A", "2B", "3A"],
        "notes": "Gün doğumu sahnesi için erken başlangıç. Tekneler hazır olacak.",
        "cast": [
          {
            "actorName": "Mert Yılmaz",
            "character": "Dedektif Kemal",
            "callTime": "05:00",
            "notes": "Kostüm: Rahat kıyafetler, mont"
          },
          {
            "actorName": "Ali Kaya",
            "character": "Balıkçı Mustafa",
            "callTime": "05:00",
            "notes": "Kostüm: Balıkçı kıyafetleri, şapka"
          }
        ],
        "crew": [
          { "department": "Kamera", "callTime": "04:30" },
          { "department": "Işık", "callTime": "04:00" },
          { "department": "Ses", "callTime": "04:30" },
          { "department": "Özel Efekt", "callTime": "05:00", "notes": "Sis makinesi gerekli" }
        ]
      }
    ],
    "script": "KARANLIK SULAR\\n\\nBÖLÜM 1 - \"KAYIP\"\\n\\nSAHNE 1 - DIŞ/ŞAFAK - KASABA SAHİLİ\\n\\nSis içindeki bir sahil kasabası. Dalgalar kıyıya vuruyor. DEDEKTİF KEMAL (40'lı yaşlarda, yorgun görünümlü) sahilde yürür.\\n\\nVOICE OVER (KEMAL)\\nBu kasabaya ilk geldiğimde, beni neyin beklediğini bilmiyordum...\\n\\nKemal sahilde ilerlerken kıyıya vurmuş bir tekneyi fark eder.\\n\\nSAHNE 2 - DIŞ/ŞAFAK - BALIKÇI LİMANI\\n\\nKEMAL limanda BALIKÇI MUSTAFA (60'lı yaşlarda) ile konuşur.\\n\\nKEMAL\\nBu kasabada kaç kişi kayboldu?\\n\\nMUSTAFA\\n(endişeli)\\nÜç kişi... Hepsi de denizde...",
    "timecode": [
      {
        "scene": "1A",
        "startTime": "00:00:00:00",
        "endTime": "00:02:15:10",
        "status": "pending",
        "notes": "Açılış sahnesi, sis efektleri önemli"
      },
      {
        "scene": "1B",
        "startTime": "00:02:16:00",
        "endTime": "00:04:45:15",
        "status": "pending",
        "notes": "Kemal'in tekneyi keşfetme sahnesi"
      }
    ],
    "continuity": [
      {
        "scene": "1A",
        "date": "2025-08-10",
        "location": "Trabzon - Sahil Kasabası",
        "description": "Dedektif Kemal'in sahilde yürüyüş sahnesi",
        "timeOfDay": "Şafak, sisli",
        "weather": "Bulutlu, hafif rüzgarlı, sisli",
        "characters": [
          {
            "character": "Dedektif Kemal",
            "costume": "Koyu gri takım elbise, siyah trençkot, siyah ayakkabılar",
            "makeup": "Solgun ten, hafif sakal, yorgun görünüm",
            "props": ["Not defteri", "Kalem", "Cep telefonu"],
            "notes": "Saç dağınık, üstten düzeltilmiş"
          }
        ],
        "props": [],
        "images": ["/continuity/karanlik_1a_1.jpeg", "/continuity/karanlik_1a_2.jpeg"],
        "notes": "Sis efekti için özel ekipman gerekli. Kemal'in yürüyüşü ağır ve düşünceli olmalı."
      },
      {
        "scene": "2A",
        "date": "2025-08-11",
        "location": "Trabzon - Balıkçı Limanı",
        "description": "Kemal ve Balıkçı Mustafa konuşma sahnesi",
        "timeOfDay": "Erken sabah, güneş yeni doğuyor",
        "weather": "Açık, rüzgarlı",
        "characters": [
          {
            "character": "Dedektif Kemal",
            "costume": "Siyah kazak, koyu kahverengi mont, kot pantolon, bot",
            "makeup": "Bir gün sonra, daha yorgun görünüm",
            "props": ["Not defteri", "Kalem", "Fotoğraf", "Termos"],
            "notes": "Kostüm değişikliği - casual görünüm"
          },
          {
            "character": "Balıkçı Mustafa",
            "costume": "Yıpranmış balıkçı kıyafetleri, yün şapka, çizme",
            "makeup": "Yaşlı, kırışık, güneşten yanmış ten",
            "props": ["Balıkçı ağı", "Sigara"],
            "notes": "Aksanlı konuşma, hafif kambur duruş"
          }
        ],
        "props": [
          {
            "name": "Balıkçı teknesi",
            "position": "Arka planda, iskeleye bağlı",
            "condition": "Eski, mavi-beyaz boyalı",
            "notes": "Teknenin adı \"Umut\" olarak görünmeli"
          }
        ],
        "images": ["/continuity/karanlik_2a_1.jpeg", "/continuity/karanlik_2a_2.jpeg"],
        "notes": "Limanda birkaç tekne daha olmalı. Balıkçılar arka planda çalışıyor olmalı."
      }
    ],
    "preparationStatus": [
      {
        "category": "location",
        "title": "Trabzon Çekim Lokasyonları",
        "description": "Sahil kasabası ve liman için uygun lokasyonların belirlenmesi, keşif gezileri ve izin başvuruları.",
        "status": "in_progress",
        "dueDate": "2025-07-15",
        "assignedTo": "2",
        "priority": "high",
        "notes": "Üç potansiyel lokasyon belirlendi, son karar için keşif gezisi planlanıyor. Belediye ve liman başkanlığı ile ilk görüşmeler yapıldı.",
        "createdAt": "2025-05-20T08:30:00",
        "updatedAt": "2025-06-10T14:15:00"
      },
      {
        "category": "casting",
        "title": "Başrol Oyuncusu Seçimi",
        "description": "Dedektif Kemal karakteri için oyuncu seçimi",
        "status": "completed",
        "dueDate": "2025-06-30",
        "assignedTo": "1",
        "priority": "urgent",
        "notes": "Mert Yılmaz ile anlaşma sağlandı",
        "createdAt": "2025-05-15T10:00:00",
        "updatedAt": "2025-06-25T16:45:00"
      },
      {
        "category": "props",
        "title": "Tekne Temini",
        "description": "Hikayede önemli yer tutan 'kayıp tekne' ve 'Balıkçı Mustafa'nın teknesi' için uygun teknelerin bulunması veya yapımı.",
        "status": "not_started",
        "dueDate": "2025-07-25",
        "assignedTo": "3",
        "priority": "high",
        "notes": "Yerel balıkçılarla ve tekne sahipleriyle görüşmeler yapılacak. Gerekirse özel yapım veya modifikasyon düşünülecek.",
        "createdAt": "2025-06-15T09:00:00",
        "updatedAt": "2025-06-15T09:00:00"
      },
      {
        "category": "casting",
        "title": "Yardımcı Oyuncu Seçimleri",
        "description": "Ayşe, Balıkçı Mustafa ve diğer kasaba sakinleri için oyuncu seçmeleri.",
        "status": "in_progress",
        "dueDate": "2025-07-20",
        "assignedTo": "1",
        "priority": "high",
        "notes": "Ayşe rolü için Deniz Şahin ile görüşülüyor. Balıkçı Mustafa için cast ajansları ile çalışılıyor.",
        "createdAt": "2025-06-01T11:00:00",
        "updatedAt": "2025-06-28T15:00:00"
      },
      {
        "category": "equipment",
        "title": "Sis Makinesi Kiralama",
        "description": "Atmosferik sahneler için yüksek kapasiteli sis makineleri temini.",
        "status": "not_started",
        "dueDate": "2025-07-30",
        "assignedTo": "4",
        "priority": "medium",
        "notes": "Birden fazla makine gerekebilir, farklı tipler inceleniyor.",
        "createdAt": "2025-06-20T10:00:00",
        "updatedAt": "2025-06-20T10:00:00"
      },
      {
        "category": "logistics",
        "title": "Ekip Konaklama ve Ulaşım",
        "description": "Trabzon'daki çekimler süresince tüm ekip için konaklama ve ulaşım organizasyonu.",
        "status": "issue",
        "dueDate": "2025-07-28",
        "assignedTo": "2",
        "priority": "high",
        "notes": "Otel ve araç kiralama firmalarından teklif alınıyor.",
        "createdAt": "2025-06-05T14:30:00",
        "updatedAt": "2025-06-22T11:20:00"
      }
    ],
    "moodboard": [
      "/moodboard/karadeniz_sahil.jpeg",
      "/moodboard/sisli_orman.jpeg",
      "/moodboard/eski_balikci_teknesi.jpeg",
      "/moodboard/dedektif_noir.jpeg",
      "/moodboard/kasaba_gece.jpeg",
      "/moodboard/firtinali_deniz.jpeg"
    ],
    "equipment": [
      {
        "name": "RED Komodo",
        "type": "camera",
        "quantity": 2,
        "brand": "RED",
        "model": "Komodo 6K",
        "specs": "6K, Super 35mm Sensor, Global Shutter",
        "rentalCompany": "Karadeniz Film Ekipmanları",
        "dailyRate": 1800,
        "notes": "Ana kameralar, düşük ışık performansı ve kompakt yapısı için tercih edildi."
      },
      {
        "name": "Aputure LS 600d Pro",
        "type": "lighting",
        "quantity": 4,
        "brand": "Aputure",
        "model": "Light Storm 600d Pro",
        "specs": "600W Daylight LED, Bowens Mount",
        "rentalCompany": "Ankara Işık Hizmetleri",
        "dailyRate": 400,
        "notes": "Dış ve geniş iç mekanlar için güçlü anahtar ışık."
      },
      {
        "name": "Sound Devices MixPre-10 II",
        "type": "sound",
        "quantity": 1,
        "brand": "Sound Devices",
        "model": "MixPre-10 II",
        "specs": "10-input, 12-track recorder",
        "rentalCompany": "Ses Ekipmanları A.Ş.",
        "dailyRate": 250,
        "notes": "Çok kanallı saha ses kaydı için."
      },
      {
        "name": "DJI RS 3 Pro",
        "type": "grip",
        "quantity": 1,
        "brand": "DJI",
        "model": "RS 3 Pro",
        "specs": "4.5kg taşıma kapasitesi, LiDAR focus",
        "rentalCompany": "Karadeniz Film Ekipmanları",
        "dailyRate": 200,
        "notes": "Dinamik kamera hareketleri için gimbal."
      },
      {
        "name": "Antari M-7X RGBA",
        "type": "other",
        "quantity": 2,
        "brand": "Antari",
        "model": "M-7X RGBA",
        "specs": "Sis makinesi, DMX kontrollü, LED ışıklı",
        "rentalCompany": "Efekt Kiralama TR",
        "dailyRate": 180,
        "notes": "Kontrollü sis efektleri için."
      }
    ]
  },
  {
    "id": "3",
    "title": "Dijital Kaçış",
    "type": "digital",
    "status": "pre_production",
    "director": "2",
    "startDate": "2025-09-01",
    "endDate": "2025-10-15",
    "platform": "prime",
    "description": "Genç bir hackerın, siber suç örgütünün elinden kurtulma mücadelesini anlatan bir dijital dizi.",
    "budget": 750000,
    "image": "/projects/dijital_kacis.jpeg",
    "team": [
      { "userId": "2", "role": "director", "status": "confirmed" },
      { "userId": "11", "role": "writer", "status": "confirmed" },
      { "userId": "12", "role": "vfx_supervisor", "status": "confirmed" },
      { "userId": "13", "role": "lead_actor_leo", "status": "applied" },
      { "userId": "4", "role": "dop", "status": "invited" }
    ],
    "callsheet": [
      {
        "date": "2025-09-05",
        "location": "Eski Fabrika - Hacker Mekanı Seti",
        "startTime": "09:00",
        "endTime": "21:00",
        "scenes": ["Ep1_Sc3", "Ep1_Sc5_Part1"],
        "notes": "Yoğun bilgisayar ekranı ve klavye kullanımı. VFX plakaları çekilecek.",
        "cast": [
          {
            "actorName": "Can Vural (Aday)",
            "character": "Leo (Hacker)",
            "callTime": "08:30",
            "notes": "Kostüm: Siyah hoodie, yırtık kot, parmaksız eldivenler. Saç dağınık."
          },
          {
            "actorName": "Gizem Akın (Aday)",
            "character": "Shadow (Örgüt Lideri - Ses)",
            "callTime": "14:00",
            "notes": "Sadece ses kaydı. Stüdyo ortamı."
          }
        ],
        "crew": [
          { "department": "Kamera", "callTime": "08:00" },
          { "department": "Işık", "callTime": "07:30", "notes": "Neon ışıklar ve pratik lambalar yoğun kullanılacak." },
          { "department": "Ses", "callTime": "08:00" },
          { "department": "Sanat", "callTime": "07:00", "notes": "Hacker mekanının son düzenlemeleri." },
          { "department": "VFX", "callTime": "09:00", "notes": "Ekran içerikleri için referans çekimleri ve takip markerları." }
        ]
      }
    ],
    "script": "DİJİTAL KAÇIŞ\\n\\nBÖLÜM 1 - \"KOD ADI: ORION\"\\n\\nSAHNE 3 - İÇ/GECE - LEO'NUN MEKANI\\n\\nLOŞ BİR ODA. Duvarlarda siberpunk posterler, etrafta bilgisayar parçaları. LEO (20'lerinde, zeki ama yorgun) birden fazla monitörün başında, parmakları klavyede dans ediyor.\\n\\nLEO\\n(kendi kendine)\\nNeredeyse... Sadece bir kaç satır daha...\\n\\nEKRAN GÖRÜNTÜSÜ - Karmaşık kod satırları hızla akıyor. Bir ilerleme çubuğu %98'de.\\n\\nBirden ana monitörde KIRMIZI BİR UYARI belirir: \"SİSTEM İHLALİ ALGILANDI!\"\\n\\nLEO\\n(paniklemiş)\\nOlamaz... Beni buldular!",
    "timecode": [
      {
        "scene": "Ep1_Sc1",
        "startTime": "00:00:00:00",
        "endTime": "00:01:30:00",
        "status": "pending",
        "notes": "Açılış, Leo'nun tanıtımı ve ilk hacking görevi."
      },
      {
        "scene": "Ep1_Sc3",
        "startTime": "00:03:45:00",
        "endTime": "00:05:15:10",
        "status": "pending",
        "notes": "Leo'nun mekanında kritik hacking sahnesi. Yüksek tempo."
      },
      {
        "scene": "Ep1_Sc5_Part1",
        "startTime": "00:08:00:00",
        "endTime": "00:10:20:00",
        "status": "pending",
        "notes": "Shadow ile ilk temas (sesli)."
      }
    ],
    "continuity": [
      {
        "scene": "Ep1_Sc3",
        "date": "2025-09-05 (Planlanan)",
        "location": "Eski Fabrika - Hacker Mekanı Seti",
        "description": "Leo'nun siber suç örgütü tarafından tespit edildiği an.",
        "timeOfDay": "Gece, yapay ışıklarla aydınlatılmış",
        "weather": "İç mekan",
        "characters": [
          {
            "character": "Leo",
            "costume": "Siyah kapüşonlu sweatshirt, koyu gri kargo pantolon, parmaksız eldivenler, kulaklık (boynunda).",
            "makeup": "Yorgun göz altları, hafif terli bir görünüm.",
            "props": ["Özel yapım klavye", "Çoklu monitör seti", "Eski bir sunucu kasası", "Enerji içeceği kutuları"],
            "notes": "Kapüşon sık sık başında olacak. Tırnakları yenmiş olabilir."
          }
        ],
        "props": [
          {
            "name": "Ana Monitör",
            "position": "Leo'nun tam karşısında, orta büyüklükte.",
            "condition": "Yeni, hafif kavisli ekran.",
            "notes": "Ekran içeriği VFX ile eklenecek. 'SİSTEM İHLALİ' uyarısı belirgin olmalı."
          },
          {
            "name": "Laptop",
            "position": "Ana monitörün solunda, hafif açılı.",
            "condition": "Üzerinde çıkartmalar var, biraz yıpranmış.",
            "notes": "Ekranında ikincil programlar veya iletişim arayüzü görünecek."
          }
        ],
        "images": ["/continuity/digital_ep1_sc3_1.jpeg", "/continuity/digital_ep1_sc3_leo_closeup.jpeg"],
        "notes": "Odadaki neon ışıkların yansımalarına dikkat edilmeli. Kabloların dağınıklığı kasıtlı ve tutarlı olmalı."
      }
    ],
    "preparationStatus": [
      {
        "category": "casting",
        "title": "Leo Karakteri Seçimi",
        "description": "Başrol 'Leo' için genç, dinamik ve teknolojiye hakim bir imaj çizebilecek oyuncu seçimi.",
        "status": "in_progress",
        "dueDate": "2025-07-10",
        "assignedTo": "2",
        "priority": "urgent",
        "notes": "Can Vural ile deneme çekimi yapıldı, değerlendirme sürüyor. İki aday daha var.",
        "createdAt": "2025-06-01T09:00:00",
        "updatedAt": "2025-06-25T14:30:00"
      },
      {
        "category": "location",
        "title": "Hacker Mekanı Lokasyonu",
        "description": "Leo'nun ana mekanı için uygun, endüstriyel ve siberpunk estetiğine sahip bir lokasyon bulunması.",
        "status": "completed",
        "dueDate": "2025-06-20",
        "assignedTo": "2",
        "priority": "high",
        "notes": "Terk edilmiş bir fabrika alanı kiralandı. Sanat departmanı tasarım üzerinde çalışıyor.",
        "createdAt": "2025-05-15T10:15:00",
        "updatedAt": "2025-06-18T16:45:00"
      },
      {
        "category": "other",
        "title": "Hacking Arayüzleri Tasarımı",
        "description": "Dizide kullanılacak tüm bilgisayar ekranları, hacking arayüzleri ve dijital efektlerin ön tasarımı.",
        "status": "in_progress",
        "dueDate": "2025-08-01",
        "assignedTo": "12",
        "priority": "high",
        "notes": "Storyboardlar tamamlandı, ilk konsept tasarımlar yönetmen onayına sunuldu.",
        "createdAt": "2025-06-05T11:30:00",
        "updatedAt": "2025-06-28T09:15:00"
      },
      {
        "category": "equipment",
        "title": "Teknik Ekipman Listesi",
        "description": "Çekimler için gerekli kameralar, lensler, ışık ve ses ekipmanlarının belirlenmesi ve kiralanması.",
        "status": "issue",
        "dueDate": "2025-08-15",
        "assignedTo": "4",
        "priority": "high",
        "notes": "Anamorfik lensler ve LED paneller düşünülüyor. Kiralama şirketlerinden teklif bekleniyor.",
        "createdAt": "2025-06-10T13:45:00",
        "updatedAt": "2025-06-22T10:30:00"
      },
      {
        "category": "props",
        "title": "Özel Bilgisayar Donanımları",
        "description": "Leo'nun kullandığı modifiye edilmiş bilgisayar kasaları, klavyeler ve diğer teknolojik aletlerin temini veya yapımı.",
        "status": "not_started",
        "dueDate": "2025-08-10",
        "assignedTo": "3",
        "priority": "medium",
        "notes": "Konsept tasarımlar bekleniyor.",
        "createdAt": "2025-06-25T14:00:00",
        "updatedAt": "2025-06-25T14:00:00"
      }
    ],
    "moodboard": [
      "/moodboard/cyberpunk_city.jpeg",
      "/moodboard/hacker_den.jpeg",
      "/moodboard/neon_lights.jpeg",
      "/moodboard/code_on_screen.jpeg",
      "/moodboard/dystopian_future.jpeg",
      "/moodboard/virtual_reality.jpeg"
    ],
    "equipment": [
      {
        "name": "Sony Venice 2",
        "type": "camera",
        "quantity": 1,
        "brand": "Sony",
        "model": "Venice 2",
        "specs": "8.6K Full-Frame Sensor, X-OCN recording",
        "rentalCompany": "ProCam Istanbul",
        "dailyRate": 3500,
        "notes": "Ana kamera, sinematik görünüm ve yüksek çözünürlük için."
      },
      {
        "name": "Cooke Anamorphic/i SF Lenses",
        "type": "camera",
        "quantity": 1,
        "brand": "Cooke",
        "model": "Anamorphic/i SF Set (32,40,50,75,100mm)",
        "specs": "2x Anamorphic, Special Flare",
        "rentalCompany": "LensPro Turkey",
        "dailyRate": 1500,
        "notes": "Karakteristik anamorfik görünüm ve flare'ler için."
      },
      {
        "name": "Astera Titan Tubes",
        "type": "lighting",
        "quantity": 12,
        "brand": "Astera",
        "model": "Titan Tube",
        "specs": "RGBMA LED, Wireless DMX, Battery Powered",
        "rentalCompany": "Light It Up Rentals",
        "dailyRate": 80,
        "notes": "Mekanlara yerleştirilecek pratik ve efekt ışıkları için."
      },
      {
        "name": "Green Screen Kit",
        "type": "other",
        "quantity": 1,
        "model": "Large Portable Kit",
        "specs": "3m x 6m, standlar dahil",
        "rentalCompany": "VFX Supplies Co.",
        "dailyRate": 150,
        "notes": "Ekran içerikleri ve bazı VFX sahneleri için."
      },
      {
        "name": "Blackmagic ATEM Mini Extreme ISO",
        "type": "other",
        "quantity": 1,
        "brand": "Blackmagic",
        "model": "ATEM Mini Extreme ISO",
        "specs": "8-input live production switcher, records all inputs",
        "rentalCompany": "Broadcast Solutions",
        "dailyRate": 200,
        "notes": "Çoklu kamera ve ekranların canlı önizlemesi ve kaydı için."
      }
    ]
  }
]
export const getProjectTypeName = (type: ProjectType) => {
  switch (type) {
    case 'film':
      return 'Film';
    case 'series':
      return 'Dizi';
    case 'documentary':
      return 'Belgesel';
    case 'digital':
      return 'Dijital İçerik';
    case 'commercial':
      return 'Reklam';
    default:
      return 'Bilinmeyen';
  }
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