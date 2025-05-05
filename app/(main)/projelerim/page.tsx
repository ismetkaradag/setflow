'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  FiFolder, FiCalendar, FiUser, FiFilter, FiChevronDown, FiChevronUp,
  FiTag, FiSearch, FiInfo
} from 'react-icons/fi';

import { projects, getProjectTypeName, getProjectStatusName, getPlatformName } from '@/lib/data/projects';
import { users, getRoleName } from '@/lib/data/users';
import ProjectPreviewModal from '@/components/project/ProjectPreviewModal';

const activeUserId = '1'; // Derya Arslan

export default function MyProjectsPage() {
  const [activeUser, setActiveUser] = useState(users.find(u => u.id === activeUserId));
  const [userProjects, setUserProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({ status: [], role: [] });
  const [selectedProject, setSelectedProject] = useState(null);
  const [showProjectModal, setShowProjectModal] = useState(false);

  useEffect(() => {
    if (activeUser) {
      let filteredProjects = projects.filter(project => {
        if (project.director === activeUser.id) return true;
        return project.team && project.team.some(member => member.userId === activeUser.id);
      });

      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        filteredProjects = filteredProjects.filter(project =>
          project.title.toLowerCase().includes(searchLower) ||
          project.description.toLowerCase().includes(searchLower)
        );
      }

      if (filters.status.length > 0) {
        filteredProjects = filteredProjects.filter(project =>
          filters.status.includes(project.status)
        );
      }

      if (filters.role.length > 0) {
        filteredProjects = filteredProjects.filter(project => {
          if (filters.role.includes('director') && project.director === activeUser.id) return true;
          return project.team && project.team.some(member =>
            member.userId === activeUser.id && filters.role.includes(member.role)
          );
        });
      }

      setUserProjects(filteredProjects);
    }
  }, [activeUser, searchTerm, filters]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => {
      const currentFilters = [...prev[filterType]];
      return {
        ...prev,
        [filterType]: currentFilters.includes(value)
          ? currentFilters.filter(item => item !== value)
          : [...currentFilters, value]
      };
    });
  };

  const getUserRoleInProject = (project) => {
    if (project.director === activeUser?.id) return 'director';
    const member = project.team?.find(m => m.userId === activeUser?.id);
    return member ? member.role : null;
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setShowProjectModal(true);
  };

  const renderUserAvatar = (user) => (
    user?.avatar ? (
      <div className="w-8 h-8 rounded-full overflow-hidden mr-2 relative">
        <Image src={user.avatar} alt={`${user.name} ${user.surname}`} fill className="object-cover" />
      </div>
    ) : (
      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm mr-2">
        {user?.name.charAt(0)}{user?.surname.charAt(0)}
      </div>
    )
  );

  return (
    <div className="pt-2 pb-16">
      <h1 className="text-xl font-semibold mb-4">Projelerim</h1>

      {/* Arama ve filtre alanı */}
      <div className="space-y-2 mb-4">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Proje ara..."
            className="input pl-9"
          />
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <button onClick={() => setShowFilters(!showFilters)} className="flex items-center justify-between w-full btn-outline">
          <div className="flex items-center">
            <FiFilter className="mr-2" />
            <span>Filtreler</span>
            {(filters.status.length > 0 || filters.role.length > 0) && (
              <span className="ml-2 bg-primary text-white text-xs px-2 py-0.5 rounded-full">
                {filters.status.length + filters.role.length}
              </span>
            )}
          </div>
          {showFilters ? <FiChevronUp /> : <FiChevronDown />}
        </button>
      </div>

      {/* Filtre kutuları */}
      {showFilters && (
        <div className="card mb-4 space-y-4">
          <div>
            <h3 className="font-medium mb-2 flex items-center">
              <FiTag className="mr-1 text-primary" />
              Proje Durumu
            </h3>
            <div className="flex flex-wrap gap-2">
              {['planning', 'pre_production', 'active', 'post_production', 'completed'].map(status => (
                <button
                  key={status}
                  onClick={() => handleFilterChange('status', status)}
                  className={`text-xs px-3 py-1.5 rounded-full ${
                    filters.status.includes(status)
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {getProjectStatusName(status)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2 flex items-center">
              <FiUser className="mr-1 text-primary" />
              Rolüm
            </h3>
            <div className="flex flex-wrap gap-2">
              {['director', 'assistant_director', 'set_assistant', 'lighting_chief'].map(role => (
                <button
                  key={role}
                  onClick={() => handleFilterChange('role', role)}
                  className={`text-xs px-3 py-1.5 rounded-full ${
                    filters.role.includes(role)
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {getRoleName(role)}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Proje listesi */}
      {userProjects.length > 0 ? (
        <div className="space-y-4">
          {userProjects.map(project => {
            const userRole = getUserRoleInProject(project);
            return (
              <Link
                href={`/proje/${project.id}`}
                key={project.id}
                className="card hover:border-primary hover:shadow-md cursor-pointer block"
              >
                <div className="flex items-start gap-3">
                  <div className="relative h-16 w-20 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                    {project.image ? (
                      <Image src={project.image} alt={project.title} fill className="object-cover" />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <FiFolder className="text-gray-400" size={24} />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h2 className="font-medium text-base truncate">{project.title}</h2>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        project.status === 'active' ? 'bg-green-100 text-green-700'
                          : project.status === 'completed' ? 'bg-gray-100 text-gray-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {getProjectStatusName(project.status)}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-1 mt-1">
                      <div className="flex items-center text-xs text-gray-600">
                        <FiCalendar size={12} className="mr-1" />
                        <span>
                          {new Date(project.startDate).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' })}
                          {' - '}
                          {new Date(project.endDate).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' })}
                        </span>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <FiUser size={12} className="mr-1" />
                        <span>{getRoleName(userRole)}</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 truncate">{project.description.substring(0, 70)}...</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="card text-center py-8">
          <div className="flex justify-center mb-2">
            <FiInfo size={40} className="text-gray-300" />
          </div>
          <h3 className="font-medium text-gray-700 mb-1">Henüz projeniz bulunmuyor</h3>
          <p className="text-gray-500 text-sm mb-4">Yeni bir proje oluşturabilir veya proje bularak katılabilirsiniz</p>
          <div className="flex justify-center gap-2">
            <Link href="/proje-olustur" className="btn-primary">Proje Oluştur</Link>
            <Link href="/proje-bul" className="btn-outline">Proje Bul</Link>
          </div>
        </div>
      )}

      {/* Modal */}
      {showProjectModal && selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md max-h-[80vh] overflow-y-auto">
            <div className="p-4 border-b flex justify-between items-center sticky top-0 bg-white">
              <h2 className="font-semibold text-lg">{selectedProject.title}</h2>
              <button onClick={() => setShowProjectModal(false)} className="text-gray-500 hover:text-gray-700">&times;</button>
            </div>
            <div className="p-4 space-y-4">
              {(() => {
                const director = users.find(u => u.id === selectedProject.director);
                if (!director) return null;
                return (
                  <div className="flex items-center">
                    {renderUserAvatar(director)}
                    <div>
                      <div className="font-medium">{director.name} {director.surname}</div>
                      <div className="text-xs text-primary">{getRoleName('director')}</div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
