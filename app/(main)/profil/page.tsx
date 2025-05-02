'use client';

import { useState, useEffect } from 'react';
import { FiUser, FiMail, FiPhone, FiMapPin, FiEdit, FiPlus, FiTrash2, FiSave, FiX, FiFile, FiUpload, FiDownload } from 'react-icons/fi';
import { users, getRoleName } from '@/lib/data/users';

// Demo için aktif kullanıcıyı belirliyoruz
const activeUserId = '1'; // Derya Arslan

export default function ProfilePage() {
  const [activeUser, setActiveUser] = useState(users.find(u => u.id === activeUserId));
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: '',
    surname: '',
    email: '',
    phone: '',
    location: '',
    bio: ''
  });
  
  // Kullanıcı becerilerini düzenlemek için state
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState('');
  
  useEffect(() => {
    if (activeUser) {
      setEditFormData({
        name: activeUser.name,
        surname: activeUser.surname,
        email: activeUser.email,
        phone: '0532 123 4567', // Demo veri
        location: 'İstanbul, Türkiye', // Demo veri
        bio: activeUser.bio || ''
      });
      
      setSkills(activeUser.skills || []);
    }
  }, [activeUser]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills(prev => [...prev, newSkill.trim()]);
      setNewSkill('');
    }
  };
  
  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(prev => prev.filter(skill => skill !== skillToRemove));
  };
  
  const handleSaveProfile = () => {
    // Gerçek uygulamada burada API çağrısı yapılır
    // Demo için sadece state güncelleniyor
    if (activeUser) {
      const updatedUser = {
        ...activeUser,
        name: editFormData.name,
        surname: editFormData.surname,
        email: editFormData.email,
        bio: editFormData.bio,
        skills
      };
      
      setActiveUser(updatedUser);
      setIsEditing(false);
    }
  };
  
  const handleCancelEdit = () => {
    // Düzenleme iptal edilirse orijinal değerlere geri dön
    if (activeUser) {
      setEditFormData({
        name: activeUser.name,
        surname: activeUser.surname,
        email: activeUser.email,
        phone: '0532 123 4567',
        location: 'İstanbul, Türkiye',
        bio: activeUser.bio || ''
      });
      
      setSkills(activeUser.skills || []);
    }
    
    setIsEditing(false);
  };
  
  if (!activeUser) {
    return <div>Kullanıcı bulunamadı.</div>;
  }
  
  // Profil tamamlama yüzdesi (demo hesaplama)
  const calculateProfileCompletion = () => {
    let score = 0;
    if (activeUser.name) score += 10;
    if (activeUser.surname) score += 10;
    if (activeUser.email) score += 10;
    if (activeUser.bio) score += 20;
    if (activeUser.skills && activeUser.skills.length > 0) score += 20;
    if (activeUser.avatar) score += 10;
    // Tamamlandığını varsaydığımız diğer bilgiler
    score += 20;
    
    return score;
  };
  
  const completionPercentage = calculateProfileCompletion();
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Profil</h1>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="btn-outline flex items-center gap-1"
          >
            <FiEdit size={16} />
            <span>Düzenle</span>
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleCancelEdit}
              className="flex items-center gap-1 text-gray-500 hover:text-gray-700"
            >
              <FiX size={16} />
              <span>İptal</span>
            </button>
            <button
              onClick={handleSaveProfile}
              className="btn-primary flex items-center gap-1"
            >
              <FiSave size={16} />
              <span>Kaydet</span>
            </button>
          </div>
        )}
      </div>
      
      {/* Profil tamamlama durumu */}
      <div className="card">
        <h2 className="text-lg font-medium mb-3">Profil Tamamlama</h2>
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm text-gray-500">Tamamlama Durumu</span>
            <span className="text-sm font-medium">{completionPercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-primary h-2.5 rounded-full" 
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
          {completionPercentage < 100 && (
            <p className="text-xs text-gray-500 mt-2">
              Profilinizi tamamlamak için biyografinizi güncelleyin ve becerilerinizi ekleyin.
            </p>
          )}
        </div>
      </div>
      
      {/* Kişisel bilgiler */}
      <div className="card">
        <h2 className="text-lg font-medium mb-4">Kişisel Bilgiler</h2>
        
        {!isEditing ? (
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center">
                <FiUser size={32} className="text-gray-500" />
              </div>
              <div className="ml-4">
                <h3 className="font-medium text-lg">{activeUser.name} {activeUser.surname}</h3>
                <p className="text-sm text-primary">{getRoleName(activeUser.role)}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              <div>
                <p className="text-sm text-gray-500">E-posta</p>
                <div className="flex items-center mt-1">
                  <FiMail className="text-gray-400 mr-2" size={16} />
                  <span>{activeUser.email}</span>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Telefon</p>
                <div className="flex items-center mt-1">
                  <FiPhone className="text-gray-400 mr-2" size={16} />
                  <span>0532 123 4567</span>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Konum</p>
                <div className="flex items-center mt-1">
                  <FiMapPin className="text-gray-400 mr-2" size={16} />
                  <span>İstanbul, Türkiye</span>
                </div>
              </div>
            </div>
            
            {activeUser.bio && (
              <div className="pt-4">
                <p className="text-sm text-gray-500">Hakkımda</p>
                <p className="mt-1">{activeUser.bio}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Ad
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={editFormData.name}
                  onChange={handleChange}
                  className="input"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="surname" className="block text-sm font-medium text-gray-700 mb-1">
                  Soyad
                </label>
                <input
                  type="text"
                  id="surname"
                  name="surname"
                  value={editFormData.surname}
                  onChange={handleChange}
                  className="input"
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                E-posta
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={editFormData.email}
                onChange={handleChange}
                className="input"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Telefon
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={editFormData.phone}
                  onChange={handleChange}
                  className="input"
                />
              </div>
              
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Konum
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={editFormData.location}
                  onChange={handleChange}
                  className="input"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                Hakkımda
              </label>
              <textarea
                id="bio"
                name="bio"
                value={editFormData.bio}
                onChange={handleChange}
                rows={4}
                className="input"
              />
            </div>
          </div>
        )}
      </div>
      
      {/* Beceriler */}
      <div className="card">
        <h2 className="text-lg font-medium mb-4">Beceriler</h2>
        
        {!isEditing ? (
          <div>
            {skills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {skills.map(skill => (
                  <span key={skill} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">Henüz beceri eklenmemiş.</p>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Yeni beceri ekle"
                className="input flex-grow"
              />
              <button
                onClick={handleAddSkill}
                className="btn-outline flex items-center gap-1"
              >
                <FiPlus size={16} />
                <span>Ekle</span>
              </button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {skills.map(skill => (
                <div key={skill} className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                  <span>{skill}</span>
                  <button onClick={() => handleRemoveSkill(skill)} className="text-gray-400 hover:text-red-500">
                    <FiX size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Proje Geçmişi */}
      <div className="card">
        <h2 className="text-lg font-medium mb-4">Proje Geçmişi</h2>
        
        <div className="space-y-4">
          {[
            {
              title: 'Son Düğüm',
              role: 'Yönetmen',
              year: '2023',
              description: 'Uluslararası bir film festivali seçkisine dahil edilen psikolojik gerilim filmi.'
            },
            {
              title: 'Yeni Başlangıçlar',
              role: 'Yardımcı Yönetmen',
              year: '2022',
              description: 'Ulusal TV kanalında yayınlanan 8 bölümlük mini dizi.'
            },
            {
              title: 'Dönüş Yolu',
              role: 'Yönetmen',
              year: '2021',
              description: 'Anadolu\'da geçen bir yol filmi.'
            }
          ].map((project, index) => (
            <div key={index} className={index > 0 ? 'pt-4 border-t border-gray-100' : ''}>
              <div className="flex justify-between">
                <h3 className="font-medium">{project.title}</h3>
                <span className="text-gray-500">{project.year}</span>
              </div>
              <p className="text-sm text-primary mb-1">{project.role}</p>
              <p className="text-sm text-gray-600">{project.description}</p>
            </div>
          ))}
        </div>
        
        <button className="btn-outline w-full mt-4">
          Yeni Proje Ekle
        </button>
      </div>
      
      {/* CV Yükleme */}
      <div className="card">
        <h2 className="text-lg font-medium mb-4">CV ve Portfolyo</h2>
        
        <div className="space-y-4">
          <div className="border border-dashed border-gray-300 rounded-lg p-6 text-center">
            <div className="mb-3">
              <FiFile size={32} className="mx-auto text-gray-400" />
            </div>
            <p className="text-gray-500 mb-3">
              CV veya portfolyo dosyanızı sürükleyip bırakın veya aşağıdaki butonu kullanarak yükleyin.
            </p>
            <button className="btn-outline flex items-center gap-1 mx-auto">
              <FiUpload size={16} />
              <span>Dosya Seç</span>
            </button>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FiFile size={20} className="text-gray-500" />
                <div>
                  <p className="font-medium">DeryaArslan_CV_2024.pdf</p>
                  <p className="text-xs text-gray-500">2.3 MB · Yüklenme: 15.03.2025</p>
                </div>
              </div>
              <button className="text-primary hover:text-primary/80">
                <FiDownload size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Hesap Ayarları */}
      <div className="card">
        <h2 className="text-lg font-medium mb-4">Hesap Ayarları</h2>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-gray-100">
            <div>
              <p className="font-medium">Bildirim Tercihleri</p>
              <p className="text-sm text-gray-500">E-posta ve uygulama bildirimlerinizi yönetin</p>
            </div>
            <button className="text-primary">Düzenle</button>
          </div>
          
          <div className="flex justify-between items-center pb-3 border-b border-gray-100">
            <div>
              <p className="font-medium">Gizlilik Ayarları</p>
              <p className="text-sm text-gray-500">Profilinizin görünürlüğünü ayarlayın</p>
            </div>
            <button className="text-primary">Düzenle</button>
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">Şifre Değiştir</p>
              <p className="text-sm text-gray-500">Hesap güvenliğinizi güncelleyin</p>
            </div>
            <button className="text-primary">Değiştir</button>
          </div>
        </div>
      </div>
    </div>
  );
}