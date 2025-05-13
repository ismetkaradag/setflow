'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiBell, FiX, FiMessageSquare, FiCalendar, FiUsers, FiClock, FiTag, FiCheck } from 'react-icons/fi';

// Demo bildirim verileri - gerçek uygulamada API'dan alınacak
const demoNotifications = [
  {
    id: '1',
    type: 'message',
    title: 'Yeni mesaj',
    content: 'Elif Bayraktar size bir mesaj gönderdi',
    time: '10 dakika önce',
    isRead: false,
    sender: {
      id: '2',
      name: 'Elif Bayraktar',
      avatar: '/avatars/elif.jpg'
    },
    link: '/mesajlar/12345'
  },
  {
    id: '2',
    type: 'call_sheet',
    title: 'Call Sheet güncellendi',
    content: '"İstanbul Rüyası" projesinin 15 Mayıs tarihli call sheet\'i güncellendi',
    time: '2 saat önce',
    isRead: false,
    project: {
      id: '1',
      title: 'İstanbul Rüyası'
    },
    link: '/projeler/1/call-sheet'
  },
  {
    id: '3',
    type: 'team',
    title: 'Yeni ekip üyesi',
    content: 'Hasan Vardar, "Karanlık Sular" projesine katıldı',
    time: 'Dün',
    isRead: true,
    project: {
      id: '2',
      title: 'Karanlık Sular'
    },
    user: {
      id: '4',
      name: 'Hasan Vardar',
      avatar: '/avatars/hasan.jpg'
    },
    link: '/projeler/2/ekip'
  },
  {
    id: '4',
    type: 'deadline',
    title: 'Yaklaşan son tarih',
    content: '"İstanbul Rüyası" projesi için senaryo teslim tarihi yaklaşıyor',
    time: '2 gün önce',
    isRead: true,
    project: {
      id: '1', 
      title: 'İstanbul Rüyası'
    },
    deadline: '2025-05-10',
    link: '/projeler/1/gorevler'
  },
  {
    id: '5',
    type: 'update',
    title: 'Güncelleme: Çekim planı',
    content: '"Karanlık Sular" projesinin çekim planı güncellendi',
    time: '3 gün önce',
    isRead: true,
    project: {
      id: '2',
      title: 'Karanlık Sular'
    },
    link: '/projeler/2/cekim-plani'
  }
];

interface NotificationDropdownProps {
  className?: string;
}

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(demoNotifications);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Bildirim sayısını hesapla
  const unreadCount = notifications.filter(n => !n.isRead).length;
  
  // Dropdown dışına tıklandığında kapatma
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Bildirimi oku olarak işaretleme
  const markAsRead = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, isRead: true } 
          : notification
      )
    );
  };
  
  // Tüm bildirimleri oku olarak işaretleme
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };
  
  // Bildirim ikonu seçimi
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'message':
        return <FiMessageSquare className="text-blue-500" />;
      case 'call_sheet':
        return <FiCalendar className="text-purple-500" />;
      case 'team':
        return <FiUsers className="text-green-500" />;
      case 'deadline':
        return <FiClock className="text-red-500" />;
      case 'update':
        return <FiTag className="text-yellow-500" />;
      default:
        return <FiBell className="text-gray-500" />;
    }
  };
  
  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Bildirim zili butonu */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-1 rounded-full hover:bg-gray-100 transition-colors"
        aria-label="Bildirimleri göster"
      >
        <FiBell size={16} className="text-gray-700" />
        
        {/* Okunmamış bildirim sayısı */}
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>
      
      {/* Bildirim dropdown menüsü */}
      {isOpen && (
        <div className="absolute right-0 mt-1 w-72 max-h-[76vh] overflow-y-auto bg-white rounded-lg shadow-lg border border-gray-200 z-50 animate-fadeIn">
          {/* Başlık */}
          <div className="flex items-center justify-between p-3 border-b border-gray-100">
            <h3 className="font-medium">Bildirimler</h3>
            
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button 
                  onClick={markAllAsRead}
                  className="text-xs text-primary hover:underline flex items-center"
                >
                  <FiCheck size={12} className="mr-1" />
                  Tümünü Okundu İşaretle
                </button>
              )}
            </div>
          </div>
          
          {/* Bildirimler listesi */}
          <div>
            {notifications.length > 0 ? (
              <div>
                {notifications.map(notification => (
                  <Link 
                    href={notification.link} 
                    key={notification.id}
                    className={`block border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors ${!notification.isRead ? 'bg-blue-50' : ''}`}
                    onClick={(e) => markAsRead(notification.id, e)}
                  >
                    <div className="flex p-3 gap-3">
                      {/* İkon veya avatar */}
                      <div className="flex-shrink-0 w-8 h-8 rounded-full overflow-hidden flex items-center justify-center bg-gray-100">
                        {notification.sender?.avatar ? (
                          <div className="relative w-full h-full">
                            <Image
                              src={notification.sender.avatar}
                              alt={notification.sender.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          getNotificationIcon(notification.type)
                        )}
                      </div>
                      
                      {/* İçerik */}
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm">{notification.title}</div>
                        <div className="text-xs text-gray-600 line-clamp-2">{notification.content}</div>
                        <div className="text-[10px] text-gray-500 mt-1">{notification.time}</div>
                      </div>
                      
                      {/* İşaretleme butonu */}
                      {!notification.isRead && (
                        <button 
                          onClick={(e) => markAsRead(notification.id, e)}
                          className="text-gray-400 hover:text-gray-600"
                          title="Okundu olarak işaretle"
                        >
                          <FiX size={14} />
                        </button>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-gray-500 text-sm">
                Bildiriminiz bulunmuyor
              </div>
            )}
          </div>
          
          {/* Tüm bildirimleri görüntüle */}
          <div className="p-2 text-center border-t border-gray-100">
            <Link 
              href="/bildirimler" 
              className="text-xs text-primary font-medium hover:underline block py-1"
            >
              Tüm Bildirimleri Görüntüle
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;