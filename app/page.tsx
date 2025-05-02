import { redirect } from 'next/navigation';

export default function Home() {
  // Ana sayfa, kullanıcının giriş durumuna göre yönlendirme yapar
  // Demo için doğrudan giriş sayfasına yönlendir
  redirect('/giris');
}