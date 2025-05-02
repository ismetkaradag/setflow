'use client';

import { useState } from 'react';
import { FiChevronRight, FiBell, FiMoon, FiGlobe, FiShield, FiHelpCircle, FiInfo, FiLogOut } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('tr');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  
  const handleLogout = () => {
    // Demo için ana sayfaya yönlendir
    router.push('/giris');
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Ayarlar</h1>
      
      {/* Görünüm ayarları */}
      <div className="card">
        <h2 className="text-lg font-medium mb-3">Görünüm</h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FiMoon className="text-gray-500" size={20} />
              <span>Karanlık Mod</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between border-t border-gray-100 pt-4">
            <div className="flex items-center gap-3">
              <FiGlobe className="text-gray-500" size={20} />
              <span>Dil</span>
            </div>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block p-2"
            >
              <option value="tr">Türkçe</option>
              <option value="en">İngilizce</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Bildirim ayarları */}
      <div className="card">
        <h2 className="text-lg font-medium mb-3">Bildirimler</h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FiBell className="text-gray-500" size={20} />
              <span>Bildirimler</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={notificationsEnabled}
                onChange={() => setNotificationsEnabled(!notificationsEnabled)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
          
          {notificationsEnabled && (
            <div className="space-y-3 pt-2 pl-8">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="notification-email"
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  defaultChecked
                />
                <label htmlFor="notification-email" className="text-sm">
                  E-posta bildirimleri
                </label>
              </div>
              
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="notification-app"
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  defaultChecked
                />
                <label htmlFor="notification-app" className="text-sm">
                  Uygulama bildirimleri
                </label>
              </div>
              
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="notification-sms"
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor="notification-sms" className="text-sm">
                  SMS bildirimleri
                </label>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Gizlilik ve Güvenlik */}
      <div className="card">
        <h2 className="text-lg font-medium mb-3">Gizlilik ve Güvenlik</h2>
        
        <div className="space-y-4">
          <button className="flex items-center justify-between w-full text-left">
            <div className="flex items-center gap-3">
              <FiShield className="text-gray-500" size={20} />
              <span>Hesap Güvenliği</span>
            </div>
            <FiChevronRight className="text-gray-400" />
          </button>
          
          <div className="border-t border-gray-100 pt-4">
            <button className="flex items-center justify-between w-full text-left">
              <div className="flex items-center gap-3">
                <FiShield className="text-gray-500" size={20} />
                <span>Gizlilik Ayarları</span>
              </div>
              <FiChevronRight className="text-gray-400" />
            </button>
          </div>
          
          <div className="border-t border-gray-100 pt-4">
            <button className="flex items-center justify-between w-full text-left">
              <div className="flex items-center gap-3">
                <FiShield className="text-gray-500" size={20} />
                <span>İzinler ve Erişim</span>
              </div>
              <FiChevronRight className="text-gray-400" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Yardım ve Destek */}
      <div className="card">
        <h2 className="text-lg font-medium mb-3">Yardım ve Destek</h2>
        
        <div className="space-y-4">
          <button className="flex items-center justify-between w-full text-left">
            <div className="flex items-center gap-3">
              <FiHelpCircle className="text-gray-500" size={20} />
              <span>Sıkça Sorulan Sorular</span>
            </div>
            <FiChevronRight className="text-gray-400" />
          </button>
          
          <div className="border-t border-gray-100 pt-4">
            <button className="flex items-center justify-between w-full text-left">
              <div className="flex items-center gap-3">
                <FiHelpCircle className="text-gray-500" size={20} />
                <span>Destek Talebi Oluştur</span>
              </div>
              <FiChevronRight className="text-gray-400" />
            </button>
          </div>
          
          <div className="border-t border-gray-100 pt-4">
            <button className="flex items-center justify-between w-full text-left">
              <div className="flex items-center gap-3">
                <FiInfo className="text-gray-500" size={20} />
                <span>Hakkında</span>
              </div>
              <div className="text-sm text-gray-500">v1.0.0</div>
            </button>
          </div>
        </div>
      </div>
      
      {/* Çıkış Yap */}
      <div className="card bg-red-50">
        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 w-full text-red-600"
        >
          <FiLogOut size={18} />
          <span>Çıkış Yap</span>
        </button>
      </div>
    </div>
  );
}