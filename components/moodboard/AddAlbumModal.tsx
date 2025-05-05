'use client';

import { useState } from 'react';
import { FiX } from 'react-icons/fi';

interface AddAlbumModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const AddAlbumModal: React.FC<AddAlbumModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [scene, setScene] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  
  if (!isOpen) return null;
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const data = {
      scene,
      title,
      description
    };
    
    onSubmit(data);
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h3 className="font-medium">Yeni Albüm Oluştur</h3>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <FiX size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label htmlFor="scene" className="block text-sm font-medium text-gray-700 mb-1">
                Sahne No *
              </label>
              <input
                type="text"
                id="scene"
                value={scene}
                onChange={(e) => setScene(e.target.value)}
                className="input"
                placeholder="Örn: 1A"
                required
              />
            </div>
            
            <div className="col-span-2">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Albüm Başlığı *
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input"
                placeholder="Albüm başlığı"
                required
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Açıklama
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="input"
              placeholder="Albüm açıklaması..."
            />
          </div>
          
          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="btn-primary"
              disabled={!scene || !title}
            >
              Oluştur
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAlbumModal;