import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TeacherNavBar } from '@/components/teacher/TeacherNavBar';
import { TeacherDashboard } from '@/components/teacher/TeacherDashboard';
import { TeacherStudentsPage } from '@/pages/TeacherStudentsPage';

export default function TeacherPage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showReportModal, setShowReportModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [courseDetail, setCourseDetail] = useState<number | null>(null);
  const [emailTo, setEmailTo] = useState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('auth');
    navigate('/');
  };

  const handleGenerateReport = () => {
    setShowReportModal(true);
  };

  const handleDownloadPDF = () => {
    // Simular descarga de PDF
    const reportContent = `
REPORTE DE DESEMPEÑO - 1ro de Secundaria
==========================================
Fecha: ${new Date().toLocaleDateString('es-PE')}

ESTADÍSTICAS GENERALES:
- Cursos Activos: 3
- Estudiantes Totales: 76
- Progreso Promedio: 65%
- Evaluaciones Pendientes: 12

DETALLE POR CURSO:
1. Matemática A: 65% completado (25 estudiantes)
2. Matemática B: 58% completado (23 estudiantes)
3. Comunicación: 72% completado (28 estudiantes)

RECOMENDACIONES:
- Intensificar clases de Matemática B
- Mantener el buen ritmo en Comunicación
- Evaluar progreso individual de estudiantes

Reportado por: Profesor del Colegio Angelitos de Dios
    `;
    
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(reportContent));
    element.setAttribute('download', `reporte_${new Date().getTime()}.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    alert('✓ Reporte descargado correctamente');
  };

  const handleSendEmail = () => {
    if (emailTo.trim()) {
      alert(`✓ Reporte enviado a: ${emailTo}`);
      setEmailTo('');
      setShowEmailModal(false);
    } else {
      alert('Por favor ingresa un email');
    }
  };

  const handleRefresh = () => {
    alert('✓ Datos actualizados correctamente');
  };

  const handleViewCourseDetail = (courseId: number) => {
    setCourseDetail(courseId);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <TeacherDashboard />;
      case 'students':
        return <TeacherStudentsPage />;
      case 'courses':
        return (
          <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Mis Cursos - 1ro de Secundaria</h1>
              <p className="text-gray-600 text-lg">Gestiona y supervisa tus cursos asignados</p>
            </div>
            
            {courseDetail ? (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <button 
                  onClick={() => setCourseDetail(null)}
                  className="mb-6 text-blue-600 hover:text-blue-700 font-semibold"
                >
                  ← Volver a Cursos
                </button>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  {courseDetail === 1 && '1ro de Secundaria - Matemática A'}
                  {courseDetail === 2 && '1ro de Secundaria - Matemática B'}
                  {courseDetail === 3 && '1ro de Secundaria - Comunicación'}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Información del Curso</h3>
                    <div className="space-y-3">
                      <p><span className="font-semibold text-gray-700">Estudiantes:</span> <span className="text-blue-600 font-bold">{courseDetail === 1 ? 25 : courseDetail === 2 ? 23 : 28}</span></p>
                      <p><span className="font-semibold text-gray-700">Progreso:</span> <span className="text-green-600 font-bold">{courseDetail === 1 ? 65 : courseDetail === 2 ? 58 : 72}%</span></p>
                      <p><span className="font-semibold text-gray-700">Estado:</span> <span className="text-orange-600 font-bold">Activo</span></p>
                      <p><span className="font-semibold text-gray-700">Horario:</span> <span className="text-gray-700">Lunes a Viernes, 8:00 AM</span></p>
                    </div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Acciones Rápidas</h3>
                    <div className="space-y-2">
                      <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                        📋 Ver Estudiantes
                      </button>
                      <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors font-semibold">
                        📊 Calificaciones
                      </button>
                      <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors font-semibold">
                        📝 Asignaciones
                      </button>
                      <button className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors font-semibold">
                        📅 Calendario
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { id: 1, name: '1ro de Secundaria - Matemática A', students: 25, progress: 65 },
                  { id: 2, name: '1ro de Secundaria - Matemática B', students: 23, progress: 58 },
                  { id: 3, name: '1ro de Secundaria - Comunicación', students: 28, progress: 72 }
                ].map(course => (
                  <div key={course.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{course.name}</h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-gray-600 mb-2">Estudiantes: <span className="font-bold text-blue-600">{course.students}</span></p>
                        <p className="text-gray-600 mb-2">Progreso Promedio: <span className="font-bold text-green-600">{course.progress}%</span></p>
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-green-600 rounded-full" style={{width: `${course.progress}%`}}></div>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleViewCourseDetail(course.id)}
                        className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                      >
                        Ver Detalles
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      case 'reports':
        return (
          <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Reportes - 1ro de Secundaria</h1>
              <p className="text-gray-600 text-lg">Análisis y estadísticas de tu desempeño</p>
            </div>
            
            {showReportModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Reporte de Desempeño</h3>
                  <div className="bg-gray-50 rounded-lg p-6 mb-6 max-h-96 overflow-y-auto">
                    <div className="text-sm font-mono whitespace-pre-wrap text-gray-700">
{`REPORTE DE DESEMPEÑO - 1ro de Secundaria
==========================================
Fecha: ${new Date().toLocaleDateString('es-PE')}

ESTADÍSTICAS GENERALES:
- Cursos Activos: 3
- Estudiantes Totales: 76
- Progreso Promedio: 65%
- Evaluaciones Pendientes: 12

DETALLE POR CURSO:
1. Matemática A: 65% completado (25 estudiantes)
2. Matemática B: 58% completado (23 estudiantes)
3. Comunicación: 72% completado (28 estudiantes)

RECOMENDACIONES:
- Intensificar clases de Matemática B
- Mantener el buen ritmo en Comunicación
- Evaluar progreso individual de estudiantes

Reportado por: Profesor del Colegio Angelitos de Dios`}
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowReportModal(false)}
                      className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors font-semibold"
                    >
                      Cerrar
                    </button>
                    <button
                      onClick={handleDownloadPDF}
                      className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                    >
                      Descargar
                    </button>
                  </div>
                </div>
              </div>
            )}

            {showEmailModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Enviar Reporte por Email</h3>
                  <input
                    type="email"
                    placeholder="ejemplo@correo.com"
                    value={emailTo}
                    onChange={(e) => setEmailTo(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowEmailModal(false)}
                      className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors font-semibold"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={handleSendEmail}
                      className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                    >
                      Enviar
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Desempeño General</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b">
                    <span className="text-gray-600">Cursos Activos</span>
                    <span className="text-2xl font-bold text-blue-600">3</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b">
                    <span className="text-gray-600">Estudiantes Totales</span>
                    <span className="text-2xl font-bold text-green-600">76</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b">
                    <span className="text-gray-600">Progreso Promedio</span>
                    <span className="text-2xl font-bold text-purple-600">65%</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-600">Evaluaciones Pendientes</span>
                    <span className="text-2xl font-bold text-orange-600">12</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Estadísticas por Curso</h3>
                <div className="space-y-4">
                  {[
                    { course: 'Matemática A', completion: 65 },
                    { course: 'Matemática B', completion: 58 },
                    { course: 'Comunicación', completion: 72 }
                  ].map((item, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-700 font-semibold">{item.course}</span>
                        <span className="text-gray-600">{item.completion}%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 rounded-full" style={{width: `${item.completion}%`}}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 md:col-span-2">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Acciones</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <button 
                    onClick={handleGenerateReport}
                    className="bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                  >
                    📊 Generar Reporte
                  </button>
                  <button 
                    onClick={handleDownloadPDF}
                    className="bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-semibold"
                  >
                    📥 Descargar PDF
                  </button>
                  <button 
                    onClick={() => setShowEmailModal(true)}
                    className="bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors font-semibold"
                  >
                    📧 Enviar por Email
                  </button>
                  <button 
                    onClick={handleRefresh}
                    className="bg-orange-600 text-white py-3 px-4 rounded-lg hover:bg-orange-700 transition-colors font-semibold"
                  >
                    🔄 Actualizar
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return <TeacherDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <TeacherNavBar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onLogout={handleLogout}
      />
      <div className="py-6">
        {renderContent()}
      </div>
    </div>
  );
}
