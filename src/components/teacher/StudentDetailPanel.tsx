import { useState } from 'react';
import { ArrowLeft, Mail, MessageSquare, Calendar, TrendingUp, Award, BookOpen, Download, AlertCircle } from 'lucide-react';

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

interface StudentDetailPanelProps {
  student: Student;
  onClose: () => void;
  onMessage: () => void;
  onEmail: () => void;
}

const getLevelColor = (level: string) => {
  switch (level) {
    case 'avanzado':
      return { bg: 'bg-green-100', text: 'text-green-800', badge: 'bg-green-200' };
    case 'intermedio':
      return { bg: 'bg-yellow-100', text: 'text-yellow-800', badge: 'bg-yellow-200' };
    case 'básico':
      return { bg: 'bg-red-100', text: 'text-red-800', badge: 'bg-red-200' };
    default:
      return { bg: 'bg-gray-100', text: 'text-gray-800', badge: 'bg-gray-200' };
  }
};

const getLevelLabel = (level: string) => {
  return level.charAt(0).toUpperCase() + level.slice(1);
};

export function StudentDetailPanel({ student, onClose, onMessage, onEmail }: StudentDetailPanelProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'competencies' | 'activities' | 'recommendations'>('overview');

  const competencies = [
    { name: 'Matemática', level: student.mathLevel, icon: '📐' },
    { name: 'Comunicación', level: student.communicationLevel, icon: '💬' },
    { name: 'Lógica', level: student.logicLevel, icon: '🧠' },
    { name: 'Verbal', level: student.verbalLevel, icon: '📝' },
    { name: 'Espacial', level: student.spatialLevel, icon: '🎨' },
  ];

  // Mock recommendations
  const recommendations = [
    { type: 'alert', message: 'Necesita refuerzo en Comunicación. Considere sesiones adicionales.' },
    { type: 'success', message: 'Excelente progreso en Matemática este mes. Mantenga el ritmo.' },
    { type: 'info', message: 'Falta completar 2 actividades de la semana.' },
  ];

  return (
    <div className="space-y-6">
      {/* Header con botón de retroceso */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={onClose}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition text-gray-800 font-semibold"
        >
          <ArrowLeft size={20} />
          Volver al Listado
        </button>
      </div>

      {/* Panel Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Columna Izquierda - Perfil */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden sticky top-20">
            {/* Fondo decorativo */}
            <div className="h-20 bg-gradient-to-r from-blue-600 to-blue-700" />

            {/* Contenido de Perfil */}
            <div className="px-6 pb-6 -mt-10 relative">
              {/* Foto */}
              <div className="flex justify-center mb-4">
                <img
                  src={student.photo || `https://api.dicebear.com/7.x/avataaars/svg?seed=${student.name}`}
                  alt={student.name}
                  className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
                />
              </div>

              {/* Información básica */}
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">{student.name}</h2>
                <p className="text-gray-600 text-sm">{student.code}</p>
                <p className="text-gray-500 text-xs mt-1">{student.grade}</p>
              </div>

              {/* Contacto */}
              <div className="space-y-3 mb-6 pt-6 border-t border-gray-200">
                <a
                  href={`mailto:${student.email}`}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition group"
                >
                  <Mail size={18} className="text-blue-600" />
                  <span className="text-sm text-gray-700 group-hover:text-blue-600 transition">Email</span>
                </a>
                <a
                  href={`tel:${student.phone}`}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition group"
                >
                  <MessageSquare size={18} className="text-green-600" />
                  <span className="text-sm text-gray-700 group-hover:text-green-600 transition">Teléfono</span>
                </a>
              </div>

              {/* Botones de Acción */}
              <div className="space-y-2">
                <button
                  onClick={onEmail}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition flex items-center justify-center gap-2"
                >
                  <Mail size={18} />
                  Enviar Email
                </button>
                <button
                  onClick={onMessage}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition flex items-center justify-center gap-2"
                >
                  <MessageSquare size={18} />
                  Enviar Mensaje
                </button>
              </div>

              {/* Estado */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-xs text-gray-500 mb-2 uppercase font-semibold">Estado</p>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm text-gray-700">Activo - {student.lastActivity}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Columna Derecha - Detalles */}
        <div className="lg:col-span-2">
          {/* Tabs de navegación */}
          <div className="flex gap-2 mb-6 bg-white rounded-xl shadow-sm border border-gray-200 p-2">
            {[
              { id: 'overview' as const, label: 'Resumen', icon: '📊' },
              { id: 'competencies' as const, label: 'Competencias', icon: '🎯' },
              { id: 'activities' as const, label: 'Actividades', icon: '📋' },
              { id: 'recommendations' as const, label: 'Recomendaciones', icon: '💡' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-4 py-3 rounded-lg font-semibold transition ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                <div className="text-xs mt-1">{tab.label}</div>
              </button>
            ))}
          </div>

          {/* Contenido de Tabs */}
          <div className="space-y-4">
            {/* Tab: Overview */}
            {activeTab === 'overview' && (
              <div className="space-y-4">
                {/* Progreso General */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900">Progreso General</h3>
                    <TrendingUp className="text-blue-600" size={24} />
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">Progreso Académico</span>
                        <span className="text-2xl font-bold text-blue-600">{student.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-500"
                          style={{ width: `${student.progress}%` }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-200">
                      <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
                        <p className="text-xs text-gray-600 mb-1">Actividades Completadas</p>
                        <p className="text-2xl font-bold text-green-600">
                          {student.completedAssignments}/{student.totalAssignments}
                        </p>
                        <p className="text-xs text-gray-600 mt-2">
                          {Math.round((student.completedAssignments / student.totalAssignments) * 100)}% completado
                        </p>
                      </div>
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
                        <p className="text-xs text-gray-600 mb-1">Última Actividad</p>
                        <p className="font-bold text-blue-600">{student.lastActivity}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab: Competencies */}
            {activeTab === 'competencies' && (
              <div className="space-y-4">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-6">Evaluación de Competencias</h3>
                  <div className="space-y-4">
                    {competencies.map(comp => {
                      const colors = getLevelColor(comp.level);
                      return (
                        <div key={comp.name} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700">
                              <span className="text-xl mr-2">{comp.icon}</span>
                              {comp.name}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${colors.bg} ${colors.text}`}>
                              {getLevelLabel(comp.level)}
                            </span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${
                                comp.level === 'avanzado' 
                                  ? 'bg-green-600' 
                                  : comp.level === 'intermedio' 
                                  ? 'bg-yellow-600' 
                                  : 'bg-red-600'
                              }`}
                              style={{
                                width: comp.level === 'avanzado' ? '100%' : comp.level === 'intermedio' ? '60%' : '30%'
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Tab: Activities */}
            {activeTab === 'activities' && (
              <div className="space-y-4">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Actividades Recientes</h3>
                  <div className="space-y-3">
                    {[
                      { name: 'Quiz de Matemática', status: 'completed', score: 85 },
                      { name: 'Ensayo de Comunicación', status: 'completed', score: 72 },
                      { name: 'Proyecto de Investigación', status: 'in-progress', score: null },
                      { name: 'Ejercicios de Lógica', status: 'pending', score: null },
                    ].map((activity, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-blue-300 transition">
                        <div className="flex items-center gap-3">
                          <BookOpen size={20} className="text-blue-600" />
                          <div>
                            <p className="font-medium text-gray-900">{activity.name}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {activity.status === 'completed' 
                                ? 'Completado'
                                : activity.status === 'in-progress'
                                ? 'En progreso'
                                : 'Pendiente'}
                            </p>
                          </div>
                        </div>
                        {activity.score && (
                          <span className="px-3 py-1 rounded-full bg-green-100 text-green-800 font-bold text-sm">
                            {activity.score}%
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab: Recommendations */}
            {activeTab === 'recommendations' && (
              <div className="space-y-4">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Recomendaciones Personalizadas</h3>
                  <div className="space-y-3">
                    {recommendations.map((rec, idx) => (
                      <div
                        key={idx}
                        className={`p-4 rounded-lg border-l-4 ${
                          rec.type === 'alert'
                            ? 'bg-red-50 border-red-400'
                            : rec.type === 'success'
                            ? 'bg-green-50 border-green-400'
                            : 'bg-blue-50 border-blue-400'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          {rec.type === 'alert' ? (
                            <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
                          ) : rec.type === 'success' ? (
                            <Award className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                          ) : (
                            <Calendar className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
                          )}
                          <p className={`text-sm ${
                            rec.type === 'alert'
                              ? 'text-red-800'
                              : rec.type === 'success'
                              ? 'text-green-800'
                              : 'text-blue-800'
                          }`}>
                            {rec.message}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Botón de Descarga de Reporte */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-gray-900">Generar Reporte Completo</h4>
                <p className="text-sm text-gray-600 mt-1">Descargar análisis detallado en PDF</p>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition">
                <Download size={20} />
                Descargar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
