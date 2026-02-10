import { TrendingUp, BookOpen } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  code: string;
  grade: string;
  progress: number;
  photo?: string;
  email: string;
  lastActivity: string;
  completedAssignments: number;
  totalAssignments: number;
}

interface TeacherStudentListProps {
  students: Student[];
  onSelectStudent: (student: Student) => void;
}

const getProgressColor = (progress: number) => {
  if (progress >= 80) return 'text-green-600';
  if (progress >= 50) return 'text-yellow-600';
  return 'text-red-600';
};

const getProgressBgColor = (progress: number) => {
  if (progress >= 80) return 'bg-green-100';
  if (progress >= 50) return 'bg-yellow-100';
  return 'bg-red-100';
};

const getProgressBarColor = (progress: number) => {
  if (progress >= 80) return 'bg-gradient-to-r from-green-400 to-green-600';
  if (progress >= 50) return 'bg-gradient-to-r from-yellow-400 to-yellow-600';
  return 'bg-gradient-to-r from-red-400 to-red-600';
};

const getLevelColor = (level: string) => {
  switch (level) {
    case 'avanzado':
      return 'bg-green-100 text-green-800';
    case 'intermedio':
      return 'bg-yellow-100 text-yellow-800';
    case 'básico':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export function TeacherStudentList({ students, onSelectStudent }: TeacherStudentListProps) {
  return (
    <div className="space-y-4">
      {students.map((student) => (
        <div
          key={student.id}
          onClick={() => onSelectStudent(student)}
          className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-6 border border-gray-200 hover:border-blue-300 cursor-pointer group"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* Foto y Nombre */}
            <div className="md:col-span-3 flex items-center gap-4">
              <div className="relative">
                <img
                  src={student.photo || `https://api.dicebear.com/7.x/avataaars/svg?seed=${student.name}`}
                  alt={student.name}
                  className="w-16 h-16 rounded-full object-cover border-4 border-blue-100 group-hover:border-blue-400 transition"
                />
                <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full ${getProgressBgColor(student.progress)} flex items-center justify-center`}>
                  <TrendingUp size={14} className={getProgressColor(student.progress)} />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">{student.name}</h3>
                <p className="text-gray-500 text-sm">{student.code}</p>
                <p className="text-gray-400 text-xs mt-1">{student.grade}</p>
              </div>
            </div>

            {/* Barra de Progreso */}
            <div className="md:col-span-3">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Progreso General</span>
                <span className={`text-lg font-bold ${getProgressColor(student.progress)}`}>
                  {student.progress}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className={`h-full ${getProgressBarColor(student.progress)} transition-all duration-500 rounded-full`}
                  style={{ width: `${student.progress}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {student.completedAssignments}/{student.totalAssignments} actividades completadas
              </p>
            </div>

            {/* Información Académica */}
            <div className="md:col-span-3">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <BookOpen size={16} className="text-blue-600" />
                  <span className="text-sm text-gray-700">
                    <strong>Última actividad:</strong>
                  </span>
                </div>
                <p className="text-sm text-gray-600 ml-6">{student.lastActivity}</p>
              </div>
            </div>

            {/* Botón de Acción */}
            <div className="md:col-span-3 flex flex-col gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectStudent(student);
                }}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 text-sm"
              >
                Ver Detalles
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  // TODO: Implementar envío de mensaje
                }}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg transition duration-200 text-sm"
              >
                Enviar Mensaje
              </button>
            </div>
          </div>

          {/* Niveles de Competencia (expandible) */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-xs font-semibold text-gray-600 mb-2 uppercase">Niveles de Competencia:</p>
            <div className="flex flex-wrap gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getLevelColor('intermedio')}`}>
                Matemática: Intermedio
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getLevelColor('básico')}`}>
                Comunicación: Básico
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getLevelColor('intermedio')}`}>
                Lógica: Intermedio
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getLevelColor('avanzado')}`}>
                Espacial: Avanzado
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
