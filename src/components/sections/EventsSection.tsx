import React, { useState } from 'react';
import { Calendar, MapPin, Users, Clock, ExternalLink, Award, BookOpen, Users2, PlusCircle, CheckCircle } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

interface EventsSectionProps {
  onTabChange: (tab: string) => void;
}

export function EventsSection({ onTabChange }: EventsSectionProps) {
  const [showRegisterConfirmation, setShowRegisterConfirmation] = useState<number | null>(null);

  const events = [
    {
      id: 1,
      title: 'Conferencia: IA en la Industria 4.0',
      description: 'Conferencia magistral sobre aplicaciones de inteligencia artificial en la industria moderna. Invitado especial: Dr. Roberto Silva.',
      date: '2024-11-15T14:00:00',
      location: 'Auditorio Central',
      type: 'conferencia',
      attendees: 120,
      maxAttendees: 150,
      isRegistered: true,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      link: '#',
    },
    {
      id: 2,
      title: 'Taller: Desarrollo con React.js',
      description: 'Taller práctico de desarrollo frontend con React y TypeScript. Cupos limitados. Incluye certificado de participación.',
      date: '2024-11-17T16:00:00',
      location: 'Lab. Sistemas 2',
      type: 'taller',
      attendees: 25,
      maxAttendees: 30,
      isRegistered: false,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      link: '#',
    },
    {
      id: 3,
      title: 'Feria de Proyectos de Tesis',
      description: 'Presentación de proyectos de tesis de estudiantes de noveno y décimo ciclo. Evaluación de jurados especializados.',
      date: '2024-11-25T09:00:00',
      location: 'Patio Central',
      type: 'feria',
      attendees: 80,
      maxAttendees: 200,
      isRegistered: false,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      link: '#',
    },
    {
      id: 4,
      title: 'Hackathon: Soluciones Tecnológicas',
      description: 'Competencia de programación para desarrollar soluciones innovadoras y tecnológicas.',
      date: '2024-12-05T08:00:00',
      location: 'Centro de Innovación',
      type: 'competencia',
      attendees: 45,
      maxAttendees: 60,
      isRegistered: true,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      link: '#',
    },
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'conferencia': return BookOpen;
      case 'taller': return Award;
      case 'feria': return Users2;
      case 'competencia': return Users;
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

  const handleRegister = (eventId: number) => {
    setShowRegisterConfirmation(eventId);
    setTimeout(() => setShowRegisterConfirmation(null), 3000); // Hide after 3 seconds
    console.log(`Simulando inscripción al evento ${eventId}`);
    // Aquí iría la lógica para registrar al usuario en el evento
  };

  const handleViewRegistrations = () => {
    console.log('Simulando ver mis inscripciones...');
    // Podría filtrar la lista de eventos o navegar a una nueva sección
  };

  const handleSuggestEvent = () => {
    console.log('Simulando sugerir un nuevo evento...');
    // Podría abrir un modal o un formulario
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden mb-8">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center shadow-lg">
              <Calendar className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-3xl font-bold">Eventos y Actividades</h2>
              <p className="text-indigo-100 text-lg">Actividades extracurriculares y eventos académicos</p>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="text-right">
              <p className="text-sm font-medium text-indigo-100">Próximo Evento</p>
              <p className="text-2xl font-bold">{format(parseISO(events[0].date), 'dd MMM', { locale: es })}</p>
              <p className="text-sm text-indigo-100">{events[0].title}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Events Content */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Próximos Eventos</h3>
        {events.map((event) => {
          const TypeIcon = getTypeIcon(event.type);
          const eventDate = parseISO(event.date);
          const formattedDate = format(eventDate, 'dd/MM/yyyy HH:mm', { locale: es });
          
          return (
            <div key={event.id} className={`bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl p-6 hover:shadow-lg transition-all duration-300`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${event.color} rounded-xl flex items-center justify-center shadow-sm`}>
                    <TypeIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{event.title}</h3>
                    <p className="text-gray-600 mt-1 text-sm">{event.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold border ${getTypeColor(event.type)}`}>
                    {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-600">
                <div className="flex items-center space-x-3 p-3 bg-white/50 rounded-xl">
                  <Calendar className="w-5 h-5 text-indigo-600" />
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{format(eventDate, 'PPP', { locale: es })}</p>
                    <p className="text-xs text-gray-500">{format(eventDate, 'p', { locale: es })}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-white/50 rounded-xl">
                  <MapPin className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{event.location}</p>
                    <p className="text-xs text-gray-500">Ubicación</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-white/50 rounded-xl">
                  <Users className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{event.attendees}/{event.maxAttendees}</p>
                    <p className="text-xs text-gray-500">Asistentes</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-between items-center">
                <div className="w-full bg-gray-200 rounded-full h-2 mr-4">
                  <div 
                    className={`bg-gradient-to-r ${event.color} h-2 rounded-full transition-all duration-500`}
                    style={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
                  ></div>
                </div>
                {event.isRegistered ? (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700 border border-green-200">
                    <CheckCircle className="w-4 h-4 mr-1" /> Inscrito
                  </span>
                ) : (
                  <button 
                    onClick={() => handleRegister(event.id)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-all duration-200 shadow-md"
                  >
                    Inscribirse
                  </button>
                )}
              </div>
              {showRegisterConfirmation === event.id && (
                <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-lg text-sm text-center border border-green-200">
                  ¡Inscripción simulada exitosa!
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
            onClick={() => onTabChange('schedule')}
            className="flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-xl hover:from-indigo-700 hover:to-indigo-800 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <Calendar className="w-5 h-5" />
            <span className="font-medium">Ver Calendario</span>
          </button>
          <button 
            onClick={handleViewRegistrations}
            className="flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <Users className="w-5 h-5" />
            <span className="font-medium">Mis Inscripciones</span>
          </button>
          <button 
            onClick={handleSuggestEvent}
            className="flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <PlusCircle className="w-5 h-5" />
            <span className="font-medium">Sugerir Evento</span>
          </button>
        </div>
        {showRegisterConfirmation && (
          <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-lg text-sm text-center border border-green-200">
            ¡Inscripción simulada exitosa!
          </div>
        )}
      </div>
    </div>
  );
}
