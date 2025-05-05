'use client';

import { useState } from 'react';
import { FiPlus, FiArrowLeft, FiImage, FiFilm, FiFileText, FiLink, FiTag, FiUser, FiTrash2 } from 'react-icons/fi';
import { MoodboardAlbum, MediaItem } from '@/lib/data/moodboard';
import { users } from '@/lib/data/users';

interface AlbumDetailProps {
  album: MoodboardAlbum;
  onBack: () => void;
  onAddMedia: (albumId: string) => void;
}

const AlbumDetail: React.FC<AlbumDetailProps> = ({ album, onBack, onAddMedia }) => {
  const [selectedMediaItem, setSelectedMediaItem] = useState<MediaItem | null>(null);
  
  // Kullanıcı adını ID'den bul
  const getUserName = (userId: string) => {
    const user = users.find(u => u.id === userId);
    return user ? `${user.name} ${user.surname}` : 'Bilinmeyen Kullanıcı';
  };
  
  // İçerik türüne göre ikon belirle
  const getMediaTypeIcon = (type: string) => {
    switch (type) {
      case 'image': return <FiImage size={18} />;
      case 'video': return <FiFilm size={18} />;
      case 'text': return <FiFileText size={18} />;
      case 'link': return <FiLink size={18} />;
      default: return <FiImage size={18} />;
    }
  };
  
  // Medya içeriğini görüntüle
  const renderMediaContent = (item: MediaItem) => {
    switch (item.type) {
      case 'image':
        return (
          <div className="bg-gray-100 rounded-lg p-2 flex items-center justify-center h-48">
            <div className="text-gray-400">Görsel: {item.title}</div>
          </div>
        );
      case 'video':
        return (
          <div className="bg-gray-100 rounded-lg p-2 flex flex-col items-center justify-center h-48">
            <FiFilm size={32} className="text-gray-400 mb-2" />
            <div className="text-gray-500 text-center">
              <div className="font-medium">Video: {item.title}</div>
              <div className="text-sm">Video oynatma önizlemesi</div>
            </div>
          </div>
        );
      case 'text':
        return (
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="font-medium mb-2">{item.title}</div>
            <p className="text-sm text-gray-700">{item.content}</p>
          </div>
        );
      case 'link':
        return (
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
            <div className="font-medium text-blue-800 mb-2">{item.title}</div>
            <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-sm underline">
              {item.url}
            </a>
            {item.content && (
              <p className="text-sm text-gray-700 mt-2">{item.content}</p>
            )}
          </div>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <button 
          onClick={onBack}
          className="flex items-center gap-1 text-gray-600 hover:text-gray-900"
        >
          <FiArrowLeft size={16} />
          <span>Geri Dön</span>
        </button>
        
        <button 
          onClick={() => onAddMedia(album.id)}
          className="btn-outline py-1 px-3 text-sm flex items-center gap-1"
        >
          <FiPlus size={16} />
          <span>İçerik Ekle</span>
        </button>
      </div>
      
      <div className="card">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-lg font-medium">{album.title}</h2>
            <div className="text-sm bg-primary/10 text-primary px-2 py-0.5 rounded inline-block mt-1">
              Sahne {album.scene}
            </div>
          </div>
          
          <div className="text-xs text-gray-500">
            Son güncelleme: {new Date(album.updatedAt).toLocaleDateString('tr-TR')}
          </div>
        </div>
        
        {album.description && (
          <p className="text-sm text-gray-600 mt-3">{album.description}</p>
        )}
      </div>
      
      {/* İçerik listesi */}
      <div className="space-y-4">
        <h3 className="font-medium">İçerikler ({album.mediaItems.length})</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {album.mediaItems.map(item => (
            <div 
              key={item.id}
              className="card cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setSelectedMediaItem(item === selectedMediaItem ? null : item)}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-md ${
                    item.type === 'image' ? 'bg-green-100 text-green-600' :
                    item.type === 'video' ? 'bg-purple-100 text-purple-600' :
                    item.type === 'text' ? 'bg-blue-100 text-blue-600' :
                    'bg-amber-100 text-amber-600'
                  }`}>
                    {getMediaTypeIcon(item.type)}
                  </div>
                  <div>
                    <div className="font-medium">{item.title}</div>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <FiUser size={10} className="mr-1" />
                      <span>{getUserName(item.createdBy)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-xs text-gray-500">
                  {new Date(item.createdAt).toLocaleDateString('tr-TR')}
                </div>
              </div>
              
              {/* Etiketler */}
              {item.tags && item.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {item.tags.map((tag, idx) => (
                    <div key={idx} className="flex items-center gap-1 bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">
                      <FiTag size={10} />
                      <span>{tag}</span>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Genişletilmiş içerik */}
              {selectedMediaItem?.id === item.id && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  {renderMediaContent(item)}
                  
                  <div className="flex justify-end mt-4">
                    <button className="flex items-center gap-1 text-red-500 text-xs">
                      <FiTrash2 size={12} />
                      <span>Sil</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {album.mediaItems.length === 0 && (
          <div className="p-8 text-center bg-gray-50 rounded-lg">
            <FiImage size={32} className="mx-auto text-gray-400 mb-3" />
            <p className="text-gray-500">Bu albümde henüz içerik bulunmuyor.</p>
            <button 
              onClick={() => onAddMedia(album.id)}
              className="btn-primary mt-4 py-1 px-3 text-sm inline-flex items-center gap-1"
            >
              <FiPlus size={14} />
              <span>İçerik Ekle</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlbumDetail;