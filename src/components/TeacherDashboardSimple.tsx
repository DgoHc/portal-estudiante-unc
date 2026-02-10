import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, User, Users, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function TeacherDashboardSimple() {
  const { teacher, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Mock students data
  const mockStudents = [
    {
      id: '1',
      code: '202015001',
      name: 'Juan Carlos Pérez López',
      grade: '3ro de Secundaria',
      progress: 65,
      status: 'En Progreso'
    },
    {
      id: '2',
      code: '202015002',
      name: 'María García Rodríguez',
      grade: '3ro de Secundaria',
      progress: 80,
      status: 'En Progreso'
    },
    {
      id: '3',
      code: '202015003',
      name: 'Carlos López Mendez',
      grade: '3ro de Secundaria',
      progress: 45,
      status: 'En Progreso'
    },
    {
      id: '4',
      code: '202015004',
      name: 'Ana Martínez Silva',
      grade: '3ro de Secundaria',
      progress: 90,
      status: 'Completado'
    },
    {
      id: '5',
      code: '202015005',
      name: 'Luis Fernández García',
      grade: '3ro de Secundaria',
      progress: 55,
      status: 'En Progreso'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">Dashboard del Profesor</h1>
            <p className="text-gray-600 mt-1">Gestiona a tus estudiantes</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-all font-semibold"
          >
            <LogOut className="w-5 h-5" />
            Cerrar Sesión
          </button>
        </div>

        {/* Teacher Info Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-start gap-6">
            <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="w-12 h-12 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-800">{teacher?.name}</h2>
              <p className="text-gray-600 text-lg mt-2">
                <span className="font-semibold">Código:</span> {teacher?.code}
              </p>
              <p className="text-gray-600 text-lg">
                <span className="font-semibold">Departamento:</span> {teacher?.department}
              </p>
              <p className="text-gray-600 text-lg">
                <span className="font-semibold">Email:</span> {teacher?.email}
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-6 h-6 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-800">Total Estudiantes</h3>
            </div>
            <p className="text-4xl font-bold text-blue-600">{mockStudents.length}</p>
            <p className="text-gray-600 text-sm mt-2">Bajo tu supervisión</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-6 h-6 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-800">Cursos</h3>
            </div>
            <p className="text-4xl font-bold text-green-600">{teacher?.courses?.length || 2}</p>
            <p className="text-gray-600 text-sm mt-2">Asignados</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">📊</span>
              <h3 className="text-lg font-semibold text-gray-800">Progreso Promedio</h3>
            </div>
            <p className="text-4xl font-bold text-purple-600">
              {Math.round(mockStudents.reduce((acc, s) => acc + s.progress, 0) / mockStudents.length)}%
            </p>
            <p className="text-gray-600 text-sm mt-2">De todos los estudiantes</p>
          </div>
        </div>

        {/* Students List */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Listado de Estudiantes</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">Código</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">Nombre</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">Grado</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">Progreso</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">Estado</th>
                </tr>
              </thead>
              <tbody>
                {mockStudents.map((student) => (
                  <tr key={student.id} className="border-b border-gray-100 hover:bg-blue-50 transition-colors">
                    <td className="py-4 px-4 font-mono text-gray-800">{student.code}</td>
                    <td className="py-4 px-4 text-gray-800">{student.name}</td>
                    <td className="py-4 px-4 text-gray-600">{student.grade}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-600 rounded-full transition-all"
                            style={{ width: `${student.progress}%` }}
                          ></div>
                        </div>
                        <span className="font-semibold text-gray-800">{student.progress}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        student.status === 'Completado'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {student.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Courses */}
        {teacher?.courses && teacher.courses.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Mis Cursos</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {teacher.courses.map((course, index) => (
                <div key={index} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200">
                  <h4 className="text-lg font-bold text-gray-800 mb-2">{course}</h4>
                  <p className="text-gray-600">Estudiantes: {mockStudents.length}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
