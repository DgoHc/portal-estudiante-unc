import React from 'react';
import { Calendar, MapPin, Users, Clock, BookOpen, Play } from 'lucide-react';

interface ScheduleSectionProps {
  onTabChange: (tab: string) => void;
}

export function ScheduleSection({ onTabChange }: ScheduleSectionProps) {
  const schedule = [
    {
      id: 1,
      time: '08:00 - 09:30',
      course: 'Programación Avanzada',
      room: 'Aula 201-A',
      professor: 'Dr. Carlos Mendoza',
      type: 'Teoría',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      status: 'current',
      date: 'Lunes'
    },
    {
      id: 2,
      time: '10:00 - 11:30',
      course: 'Base de Datos II',
      room: 'Lab. Sistemas 1',
      professor: 'Mg. Ana Rodríguez',
      type: 'Práctica',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      status: 'upcoming',
      date: 'Lunes'
    },
    {
      id: 3,
      time: '14:00 - 15:30',
      course: 'Ingeniería de Software',
      room: 'Aula 301-B',
      professor: 'Dr. Luis Fernández',
      type: 'Teoría',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      status: 'upcoming',
      date: 'Martes'
    },
    {
      id: 4,
      time: '16:00 - 17:30',
      course: 'Redes de Computadoras',
      room: 'Lab. Redes',
      professor: 'Ing. María Torres',
      type: 'Laboratorio',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      status: 'upcoming',
      date: 'Miércoles'
    }
  ];

  const today = new Date().toLocaleDateString('es-PE', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Teoría': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Práctica': return 'bg-green-100 text-green-800 border-green-200';
      case 'Laboratorio': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusBadge = (status: string) => {
    if (status === 'current') {
      return (
        <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 border border-red-200 animate-pulse">
          <Play className="w-3 h-3 mr-1" />
          En curso
        </div>
      );
    }
    return null;
  };

  return (
    <div id="horario" className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden mb-8">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center shadow-lg">
              <Calendar className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-3xl font-bold">Horario de Clases</h2>
              <p className="text-purple-100 text-lg capitalize">{today}</p>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="text-right">
              <p className="text-sm font-medium text-purple-100">Próxima Clase</p>
              <p className="text-2xl font-bold">10:00</p>
              <p className="text-sm text-purple-100">Base de Datos II</p>
            </div>
          </div>
        </div>
      </div>

      {/* Schedule Content */}
      <div className="p-8 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Clases Programadas</h3>
        <div className="space-y-6">
          {schedule.map((item, index) => (
            <div key={item.id} className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 relative`}>
              {/* Time indicator */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-400 to-purple-600 rounded-l-2xl"></div>
              
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center shadow-sm`}>
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{item.course}</h3>
                    <p className="text-gray-600 mt-1">{item.professor}</p>
                  </div>
                </div>
                <div className="text-right">
                  {getStatusBadge(item.status)}
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold border ${getTypeColor(item.type)} mt-2`}>
                    {item.type}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3 p-3 bg-white/50 rounded-xl">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-bold text-gray-900">{item.time}</p>
                    <p className="text-xs text-gray-500">Duración: 1h 30m</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-white/50 rounded-xl">
                  <MapPin className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-bold text-gray-900">{item.room}</p>
                    <p className="text-xs text-gray-500">Piso 2</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-white/50 rounded-xl">
                  <Users className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="font-bold text-gray-900">25 estudiantes</p>
                    <p className="text-xs text-gray-500">Capacidad: 30</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Acciones Rápidas</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => onTabChange('schedule')}
              className="flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <Calendar className="w-5 h-5" />
              <span className="font-medium">Ver Semana Completa</span>
            </button>
            <button
              onClick={() => console.log('Navegar a ubicaciones de aulas/laboratorios')}
              className="flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <MapPin className="w-5 h-5" />
              <span className="font-medium">Ubicaciones de Aulas</span>
            </button>
            <button
              onClick={() => onTabChange('teachers')}
              className="flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <Users className="w-5 h-5" />
              <span className="font-medium">Contactar Profesores</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};