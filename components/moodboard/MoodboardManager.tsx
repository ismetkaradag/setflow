'use client';

import { useState } from 'react';
import { FiInfo } from 'react-icons/fi';
import { moodboardAlbums, MoodboardAlbum } from '@/lib/data/moodboard';
import AlbumList from './AlbumList';
import AlbumDetail from './AlbumDetail';
import AddAlbumModal from './AddAlbumModal';
import AddMediaModal from './AddMediaModal';

interface MoodboardManagerProps {
  projectId: string;
}

const MoodboardManager: React.FC<MoodboardManagerProps> = ({ projectId }) => {
  // State değişkenleri
  const [albums, setAlbums] = useState<MoodboardAlbum[]>(moodboardAlbums);
  const [selectedAlbumId, setSelectedAlbumId] = useState<string | null>(null);
  const [showAddAlbumModal, setShowAddAlbumModal] = useState(false);
  const [showAddMediaModal, setShowAddMediaModal] = useState(false);
  const [selectedAlbumForMedia, setSelectedAlbumForMedia] = useState<string | null>(null);
  
  // Seçili albümü bul
  const selectedAlbum = albums.find(album => album.id === selectedAlbumId);
  
  // Albüm seçme işlevi
  const handleSelectAlbum = (albumId: string) => {
    setSelectedAlbumId(albumId);
  };
  
  // Albüm oluşturma modalını aç
  const handleCreateAlbum = () => {
    setShowAddAlbumModal(true);
  };
  
  // Medya ekleme modalını aç
  const handleAddMedia = (albumId: string) => {
    setSelectedAlbumForMedia(albumId);
    setShowAddMediaModal(true);
  };
  
  // Albüm detayından ana listeye dön
  const handleBackToList = () => {
    setSelectedAlbumId(null);
  };
  
  // Yeni albüm oluştur
  const handleSubmitNewAlbum = (data: any) => {
    const newAlbum: MoodboardAlbum = {
      id: Date.now().toString(), // Gerçek uygulamada unique ID verilir
      scene: data.scene,
      title: data.title,
      description: data.description,
      mediaItems: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: '1' // Demo için sabit kullanıcı ID
    };
    
    setAlbums([...albums, newAlbum]);
    setShowAddAlbumModal(false);
    setSelectedAlbumId(newAlbum.id); // Yeni oluşturulan albümü seç
  };
  
  // Yeni medya öğesi ekle
  const handleSubmitNewMedia = (albumId: string, data: any) => {
    const newMedia = {
      id: Date.now().toString(), // Gerçek uygulamada unique ID verilir
      type: data.type,
      title: data.title,
      url: data.url,
      content: data.content,
      tags: data.tags,
      createdAt: new Date().toISOString(),
      createdBy: '1' // Demo için sabit kullanıcı ID
    };
    
    // Albümü güncelle
    const updatedAlbums = albums.map(album => {
      if (album.id === albumId) {
        return {
          ...album,
          mediaItems: [...album.mediaItems, newMedia],
          updatedAt: new Date().toISOString()
        };
      }
      return album;
    });
    
    setAlbums(updatedAlbums);
    setShowAddMediaModal(false);
    setSelectedAlbumForMedia(null);
  };
  
  return (
    <div className="space-y-6">
      {/* İçerik alanı */}
      {selectedAlbum ? (
        <AlbumDetail 
          album={selectedAlbum} 
          onBack={handleBackToList}
          onAddMedia={handleAddMedia}
        />
      ) : (
        <>
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-start space-x-3">
            <FiInfo className="text-blue-500 flex-shrink-0 mt-1" size={20} />
            <div>
              <p className="text-blue-800 font-medium mb-1">Moodboard Nedir?</p>
              <p className="text-sm text-blue-700">
                Moodboard, proje ekibinin görsel ve metinsel referansları paylaşabildiği bir alandır. Her sahne için ayrı bir albüm oluşturabilir, görsel, video, metin ve bağlantı ekleyebilirsiniz.
              </p>
            </div>
          </div>
          
          <AlbumList 
            albums={albums} 
            onSelectAlbum={handleSelectAlbum}
            onCreateAlbum={handleCreateAlbum}
          />
        </>
      )}
      
      {/* Modaller */}
      <AddAlbumModal
        isOpen={showAddAlbumModal}
        onClose={() => setShowAddAlbumModal(false)}
        onSubmit={handleSubmitNewAlbum}
      />
      
      <AddMediaModal
        isOpen={showAddMediaModal}
        onClose={() => {
          setShowAddMediaModal(false);
          setSelectedAlbumForMedia(null);
        }}
        albumId={selectedAlbumForMedia || ''}
        onSubmit={handleSubmitNewMedia}
      />
    </div>
  );
};

export default MoodboardManager;