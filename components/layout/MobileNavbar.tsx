'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiHome, FiSearch, FiPlus, FiUser, FiFolder } from 'react-icons/fi';

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
      
      <Link href="/projelerim" className={`nav-item ${isActive('/projelerim') ? 'active' : ''}`}>
        <FiFolder size={20} />
        <span>Projelerim</span>
      </Link>
      
      <Link href="/profil" className={`nav-item ${isActive('/profil') ? 'active' : ''}`}>
        <FiUser size={20} />
        <span>Profil</span>
      </Link>
    </div>
  );
};

export default MobileNavbar;