'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FiSearch, FiFilter, FiGrid, FiList, FiCalendar, FiDollarSign, FiTag, FiMonitor, FiX } from 'react-icons/fi';
import { projects, ProjectType, ProjectPlatform, getProjectTypeName, getPlatformName } from '@/lib/data/projects';
import ApplicationModal from '@/components/project/ApplicationModal';
import ProjectPreviewModal from '@/components/project/ProjectPreviewModal';

export default function ProjectSearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Başvuru modalı için state
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [selectedProjectForApplication, setSelectedProjectForApplication] = useState<{id: string, title: string} | null>(null);
  
  // Önizleme modalı için state
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [previewProject, setPreviewProject] = useState<any>(null);
  
  // Filtreler
  const [filters, setFilters] = useState({
    types: [] as ProjectType[],
    platforms: [] as ProjectPlatform[],
    dateStart: '',
    dateEnd: '',
    budgetMin: '',
    budgetMax: ''
  });
  
  // Filtre değişikliklerini yönet
  const handleFilterChange = (
    category: 'types' | 'platforms',
    value: ProjectType | ProjectPlatform
  ) => {
    setFilters(prev => {
      const currentValues = prev[category];
      return {
        ...prev,
        [category]: currentValues.includes(value as never)
          ? currentValues.filter(v => v !== value)
          : [...currentValues, value]
      };
    });
  };
  
  // Filtre değerlerini sil
  const clearFilters = () => {
    setFilters({
      types: [],
      platforms: [],
      dateStart: '',
      dateEnd: '',
      budgetMin: '',
      budgetMax: ''
    });
  };
  
  // Başvuru butonuna tıklandığında
  const handleApplyClick = (e: React.MouseEvent, project: {id: string, title: string}) => {
    e.preventDefault(); // Link tıklamasını engelle
    e.stopPropagation();
    setSelectedProjectForApplication(project);
    setIsApplicationModalOpen(true);
  };
  
  // Proje kartına tıklandığında (detay yerine önizleme göster)
  const handleProjectClick = (e: React.MouseEvent, projectId: string) => {
    e.preventDefault(); // Link navigasyonunu engelle
    const selectedProject = projects.find(p => p.id === projectId);
    if (selectedProject) {
      setPreviewProject(selectedProject);
      setIsPreviewModalOpen(true);
    }
  };
  
  // Başvuru modalını başka bir yerden açmak için (örn. önizleme modalından)
  const openApplicationModal = (projectId: string, projectTitle: string) => {
    setSelectedProjectForApplication({id: projectId, title: projectTitle});
    setIsPreviewModalOpen(false); // Önizleme modalını kapat
    setIsApplicationModalOpen(true); // Başvuru modalını aç
  };
  
  // Başvuru modalını kapat
  const handleCloseApplicationModal = () => {
    setIsApplicationModalOpen(false);
    setSelectedProjectForApplication(null);
  };
  
  // Önizleme modalını kapat
  const handleClosePreviewModal = () => {
    setIsPreviewModalOpen(false);
    setPreviewProject(null);
  };
  
  // Filtreleme işlemi
  const filteredProjects = projects.filter(project => {
    // İsim araması
    if (searchTerm && !project.title.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Proje tipi filtresi
    if (filters.types.length > 0 && !filters.types.includes(project.type)) {
      return false;
    }
    
    // Platform filtresi
    if (filters.platforms.length > 0 && !filters.platforms.includes(project.platform)) {
      return false;
    }
    
    // Tarih filtresi
    if (filters.dateStart && new Date(project.startDate) < new Date(filters.dateStart)) {
      return false;
    }
    
    if (filters.dateEnd && new Date(project.endDate) > new Date(filters.dateEnd)) {
      return false;
    }
    
    // Bütçe filtresi
    if (filters.budgetMin && project.budget && project.budget < Number(filters.budgetMin)) {
      return false;
    }
    
    if (filters.budgetMax && project.budget && project.budget > Number(filters.budgetMax)) {
      return false;
    }
    
    return true;
  });
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Proje Bul</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-gray-200' : 'bg-gray-100'}`}
          >
            <FiGrid />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-gray-200' : 'bg-gray-100'}`}
          >
            <FiList />
          </button>
        </div>
      </div>
      
      {/* Arama ve filtre */}
      <div className="space-y-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Proje ara..."
            className="input pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex justify-between items-center">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-sm font-medium text-gray-700"
          >
            <FiFilter />
            <span>Filtreler</span>
          </button>
          
          {(filters.types.length > 0 || filters.platforms.length > 0 ||
            filters.dateStart || filters.dateEnd || filters.budgetMin || filters.budgetMax) && (
            <button
              onClick={clearFilters}
              className="text-sm text-red-600 flex items-center gap-1"
            >
              <FiX size={14} />
              <span>Filtreleri Temizle</span>
            </button>
          )}
        </div>
        
        {showFilters && (
          <div className="bg-gray-50 p-4 rounded-lg space-y-4">
            <div>
              <h3 className="text-sm font-medium flex items-center mb-2">
                <FiTag className="mr-1" />
                Proje Türü
              </h3>
              <div className="flex flex-wrap gap-2">
                {(['film', 'series'] as ProjectType[]).map(type => (
                  <button
                    key={type}
                    onClick={() => handleFilterChange('types', type)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      filters.types.includes(type)
                        ? 'bg-primary text-white'
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {getProjectTypeName(type)}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium flex items-center mb-2">
                <FiMonitor className="mr-1" />
                Platform
              </h3>
              <div className="flex flex-wrap gap-2">
                {(['netflix', 'prime', 'disney', 'tv', 'cinema'] as ProjectPlatform[]).map(platform => (
                  <button
                    key={platform}
                    onClick={() => handleFilterChange('platforms', platform)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      filters.platforms.includes(platform)
                        ? 'bg-primary text-white'
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {getPlatformName(platform)}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium flex items-center mb-2">
                <FiCalendar className="mr-1" />
                Tarih Aralığı
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-500">Başlangıç</label>
                  <input
                    type="date"
                    className="input mt-1"
                    value={filters.dateStart}
                    onChange={(e) => setFilters(prev => ({ ...prev, dateStart: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500">Bitiş</label>
                  <input
                    type="date"
                    className="input mt-1"
                    value={filters.dateEnd}
                    onChange={(e) => setFilters(prev => ({ ...prev, dateEnd: e.target.value }))}
                  />
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium flex items-center mb-2">
                <FiDollarSign className="mr-1" />
                Bütçe Aralığı
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-500">Minimum (₺)</label>
                  <input
                    type="number"
                    className="input mt-1"
                    placeholder="1000000"
                    value={filters.budgetMin}
                    onChange={(e) => setFilters(prev => ({ ...prev, budgetMin: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500">Maksimum (₺)</label>
                  <input
                    type="number"
                    className="input mt-1"
                    placeholder="10000000"
                    value={filters.budgetMax}
                    onChange={(e) => setFilters(prev => ({ ...prev, budgetMax: e.target.value }))}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Sonuç sayısı */}
      <div className="text-sm text-gray-500">
        {filteredProjects.length} proje bulundu
      </div>
      
      {/* Proje listesi */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredProjects.map(project => (
            <div key={project.id} className="relative">
              <div 
                onClick={(e) => handleProjectClick(e, project.id)}
                className="card hover:shadow-md transition-all group h-full cursor-pointer"
              >
                <h3 className="font-medium text-lg group-hover:text-primary">{project.title}</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="bg-gray-100 px-2 py-0.5 rounded text-xs">
                    {getProjectTypeName(project.type)}
                  </span>
                  <span className="bg-gray-100 px-2 py-0.5 rounded text-xs">
                    {getPlatformName(project.platform)}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-2 line-clamp-2">{project.description}</p>
                <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
                  <div className="flex items-center text-xs text-gray-500">
                    <FiCalendar className="mr-1" size={12} />
                    <span>{new Date(project.startDate).toLocaleDateString('tr-TR')}</span>
                  </div>
                  <button 
                    onClick={(e) => handleApplyClick(e, {id: project.id, title: project.title})}
                    className="px-3 py-1 bg-primary text-white text-xs rounded-full hover:bg-primary/90 transition-colors"
                  >
                    Başvur
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredProjects.map(project => (
            <div key={project.id} className="relative">
              <div 
                onClick={(e) => handleProjectClick(e, project.id)}
                className="card hover:shadow-md transition-all p-3 flex justify-between items-center cursor-pointer"
              >
                <div>
                  <h3 className="font-medium">{project.title}</h3>
                  <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                    <span>{getProjectTypeName(project.type)}</span>
                    <span>•</span>
                    <span>{getPlatformName(project.platform)}</span>
                    <span>•</span>
                    <span>{new Date(project.startDate).toLocaleDateString('tr-TR')}</span>
                  </div>
                </div>
                <button 
                  onClick={(e) => handleApplyClick(e, {id: project.id, title: project.title})}
                  className="px-3 py-1 bg-primary text-white text-xs rounded-full hover:bg-primary/90 transition-colors"
                >
                  Başvur
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Başvuru Modalı */}
      {selectedProjectForApplication && (
        <ApplicationModal
          isOpen={isApplicationModalOpen}
          onClose={handleCloseApplicationModal}
          projectId={selectedProjectForApplication.id}
          projectTitle={selectedProjectForApplication.title}
        />
      )}
      
      {/* Proje Önizleme Modalı */}
      {previewProject && (
        <ProjectPreviewModal
          isOpen={isPreviewModalOpen}
          onClose={handleClosePreviewModal}
          project={previewProject}
          onApply={() => openApplicationModal(previewProject.id, previewProject.title)}
        />
      )}
    </div>
  );
}