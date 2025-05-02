'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiHome, FiSearch, FiPlus, FiUser, FiSettings } from 'react-icons/fi';

const MobileNavbar = () => {
  const pathname = usePathname();
  
  const isActive = (path: string) => {
    return pathname === path;
  };
  
  return (
    <div className="mobile-navbar">
      <Link href="/anasayfa" className={`nav-item ${isActive('/anasayfa') ? 'active' : ''}`}>
        <FiHome size={20} />
        <span>Anasayfa</span>
      </Link>
      
      <Link href="/proje-bul" className={`nav-item ${isActive('/proje-bul') ? 'active' : ''}`}>
        <FiSearch size={20} />
        <span>Proje Bul</span>
      </Link>
      
      <Link href="/proje-olustur" className={`nav-item ${isActive('/proje-olustur') ? 'active' : ''}`}>
        <FiPlus size={20} />
        <span>Oluştur</span>
      </Link>
      
      <Link href="/profil" className={`nav-item ${isActive('/profil') ? 'active' : ''}`}>
        <FiUser size={20} />
        <span>Profil</span>
      </Link>
      
      <Link href="/ayarlar" className={`nav-item ${isActive('/ayarlar') ? 'active' : ''}`}>
        <FiSettings size={20} />
        <span>Ayarlar</span>
      </Link>
    </div>
  );
};

export default MobileNavbar;