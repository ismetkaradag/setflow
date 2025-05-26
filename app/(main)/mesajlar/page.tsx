'use client';

import { useState } from 'react';
import { FiArrowLeft, FiSearch, FiSend } from 'react-icons/fi';
import Image from 'next/image';
import Link from 'next/link';

// Demo mesaj verisi
const messages = [
  {
    id: '1',
    sender: {
      name: 'Elif Bayraktar',
      avatar: '/avatars/elif.jpeg',
    },
    content: 'Bugünkü sahneye dair bir notum var, müsait misin?',
    time: '10dk önce',
  },
  {
    id: '2',
    sender: {
      name: 'Hasan Vardar',
      avatar: '/avatars/hasan.jpeg',
    },
    content: 'Yeni çekim planına göz attın mı?',
    time: '1 saat önce',
  },
  {
    id: '3',
    sender: {
      name: 'Banu Arıkan',
      avatar: '/avatars/banu.jpeg',
    },
    content: 'Makyaj departmanında bir değişiklik oldu.',
    time: 'Dün',
  },
];

export default function MessagesPage() {
  const [search, setSearch] = useState('');

  const filteredMessages = messages.filter(msg =>
    msg.sender.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-screen-md mx-auto px-4 py-4">
      {/* Sayfa başlığı */}
      <div className="flex items-center gap-2 mb-4">
        <Link href="/anasayfa" className="p-1 hover:bg-gray-100 rounded-full">
          <FiArrowLeft />
        </Link>
        <h1 className="text-lg font-semibold">Mesajlar</h1>
        <div className="ml-auto">
            <Link href="/mesajlar/yeni" className="text-primary text-sm">
                Yeni Mesaj
            </Link>
        </div>
      </div>

      {/* Arama çubuğu */}
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Kişi ara..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-200 rounded-md px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
        />
        <FiSearch className="absolute right-3 top-2.5 text-gray-400" size={16} />
      </div>

      {/* Mesaj listesi */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 divide-y">
        {filteredMessages.length > 0 ? (
          filteredMessages.map((msg) => (
            <Link
              href={`/mesajlar/${msg.id}`}
              key={msg.id}
              className="flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors"
            >
              <div className="w-10 h-10 rounded-full overflow-hidden relative bg-gray-100">
                <Image
                  src={msg.sender.avatar}
                  alt={msg.sender.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{msg.sender.name}</div>
                <div className="text-xs text-gray-600 truncate">{msg.content}</div>
              </div>
              <div className="text-[10px] text-gray-400 whitespace-nowrap">{msg.time}</div>
            </Link>
          ))
        ) : (
          <div className="p-6 text-center text-gray-500 text-sm">Mesaj bulunamadı</div>
        )}
      </div>

      {/* Yeni mesaj butonu */}
      <Link
        href="/mesajlar/yeni"
        className="fixed bottom-4 right-4 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary-dark transition-colors"
      >
        <FiSend size={20} />
      </Link>
    </div>
  );
}
