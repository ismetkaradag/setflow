import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SetFlow - Film ve Dizi Ekip Yönetim Platformu',
  description: 'Film ve dizi setlerinde görev alan ekip üyelerinin iş yönetimini kolaylaştıran platform',
  icons: {
    icon: '/logo.jpg',
    shortcut: '/logo.jpg',
    apple: '/logo.jpg',
  },
  openGraph: {
    title: 'SetFlow - Film ve Dizi Ekip Yönetim Platformu',
    description: 'Film ve dizi setlerinde görev alan ekip üyelerinin iş yönetimini kolaylaştıran platform',
    url: 'https://setflow.vercel.app',
    siteName: 'SetFlow',
    images: [
      {
        url: '/logo.jpg',
        width: 800,
        height: 600,
        alt: 'SetFlow Logo',
      },
    ],
    locale: 'tr-TR',
    type: 'website',
  },

};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}