import React, { useEffect, useState } from 'react';
import { Bell, Calendar, MapPin, ExternalLink, AlertTriangle, Info, CheckCircle, Search } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { apiGetAnnouncements } from '../../api';

interface AnnouncementsSectionProps {
  onTabChange: (tab: string) => void;
}

export function AnnouncementsSection({ onTabChange }: AnnouncementsSectionProps) {
  const [showViewAllConfirmation, setShowViewAllConfirmation] = useState(false);
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const { announcements } = await apiGetAnnouncements();
        if (!cancelled) setAnnouncements(announcements.map(a => ({
          ...a,
          date: new Date(a.date),
        })));
      } catch (_e) {
        if (!cancelled) setAnnouncements([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'border-red-200 bg-red-50 text-red-800';
      case 'high': return 'border-orange-200 bg-orange-50 text-orange-800';
      case 'medium': return 'border-blue-200 bg-blue-50 text-blue-800';
      default: return 'border-gray-200 bg-gray-50 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'evento': return Calendar;
      case 'tramite': return CheckCircle;
      case 'info': return Info;
      default: return Bell;
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'urgent': return AlertTriangle;
      case 'high': return Info;
      default: return CheckCircle;
    }
  };

  const handleViewAll = () => {
    setShowViewAllConfirmation(true);
    setTimeout(() => setShowViewAllConfirmation(false), 3000);
    console.log('Simulando ver todos los anuncios...');
  };

  return (
    <div id="anuncios" className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden mb-8">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center shadow-lg">
              <Bell className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-3xl font-bold">Anuncios</h2>
              <p className="text-red-100 text-lg">Novedades importantes</p>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="text-right">
              <p className="text-sm font-medium text-red-100">Nuevos</p>
              <p className="text-4xl font-bold">{announcements.filter(a => a.priority === 'urgent' || a.priority === 'high').length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Announcements Content */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Últimos Anuncios</h3>
        {loading && <div className="text-gray-600">Cargando anuncios...</div>}
        {!loading && announcements.length === 0 && <div className="text-gray-600">Sin anuncios activos.</div>}
        {!loading && announcements.map((announcement) => {
          const TypeIcon = getTypeIcon(announcement.type);
          const PriorityIcon = getPriorityIcon(announcement.priority);
          const timeAgo = formatDistanceToNow(announcement.date, { 
            addSuffix: true, 
            locale: es 
          });

          return (
            <div 
              key={announcement.id} 
              className={`bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${announcement.color} rounded-xl flex items-center justify-center shadow-sm`}>
                    <TypeIcon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-bold text-gray-900 text-lg">{announcement.title}</h3>
                      {announcement.priority === 'urgent' && (
                        <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></span>
                      )}
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">{announcement.description}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold border ${getPriorityColor(announcement.priority)}`}>
                    <PriorityIcon className="w-3 h-3 mr-1" />
                    {announcement.priority === 'urgent' ? 'Urgente' :
                     announcement.priority === 'high' ? 'Importante' :
                     announcement.priority === 'medium' ? 'Noticia' : 'Información'}
                  </div>
                  <a href={announcement.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 transition-colors p-2 hover:bg-blue-50 rounded-lg">
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600 mt-4 border-t border-gray-100 pt-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{timeAgo}</p>
                    <p className="text-xs text-gray-500">{announcement.date.toLocaleDateString('es-PE', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{announcement.location}</p>
                    <p className="text-xs text-gray-500">Ubicación</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Acciones Rápidas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button 
            onClick={handleViewAll}
            className="flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <Bell className="w-5 h-5" />
            <span className="font-medium">Ver Todos los Anuncios</span>
          </button>
          <button 
            onClick={() => onTabChange('schedule')}
            className="flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <Calendar className="w-5 h-5" />
            <span className="font-medium">Ir al Calendario</span>
          </button>
        </div>
        {showViewAllConfirmation && (
          <div className="mt-4 p-3 bg-blue-100 text-blue-800 rounded-lg text-sm text-center border border-blue-200">
            Visualizando todos los anuncios (simulado).
          </div>
        )}
      </div>
    </div>
  );
}