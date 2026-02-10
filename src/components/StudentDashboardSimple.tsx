import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, User, BookOpen, Trophy, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function StudentDashboardSimple() {
  const { student, logout, userRole } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">Dashboard Estudiante</h1>
            <p className="text-gray-600 mt-1">Bienvenido a tu portal académico</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-all font-semibold"
          >
            <LogOut className="w-5 h-5" />
            Cerrar Sesión
          </button>
        </div>

        {/* Student Info Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-start gap-6">
            <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="w-12 h-12 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-800">{student?.name}</h2>
              <p className="text-gray-600 text-lg mt-2">
                <span className="font-semibold">Código:</span> {student?.code}
              </p>
              <p className="text-gray-600 text-lg">
                <span className="font-semibold">Grado:</span> {student?.grade}
              </p>
              <p className="text-gray-600 text-lg">
                <span className="font-semibold">Email:</span> {student?.email}
              </p>
            </div>
          </div>
        </div>

        {/* Academic Levels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">Matemática</h3>
                <p className="text-gray-600">Nivel Actual</p>
              </div>
            </div>
            <div className="text-4xl font-bold text-green-600 capitalize">
              {student?.mathLevel}
            </div>
            <div className="mt-4 bg-green-50 px-4 py-2 rounded-lg">
              <p className="text-sm text-green-700">Progreso: 65%</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <Zap className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">Comunicación</h3>
                <p className="text-gray-600">Nivel Actual</p>
              </div>
            </div>
            <div className="text-4xl font-bold text-blue-600 capitalize">
              {student?.communicationLevel}
            </div>
            <div className="mt-4 bg-blue-50 px-4 py-2 rounded-lg">
              <p className="text-sm text-blue-700">Progreso: 50%</p>
            </div>
          </div>
        </div>

        {/* Additional Skills */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Trophy className="w-6 h-6 text-yellow-600" />
              <h3 className="text-lg font-bold text-gray-800">Lógica</h3>
            </div>
            <p className="text-3xl font-bold text-yellow-600 capitalize mb-2">
              {student?.logicLevel}
            </p>
            <p className="text-gray-600 text-sm">Razonamiento lógico</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Trophy className="w-6 h-6 text-purple-600" />
              <h3 className="text-lg font-bold text-gray-800">Verbal</h3>
            </div>
            <p className="text-3xl font-bold text-purple-600 capitalize mb-2">
              {student?.verbalLevel}
            </p>
            <p className="text-gray-600 text-sm">Expresión verbal</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Trophy className="w-6 h-6 text-pink-600" />
              <h3 className="text-lg font-bold text-gray-800">Espacial</h3>
            </div>
            <p className="text-3xl font-bold text-pink-600 capitalize mb-2">
              {student?.spatialLevel}
            </p>
            <p className="text-gray-600 text-sm">Visualización espacial</p>
          </div>
        </div>

        {/* Assessment Status */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Estado de Evaluación</h3>
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
              student?.assessmentCompleted ? 'bg-green-100' : 'bg-yellow-100'
            }`}>
              {student?.assessmentCompleted ? (
                <span className="text-2xl">✓</span>
              ) : (
                <span className="text-2xl">!</span>
              )}
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-800">
                {student?.assessmentCompleted 
                  ? '✓ Evaluación Completada' 
                  : 'Evaluación Pendiente'}
              </p>
              <p className="text-gray-600">
                {student?.assessmentCompleted
                  ? 'Has completado tu evaluación inicial.'
                  : 'Completa tu evaluación para acceder a todas las funcionalidades.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
