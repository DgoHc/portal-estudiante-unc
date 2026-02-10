import React from 'react';
import { TrendingUp, BookOpen, Award, Target, BarChart3, GraduationCap, Clock, CheckCircle, Lightbulb, User } from 'lucide-react';

export function AcademicPage() {
  const academicStats = [
    {
      title: 'Promedio General',
      value: '16.8',
      change: '+0.3',
      icon: TrendingUp,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-100',
      description: 'Promedio ponderado actual',
      detail: 'Basado en cursos completados'
    },
    {
      title: 'Asignaturas Aprobadas',
      value: '18',
      change: '+3',
      icon: BookOpen,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-100',
      description: 'De 24 asignaturas totales del año',
      detail: 'Necesitas 60 para egresar'
    },
    {
      title: 'Cursos en Progreso',
      value: '6',
      change: 'Activos',
      icon: Clock,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-100',
      description: 'Cursos del año actual',
      detail: 'Revisa tus fechas límite'
    },
    {
      title: 'Cursos Aprobados',
      value: '12',
      change: '100%',
      icon: CheckCircle,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-100',
      description: 'Cursos completados hasta la fecha',
      detail: '¡Sigue así!'
    }
  ];

  const courses = [
    {
      id: 1,
      name: 'Programación Web',
      code: 'CS-301',
      credits: 4,
      grade: 17,
      progress: 85,
      professor: 'Dr. Carlos Mendoza',
      schedule: 'Lun y Mié 10:00-12:00',
      status: 'En Progreso',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      id: 2,
      name: 'Base de Datos Avanzadas',
      code: 'CS-302',
      credits: 3,
      grade: 18,
      progress: 92,
      professor: 'Ing. María Torres',
      schedule: 'Mar y Jue 14:00-16:00',
      status: 'En Progreso',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50'
    },
    {
      id: 3,
      name: 'Inteligencia Artificial',
      code: 'CS-303',
      credits: 4,
      grade: 16,
      progress: 78,
      professor: 'Dr. Roberto Silva',
      schedule: 'Vie 08:00-12:00',
      status: 'En Progreso',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      id: 4,
      name: 'Redes de Computadoras',
      code: 'CS-304',
      credits: 3,
      grade: 19,
      progress: 95,
      professor: 'Ing. Ana García',
      schedule: 'Lun y Mié 16:00-18:00',
      status: 'En Progreso',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  const achievements = [
    {
      title: 'Excelencia Académica',
      description: 'Mantuviste un promedio superior a 16.0 en el año anterior.',
      icon: Award,
      color: 'from-yellow-500 to-yellow-600',
      achieved: true,
      date: '2023-II'
    },
    {
      title: 'Asistencia Perfecta',
      description: 'Lograste 100% de asistencia en 3 cursos durante el año.',
      icon: CheckCircle,
      color: 'from-green-500 to-green-600',
      achieved: true,
      date: '2023-II'
    },
    {
      title: 'Investigador Joven',
      description: 'Participación activa en un proyecto de investigación del departamento.',
      icon: Lightbulb,
      color: 'from-blue-500 to-blue-600',
      achieved: false,
      date: 'Próximamente'
    }
  ];

  return (
    <div className="space-y-8 p-4 md:p-6 lg:p-8">
      {/* Header with University Image */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full -translate-y-36 translate-x-36"></div>
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-white/5 rounded-full translate-y-28 -translate-x-28"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Rendimiento Académico</h1>
            <p className="text-green-100 text-xl mb-6">Seguimiento de tu progreso académico y logros</p>
            <div className="flex items-center space-x-4 justify-center md:justify-start">
              <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full">
                <GraduationCap className="w-5 h-5" />
                <span>3ro de Secundaria</span>
              </div>
            </div>
          </div>
          <div className="hidden lg:block mt-6 md:mt-0">
            <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center animate-pulse-slow">
              <BarChart3 className="w-16 h-16 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Academic Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {academicStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className={`bg-gradient-to-br ${stat.bgColor} rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200`}>
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-sm`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                  {stat.change}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.description}</p>
                {stat.detail && <p className="text-xs text-gray-400 mt-1">{stat.detail}</p>}
              </div>
            </div>
          );
        })}
      </div>

      {/* Current Courses */}
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Cursos en Progreso</h2>
          <p className="text-gray-600">Estado actual de tus cursos del año</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {courses.map((course) => (
              <div key={course.id} className={`bg-gradient-to-br ${course.bgColor} border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300`}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{course.name}</h3>
                    <p className="text-gray-600 text-sm">{course.code} • {course.credits} asignaturas</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">{course.grade}</div>
                    <div className="text-sm text-gray-500">Nota actual</div>
                  </div>
                </div>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white/50 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{course.professor}</p>
                      <p className="text-xs text-gray-500">Profesor</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white/50 rounded-full flex items-center justify-center">
                      <Clock className="w-4 h-4 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{course.schedule}</p>
                      <p className="text-xs text-gray-500">Horario</p>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Progreso del curso</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="w-full bg-white/50 rounded-full h-2">
                    <div 
                      className={`bg-gradient-to-r ${course.color} h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600 bg-white/50 px-3 py-1 rounded-full">
                    {course.status}
                  </span>
                  <button className="px-4 py-2 bg-white/50 text-gray-700 rounded-lg font-medium hover:bg-white/70 transition-all duration-200">
                    Ver Detalles
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Logros y Reconocimientos</h2>
          <p className="text-gray-600">Tus méritos académicos</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <div key={index} className={`p-6 rounded-2xl border-2 transition-all duration-200 ${
                  achievement.achieved 
                    ? 'bg-gradient-to-br from-green-50 to-green-100 border-green-200' 
                    : 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200'
                }`}>
                  <div className={`w-16 h-16 bg-gradient-to-br ${achievement.color} rounded-2xl flex items-center justify-center shadow-sm mb-4 ${
                    !achievement.achieved && 'opacity-50'
                  }`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">{achievement.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{achievement.description}</p>
                  {achievement.date && <p className="text-xs text-gray-500 mb-2">{achievement.date}</p>}
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    achievement.achieved
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-500'
                  }`}>
                    {achievement.achieved ? 'Logrado' : 'En Progreso'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
