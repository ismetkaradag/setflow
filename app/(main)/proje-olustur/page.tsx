'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiChevronLeft, FiFilm, FiTv, FiDollarSign, FiCalendar, FiInfo, FiMonitor } from 'react-icons/fi';
import { ProjectType, ProjectPlatform, getProjectTypeName, getPlatformName } from '@/lib/data/projects';

export default function CreateProjectPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    type: '' as ProjectType,
    startDate: '',
    endDate: '',
    platform: '' as ProjectPlatform,
    description: '',
    budget: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleTypeSelect = (type: ProjectType) => {
    setFormData(prev => ({ ...prev, type }));
  };
  
  const handlePlatformSelect = (platform: ProjectPlatform) => {
    setFormData(prev => ({ ...prev, platform }));
  };
  
  const handleNext = () => {
    setStep(prev => prev + 1);
  };
  
  const handleBack = () => {
    setStep(prev => prev - 1);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo için sadece onay mesajı gösterip ana sayfaya yönlendiriyoruz
    alert('Proje başarıyla oluşturuldu!');
    router.push('/anasayfa');
  };
  
  // Aktif kullanıcının rolü (demo için)
  const activeUserRole = 'director'; // Sadece yönetmen/yapımcı proje oluşturabilir
  
  if (activeUserRole !== 'director') {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <div className="bg-yellow-50 text-yellow-700 p-4 rounded-lg">
          <h2 className="text-lg font-medium mb-2">Yetkisiz Erişim</h2>
          <p>Yalnızca Yönetmen/Yapımcı rolündeki kullanıcılar yeni proje oluşturabilir.</p>
        </div>
        <button
          onClick={() => router.push('/anasayfa')}
          className="mt-4 btn-outline"
        >
          Ana Sayfaya Dön
        </button>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.push('/anasayfa')}
          className="p-2 bg-gray-100 rounded-full"
        >
          <FiChevronLeft size={18} />
        </button>
        <h1 className="text-2xl font-bold">Yeni Proje Oluştur</h1>
      </div>
      
      {/* İlerleme Çubuğu */}
      <div className="relative pt-1">
        <div className="flex mb-2 justify-between">
          <div className="text-xs text-primary font-semibold">
            {step === 1 ? 'Proje Bilgileri' : step === 2 ? 'Tarih ve Platform' : 'Tamamla'}
          </div>
          <div className="text-xs text-primary font-semibold">
            {step}/3
          </div>
        </div>
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
          <div 
            style={{ width: `${(step / 3) * 100}%` }} 
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary"
          />
        </div>
      </div>
      
      <div className="card">
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Proje Adı *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="input"
                placeholder="Örn: İstanbul Rüyası"
                required
              />
            </div>
            
            <div>
  <label className="block text-sm font-medium text-gray-700 mb-3">
    Proje Türü *
  </label>
  <div className="grid grid-cols-3 gap-4">
    <button
      type="button"
      onClick={() => handleTypeSelect('film')}
      className={`flex flex-col items-center justify-center p-6 rounded-lg border-2 
        ${formData.type === 'film' 
          ? 'border-primary bg-primary/5' 
          : 'border-gray-200 hover:border-gray-300'}`}
    >
      <FiFilm size={24} className={formData.type === 'film' ? 'text-primary' : 'text-gray-500'} />
      <span className={`mt-2 font-medium ${formData.type === 'film' ? 'text-primary' : 'text-gray-700'}`}>
        Film
      </span>
    </button>

    <button
      type="button"
      onClick={() => handleTypeSelect('series')}
      className={`flex flex-col items-center justify-center p-6 rounded-lg border-2 
        ${formData.type === 'series' 
          ? 'border-primary bg-primary/5' 
          : 'border-gray-200 hover:border-gray-300'}`}
    >
      <FiTv size={24} className={formData.type === 'series' ? 'text-primary' : 'text-gray-500'} />
      <span className={`mt-2 font-medium ${formData.type === 'series' ? 'text-primary' : 'text-gray-700'}`}>
        Dizi
      </span>
    </button>

    <button
      type="button"
      onClick={() => handleTypeSelect('digital')}
      className={`flex flex-col items-center justify-center p-6 rounded-lg border-2 
        ${formData.type === 'digital' 
          ? 'border-primary bg-primary/5' 
          : 'border-gray-200 hover:border-gray-300'}`}
    >
      <FiMonitor size={24} className={formData.type === 'digital' ? 'text-primary' : 'text-gray-500'} />
      <span className={`mt-2 font-medium ${formData.type === 'digital' ? 'text-primary' : 'text-gray-700'}`}>
        Dijital Platform
      </span>
    </button>
  </div>
</div>

            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Proje Açıklaması *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="input"
                placeholder="Projenizin kısa bir açıklamasını yazın..."
                required
              />
            </div>
            
            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={handleNext}
                disabled={!formData.title || !formData.type || !formData.description}
                className={`btn-primary ${
                  !formData.title || !formData.type || !formData.description ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                Devam Et
              </button>
            </div>
          </div>
        )}
        
        {step === 2 && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Başlangıç Tarihi *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiCalendar className="text-gray-400" />
                  </div>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="input pl-10"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Bitiş Tarihi *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiCalendar className="text-gray-400" />
                  </div>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    className="input pl-10"
                    required
                    min={formData.startDate}
                  />
                </div>
              </div>
            </div>
            
            <div>
              <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">
                Tahmini Bütçe (₺)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiDollarSign className="text-gray-400" />
                </div>
                <input
                  type="number"
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="input pl-10"
                  placeholder="Örn: 5000000"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Yayın Platformu *
              </label>
              <div className="grid grid-cols-3 gap-3">
                {(['netflix', 'prime', 'disney', 'tv', 'cinema'] as ProjectPlatform[]).map(platform => (
                  <button
                    key={platform}
                    type="button"
                    onClick={() => handlePlatformSelect(platform)}
                    className={`flex flex-col items-center justify-center p-4 rounded-lg border 
                      ${formData.platform === platform 
                        ? 'border-primary bg-primary/5' 
                        : 'border-gray-200 hover:border-gray-300'}`}
                  >
                    <FiMonitor size={18} className={formData.platform === platform ? 'text-primary' : 'text-gray-500'} />
                    <span className={`mt-1 text-sm ${formData.platform === platform ? 'text-primary' : 'text-gray-700'}`}>
                      {getPlatformName(platform)}
                    </span>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="pt-4 flex justify-between">
              <button
                type="button"
                onClick={handleBack}
                className="btn-outline"
              >
                Geri
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={!formData.startDate || !formData.endDate || !formData.platform}
                className={`btn-primary ${
                  !formData.startDate || !formData.endDate || !formData.platform ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                Devam Et
              </button>
            </div>
          </div>
        )}
        
        {step === 3 && (
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-3">Proje Özeti</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-500">Proje Adı:</span>
                  <span className="font-medium">{formData.title}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-500">Tür:</span>
                  <span>{getProjectTypeName(formData.type as ProjectType)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-500">Tarih Aralığı:</span>
                  <span>
                    {formData.startDate && new Date(formData.startDate).toLocaleDateString('tr-TR')} - {' '}
                    {formData.endDate && new Date(formData.endDate).toLocaleDateString('tr-TR')}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-500">Platform:</span>
                  <span>{getPlatformName(formData.platform as ProjectPlatform)}</span>
                </div>
                
                {formData.budget && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Bütçe:</span>
                    <span>{Number(formData.budget).toLocaleString('tr-TR')} ₺</span>
                  </div>
                )}
                
                <div>
                  <div className="text-gray-500 mb-1">Açıklama:</div>
                  <p className="text-sm">{formData.description}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 text-blue-700 p-4 rounded-lg">
              <div className="flex items-start gap-2">
                <FiInfo className="mt-1 flex-shrink-0" />
                <p className="text-sm">
                  Projeyi oluşturduktan sonra "Ekip Yönetimi" sekmesinden ekip üyelerini davet edebilir, açık pozisyonları belirleyebilirsiniz.
                </p>
              </div>
            </div>
            
            <div className="pt-4 flex justify-between">
              <button
                type="button"
                onClick={handleBack}
                className="btn-outline"
              >
                Geri
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="btn-primary"
              >
                Projeyi Oluştur
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}