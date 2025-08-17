import React from 'react';
import { Bell, Calendar, MapPin, ExternalLink, AlertTriangle, Info, CheckCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

export function AnnouncementsSection() {
  const announcements = [
    {
      id: 1,
      title: 'Conferencia: IA en la Industria 4.0',
      description: 'Conferencia magistral sobre aplicaciones de inteligencia artificial en la industria moderna. Invitado especial: Dr. Roberto Silva.',
      date: new Date(2024, 10, 15, 14, 0),
      location: 'Auditorio Central',
      type: 'evento',
      priority: 'high',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'from-blue-50 to-blue-100'
    },
    {
      id: 2,
      title: 'Matrícula Extemporánea',
      description: 'Último plazo para matrícula extemporánea del semestre 2024-II. Documentos requeridos: DNI, voucher de pago y constancia de estudios.',
      date: new Date(2024, 10, 20),
      location: 'Secretaría Académica',
      type: 'tramite',
      priority: 'urgent',
      color: 'from-red-500 to-red-600',
      bgColor: 'from-red-50 to-red-100'
    },
    {
      id: 3,
      title: 'Taller: Desarrollo con React.js',
      description: 'Taller práctico de desarrollo frontend con React y TypeScript. Cupos limitados. Incluye certificado de participación.',
      date: new Date(2024, 10, 17, 16, 0),
      location: 'Lab. Sistemas 2',
      type: 'evento',
      priority: 'medium',
      color: 'from-green-500 to-green-600',
      bgColor: 'from-green-50 to-green-100'
    },
    {
      id: 4,
      title: 'Feria de Proyectos de Tesis',
      description: 'Presentación de proyectos de tesis de estudiantes de noveno y décimo ciclo. Evaluación de jurados especializados.',
      date: new Date(2024, 10, 25, 9, 0),
      location: 'Patio Central',
      type: 'evento',
      priority: 'medium',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'from-purple-50 to-purple-100'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'border-red-200 bg-red-50';
      case 'high': return 'border-orange-200 bg-orange-50';
      default: return 'border-blue-200 bg-blue-50';
    }
  };

  const getTypeIcon = (type: string) => {
    return type === 'evento' ? Calendar : Bell;
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'urgent': return AlertTriangle;
      case 'high': return Info;
      default: return CheckCircle;
    }
  };

  return (
    <div id="anuncios" className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-500 to-pink-600 p-8 text-white">
        <div className="flex items-center justify-between">
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
              <p className="text-4xl font-bold">5</p>
            </div>
          </div>
        </div>
      </div>

      {/* Announcements Content */}
      <div className="p-8">
        <div className="space-y-6">
          {announcements.map((announcement) => {
            const TypeIcon = getTypeIcon(announcement.type);
            const PriorityIcon = getPriorityIcon(announcement.priority);
            const timeAgo = formatDistanceToNow(announcement.date, { 
              addSuffix: true, 
              locale: es 
            });

            return (
              <div 
                key={announcement.id} 
                className={`bg-gradient-to-br ${announcement.bgColor} border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300`}
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
                          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">{announcement.description}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-bold ${
                      announcement.priority === 'urgent' ? 'bg-red-100 text-red-700' :
                      announcement.priority === 'high' ? 'bg-orange-100 text-orange-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      <PriorityIcon className="w-3 h-3 mr-1" />
                      {announcement.priority === 'urgent' ? 'Urgente' :
                       announcement.priority === 'high' ? 'Importante' : 'Normal'}
                    </div>
                    <button className="text-blue-600 hover:text-blue-800 transition-colors p-2 hover:bg-blue-50 rounded-lg">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
                  <div className="flex items-center space-x-3 p-3 bg-white/50 rounded-xl">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-bold text-gray-900">{timeAgo}</p>
                      <p className="text-xs text-gray-500">{announcement.date.toLocaleDateString('es-PE')}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-white/50 rounded-xl">
                    <MapPin className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-bold text-gray-900">{announcement.location}</p>
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
          <h3 className="text-lg font-bold text-gray-900 mb-4">Acciones Rápidas</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button className="flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-sm hover:shadow-md">
              <Bell className="w-5 h-5" />
              <span className="font-medium">Ver Todos</span>
            </button>
            <button className="flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all duration-200 shadow-sm hover:shadow-md">
              <Calendar className="w-5 h-5" />
              <span className="font-medium">Calendario</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}