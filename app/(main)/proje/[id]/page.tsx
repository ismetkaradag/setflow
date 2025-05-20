'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// Drag and drop kütüphanesini client tarafında yükle
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// SSR ile ilgili warning mesajlarını önlemek için
// Client tarafında yüklenecek olan dinamik bileşenler
const ClientDragDropContext = dynamic(
  () => Promise.resolve(DragDropContext), 
  { ssr: false }
);

const ClientDroppable = dynamic(
  () => Promise.resolve(Droppable),
  { ssr: false }
);

const ClientDraggable = dynamic(
  () => Promise.resolve(Draggable),
  { ssr: false }
);
import { 
  FiChevronLeft, 
  FiInfo, 
  FiEdit2, 
  FiEye, 
  FiGrid, 
  FiList,
  FiPlus,
  FiUserPlus,
  FiCalendar,
  FiClock,
  FiMapPin,
  FiFile,
  FiFileText,
  FiClipboard,
  FiCamera,
  FiTool,
  FiImage,
  FiAlertCircle,
  FiCheck,
  FiX,
  FiDownload,
  FiShare,
  FiShare2,
  FiAperture
} from 'react-icons/fi';
import { projects, getProjectTypeName, getProjectStatusName, getPlatformName } from '@/lib/data/projects';
import { users, getRoleName } from '@/lib/data/users';
import ApplicationModal from '@/components/project/ApplicationModal';
import MoodboardManager from '@/components/moodboard/MoodboardManager';

// Proje bileşenleri dizisi - bu drag and drop için kullanılacak
const projectComponents = [
  { id: 'callsheet', name: 'Callsheet', icon: FiFile },
  { id: 'script', name: 'Senaryo', icon: FiFileText },
  { id: 'timecode', name: 'Timecode', icon: FiClock },
  { id: 'continuity', name: 'Devamlılık', icon: FiCamera },
  { id: 'preparationStatus', name: 'Hazırlık Durumu', icon: FiClipboard },
  { id: 'moodboard', name: 'Moodboard', icon: FiEye },
  { id: 'equipment', name: 'Ekipman Listesi', icon: FiTool }
];

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  
  const [project, setProject] = useState(projects.find(p => p.id === id));
  const [activeComponent, setActiveComponent] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState('list'); // 'list' veya 'grid'
  const [showInfoModal, setShowInfoModal] = useState(false);
  
  // Bileşenlerin sırası
  const [components, setComponents] = useState(projectComponents);
  
  // Tarayıcı ve cihaz tespiti için
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Mobil cihaz tespiti
    const checkIsMobile = () => {
      // 1024px altındaki her şeyi mobil olarak kabul edelim (tablet dahil)
      setIsMobile(window.innerWidth < 1024);
    };

    // İlk kontrol
    checkIsMobile();

    // Resize event listener
    window.addEventListener('resize', checkIsMobile);

    // Client-side render kontrolü
    const timer = setTimeout(() => {
      setIsClient(true);
    }, 200); // Biraz daha fazla gecikme ekleyelim
    
    return () => {
      window.removeEventListener('resize', checkIsMobile);
      clearTimeout(timer);
    };
  }, []);
  
  // Projeyi bulamazsa ana sayfaya yönlendir
  useEffect(() => {
    if (!project) {
      router.push('/anasayfa');
    }
  }, [project, router]);
  
  if (!project) {
    return <div>Yükleniyor...</div>;
  }

  // Manuel sıralama işlevleri
  const moveItemUp = (index: number) => {
    if (index === 0) return; // Zaten en üstteyse işlem yapmaya gerek yok
    
    const items = Array.from(components);
    const item = items[index];
    items[index] = items[index - 1];
    items[index - 1] = item;
    
    setComponents(items);
  };
  
  const moveItemDown = (index: number) => {
    if (index === components.length - 1) return; // Zaten en alttaysa işlem yapmaya gerek yok
    
    const items = Array.from(components);
    const item = items[index];
    items[index] = items[index + 1];
    items[index + 1] = item;
    
    setComponents(items);
  };
  const formatDate = (date: string) => {
    const months = [
      'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
      'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
    ];
    const d = new Date(date);
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  }
  // Drag and drop işlevi
  const handleDragEnd = (result: { destination: { index: number | undefined; }; source: { index: number | undefined; }; }) => {
    // result objesinin geçerli olduğundan emin ol
    if (!result || !result.destination) return;
    
    // Kaynak ve hedef indekslerin geçerli olduğundan emin ol
    if (result.source.index === undefined || result.destination.index === undefined) return;
    
    const items = Array.from(components);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setComponents(items);
  };
  
  // Senaryo içeriğini formatlama
  const formatScript = (script: string) => {
    if (!script) return null;
    
    // Senaryo metnini düzgün formatlı olarak gösterme
    return script.split('\\n').map((line, index) => {
      // Sahne başlıkları
      if (line.startsWith('SAHNE') || line.startsWith('BÖLÜM')) {
        return <h4 key={index} className="font-bold mt-4 mb-2">{line}</h4>;
      }
      // Karakter isimleri
      else if (line.trim() && !line.includes(' ') && line === line.toUpperCase()) {
        return <h5 key={index} className="font-bold mt-3">{line}</h5>;
      }
      // Diyaloglar için karakter adlarını ayır
      else if (line.includes('\\')) {
        return <p key={index} className="ml-4 italic">{line.replace('\\', '')}</p>;
      }
      // Boş satırlar
      else if (!line.trim()) {
        return <br key={index} />;
      }
      // Normal satırlar
      else {
        return <p key={index} className="mb-2">{line}</p>;
      }
    });
  };
  
  // Hazırlık durumu için badge renkleri
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'not_started':
        return 'bg-gray-100 text-gray-800';
      case 'delayed':
        return 'bg-yellow-100 text-yellow-800';
      case 'issue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Hazırlık durumu için öncelik renkleri
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Timecode süresi hesaplama
  const formatDuration = (startTime: string, endTime: string) => {
    if (!startTime || !endTime) return '';
    
    const parseTimeToSeconds = (timeStr: string) => {
      const [hours, minutes, seconds, frames] = timeStr.split(':').map(Number);
      return hours * 3600 + minutes * 60 + seconds + frames / 25; // 25 FPS varsayılıyor
    };
    
    const startSeconds = parseTimeToSeconds(startTime);
    const endSeconds = parseTimeToSeconds(endTime);
    const durationSeconds = endSeconds - startSeconds;
    
    const durHours = Math.floor(durationSeconds / 3600);
    const durMinutes = Math.floor((durationSeconds % 3600) / 60);
    const durSeconds = Math.floor(durationSeconds % 60);
    
    return `${durHours > 0 ? durHours + 'sa ' : ''}${durMinutes}dk ${durSeconds}sn`;
  };

  // Bileşen içeriğini göster
  const renderComponentContent = (componentId: string) => {
    switch (componentId) {
      case 'callsheet':
        return project.callsheet ? (
          <div className="p-4 max-h-[80vh] overflow-y-auto">
            <div className="space-y-3">
              {project.callsheet.map((item, index) => (
                <div key={index} className="bg-white rounded-lg border border-gray-200 p-3">
                  <div className="text-sm font-medium">{new Date(item.date).toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit', year: 'numeric' })}</div>
                  <div className="flex flex-col gap-1 mt-2">
                    <div className="flex items-center text-xs text-gray-600">
                      <FiMapPin size={10} className="mr-1" />
                      <span>{item.location}</span>
                    </div>
                    <div className="flex items-center text-xs text-gray-600">
                      <FiClock size={10} className="mr-1" />
                      <span>Sahne {item.scenes.join(', ')}</span>
                    </div>
                    <div className="flex items-center text-xs text-gray-600">
                      <FiCalendar size={10} className="mr-1" />
                      <span>{item.startTime} - {item.endTime}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-8">
            <FiFile size={32} className="text-gray-300 mb-2" />
            <p className="text-gray-500 text-sm">Callsheet bulunamadı</p>
          </div>
        );
        
      case 'script':
        return project.script ? (
          <div className="p-4 max-h-[30vh] overflow-y-auto">
            <div className="bg-white rounded-lg border border-gray-200 p-6 ">
              <div className="screenplay-format space-y-1 text-[10px] ">
                {formatScript(project.script)}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-8">
            <FiFileText size={32} className="text-gray-300 mb-2" />
            <p className="text-gray-500 text-sm">Senaryo bulunamadı</p>
          </div>
        );
        
      case 'timecode':
        return project.timecode ? (
          <div className="max-h-[80vh] overflow-y-auto">
            <div className="bg-white rounded-lg border border-gray-200 overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="py-2 px-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sahne</th>
                    <th className="py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Başlangıç</th>
                    <th className="py-2 px-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Süre</th>
                    <th className="py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notlar</th>
                    <th className="py-2 px-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Durum</th>
                    
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {project.timecode.map((item, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="py-2 px-1 text-sm">{item.scene}</td>
                      <td className="py-2 text-sm font-mono">{item.startTime.substring(3)}</td>
                      <td className="py-2 px-1 text-sm">{formatDuration(item.startTime, item.endTime)}</td>
                      <td className="py-2 text-sm">{item.notes || '-'}</td>
                      <td className="py-2 px-1">
                        <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                          item.status === 'completed' ? 'bg-green-100 text-green-800' : 
                          item.status === 'in_progress' ? 'bg-blue-100 text-blue-800' : 
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {item.status === 'completed' ? 'Tamamlandı' : 
                           item.status === 'in_progress' ? 'Devam ' : 
                           'Beklemede'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-8">
            <FiClock size={32} className="text-gray-300 mb-2" />
            <p className="text-gray-500 text-sm">Timecode bulunamadı</p>
          </div>
        );
        
      case 'continuity':
        return project.continuity ? (
          <div className="p-4 max-h-[80vh] overflow-y-auto">
            <div className="space-y-6">
              {project.continuity.map((item, index) => (
                <div key={index} className="bg-white rounded-lg border border-gray-200 p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-lg">Sahne {item.scene}</h3>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="text-xs text-gray-500">{item.date}</div>
                      <div className="text-xs bg-gray-100 px-2 py-1 rounded mt-1">{item.timeOfDay}</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-sm mb-2">Lokasyon ve Ortam</h4>
                      <div className="bg-gray-50 p-3 rounded-md">
                        <div className="text-sm"><span className="font-medium">Lokasyon:</span> {item.location}</div>
                        {item.weather && <div className="text-sm mt-1"><span className="font-medium">Hava Durumu:</span> {item.weather}</div>}
                      </div>
                      
                      {item.props && item.props.length > 0 && (
                        <div className="mt-3">
                          <h4 className="font-medium text-sm mb-2">Sahne Props</h4>
                          <div className="space-y-2">
                            {item.props.map((prop, propIdx) => (
                              <div key={propIdx} className="bg-gray-50 p-3 rounded-md">
                                <div className="text-sm font-medium">{prop.name}</div>
                                <div className="text-xs mt-1"><span className="text-gray-600">Pozisyon:</span> {prop.position}</div>
                                <div className="text-xs mt-1"><span className="text-gray-600">Durum:</span> {prop.condition}</div>
                                {prop.notes && <div className="text-xs mt-1 text-gray-600">{prop.notes}</div>}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-sm mb-2">Karakterler</h4>
                      <div className="space-y-2">
                        {item.characters.map((character, charIdx) => (
                          <div key={charIdx} className="bg-gray-50 p-3 rounded-md">
                            <div className="text-sm font-medium">{character.character}</div>
                            <div className="text-xs mt-1"><span className="text-gray-600">Kostüm:</span> {character.costume}</div>
                            <div className="text-xs mt-1"><span className="text-gray-600">Makyaj:</span> {character.makeup}</div>
                            {character.props && (
                              <div className="text-xs mt-1">
                                <span className="text-gray-600">Props:</span> {character.props.join(', ')}
                              </div>
                            )}
                            {character.notes && <div className="text-xs mt-1 text-gray-600">{character.notes}</div>}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {item.images && item.images.length > 0 && (
                    <div className="mt-4">
                      <h4 className="font-medium text-sm mb-2">Referans Görselleri</h4>
                      <div className="flex flex-wrap gap-2">
                        {item.images.map((image, imgIdx) => (
                          <div key={imgIdx} className="relative h-24 w-32 bg-gray-100 rounded-md overflow-hidden">
                            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                              <FiImage size={24} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {item.notes && (
                    <div className="mt-3 bg-yellow-50 p-3 rounded-md">
                      <div className="text-sm font-medium">Notlar:</div>
                      <div className="text-sm">{item.notes}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-8">
            <FiCamera size={32} className="text-gray-300 mb-2" />
            <p className="text-gray-500 text-sm">Devamlılık bilgisi bulunamadı</p>
          </div>
        );
        
      case 'preparationStatus':
        return project.preparationStatus ? (
          <div className="p-4 max-h-[80vh] overflow-y-auto">
            <div className="flex flex-col justify-between mb-4">
              <div className="text-sm">
                <span className="font-medium">Tamamlanan:</span>{' '}
                {project.preparationStatus.filter(item => item.status === 'completed').length} / {project.preparationStatus.length}
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center text-xs">
                  <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-1"></span>
                  <span>Tamamlandı</span>
                </div>
                <div className="flex items-center text-xs">
                  <span className="inline-block w-3 h-3 bg-blue-500 rounded-full mr-1"></span>
                  <span>Devam Ediyor</span>
                </div>
                <div className="flex items-center text-xs">
                  <span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-1"></span>
                  <span>Sorun</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              {project.preparationStatus.map((item, index) => (
                <div key={index} className="bg-white rounded-lg border border-gray-200 p-4">
                  <div className="flex flex-col justify-between items-start">
                    <div>
                      <div className="flex items-center w-full">
                        <h3 className="font-medium">{item.title}</h3>
                        <div className={`w-2 h-2 rounded-full ms-auto ${
                          item.status === 'completed' ? 'bg-green-500' :
                          item.status === 'in_progress' ? 'bg-blue-500' :
                          item.status === 'issue' ? 'bg-red-500' :
                          item.status === 'delayed' ? 'bg-yellow-500' :
                          'bg-gray-400'
                        }`}></div>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                    </div>
                    <div className="flex space-x-2 mt-2 w-full">
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(item.status)}`}>
                        {item.status === 'completed' ? 'Tamamlandı' :
                         item.status === 'in_progress' ? 'Devam Ediyor' :
                         item.status === 'not_started' ? 'Başlamadı' :
                         item.status === 'delayed' ? 'Gecikmiş' :
                         item.status === 'issue' ? 'Sorun' : ''}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(item.priority)}`}>
                        {item.priority === 'urgent' ? 'Acil' :
                         item.priority === 'high' ? 'Yüksek' :
                         item.priority === 'medium' ? 'Orta' :
                         item.priority === 'low' ? 'Düşük' : ''}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
                    <div>
                      <span className="text-gray-500">Kategori:</span>{' '} <br />
                      <span className="capitalize">{
                        item.category === 'location' ? 'Lokasyon' :
                        item.category === 'costume' ? 'Kostüm' :
                        item.category === 'props' ? 'Props' :
                        item.category === 'casting' ? 'Casting' :
                        item.category === 'equipment' ? 'Ekipman' :
                        item.category === 'logistics' ? 'Lojistik' : 
                        item.category === 'other' ? 'Diğer' : item.category
                      }</span>
                    </div>
                    
                    {item.dueDate && (
                      <div>
                        <span className="text-gray-500">Son Tarih:</span>{' '} <br />
                        <span>{ formatDate(item.dueDate) }</span>
                      </div>
                    )}
                    
                    {item.assignedTo && (
                      <div>
                        <span className="text-gray-500">Görevlendirilen:</span>{' '} <br />
                        <span>{users.find(u => u.id === item.assignedTo)?.name || item.assignedTo}</span>
                      </div>
                    )}
                    
                    <div>
                      <span className="text-gray-500">Oluşturulma:</span>{' '} <br />
                      <span>{formatDate(item.createdAt)}</span>
                    </div>
                  </div>
                  
                  {item.notes && (
                    <div className="mt-2 text-xs bg-gray-50 p-2 rounded">
                      <span className="text-gray-500">Notlar:</span> {item.notes}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-8">
            <FiClipboard size={32} className="text-gray-300 mb-2" />
            <p className="text-gray-500 text-sm">Hazırlık durumu bilgisi bulunamadı</p>
          </div>
        );
        
      case 'moodboard':
        return project.moodboard ? (
          <div className="p-4 max-h-[80vh] overflow-y-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {project.moodboard.map((image, index) => (
                <div key={index} className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 group">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    <FiImage size={32} />
                  </div>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-black bg-opacity-50 transition-opacity flex items-center justify-center">
                    <div className="flex space-x-2">
                      <button className="p-2 bg-white rounded-full text-gray-800">
                        <FiEye size={16} />
                      </button>
                      <button className="p-2 bg-white rounded-full text-gray-800">
                        <FiEdit2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="relative aspect-square rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 hover:text-gray-500 hover:border-gray-400 transition-colors">
                <FiPlus size={32} />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-8">
            <FiEye size={32} className="text-gray-300 mb-2" />
            <p className="text-gray-500 text-sm">Moodboard bulunamadı</p>
          </div>
        );
        
      case 'equipment':
        return project.equipment ? (
          <div className="p-4 max-h-[80vh] overflow-y-auto">
            <div className="bg-white rounded-lg border border-gray-200 p-4 overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ekipman</th>
                    <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tür</th>
                    <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Marka/Model</th>
                    <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Adet</th>
                    <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Günlük Ücret</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {project.equipment.map((item, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="py-2 px-3">
                        <div className="text-sm font-medium">{item.name}</div>
                        {item.specs && <div className="text-xs text-gray-500">{item.specs}</div>}
                      </td>
                      <td className="py-2 px-3">
                        <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                          item.type === 'camera' ? 'bg-purple-100 text-purple-800' : 
                          item.type === 'lighting' ? 'bg-yellow-100 text-yellow-800' : 
                          item.type === 'sound' ? 'bg-blue-100 text-blue-800' : 
                          item.type === 'grip' ? 'bg-green-100 text-green-800' : 
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {item.type === 'camera' ? 'Kamera' :
                           item.type === 'lighting' ? 'Işık' :
                           item.type === 'sound' ? 'Ses' :
                           item.type === 'grip' ? 'Grip' : 'Diğer'}
                        </span>
                      </td>
                      <td className="py-2 px-3">
                        <div className="text-sm">{item.brand} {item.model}</div>
                      </td>
                      <td className="py-2 px-3">
                        <div className="text-sm">{item.quantity} adet</div>
                      </td>
                      <td className="py-2 px-3">
                        <div className="text-sm">{item.dailyRate ? `${item.dailyRate} ₺` : '-'}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-8">
            <FiTool size={32} className="text-gray-300 mb-2" />
            <p className="text-gray-500 text-sm">Ekipman listesi bulunamadı</p>
          </div>
        );
        
      default:
        return (
          <div className="flex flex-col items-center justify-center p-8">
            <FiFile size={32} className="text-gray-300 mb-2" />
            <p className="text-gray-500 text-sm">İçerik bulunamadı</p>
          </div>
        );
    }
  };
  
  // Aktif bileşeni tam ekran göster
  const openFullComponent = (componentId: string) => {
    setActiveComponent(componentId);
  };
  
  // Tam ekran moddan çık
  const closeFullComponent = () => {
    setActiveComponent(null);
  };
  
  // Proje bilgi modalını aç
  const toggleInfoModal = () => {
    setShowInfoModal(!showInfoModal);
  };
  
  // Ana proje ekranı
  return (
    <div className="min-h-screen bg-gray-100 pb-20">
      {/* Üst bilgi çubuğu */}
      <div className="sticky top-0 bg-white border-b border-gray-200 shadow-xs">
        <div className="px-3 py-2 flex items-center justify-between">
          <Link href="/projelerim" className="flex items-center gap-1 text-sm">
            <FiChevronLeft size={16} />
            <span className="text-xl font-bold">{project.title}</span>
          </Link>
          <button onClick={toggleInfoModal} className="p-1">
            <FiInfo size={20} />
          </button>
        </div>
      </div>
      
      {/* Proje bilgi modalı */}
      {showInfoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg w-full max-w-md p-4 mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold">Proje Bilgileri</h3>
              <button onClick={toggleInfoModal} className="text-gray-500">
                &times;
              </button>
            </div>
            
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                <div>
                  <div className="text-xs text-gray-500">Tür</div>
                  <div className="font-medium">{getProjectTypeName(project.type)}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Tarih</div>
                  <div className="font-medium">
                    {formatDate(project.startDate)} <br />
                    {project.endDate ? formatDate(project.endDate) : 'Devam Ediyor'}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Platform</div>
                  <div className="font-medium">{getPlatformName(project.platform)}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Yönetmen</div>
                  <div className="font-medium">
                    {users.find(u => u.id === project.director)?.name} {users.find(u => u.id === project.director)?.surname}
                  </div>
                </div>
              </div>
              
              <div>
                <div className="text-xs text-gray-500">Açıklama</div>
                <div className="text-sm mt-1">{project.description}</div>
              </div>
            </div>
            
            <div className="mt-4 pt-3 border-t border-gray-100 flex justify-end">
              <button 
                onClick={toggleInfoModal}
                className="px-4 py-2 bg-primary text-white rounded-md text-sm"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Görünüm seçenekleri */}
      <div className="flex justify-end items-center p-3 gap-2">
        <div className="flex bg-gray-200 rounded-lg overflow-hidden">
          <button 
            onClick={() => setViewMode('list')} 
            className={`p-2 ${viewMode === 'list' ? 'bg-gray-300' : ''}`}
          >
            <FiList size={16} />
          </button>
          <button 
            onClick={() => setViewMode('grid')} 
            className={`p-2 ${viewMode === 'grid' ? 'bg-gray-300' : ''}`}
          >
            <FiGrid size={16} />
          </button>
        </div>
      </div>
      
      {/* Tam ekran bileşen görünümü */}
      {activeComponent && (
        <div className="fixed inset-0 bg-white z-50">
          <div className="px-3 py-2 flex items-center border-b border-gray-200">
            <button onClick={closeFullComponent} className="flex items-center gap-1 text-sm">
              <FiChevronLeft size={16} />
              <span className="font-medium">
                {components.find(c => c.id === activeComponent)?.name || 'Bileşen'}
              </span>
            </button>
            <button className="ml-auto p-1">
              <FiInfo size={16} />
            </button>
          </div>
          
          <div className="p-4">
            {activeComponent === 'moodboard' ? (
              <MoodboardManager projectId={project.id} />
            ) : (
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                {renderComponentContent(activeComponent)}
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* List veya Grid görünüm */}
      <div
        className={viewMode === 'grid' 
          ? "grid grid-cols-2 gap-4 p-4" 
          : "space-y-4 p-4"
        }
      >
        {components.map((component, index) => (
          <div
            key={component.id}
            className={`bg-white rounded-lg border border-gray-200 ${viewMode === 'grid' ? 'h-48' : ''}`}
          >
            <div className="p-3 border-b border-gray-100 font-medium flex items-center justify-between">
              <div className="flex items-center gap-1" onClick={() => openFullComponent(component.id)}>
                <component.icon size={14} className="text-primary" />
                {component.name}
                {component.name === 'Senaryo' && project.script && (
                  //download icon
                  <button 
                    className="ml-auto p-1 flex text-gray-500 hover:text-gray-800"
                  >
                    <FiDownload size={16} />
                    <FiShare2 size={16} className="ml-1" />
                  </button>
                )}
                
              </div>
              <div className="flex items-center gap-1">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    moveItemUp(index);
                  }}
                  className="p-1 text-gray-500 hover:text-gray-800 disabled:opacity-30"
                  disabled={index === 0}
                >
                  ↑
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    moveItemDown(index);
                  }}
                  className="p-1 text-gray-500 hover:text-gray-800 disabled:opacity-30"
                  disabled={index === components.length - 1}
                >
                  ↓
                </button>
                <button 
                  className='p-1 text-gray-500 hover:text-gray-800'

                >
                  <FiEdit2 size={16} />
                </button>

              </div>
            </div>
            
            <div onClick={() => openFullComponent(component.id)}>
                {viewMode === 'list' && renderComponentContent(component.id)}
            </div>
          </div>
        ))}
      </div>
      
      {/* Ana proje ekibi - sabit alt bölüm */}
      <div className="bg-white p-4 border-t border-gray-200 mt-4">
        <div className='flex items-center justify-between mb-3'>
          <h3 className="font-medium mb-3">Ana Proje Ekibi</h3>
          <button className="text-sm text-gray-600 px-3 py-2 ">
            Tüm Ekibi Gör
          </button>
        </div>
        
        <div className="space-y-3">
          {project.director && (
            <div className="flex items-center gap-3">
              <div className="bg-gray-800 text-white w-8 h-8 rounded-full flex items-center justify-center text-xs">
                {users.find(u => u.id === project.director)?.name?.charAt(0)}
                {users.find(u => u.id === project.director)?.surname?.charAt(0)}
              </div>
              <div>
                <div className="text-xs text-gray-500">Yönetmen</div>
                <div className="font-medium">
                  {users.find(u => u.id === project.director)?.name} {users.find(u => u.id === project.director)?.surname}
                </div>
              </div>
            </div>
          )}
          
          {project.team?.slice(0, 2).map((member) => {
            const user = users.find(u => u.id === member.userId);
            if (!user) return null;
            
            return (
              <div key={member.userId} className="flex items-center gap-3">
                <div className="bg-gray-800 text-white w-8 h-8 rounded-full flex items-center justify-center text-xs">
                  {user.name.charAt(0)}{user.surname.charAt(0)}
                </div>
                <div>
                  <div className="text-xs text-gray-500">{getRoleName(member.role as any)}</div>
                  <div className="font-medium">{user.name} {user.surname}</div>
                </div>
              </div>
            );
          })}
          
          <button className="flex items-center gap-2 text-sm text-gray-600 bg-gray-100 px-3 py-2 rounded-md w-full justify-center mt-4">
            <FiPlus size={16} />
            <span>Ekip Üyesi Ekle</span>
          </button>
        </div>
      </div>
    </div>
  );
}