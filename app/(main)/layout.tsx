'use client';

import { useState, useEffect } from 'react';
import MobileNavbar from '@/components/layout/MobileNavbar';
import InfoBar from '@/components/layout/InfoBar';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isInfoBarExpanded, setIsInfoBarExpanded] = useState(false);
  
  // InfoBar'ın genişleme durumunu kontrol et
  useEffect(() => {
    const handleInfoBarChange = (e: CustomEvent) => {
      setIsInfoBarExpanded(e.detail.expanded);
    };
    
    window.addEventListener('infoBarChange' as any, handleInfoBarChange);
    
    return () => {
      window.removeEventListener('infoBarChange' as any, handleInfoBarChange);
    };
  }, []);
  
  return (
    <div className={`min-h-screen pb-20 pt-0 px-4`}>
      <InfoBar />
      <main>
        {children}
      </main>
      <MobileNavbar />
    </div>
  );
}