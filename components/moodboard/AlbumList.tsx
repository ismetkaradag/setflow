'use client';

import { useState } from 'react';
import { FiPlus, FiFolder, FiImage, FiFilm, FiFileText, FiLink, FiClock } from 'react-icons/fi';
import { MoodboardAlbum } from '@/lib/data/moodboard';

interface AlbumListProps {
  albums: MoodboardAlbum[];
  onSelectAlbum: (albumId: string) => void;
  onCreateAlbum: () => void;
}

const AlbumList: React.FC<AlbumListProps> = ({ albums, onSelectAlbum, onCreateAlbum }) => {
  // Albümleri sahnelerine göre sırala
  const sortedAlbums = [...albums].sort((a, b) => a.scene.localeCompare(b.scene));

  // Albüm içindeki medya türleri sayısını hesapla
  const getMediaCounts = (album: MoodboardAlbum) => {
    const counts = {
      image: 0,
      video: 0,
      text: 0,
      link: 0
    };
    
    album.mediaItems.forEach(item => {
      counts[item.type] += 1;
    });
    
    return counts;
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-medium">Sahne Albümleri</h3>
        <button 
          onClick={onCreateAlbum}
          className="btn-outline py-1 px-3 text-sm flex items-center gap-1"
        >
          <FiPlus size={16} />
          <span>Yeni Albüm</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sortedAlbums.map(album => {
          const mediaCounts = getMediaCounts(album);
          
          return (
            <div 
              key={album.id}
              onClick={() => onSelectAlbum(album.id)}
              className="card cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-md">
                    <FiFolder className="text-primary" size={20} />
                  </div>
                  <div>
                    <div className="font-medium">{album.title}</div>
                    <div className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded inline-block">
                      Sahne {album.scene}
                    </div>
                  </div>
                </div>
                
                <div className="text-xs text-gray-500 flex items-center">
                  <FiClock size={12} className="mr-1" />
                  <span>{new Date(album.updatedAt).toLocaleDateString('tr-TR')}</span>
                </div>
              </div>
              
              {album.description && (
                <p className="text-sm text-gray-600 mt-2">{album.description}</p>
              )}
              
              <div className="flex items-center gap-3 mt-3 pt-3 border-t border-gray-100">
                {mediaCounts.image > 0 && (
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <FiImage size={12} />
                    <span>{mediaCounts.image}</span>
                  </div>
                )}
                
                {mediaCounts.video > 0 && (
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <FiFilm size={12} />
                    <span>{mediaCounts.video}</span>
                  </div>
                )}
                
                {mediaCounts.text > 0 && (
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <FiFileText size={12} />
                    <span>{mediaCounts.text}</span>
                  </div>
                )}
                
                {mediaCounts.link > 0 && (
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <FiLink size={12} />
                    <span>{mediaCounts.link}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      {albums.length === 0 && (
        <div className="p-8 text-center bg-gray-50 rounded-lg">
          <FiFolder size={32} className="mx-auto text-gray-400 mb-3" />
          <p className="text-gray-500">Henüz albüm oluşturulmamış.</p>
          <button 
            onClick={onCreateAlbum}
            className="btn-primary mt-4 py-1 px-3 text-sm inline-flex items-center gap-1"
          >
            <FiPlus size={14} />
            <span>İlk Albümü Oluştur</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default AlbumList;