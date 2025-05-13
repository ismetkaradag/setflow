'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiCalendar, FiClock, FiFileText, FiMapPin } from 'react-icons/fi';
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
    },
    {
      id: '2',
      projectId: '1',
      title: 'Senaryo Okuma',
      time: '19:00 - 21:00',
      location: 'Zoom',
      type: 'meeting'
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
  
  return (
    <div className="">
      <div>
        <h1 className="text-2xl font-bold">Merhaba, {activeUser?.name}</h1>
      </div>
      
      {/* Bugünkü etkinlikler */}
      <div className="space-y-4">
        <h2 className="text-lg font-medium">Bugün</h2>
        
        {todayEvents.length > 0 ? (
          <div className="space-y-3">
            {todayEvents.map(event => (
              <div key={event.id} className="card border-l-4 border-l-primary cursor-pointer" onClick={() => {window.location.href = `/proje/${event.projectId}`}}>
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
          <Link href="/projelerim" className="text-primary text-sm">
            Tümünü Gör
          </Link>
        </div>
        
        <div className="space-y-3">
          {userProjects.map(project => (
            <Link href={`/proje/${project.id}`} key={project.id}>
              <div className="card hover:shadow-md transition-shadow mb-3">
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
      <div className="">
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