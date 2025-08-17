import React from 'react';
import { BookOpen, TrendingUp, Award, Clock, Calendar, Users, Target } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export function AcademicSection() {
  const { student } = useAuth();

  const courses = [
    {
      id: 1,
      name: 'Programación Avanzada',
      code: 'IS401',
      professor: 'Dr. Carlos Mendoza',
      grade: 16.5,
      progress: 85,
      nextClass: 'Lunes 08:00',
      credits: 4,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'from-blue-50 to-blue-100'
    },
    {
      id: 2,
      name: 'Base de Datos II',
      code: 'IS402',
      professor: 'Mg. Ana Rodríguez',
      grade: 15.8,
      progress: 78,
      nextClass: 'Martes 10:00',
      credits: 3,
      color: 'from-green-500 to-green-600',
      bgColor: 'from-green-50 to-green-100'
    },
    {
      id: 3,
      name: 'Ingeniería de Software',
      code: 'IS403',
      professor: 'Dr. Luis Fernández',
      grade: 17.2,
      progress: 92,
      nextClass: 'Miércoles 14:00',
      credits: 4,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'from-purple-50 to-purple-100'
    },
    {
      id: 4,
      name: 'Redes de Computadoras',
      code: 'IS404',
      professor: 'Ing. María Torres',
      grade: 14.9,
      progress: 75,
      nextClass: 'Jueves 16:00',
      credits: 3,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'from-orange-50 to-orange-100'
    },
    {
      id: 5,
      name: 'Inteligencia Artificial',
      code: 'IS405',
      professor: 'Dr. Roberto Silva',
      grade: 18.0,
      progress: 88,
      nextClass: 'Viernes 10:00',
      credits: 4,
      color: 'from-red-500 to-red-600',
      bgColor: 'from-red-50 to-red-100'
    }
  ];

  const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0);
  const weightedAverage = courses.reduce((sum, course) => sum + (course.grade * course.credits), 0) / totalCredits;

  const academicStats = [
    {
      label: 'Promedio Ponderado',
      value: weightedAverage.toFixed(1),
      icon: TrendingUp,
      color: 'from-green-500 to-green-600',
      bgColor: 'from-green-50 to-emerald-50'
    },
    {
      label: 'Créditos Totales',
      value: totalCredits,
      icon: BookOpen,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'from-blue-50 to-indigo-50'
    },
    {
      label: 'Cursos Activos',
      value: courses.length,
      icon: Target,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'from-purple-50 to-violet-50'
    }
  ];

  return (
    <div id="notas" className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-8 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center shadow-lg">
              <BookOpen className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-3xl font-bold">Rendimiento Académico</h2>
              <p className="text-blue-100 text-lg">Semestre {student?.semester} - 2024-II • {totalCredits} créditos</p>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="text-right">
              <p className="text-sm font-medium text-blue-100">Promedio General</p>
              <p className="text-4xl font-bold">{weightedAverage.toFixed(1)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {academicStats.map((stat, index) => (
            <div key={index} className={`bg-gradient-to-br ${stat.bgColor} rounded-2xl p-6 border border-gray-100`}>
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-sm`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Courses Grid */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Cursos del Semestre</h3>
          {courses.map((course) => (
            <div key={course.id} className={`bg-gradient-to-br ${course.bgColor} border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${course.color} rounded-xl flex items-center justify-center shadow-sm`}>
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{course.name}</h3>
                    <p className="text-gray-600 mt-1">{course.code} • {course.professor} • {course.credits} créditos</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold ${
                    course.grade >= 16 ? 'bg-green-100 text-green-700' :
                    course.grade >= 14 ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    <Award className="w-4 h-4 mr-1" />
                    {course.grade}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center space-x-2 text-gray-600">
                  <TrendingUp className="w-4 h-4" />
                  <span className="font-medium">Progreso: {course.progress}%</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span className="font-medium">{course.nextClass}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Users className="w-4 h-4" />
                  <span className="font-medium">Asistencia: 85%</span>
                </div>
              </div>
              
              <div className="w-full bg-white/50 rounded-full h-3 mb-2">
                <div 
                  className={`bg-gradient-to-r ${course.color} h-3 rounded-full transition-all duration-500 shadow-sm`}
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 text-right">{course.progress}% completado</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}