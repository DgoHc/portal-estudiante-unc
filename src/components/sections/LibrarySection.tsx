import React, { useEffect, useState } from 'react';
import { BookOpen, Download, Search, Clock, Users, Star, FileText, Video, Database, Book, ListFilter, FolderOpen } from 'lucide-react';
import { apiGetLibraryResources, apiDownloadResource } from '../../api';

export function LibrarySection() {
  const [showDownloadConfirmation, setShowDownloadConfirmation] = useState<number | null>(null);
  const [resources, setResources] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const { resources } = await apiGetLibraryResources();
        if (!cancelled) setResources(resources);
      } catch (_e) {
        if (!cancelled) setResources([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'libro': return BookOpen;
      case 'video': return Video;
      case 'documento': return FileText;
      case 'base_datos': return Database;
      default: return FileText;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'libro': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'video': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'documento': return 'bg-red-100 text-red-800 border-red-200';
      case 'base_datos': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleDownload = async (resourceId: number) => {
    try {
      await apiDownloadResource(resourceId);
    } catch (_e) {
      // no-op
    }
    setShowDownloadConfirmation(resourceId);
    setTimeout(() => setShowDownloadConfirmation(null), 3000);
  };

  const handleAdvancedSearch = () => {
    console.log('Simulando búsqueda avanzada...');
    // Podría abrir un modal de búsqueda o navegar a una página de filtros
  };

  const handleMyDownloads = () => {
    console.log('Simulando ver mis descargas...');
    // Podría filtrar la lista actual o navegar a un historial
  };

  const handleFavorites = () => {
    console.log('Simulando ver recursos favoritos...');
    // Podría filtrar la lista actual o navegar a una sección de favoritos
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden mb-8">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center shadow-lg">
              <BookOpen className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-3xl font-bold">Biblioteca Digital</h2>
              <p className="text-teal-100 text-lg">Recursos académicos y materiales de estudio</p>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="text-right">
              <p className="text-sm font-medium text-teal-100">Recursos Disponibles</p>
              <p className="text-4xl font-bold">{resources.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-8 pb-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar recursos, libros, videos..."
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all bg-white"
          />
        </div>
      </div>

      {/* Resources Content */}
      <div className="px-8 pb-8">
        <div className="space-y-4">
          {loading && <div className="text-gray-600">Cargando recursos...</div>}
          {!loading && resources.length === 0 && <div className="text-gray-600">Sin recursos disponibles.</div>}
          {!loading && resources.map((resource) => {
            const TypeIcon = getTypeIcon(resource.type);
            return (
              <div key={resource.id} className={`bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 ${!resource.isAvailable && 'opacity-60'}`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${resource.color} rounded-xl flex items-center justify-center shadow-sm`}>
                      <TypeIcon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 text-lg">{resource.title}</h3>
                      <p className="text-gray-700 mt-1 text-sm">{resource.author} • {resource.year}</p>
                      {resource.description && <p className="text-gray-600 text-xs mt-1">{resource.description}</p>}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold border ${getTypeColor(resource.type)}`}>
                      {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                    </div>
                    <div className="mt-2 flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < Math.floor(resource.rating) ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
                        />
                      ))}
                      <span className="text-sm font-medium text-gray-800 ml-1">({resource.rating})</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-gray-700 mt-4 border-t border-gray-100 pt-4">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-5 h-5 text-indigo-600" />
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{resource.format}</p>
                      <p className="text-xs text-gray-500">Formato</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Download className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{resource.size}</p>
                      <p className="text-xs text-gray-500">Tamaño</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{resource.downloads}</p>
                      <p className="text-xs text-gray-500">Descargas</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-orange-600" />
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{resource.isAvailable ? 'Disponible' : 'No Disponible'}</p>
                      <p className="text-xs text-gray-500">Estado</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Última actualización:</span>
                    <span className="text-sm font-medium text-gray-900">Hace 2 días</span>
                  </div>
                  <button 
                    onClick={() => handleDownload(resource.id)}
                    disabled={!resource.isAvailable}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
                      resource.isAvailable 
                        ? 'bg-teal-600 text-white hover:bg-teal-700 shadow-md' 
                        : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                    }`}
                  >
                    <Download className="w-4 h-4" />
                    <span>Descargar</span>
                  </button>
                </div>
                {showDownloadConfirmation === resource.id && (
                  <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-lg text-sm text-center border border-green-200">
                    Descarga simulada iniciada para: {resource.title}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Acciones Rápidas</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button 
              onClick={handleAdvancedSearch}
              className="flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-xl hover:from-teal-700 hover:to-teal-800 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <ListFilter className="w-5 h-5" />
              <span className="font-medium">Búsqueda Avanzada</span>
            </button>
            <button 
              onClick={handleMyDownloads}
              className="flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <FolderOpen className="w-5 h-5" />
              <span className="font-medium">Mis Descargas</span>
            </button>
            <button 
              onClick={handleFavorites}
              className="flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <Star className="w-5 h-5" />
              <span className="font-medium">Mis Favoritos</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
