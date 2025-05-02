'use client';

import Link from 'next/link';
import { FiX, FiCalendar, FiDollarSign, FiUser, FiMonitor, FiTag, FiMapPin, FiClock, FiFile } from 'react-icons/fi';
import { Project, getProjectTypeName, getProjectStatusName, getPlatformName } from '@/lib/data/projects';
import { users } from '@/lib/data/users';

interface ProjectPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project;
  onApply: () => void;
}

const ProjectPreviewModal: React.FC<ProjectPreviewModalProps> = ({
  isOpen,
  onClose,
  project,
  onApply
}) => {
  if (!isOpen) return null;
  
  // Yönetmen bilgisini getir
  const director = users.find(u => u.id === project.director);
  
  // Ekip üyesi sayısı
  const teamMemberCount = project.team?.length || 0;
  
  // Aktif kullanıcı (demo için)
  const activeUserId = '1'; // Derya Arslan
  
  // Kullanıcı zaten ekip üyesi mi
  const isTeamMember = project.team?.some(member => member.userId === activeUserId);
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4" style={{ marginTop: '0px' }}>
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h3 className="font-medium text-lg">{project.title}</h3>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <FiX size={20} />
          </button>
        </div>
        
        <div className="p-4">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="mb-4">
                <span className="text-sm text-gray-500">Proje Türü</span>
                <div className="flex items-center gap-2 mt-1">
                  <FiTag className="text-gray-400" />
                  <span>{getProjectTypeName(project.type)}</span>
                </div>
              </div>
              
              <div className="mb-4">
                <span className="text-sm text-gray-500">Platform</span>
                <div className="flex items-center gap-2 mt-1">
                  <FiMonitor className="text-gray-400" />
                  <span>{getPlatformName(project.platform)}</span>
                </div>
              </div>
              
              <div className="mb-4">
                <span className="text-sm text-gray-500">Yönetmen</span>
                <div className="flex items-center gap-2 mt-1">
                  <FiUser className="text-gray-400" />
                  <span>{director?.name} {director?.surname}</span>
                </div>
              </div>
            </div>
            
            <div>
              <div className="mb-4">
                <span className="text-sm text-gray-500">Durum</span>
                <div className="flex items-center gap-2 mt-1">
                  <FiClock className="text-gray-400" />
                  <span>{getProjectStatusName(project.status)}</span>
                </div>
              </div>
              
              <div className="mb-4">
                <span className="text-sm text-gray-500">Tarih Aralığı</span>
                <div className="flex items-center gap-2 mt-1">
                  <FiCalendar className="text-gray-400" />
                  <span>
                    {new Date(project.startDate).toLocaleDateString('tr-TR')} -{' '}
                    {new Date(project.endDate).toLocaleDateString('tr-TR')}
                  </span>
                </div>
              </div>
              
              <div className="mb-4">
                <span className="text-sm text-gray-500">Ekip</span>
                <div className="flex items-center gap-2 mt-1">
                  <FiUser className="text-gray-400" />
                  <span>{teamMemberCount} kişi</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <span className="text-sm text-gray-500">Proje Açıklaması</span>
            <p className="mt-1 text-gray-700">{project.description}</p>
          </div>
          
          {/* Görsel (demo için sadece bir renk bloğu) */}
          <div className="bg-gray-100 h-32 rounded-lg mt-6 overflow-hidden flex items-center justify-center">
            <span className="text-gray-400">Proje Görseli</span>
          </div>
          
          <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100">
            <Link 
              href={`/proje/${project.id}`} 
              className="text-primary hover:text-primary/80 flex items-center gap-1"
            >
              <span>Tüm Detayları Gör</span>
            </Link>
            
            {!isTeamMember ? (
              <button
                onClick={onApply}
                className="btn-primary flex items-center gap-2"
              >
                <FiFile size={16} />
                <span>CV ile Başvur</span>
              </button>
            ) : (
              <span className="text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full">
                Ekip Üyesisiniz
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPreviewModal;