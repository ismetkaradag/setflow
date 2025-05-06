'use client';

import { useState, useEffect } from 'react';
import { FiChevronDown, FiChevronUp, FiMapPin, FiUsers, FiVideo, FiClock } from 'react-icons/fi';
import NotificationDropdown from '@/components/notifications/NotificationDropdown';

// Demo veri - gerçek uygulamada API'dan alınır
const activeSceneData = {
  sceneNumber: '3A',
  location: 'Sultanahmet Meydanı - Çeşme Önü',
  time: '11:30 - 13:45',
  actors: [
    { id: '1', name: 'Kerem Yılmaz', character: 'Ali', notes: 'Sahne başında heyecanlı' },
    { id: '2', name: 'Selin Demirci', character: 'Zeynep', notes: 'Geç gelecek, hazırlıklı ol' },
    { id: '3', name: 'Ahmet Kaya', character: 'Turist', notes: 'Arka planda' }
  ]
};

interface InfoBarProps {
  // Gerçek uygulamada prop olarak aktif sahne verileri alınabilir
}

const InfoBar: React.FC<InfoBarProps> = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Genişletme/daraltma işlevi
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    
    // Ana layout'a bilgi barının genişletildiğini bildir
    const event = new CustomEvent('infoBarChange', {
      detail: { expanded: !isExpanded }
    });
    window.dispatchEvent(event);
  };
  
  return (
    <div className="sticky top-0 bg-white border-b border-gray-200 shadow-xs z-40 h-12 mb-2 text-xs">
      {/* Ana bilgi çubuğu */}
      <div className="px-2 py-1 flex justify-between items-center h-full">
        {/* Sol taraf - Sahne bilgileri */}
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <FiVideo className="text-primary mr-1" size={10} />
            <span className="font-medium">Sahne {activeSceneData.sceneNumber}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <FiClock className="mr-1" size={10} />
            <span>{activeSceneData.time}</span>
          </div>
        </div>
        
        {/* Sağ taraf - Lokasyon ve Bildirim */}
        <div className="flex items-center gap-4">
          {/* Lokasyon butonu */}
          <button 
            onClick={toggleExpand}
            className="flex items-center gap-1 text-gray-600"
          >
            <FiMapPin className="text-gray-500" size={10} />
            <span className="max-w-[140px] truncate">{activeSceneData.location}</span>
            {isExpanded ? (
              <FiChevronUp className="text-gray-500" size={10} />
            ) : (
              <FiChevronDown className="text-gray-500" size={10} />
            )}
          </button>
          
          {/* Bildirim ikonu ve dropdown */}
          <NotificationDropdown />
        </div>
      </div>
      
      {/* Genişletilmiş detay alanı */}
      {isExpanded && (
        <div className="px-2 py-2 bg-gray-50 border-t border-gray-200 animate-fadeIn text-xs">
          <div className="flex items-center gap-1 mb-1">
            <FiUsers size={10} className="text-primary" />
            <h4 className="font-medium">Oyuncular</h4>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {activeSceneData.actors.map(actor => (
              <div key={actor.id} className="bg-white p-1.5 rounded-md border border-gray-200">
                <div className="font-medium">{actor.name}</div>
                <div className="text-primary text-[10px]">{actor.character}</div>
                {actor.notes && (
                  <div className="text-gray-500 text-[10px] mt-0.5">{actor.notes}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoBar;