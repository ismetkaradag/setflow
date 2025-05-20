'use client';

import { useState } from 'react';
import { FiX, FiPlus, FiImage, FiFilm, FiFileText, FiLink, FiTag } from 'react-icons/fi';
import { MediaItemType } from '@/lib/data/moodboard';

interface AddMediaModalProps {
  isOpen: boolean;
  onClose: () => void;
  albumId: string;
  onSubmit: (albumId: string, data: any) => void;
}

const AddMediaModal: React.FC<AddMediaModalProps> = ({ isOpen, onClose, albumId, onSubmit }) => {
  const [mediaType, setMediaType] = useState<MediaItemType>('image');
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  
  if (!isOpen) return null;
  
  const handleTypeSelect = (type: MediaItemType) => {
    setMediaType(type);
  };
  
  const handleTagAdd = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim().toLowerCase())) {
      setTags([...tags, tagInput.trim().toLowerCase()]);
      setTagInput('');
    }
  };
  
  const handleTagRemove = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const data = {
      type: mediaType,
      title,
      url: ['image', 'video', 'link'].includes(mediaType) ? url : undefined,
      content: ['text', 'link'].includes(mediaType) ? content : undefined,
      tags
    };
    
    onSubmit(albumId, data);
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h3 className="font-medium">Yeni İçerik Ekle</h3>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <FiX size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* İçerik Türü */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              İçerik Türü
            </label>
            <div className="grid grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => handleTypeSelect('image')}
                className={`flex flex-col items-center justify-center p-3 rounded-lg border ${
                  mediaType === 'image' 
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <FiImage size={24} className={mediaType === 'image' ? 'text-primary' : 'text-gray-500'} />
                <span className={`mt-1 text-xs ${mediaType === 'image' ? 'text-primary' : 'text-gray-700'}`}>
                  Görsel
                </span>
              </button>
              
              <button
                type="button"
                onClick={() => handleTypeSelect('video')}
                className={`flex flex-col items-center justify-center p-3 rounded-lg border ${
                  mediaType === 'video' 
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <FiFilm size={24} className={mediaType === 'video' ? 'text-primary' : 'text-gray-500'} />
                <span className={`mt-1 text-xs ${mediaType === 'video' ? 'text-primary' : 'text-gray-700'}`}>
                  Video
                </span>
              </button>
              
              <button
                type="button"
                onClick={() => handleTypeSelect('text')}
                className={`flex flex-col items-center justify-center p-3 rounded-lg border ${
                  mediaType === 'text' 
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <FiFileText size={24} className={mediaType === 'text' ? 'text-primary' : 'text-gray-500'} />
                <span className={`mt-1 text-xs ${mediaType === 'text' ? 'text-primary' : 'text-gray-700'}`}>
                  Metin
                </span>
              </button>
              
              <button
                type="button"
                onClick={() => handleTypeSelect('link')}
                className={`flex flex-col items-center justify-center p-3 rounded-lg border ${
                  mediaType === 'link' 
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <FiLink size={24} className={mediaType === 'link' ? 'text-primary' : 'text-gray-500'} />
                <span className={`mt-1 text-xs ${mediaType === 'link' ? 'text-primary' : 'text-gray-700'}`}>
                  Bağlantı
                </span>
              </button>
            </div>
          </div>
          
          {/* Başlık */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Başlık *
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input"
              placeholder="İçerik başlığı"
              required
            />
          </div>
          
          {/* URL (Görsel, Video, Bağlantı için) */}
          {['image', 'video', 'link'].includes(mediaType) && (
            <div>
              <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
                {mediaType === 'link' ? 'Bağlantı URL' : mediaType === 'image' ? 'Görsel URL' : 'Video URL'} *
              </label>
              <input
                type="text"
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="input"
                placeholder={mediaType === 'link' ? 'https://example.com' : mediaType === 'image' ? 'Görsel URL' : 'Video URL'}
                required
              />
            </div>
          )}
          
          {/* İçerik (Metin ve Bağlantı için) */}
          {['text', 'link'].includes(mediaType) && (
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                {mediaType === 'text' ? 'Metin İçeriği' : 'Açıklama'} *
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={4}
                className="input"
                placeholder={mediaType === 'text' ? 'İçerik metni...' : 'Bağlantı açıklaması...'}
                required
              />
              <div className="text-[10px] text-gray-500 mt-1 w-full text-end">
                {content.length} / 200
              </div>
            </div>
          )}
          
          {/* Etiketler */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Etiketler
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                className="input flex-grow"
                placeholder="Etiket ekle..."
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleTagAdd())}
              />
              <button
                type="button"
                onClick={handleTagAdd}
                className="btn-outline px-3"
              >
                <FiPlus size={18} />
              </button>
            </div>
            
            {/* Eklenen etiketler listesi */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {tags.map((tag, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full text-sm"
                  >
                    <FiTag size={12} />
                    <span>{tag}</span>
                    <button 
                      type="button"
                      onClick={() => handleTagRemove(tag)}
                      className="ml-1 text-gray-500 hover:text-red-500"
                    >
                      <FiX size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="btn-primary"
              disabled={!title || (['image', 'video', 'link'].includes(mediaType) && !url) || (['text', 'link'].includes(mediaType) && !content)}
            >
              Ekle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMediaModal;