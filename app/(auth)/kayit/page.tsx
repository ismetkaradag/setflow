'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiMail, FiLock, FiUser, FiChevronRight } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { FaApple } from 'react-icons/fa';
import { UserRole, getRoleName } from '@/lib/data/users';

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    role: '' as UserRole
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleRoleSelect = (role: UserRole) => {
    setFormData(prev => ({ ...prev, role }));
    setStep(2);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Gerçek uygulamada burada kayıt işlemi yapılır
    
    // Demo için doğrudan ana sayfaya yönlendir
    router.push('/anasayfa');
  };
  
  const roles: UserRole[] = ['director', 'assistant_director', 'set_assistant', 'lighting_chief'];
  
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-primary">SetFlow</h1>
        <p className="text-gray-600 mt-2">Film ve Dizi Ekip Yönetim Platformu</p>
      </div>
      
      {step === 1 ? (
        <>
          <div className="text-center mb-4">
            <h2 className="text-xl font-medium">Set ekibinde rolünüz nedir?</h2>
            <p className="text-sm text-gray-500 mt-1">Erişim yetkiniz rolünüze göre belirlenecektir.</p>
          </div>
          
          <div className="space-y-3">
            {roles.map((role) => (
              <button
                key={role}
                onClick={() => handleRoleSelect(role)}
                className="flex items-center justify-between w-full p-4 rounded-lg border border-gray-200 hover:border-primary/50 hover:bg-primary/5 transition-colors"
              >
                <span className="font-medium">{getRoleName(role)}</span>
                <FiChevronRight className="text-gray-400" />
              </button>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Zaten hesabınız var mı?{' '}
              <Link href="/giris" className="text-primary hover:text-primary/80">
                Giriş Yap
              </Link>
            </p>
          </div>
        </>
      ) : (
        <>
          <div className="text-center mb-4">
            <h2 className="text-xl font-medium">Kayıt Ol</h2>
            <p className="text-sm text-gray-500 mt-1">
              {getRoleName(formData.role as UserRole)} olarak devam ediyorsunuz
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Ad
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="input"
                  placeholder="Adınız"
                />
              </div>
              
              <div>
                <label htmlFor="surname" className="block text-sm font-medium text-gray-700 mb-1">
                  Soyad
                </label>
                <input
                  id="surname"
                  name="surname"
                  type="text"
                  required
                  value={formData.surname}
                  onChange={handleChange}
                  className="input"
                  placeholder="Soyadınız"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                E-posta Adresi
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="input pl-10"
                  placeholder="ornek@email.com"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Şifre
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="input pl-10"
                  placeholder="••••••••"
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">
                En az 8 karakter ve bir büyük harf içermelidir.
              </p>
            </div>
            
            <div className="flex items-center mt-3">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                <span>Kullanım şartlarını ve gizlilik politikasını kabul ediyorum</span>
              </label>
            </div>
            
            <div className="mt-2">
              <button type="submit" className="btn-primary w-full">
                Kayıt Ol
              </button>
            </div>
          </form>
          
          <div className="relative py-3">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-2 bg-white text-sm text-gray-500">veya</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <button className="btn-outline flex justify-center items-center gap-2">
              <FcGoogle size={18} />
              <span>Google</span>
            </button>
            <button className="btn-outline flex justify-center items-center gap-2">
              <FaApple size={18} />
              <span>Apple</span>
            </button>
          </div>
          
          <div className="mt-4 text-center">
            <button
              onClick={() => setStep(1)}
              className="text-sm text-primary hover:text-primary/80"
            >
              ← Geri Dön
            </button>
          </div>
        </>
      )}
    </div>
  );
}