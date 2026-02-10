import { useState } from 'react';
import { Search, Download } from 'lucide-react';
import { TeacherStudentList } from '@/components/teacher/TeacherStudentList';
import { StudentDetailPanel } from '@/components/teacher/StudentDetailPanel';

interface Student {
  id: string;
  name: string;
  code: string;
  grade: string;
  progress: number;
  photo?: string;
  email: string;
  phone: string;
  mathLevel: 'básico' | 'intermedio' | 'avanzado';
  communicationLevel: 'básico' | 'intermedio' | 'avanzado';
  logicLevel: 'básico' | 'intermedio' | 'avanzado';
  verbalLevel: 'básico' | 'intermedio' | 'avanzado';
  spatialLevel: 'básico' | 'intermedio' | 'avanzado';
  lastActivity: string;
  completedAssignments: number;
  totalAssignments: number;
}

// Mock data - en producción esto vendría de la API
const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Juan Carlos Pérez López',
    code: '202015001',
    grade: '3ro de Secundaria',
    progress: 75,
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Juan',
    email: '202015001@colegio.edu.pe',
    phone: '+51 976 123 456',
    mathLevel: 'intermedio',
    communicationLevel: 'básico',
    logicLevel: 'intermedio',
    verbalLevel: 'básico',
    spatialLevel: 'avanzado',
    lastActivity: 'Hace 2 horas',
    completedAssignments: 8,
    totalAssignments: 10,
  },
  {
    id: '2',
    name: 'María García Rodríguez',
    code: '202015002',
    grade: '3ro de Secundaria',
    progress: 92,
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
    email: '202015002@colegio.edu.pe',
    phone: '+51 987 654 321',
    mathLevel: 'avanzado',
    communicationLevel: 'avanzado',
    logicLevel: 'avanzado',
    verbalLevel: 'intermedio',
    spatialLevel: 'intermedio',
    lastActivity: 'Hace 30 minutos',
    completedAssignments: 10,
    totalAssignments: 10,
  },
  {
    id: '3',
    name: 'Carlos López Martínez',
    code: '202015003',
    grade: '3ro de Secundaria',
    progress: 45,
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos',
    email: '202015003@colegio.edu.pe',
    phone: '+51 912 345 678',
    mathLevel: 'básico',
    communicationLevel: 'básico',
    logicLevel: 'básico',
    verbalLevel: 'básico',
    spatialLevel: 'básico',
    lastActivity: 'Hace 1 día',
    completedAssignments: 3,
    totalAssignments: 10,
  },
  {
    id: '4',
    name: 'Ana Martínez González',
    code: '202015004',
    grade: '3ro de Secundaria',
    progress: 88,
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana',
    email: '202015004@colegio.edu.pe',
    phone: '+51 998 765 432',
    mathLevel: 'avanzado',
    communicationLevel: 'intermedio',
    logicLevel: 'intermedio',
    verbalLevel: 'avanzado',
    spatialLevel: 'intermedio',
    lastActivity: 'Hace 1 hora',
    completedAssignments: 9,
    totalAssignments: 10,
  },
  {
    id: '5',
    name: 'Roberto Díaz Campos',
    code: '202015005',
    grade: '3ro de Secundaria',
    progress: 62,
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Roberto',
    email: '202015005@colegio.edu.pe',
    phone: '+51 965 432 109',
    mathLevel: 'intermedio',
    communicationLevel: 'básico',
    logicLevel: 'intermedio',
    verbalLevel: 'intermedio',
    spatialLevel: 'básico',
    lastActivity: 'Hace 3 horas',
    completedAssignments: 6,
    totalAssignments: 10,
  },
];

export function TeacherStudentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterLevel, setFilterLevel] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'progress' | 'name' | 'activity'>('progress');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'panel'>('grid');

  // Filtrar y ordenar estudiantes
  let filteredStudents = mockStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.code.includes(searchQuery);
    
    if (filterLevel === 'all') return matchesSearch;
    if (filterLevel === 'low') return matchesSearch && student.progress < 50;
    if (filterLevel === 'medium') return matchesSearch && student.progress >= 50 && student.progress < 80;
    if (filterLevel === 'high') return matchesSearch && student.progress >= 80;
    return matchesSearch;
  });

  filteredStudents.sort((a, b) => {
    if (sortBy === 'progress') return b.progress - a.progress;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'activity') return a.lastActivity.localeCompare(b.lastActivity);
    return 0;
  });

  // Estadísticas generales
  const stats = {
    totalStudents: mockStudents.length,
    averageProgress: Math.round(mockStudents.reduce((sum, s) => sum + s.progress, 0) / mockStudents.length),
    highPerformance: mockStudents.filter(s => s.progress >= 80).length,
    needsAttention: mockStudents.filter(s => s.progress < 50).length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold">Gestión de Estudiantes</h1>
              <p className="text-blue-100 mt-2">Monitorea el progreso y desempeño de tus alumnos</p>
            </div>
            <button className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition font-semibold flex items-center gap-2">
              <Download size={20} />
              Exportar Reporte
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white bg-opacity-10 backdrop-blur rounded-lg p-4">
              <p className="text-blue-100 text-sm">Total de Estudiantes</p>
              <p className="text-3xl font-bold mt-1">{stats.totalStudents}</p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur rounded-lg p-4">
              <p className="text-blue-100 text-sm">Progreso Promedio</p>
              <p className="text-3xl font-bold mt-1">{stats.averageProgress}%</p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur rounded-lg p-4">
              <p className="text-blue-100 text-sm">Alto Desempeño</p>
              <p className="text-3xl font-bold mt-1">{stats.highPerformance}</p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur rounded-lg p-4">
              <p className="text-blue-100 text-sm">Requieren Atención</p>
              <p className="text-3xl font-bold mt-1">{stats.needsAttention}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {selectedStudent && viewMode === 'panel' ? (
          <StudentDetailPanel 
            student={selectedStudent}
            onClose={() => {
              setSelectedStudent(null);
              setViewMode('grid');
            }}
            onMessage={() => {
              // TODO: Implementar envío de mensaje
              console.log('Mensaje a:', selectedStudent.name);
            }}
            onEmail={() => {
              // TODO: Implementar envío de email
              console.log('Email a:', selectedStudent.email);
            }}
          />
        ) : (
          <>
            {/* Controls */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Search */}
                <div className="md:col-span-2 relative">
                  <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Buscar por nombre o código..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Filter */}
                <select
                  value={filterLevel}
                  onChange={(e) => setFilterLevel(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">Todos los niveles</option>
                  <option value="high">Alto desempeño (80%+)</option>
                  <option value="medium">Desempeño medio (50-79%)</option>
                  <option value="low">Necesita atención (&lt;50%)</option>
                </select>

                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="progress">Ordenar por: Progreso</option>
                  <option value="name">Ordenar por: Nombre</option>
                  <option value="activity">Ordenar por: Actividad</option>
                </select>
              </div>
            </div>

            {/* Student List */}
            <TeacherStudentList 
              students={filteredStudents}
              onSelectStudent={(student: any) => {
                setSelectedStudent(student);
                setViewMode('panel');
              }}
            />

            {filteredStudents.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No se encontraron estudiantes</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
