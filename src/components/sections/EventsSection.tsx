import React from 'react';
import { Calendar, MapPin, Users, Clock, ExternalLink, Award, BookOpen, Users2 } from 'lucide-react';

export function EventsSection() {
  const events = [
    {
      id: 1,
      title: 'Conferencia: IA en la Industria 4.0',
      description: 'Conferencia magistral sobre aplicaciones de inteligencia artificial en la industria moderna.',
      date: new Date(2024, 10, 15, 14, 0),
      location: 'Auditorio Central',
      type: 'conferencia',
      attendees: 120,
      maxAttendees: 150,
      isRegistered: true,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'from-blue-50 to-blue-100'
    },
    {
      id: 2,
      title: 'Taller: Desarrollo con React.js',
      description: 'Taller práctico de desarrollo frontend con React y TypeScript.',
      date: new Date(2024, 10, 17, 16, 0),
      location: 'Lab. Sistemas 2',
      type: 'taller',
      attendees: 25,
      maxAttendees: 30,
      isRegistered: false,
      color: 'from-green-500 to-green-600',
      bgColor: 'from-green-50 to-green-100'
    },
    {
      id: 3,
      title: 'Feria de Proyectos de Tesis',
      description: 'Presentación de proyectos de tesis de estudiantes de noveno y décimo ciclo.',
      date: new Date(2024, 10, 25, 9, 0),
      location: 'Patio Central',
      type: 'feria',
      attendees: 80,
      maxAttendees: 200,
      isRegistered: false,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'from-purple-50 to-purple-100'
    },
    {
      id: 4,
      title: 'Hackathon: Soluciones Tecnológicas',
      description: 'Competencia de programación para desarrollar soluciones innovadoras.',
      date: new Date(2024, 11, 5, 8, 0),
      location: 'Centro de Innovación',
      type: 'competencia',
      attendees: 45,
      maxAttendees: 60,
      isRegistered: true,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'from-orange-50 to-orange-100'
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'conferencia': return BookOpen;
      case 'taller': return Award;
      case 'feria': return Users2;
      case 'competencia': return Award;
      default: return Calendar;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'conferencia': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'taller': return 'bg-green-100 text-green-800 border-green-200';
      case 'feria': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'competencia': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-8 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center shadow-lg">
              <Calendar className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-3xl font-bold">Eventos y Actividades</h2>
              <p className="text-purple-100 text-lg">Actividades extracurriculares y eventos académicos</p>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="text-right">
              <p className="text-sm font-medium text-purple-100">Próximo Evento</p>
              <p className="text-2xl font-bold">15 Nov</p>
              <p className="text-sm text-purple-100">Conferencia IA</p>
            </div>
          </div>
        </div>
      </div>

      {/* Events Content */}
      <div className="p-8">
        <div className="space-y-6">
          {events.map((event) => {
            const TypeIcon = getTypeIcon(event.type);
            return (
              <div key={event.id} className={`bg-gradient-to-br ${event.bgColor} border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${event.color} rounded-xl flex items-center justify-center shadow-sm`}>
                      <TypeIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">{event.title}</h3>
                      <p className="text-gray-600 mt-1">{event.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold border ${getTypeColor(event.type)}`}>
                      {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                    </div>
                    {event.isRegistered && (
                      <div className="mt-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 border border-green-200">
                        Inscrito
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-gray-600">
                  <div className="flex items-center space-x-3 p-3 bg-white/50 rounded-xl">
                    <Calendar className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="font-bold text-gray-900">{event.date.toLocaleDateString('es-PE')}</p>
                      <p className="text-xs text-gray-500">{event.date.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' })}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-white/50 rounded-xl">
                    <MapPin className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-bold text-gray-900">{event.location}</p>
                      <p className="text-xs text-gray-500">Ubicación</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-white/50 rounded-xl">
                    <Users className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-bold text-gray-900">{event.attendees}/{event.maxAttendees}</p>
                      <p className="text-xs text-gray-500">Asistentes</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-white/50 rounded-xl">
                    <Clock className="w-5 h-5 text-orange-600" />
                    <div>
                      <p className="font-bold text-gray-900">
                        {Math.round((event.attendees / event.maxAttendees) * 100)}%
                      </p>
                      <p className="text-xs text-gray-500">Ocupación</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex justify-between items-center">
                  <div className="w-full bg-white/50 rounded-full h-2 mr-4">
                    <div 
                      className={`bg-gradient-to-r ${event.color} h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
                    ></div>
                  </div>
                  <button className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    event.isRegistered 
                      ? 'bg-green-600 text-white hover:bg-green-700' 
                      : 'bg-purple-600 text-white hover:bg-purple-700'
                  }`}>
                    {event.isRegistered ? 'Inscrito' : 'Inscribirse'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Acciones Rápidas</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all duration-200 shadow-sm hover:shadow-md">
              <Calendar className="w-5 h-5" />
              <span className="font-medium">Ver Calendario</span>
            </button>
            <button className="flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-sm hover:shadow-md">
              <Users className="w-5 h-5" />
              <span className="font-medium">Mis Inscripciones</span>
            </button>
            <button className="flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-sm hover:shadow-md">
              <ExternalLink className="w-5 h-5" />
              <span className="font-medium">Sugerir Evento</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
