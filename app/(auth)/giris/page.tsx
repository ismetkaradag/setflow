'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiMail, FiLock, FiUser } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { FaApple } from 'react-icons/fa';
import { users } from '@/lib/data/users';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Demo için basit bir doğrulama
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (user && password.length > 3) {
      // Gerçek uygulamada burada giriş işlemi yapılır
      router.push('/anasayfa');
    } else {
      setError('E-posta veya şifre hatalı.');
    }
  };
  
  const handleDemoLogin = (userEmail: string) => {
    setEmail(userEmail);
    setPassword('demo1234');
    // Otomatik form gönderimi için zamanlayıcı ekle
    setTimeout(() => {
      router.push('/anasayfa');
    }, 500);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
      <div>
        <img src="/logo.png" className='mx-auto w-[200px]' alt="" />
      </div>
        <p className="text-gray-600">Film ve Dizi Ekip Yönetim Platformu</p>
      </div>
      
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm border border-red-200">
          {error}
        </div>
      )}
      
      <form onSubmit={handleLogin} className="space-y-4">
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input pl-10"
              placeholder="••••••••"
            />
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
              Beni hatırla
            </label>
          </div>
          
          <div className="text-sm">
            <a href="#" className="text-primary hover:text-primary/80">
              Şifremi unuttum
            </a>
          </div>
        </div>
        
        <div>
          <button type="submit" className="btn-primary w-full">
            Giriş Yap
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
        <p className="text-sm text-gray-600">
          Hesabınız yok mu?{' '}
          <Link href="/kayit" className="text-primary hover:text-primary/80">
            Kayıt Ol
          </Link>
        </p>
      </div>
      
      {/* Demo Kullanıcılar */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Demo Hesapları</h3>
        <div className="space-y-2">
          {users.map((user) => (
            <button
              key={user.id}
              onClick={() => handleDemoLogin(user.email)}
              className="flex items-center gap-3 p-2 w-full rounded-md hover:bg-gray-50 transition-colors text-left"
            >
              <div className="bg-primary/10 p-1.5 rounded-full">
                <FiUser className="text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">{user.name} {user.surname}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}