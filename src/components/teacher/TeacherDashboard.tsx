import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Users, BookOpen, TrendingUp, Award } from 'lucide-react';
import { TeacherStudentsPage } from '@/pages/TeacherStudentsPage';

interface Course {
  id: string;
  name: string;
  grade: string;
  studentCount: number;
}

const mockCourses: Course[] = [
  { id: '1', name: 'Matemática Avanzada', grade: '3ro de Secundaria', studentCount: 28 },
  { id: '2', name: 'Comunicación Integral', grade: '3ro de Secundaria', studentCount: 26 },
];

const mockPendingContent = [
  { id: '1', studentName: 'Juan Carlos Pérez', objective: 'Resolver ecuaciones cuadráticas', status: 'reviewing' },
  { id: '2', studentName: 'María García', objective: 'Comprensión de textos', status: 'generating' },
];

export function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'students'>('overview');
  const { teacher } = useAuth();

  const courses = mockCourses;
  const pendingContent = mockPendingContent;

  if (activeTab === 'students') {
    return <TeacherStudentsPage />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-4 font-semibold border-b-2 transition ${
                activeTab === 'overview'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <span className="flex items-center gap-2">
                <BookOpen size={20} />
                Resumen
              </span>
            </button>
            <button
              onClick={() => setActiveTab('students')}
              className={`px-4 py-4 font-semibold border-b-2 transition ${
                activeTab === 'students'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <span className="flex items-center gap-2">
                <Users size={20} />
                Mis Estudiantes
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-8">Panel del Docente</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <section className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <div className="flex items-center gap-4 mb-4">
              <BookOpen className="text-blue-600" size={28} />
              <h2 className="text-xl font-semibold">Mis Cursos</h2>
            </div>
            <div className="space-y-4">
              {courses?.map((course) => (
                <div
                  key={course.id}
                  className="border p-4 rounded-lg hover:border-blue-500 transition-colors"
                >
                  <h3 className="font-medium text-lg">{course.name}</h3>
                  <p className="text-gray-600">Grado: {course.grade}</p>
                  <p className="text-gray-600">Alumnos: {course.studentCount}</p>
                  <button
                    className="mt-2 text-blue-600 hover:text-blue-800 font-semibold"
                    onClick={() => {/* TODO: Navegar al detalle del curso */}}
                  >
                    Ver detalles →
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <div className="flex items-center gap-4 mb-4">
              <TrendingUp className="text-green-600" size={28} />
              <h2 className="text-xl font-semibold">Contenido Pendiente</h2>
            </div>
            <div className="space-y-4">
              {pendingContent?.map((content) => (
                <div
                  key={content.id}
                  className="border p-4 rounded-lg hover:border-blue-500 transition-colors"
                >
                  <p className="font-medium">{content.studentName}</p>
                  <p className="text-gray-600 text-sm mb-2">
                    Objetivo: {content.objective}
                  </p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-yellow-600">
                      {content.status === 'reviewing' ? 'Pendiente de revisión' : 'Generando'}
                    </span>
                    <button
                      className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                      onClick={() => {/* TODO: Navegar a la revisión */}}
                    >
                      Revisar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-md">
            <Award size={28} className="mb-2 opacity-80" />
            <p className="text-sm opacity-80">Total Estudiantes</p>
            <p className="text-2xl font-bold mt-2">{courses?.reduce((sum, c) => sum + c.studentCount, 0) || 0}</p>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-lg shadow-md">
            <TrendingUp size={28} className="mb-2 opacity-80" />
            <p className="text-sm opacity-80">Progreso Promedio</p>
            <p className="text-2xl font-bold mt-2">75%</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white p-6 rounded-lg shadow-md">
            <BookOpen size={28} className="mb-2 opacity-80" />
            <p className="text-sm opacity-80">Contenido Revisando</p>
            <p className="text-2xl font-bold mt-2">{pendingContent?.length || 0}</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-lg shadow-md">
            <Users size={28} className="mb-2 opacity-80" />
            <p className="text-sm opacity-80">Mis Cursos</p>
            <p className="text-2xl font-bold mt-2">{courses?.length || 0}</p>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => setActiveTab('students')}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 px-8 rounded-lg transition transform hover:scale-105"
          >
            Ver Gestión de Estudiantes →
          </button>
        </div>
      </div>
    </div>
  );
}