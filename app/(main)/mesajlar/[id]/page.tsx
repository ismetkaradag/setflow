'use client';

import { useParams, useRouter } from 'next/navigation';
import { FiArrowLeft, FiSend } from 'react-icons/fi';
import Image from 'next/image';
import { useEffect, useState } from 'react';

// Demo mesajlar
const demoMessages = [
  {
    id: '1',
    sender: 'Elif Bayraktar',
    avatar: '/avatars/elif.jpg',
    messages: [
      { text: 'Merhaba, bugünkü sahne için bir sorum olacak.', time: '10dk önce', from: 'Elif' },
      { text: 'Hazırlıklar tamam mı?', time: '8dk önce', from: 'Elif' },
      { text: 'Evet, şu anda set hazır.', time: '6dk önce', from: 'Me' }
    ]
  },
  {
    id: '2',
    sender: 'Hasan Vardar',
    avatar: '/avatars/hasan.jpg',
    messages: [
      { text: 'Ekip listesiyle ilgili bir güncelleme var mı?', time: '1 saat önce', from: 'Hasan' },
      { text: 'Henüz değil, toplantı sonrası paylaşacağım.', time: '58dk önce', from: 'Me' },
      { text: 'Tamam, bekliyorum.', time: '55dk önce', from: 'Hasan' },
      { text: 'Bu arada, yeni çekim planına göz attın mı?', time: '50dk önce', from: 'Hasan' },
      { text: 'Evet, göz attım. Her şey yolunda görünüyor.', time: '48dk önce', from: 'Me' },
      { text: 'Harika, teşekkürler!', time: '45dk önce', from: 'Hasan' },
      { text: 'Rica ederim, her zaman yardımcı olmaya hazırım.', time: '43dk önce', from: 'Me' }
    ]
  },
  {
    id: '3',
    sender: 'Banu Arıkan',
    avatar: '/avatars/banu.jpg',
    messages: [
      { text: 'Makyaj departmanında bir değişiklik oldu.', time: 'Dün', from: 'Banu' },
      { text: 'Tamam, bilgi için teşekkürler.', time: 'Dün', from: 'Me' },
      { text: 'Herhangi bir sorun olursa bana haber ver.', time: 'Dün', from: 'Banu' }
    ]
  }
];

export default function MessageDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [messageThread, setMessageThread] = useState<any | null>(null);

  useEffect(() => {
    const found = demoMessages.find((m) => m.id === id);

    if (found) {
      setMessageThread(found);
    } else {
      router.push('/mesajlar');
    }
  }, [id, router]);

  if (!messageThread) return null;

  return (
    <div className="mx-auto px-4 py-4">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={() => router.back()}
          className="p-1 hover:bg-gray-100 rounded-full"
        >
          <FiArrowLeft />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full overflow-hidden relative bg-gray-100">
            <Image
              src={messageThread.avatar}
              alt={messageThread.sender}
              fill
              className="object-cover"
            />
          </div>
          <h1 className="text-sm font-semibold">{messageThread.sender}</h1>
        </div>
      </div>

      {/* Mesajlar */}
      <div className="space-y-3 mb-4">
        {messageThread.messages.map((msg: any, index: number) => (
          <div
            key={index}
            className={`flex ${
              msg.from === 'Me' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={` w-3/4  px-3 py-2 rounded-lg text-sm shadow ${
                msg.from === 'Me'
                  ? 'bg-primary text-white rounded-tr-none'
                  : 'bg-gray-100 text-gray-800 rounded-tl-none'
              }`}
            >
              <p>{msg.text}</p>
              <p className="text-[10px] mt-1 text-right opacity-70">{msg.time}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Mesaj Yazma Alanı */}
      <div className="absolute bottom-16 w-[86%] flex items-center border-t border-gray-200 pt-2">
        <input
          type="text"
          placeholder="Mesaj yaz..."
          className="flex-1 border border-gray-200 rounded-full px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
        />
        <button className="ml-2 text-primary p-2 hover:bg-gray-100 rounded-full">
          <FiSend size={18} />
        </button>
      </div>
    </div>
  );
}
