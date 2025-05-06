'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiArrowLeft, FiCalendar, FiDollarSign, FiUser, FiMonitor, FiTag, FiClock, FiMapPin, FiFile, FiCamera, FiImage, FiTool } from 'react-icons/fi';
import { projects, getProjectTypeName, getProjectStatusName, getPlatformName } from '@/lib/data/projects';
import { users, getRoleName } from '@/lib/data/users';
import ApplicationModal from '@/components/project/ApplicationModal';
import MoodboardManager from '@/components/moodboard/MoodboardManager';

type Tab = 'callsheet' | 'script' | 'timecode' | 'continuity' | 'preparation' | 'moodboard' | 'equipment';

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  
  const [project, setProject] = useState(projects.find(p => p.id === id));
  const [activeTab, setActiveTab] = useState<Tab>('callsheet');
  const [director, setDirector] = useState(users.find(u => u.id === project?.director));
  
  // Başvuru modalı için state
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Projeyi bulamazsa ana sayfaya yönlendir
  useEffect(() => {
    if (!project) {
      router.push('/anasayfa');
    }
  }, [project, router]);
  
  if (!project || !director) {
    return <div>Yükleniyor...</div>;
  }
  
  // Aktif kullanıcının rolüne göre sekme erişim izinleri (demo için)
  const activeUserId = '1'; // Demo için Derya Arslan (yönetmen)
  const activeUser = users.find(u => u.id === activeUserId);
  const activeUserRole = activeUser?.role;
  
  const tabPermissions = {
    callsheet: ['director', 'assistant_director'],
    script: ['director', 'assistant_director', 'set_assistant'],
    timecode: ['director', 'set_assistant'],
    continuity: ['director', 'set_assistant'],
    preparation: ['director', 'assistant_director', 'set_assistant'],
    moodboard: ['director', 'lighting_chief'],
    equipment: ['director', 'lighting_chief']
  };
  
  const canAccessTab = (tab: Tab) => {
    if (!activeUserRole) return false;
    return tabPermissions[tab].includes(activeUserRole);
  };
  
  // Kullanıcı zaten ekip üyesi mi kontrol et
  const isTeamMember = project.team?.some(member => member.userId === activeUserId);
  
  // Başvuru modalini aç
  const handleApplyClick = () => {
    setIsModalOpen(true);
  };
  
  // Modalı kapat
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/projelerim" className="p-2 bg-gray-100 rounded-full">
          <FiArrowLeft size={16} />
        </Link>
        <h1 className="text-2xl font-bold">{project.title}</h1>
      </div>
      
      {/* Proje bilgileri */}
      <div className="card">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-3">
            <div>
              <span className="text-sm text-gray-500">Tür</span>
              <div className="flex items-center gap-2 mt-1">
                <FiTag className="text-gray-400" />
                <span>{getProjectTypeName(project.type)}</span>
              </div>
            </div>
            
            <div>
              <span className="text-sm text-gray-500">Yönetmen</span>
              <div className="flex items-center gap-2 mt-1">
                <FiUser className="text-gray-400" />
                <span>{director.name} {director.surname}</span>
              </div>
            </div>
            
            <div>
              <span className="text-sm text-gray-500">Platform</span>
              <div className="flex items-center gap-2 mt-1">
                <FiMonitor className="text-gray-400" />
                <span>{getPlatformName(project.platform)}</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div>
              <span className="text-sm text-gray-500">Tarih Aralığı</span>
              <div className="flex items-center gap-2 mt-1">
                <FiCalendar className="text-gray-400" />
                <span>
                  {new Date(project.startDate).toLocaleDateString('tr-TR')} -{' '}
                  {new Date(project.endDate).toLocaleDateString('tr-TR')}
                </span>
              </div>
            </div>
            
            <div>
              <span className="text-sm text-gray-500">Durum</span>
              <div className="flex items-center gap-2 mt-1">
                <FiClock className="text-gray-400" />
                <span>{getProjectStatusName(project.status)}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-100">
          <span className="text-sm text-gray-500">Proje Açıklaması</span>
          <p className="mt-1">{project.description}</p>
        </div>
        
        {!isTeamMember && (
          <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
            <button
              onClick={handleApplyClick}
              className="btn-primary flex items-center gap-2"
            >
              <FiFile size={16} />
              <span>CV ile Başvur</span>
            </button>
          </div>
        )}
      </div>
      
      {/* Sekmeler */}
      <div className="card overflow-hidden">
        <div className="flex border-b border-gray-200 overflow-x-auto hide-scrollbar">
          {([
            { id: 'callsheet', icon: FiFile, label: 'Callsheet' },
            { id: 'script', icon: FiFile, label: 'Senaryo' },
            { id: 'timecode', icon: FiClock, label: 'Timecode' },
            { id: 'continuity', icon: FiCamera, label: 'Devamlılık' },
            { id: 'preparation', icon: FiClock, label: 'Hazırlık Durumu' },
            { id: 'moodboard', icon: FiImage, label: 'Moodboard' },
            { id: 'equipment', icon: FiTool, label: 'Ekipman Listesi' }
          ] as { id: Tab, icon: any, label: string }[]).map(tab => (
            <button
              key={tab.id}
              onClick={() => canAccessTab(tab.id) && setActiveTab(tab.id)}
              className={`px-4 py-3 flex items-center gap-1 text-sm whitespace-nowrap ${
                activeTab === tab.id 
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-500 hover:text-gray-800'
              } ${!canAccessTab(tab.id) ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <tab.icon size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
        
        <div className="p-4">
          {!canAccessTab(activeTab) ? (
            <div className="p-8 text-center">
              <p className="text-gray-500">Bu içeriği görüntülemek için yetkiniz bulunmuyor.</p>
              <p className="text-sm text-gray-400 mt-1">
                Sadece {tabPermissions[activeTab].map(role => getRoleName(role as any)).join(', ')} erişebilir.
              </p>
            </div>
          ) : activeTab === 'callsheet' && project.callsheet ? (
            <div className="space-y-4">
              <h3 className="font-medium">Callsheet Listesi</h3>
              {project.callsheet.map((item, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between">
                    <div className="text-lg font-medium">{item.date}</div>
                    <div className="text-sm bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                      {item.scenes.join(', ')} sahneleri
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <FiMapPin className="mr-1" size={14} />
                        <span>Lokasyon: {item.location}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <FiClock className="mr-1" size={14} />
                        <span>Saat: {item.startTime} - {item.endTime}</span>
                      </div>
                    </div>
                    {item.notes && (
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Notlar:</div>
                        <div className="text-sm">{item.notes}</div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <button className="btn-outline mt-4">
                Yeni Callsheet Ekle
              </button>
            </div>
          ) : activeTab === 'script' && project.script ? (
            <div className="space-y-4">
              <h3 className="font-medium">Senaryo</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <pre className="whitespace-pre-wrap text-sm font-mono">{project.script.replaceAll('\\n', '\n')}</pre>
              </div>
              <div className="flex gap-3">
                <button className="btn-outline">Düzenle</button>
                <button className="btn-outline">Yeni Versiyon Yükle</button>
              </div>
            </div>
          ) : activeTab === 'timecode' && project.timecode ? (
            <div className="space-y-4">
              <h3 className="font-medium">Timecode Bilgileri</h3>
              <table className="min-w-full bg-white">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sahne</th>
                    <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Başlangıç</th>
                    <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bitiş</th>
                    <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Durum</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {project.timecode.map((item, index) => (
                    <tr key={index}>
                      <td className="py-2 px-4">{item.scene}</td>
                      <td className="py-2 px-4 font-mono">{item.startTime}</td>
                      <td className="py-2 px-4 font-mono">{item.endTime}</td>
                      <td className="py-2 px-4">
                        <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                          item.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {item.status === 'completed' ? 'Tamamlandı' : 'Devam Ediyor'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button className="btn-outline">Yeni Timecode Ekle</button>
            </div>
          ) : activeTab === 'moodboard' ? (
            <MoodboardManager projectId={project.id} />
          ) : activeTab === 'equipment' && project.equipment ? (
            <div className="space-y-4">
              <h3 className="font-medium">Ekipman Listesi</h3>
              <table className="min-w-full bg-white">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ekipman</th>
                    <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tür</th>
                    <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Adet</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {project.equipment.map((item, index) => (
                    <tr key={index}>
                      <td className="py-2 px-4">{item.name}</td>
                      <td className="py-2 px-4">
                        <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                          item.type === 'camera' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {item.type === 'camera' ? 'Kamera' : 'Işık'}
                        </span>
                      </td>
                      <td className="py-2 px-4">{item.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button className="btn-outline">Ekipman Ekle</button>
            </div>
          ) : (
            <div className="p-8 text-center">
              <p className="text-gray-500">Bu bölüm için henüz içerik eklenmemiş.</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Proje ekibi */}
      <div className="card">
        <h3 className="font-medium mb-4">Proje Ekibi</h3>
        <div className="grid grid-cols-2 gap-4">
          {project.team?.map(teamMember => {
            const member = users.find(u => u.id === teamMember.userId);
            if (!member) return null;
            
            return (
              <div key={teamMember.userId} className="flex items-center gap-3">
                <div className="bg-gray-100 w-10 h-10 rounded-full flex items-center justify-center">
                  <FiUser className="text-gray-500" />
                </div>
                <div>
                  <div className="font-medium">{member.name} {member.surname}</div>
                  <div className="text-xs text-gray-500">{getRoleName(teamMember.role as any)}</div>
                </div>
              </div>
            );
          })}
        </div>
        
        {activeUserRole === 'director' && (
          <button className="btn-outline mt-4">Ekip Üyesi Ekle</button>
        )}
      </div>
      
      {/* Başvuru Modalı */}
      {isModalOpen && (
        <ApplicationModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          projectId={project.id}
          projectTitle={project.title}
        />
      )}
    </div>
  );
}