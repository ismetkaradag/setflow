'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiBell, FiCalendar, FiClock, FiFileText, FiMapPin } from 'react-icons/fi';
import { projects } from '@/lib/data/projects';
import { users } from '@/lib/data/users';
import OnboardingModal from '@/components/onboarding/OnboardingModal';
import SurveyModal from '@/components/onboarding/SurveyModal';

// Demo için ilk kullanıcıyı (Derya Arslan) aktif kullanıcı kabul ediyoruz
const activeUserId = '1';

export default function HomePage() {
  const [activeUser, setActiveUser] = useState(users.find(u => u.id === activeUserId));
  const [userProjects, setUserProjects] = useState<typeof projects>([]);
  
  // Onboarding ve anket modalları için state
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showSurvey, setShowSurvey] = useState(false);
  
  useEffect(() => {
    // Kullanıcının projelerini filtrele
    const filteredProjects = projects.filter(project => 
      project.team?.some(member => member.userId === activeUserId)
    );
    setUserProjects(filteredProjects);
    
    // Onboarding ve anket gösterimi kontrolü
    // Not: Bu değerler gerçek bir uygulamada backend'den gelir
    setTimeout(() => {
      const onboardingShown = localStorage.getItem('setflow_show_onboarding') === 'false';
      const surveyCompleted = localStorage.getItem('setflow_survey_completed') === 'true';
      
      if (!onboardingShown) {
        setShowOnboarding(true);
      } else if (!surveyCompleted) {
        setShowSurvey(true);
      }
    }, 1000); // 1 saniye gecikme ile göster
  }, []);
  
  // Onboarding kapatıldığında anket göster
  const handleOnboardingClose = () => {
    setShowOnboarding(false);
    
    // Onboarding kapandıktan sonra anket tamamlanmadıysa anket göster
    const surveyCompleted = localStorage.getItem('setflow_survey_completed') === 'true';
    if (!surveyCompleted) {
      setShowSurvey(true);
    }
  };
  
  // Anketi kapat
  const handleSurveyClose = () => {
    setShowSurvey(false);
  };
  
  // Bugünkü ve yaklaşan etkinlikler (demo veriler)
  const todayEvents = [
    {
      id: '1',
      projectId: '1',
      title: 'Sultanahmet Çekimi',
      time: '08:00 - 17:00',
      location: 'Sultanahmet Meydanı',
      type: 'shooting' // shooting, meeting, preparation
    }
  ];
  
  const upcomingEvents = [
    {
      id: '2',
      projectId: '1',
      title: 'Ekip Toplantısı',
      date: '03 Mayıs 2025',
      time: '10:00 - 11:30',
      location: 'Zoom',
      type: 'meeting'
    },
    {
      id: '3',
      projectId: '1',
      title: 'Kostüm Provası',
      date: '05 Mayıs 2025',
      time: '14:00 - 16:00',
      location: 'Stüdyo',
      type: 'preparation'
    }
  ];
  
  // Bildirimler (demo veriler)
  const notifications = [
    {
      id: '1',
      title: 'İstanbul Rüyası projesi için yeni callsheet yayınlandı',
      time: '1 saat önce',
      read: false
    },
    {
      id: '2',
      title: 'Senaryo dosyası güncellendi',
      time: '3 saat önce',
      read: true
    },
    {
      id: '3',
      title: 'Kaan Aytekin projeye katıldı',
      time: '1 gün önce',
      read: true
    }
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Merhaba, {activeUser?.name}</h1>
        <div className="relative">
          <FiBell size={24} className="text-gray-700" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
            2
          </span>
        </div>
      </div>
      
      {/* Bugünkü etkinlikler */}
      <div className="space-y-4">
        <h2 className="text-lg font-medium">Bugün</h2>
        
        {todayEvents.length > 0 ? (
          <div className="space-y-3">
            {todayEvents.map(event => (
              <div key={event.id} className="card border-l-4 border-l-primary">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{event.title}</h3>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <FiClock className="mr-1" size={14} />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <FiMapPin className="mr-1" size={14} />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <Link 
                    href={`/proje/${event.projectId}`} 
                    className="px-3 py-1 bg-primary/10 text-primary text-sm rounded"
                  >
                    Detaylar
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Bugün için planlanmış etkinlik bulunmuyor.</p>
        )}
      </div>
      
      {/* Projeler */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium">Projelerim</h2>
          <Link href="/proje-bul" className="text-primary text-sm">
            Tümünü Gör
          </Link>
        </div>
        
        <div className="space-y-3">
          {userProjects.map(project => (
            <Link href={`/proje/${project.id}`} key={project.id}>
              <div className="card hover:shadow-md transition-shadow">
                <h3 className="font-medium">{project.title}</h3>
                <div className="flex justify-between text-sm mt-2">
                  <span className="bg-gray-100 px-2 py-0.5 rounded">
                    {project.type === 'film' ? 'Film' : 'Dizi'}
                  </span>
                  <div className="flex items-center text-gray-500">
                    <FiCalendar className="mr-1" size={14} />
                    <span>{new Date(project.startDate).toLocaleDateString('tr-TR')}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      {/* Yaklaşan etkinlikler */}
      <div className="space-y-4">
        <h2 className="text-lg font-medium">Yaklaşan Etkinlikler</h2>
        
        <div className="space-y-3">
          {upcomingEvents.map(event => (
            <div key={event.id} className="card">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{event.title}</h3>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <FiCalendar className="mr-1" size={14} />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <FiClock className="mr-1" size={14} />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <FiMapPin className="mr-1" size={14} />
                    <span>{event.location}</span>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded text-sm ${
                  event.type === 'meeting' 
                    ? 'bg-blue-100 text-blue-700' 
                    : event.type === 'preparation'
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-green-100 text-green-700'
                }`}>
                  {event.type === 'meeting' 
                    ? 'Toplantı' 
                    : event.type === 'preparation'
                      ? 'Hazırlık'
                      : 'Çekim'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Bildirimler */}
      <div className="space-y-4">
        <h2 className="text-lg font-medium">Bildirimler</h2>
        
        <div className="space-y-3">
          {notifications.map(notification => (
            <div 
              key={notification.id} 
              className={`card ${!notification.read ? 'bg-blue-50 border-blue-100' : ''}`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-full ${!notification.read ? 'bg-blue-100' : 'bg-gray-100'}`}>
                  <FiFileText className={!notification.read ? 'text-blue-600' : 'text-gray-500'} />
                </div>
                <div>
                  <h3 className={`font-medium ${!notification.read ? 'text-blue-800' : ''}`}>
                    {notification.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">{notification.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Onboarding Modal */}
      <OnboardingModal 
        isOpen={showOnboarding} 
        onClose={handleOnboardingClose} 
      />
      
      {/* Anket Modal */}
      <SurveyModal
        isOpen={showSurvey}
        onClose={handleSurveyClose}
      />
    </div>
  );
}