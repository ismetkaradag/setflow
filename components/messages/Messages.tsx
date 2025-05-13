'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiMessageSquare } from 'react-icons/fi';

interface MessagesProps {
  className?: string;
  unreadCount?: number;
}

const Messages: React.FC<MessagesProps> = ({ className = '', unreadCount = 2 }) => {
  const pathname = usePathname();
  const isActive = pathname.startsWith('/mesajlar');

  return (
    <div className={`relative ${className}`}>
      <Link
        href={pathname.startsWith('/mesajlar') ? '/anasayfa' : '/mesajlar'}
        className={`relative p-2 rounded-full transition-colors flex items-center justify-center ${
          isActive ? 'bg-gray-200' : 'hover:bg-gray-100'
        }`}
        aria-label="Mesajlara git"
      >
        <FiMessageSquare
          size={18}
          className={isActive ? 'text-green-600' : 'text-gray-700'}
        />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-green-500 text-white text-[10px] font-semibold w-4 h-4 flex items-center justify-center rounded-full leading-none shadow">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </Link>
    </div>
  );
};

export default Messages;
