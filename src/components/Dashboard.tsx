import React, { useState, useEffect } from 'react';
import { Navigation } from './Navigation';
import { DashboardPage } from '../pages/DashboardPage';
import { AcademicPage } from '../pages/AcademicPage';
import { ScheduleSection } from './sections/ScheduleSection';
import { PaymentsSection } from './sections/PaymentsSection';
import { AnnouncementsSection } from './sections/AnnouncementsSection';
import { EventsSection } from './sections/EventsSection';
import { LibrarySection } from './sections/LibrarySection';
import { CoursesSection } from './sections/CoursesSection';
import { TeachersSection } from './sections/TeachersSection';
import { CommunitySection } from './sections/CommunitySection';

export function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');

  // listen for sidebar navigate
  useEffect(() => {
    const handler = (e: any) => {
      const tab = e.detail as string;
      setActiveTab(tab);
      // scroll top after switching
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('dashboard:navigate', handler);
    return () => window.removeEventListener('dashboard:navigate', handler);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardPage onTabChange={setActiveTab} />;
      case 'academic':
        return <AcademicPage />;
      case 'courses':
        return (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-cyan-600 to-cyan-800 rounded-3xl p-8 text-white shadow-xl">
              <h1 className="text-4xl font-bold mb-2">Mis Cursos</h1>
              <p className="text-cyan-100 text-lg">Lista de cursos matriculados</p>
            </div>
            <CoursesSection />
          </div>
        );
      case 'teachers':
        return (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-3xl p-8 text-white shadow-xl">
              <h1 className="text-4xl font-bold mb-2">Profesores</h1>
              <p className="text-purple-100 text-lg">Información de tus docentes</p>
            </div>
            <TeachersSection />
          </div>
        );
      case 'schedule':
        return (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-3xl p-8 text-white shadow-xl">
              <h1 className="text-4xl font-bold mb-2">Horario de Clases</h1>
              <p className="text-purple-100 text-lg">Programación semanal de tus clases</p>
            </div>
            <ScheduleSection onTabChange={setActiveTab} />
          </div>
        );
      case 'payments':
        return (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-orange-600 to-orange-800 rounded-3xl p-8 text-white shadow-xl">
              <h1 className="text-4xl font-bold mb-2">Estado de Pagos</h1>
              <p className="text-orange-100 text-lg">Gestión de pensiones y trámites</p>
            </div>
            <PaymentsSection />
          </div>
        );
      case 'announcements':
        return (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-3xl p-8 text-white shadow-xl">
              <h1 className="text-4xl font-bold mb-2">Anuncios y Notificaciones</h1>
              <p className="text-red-100 text-lg">Información importante de la universidad</p>
            </div>
            <AnnouncementsSection onTabChange={setActiveTab} />
          </div>
        );
      case 'events':
        return (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-3xl p-8 text-white shadow-xl">
              <h1 className="text-4xl font-bold mb-2">Eventos y Actividades</h1>
              <p className="text-indigo-100 text-lg">Actividades extracurriculares y eventos académicos</p>
            </div>
            <EventsSection onTabChange={setActiveTab} />
          </div>
        );
      case 'library':
        return (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-teal-600 to-teal-800 rounded-3xl p-8 text-white shadow-xl">
              <h1 className="text-4xl font-bold mb-2">Biblioteca Digital</h1>
              <p className="text-teal-100 text-lg">Recursos académicos y materiales de estudio</p>
            </div>
            <LibrarySection />
          </div>
        );
      case 'community':
        return (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-sky-600 to-sky-800 rounded-3xl p-8 text-white shadow-xl">
              <h1 className="text-4xl font-bold mb-2">Comunidad</h1>
              <p className="text-sky-100 text-lg">Conversa con todos y haz amigos</p>
            </div>
            <CommunitySection />
          </div>
        );
      case 'configuracion':
        return (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-gray-600 to-gray-800 rounded-3xl p-8 text-white shadow-xl">
              <h1 className="text-4xl font-bold mb-2">Configuración</h1>
              <p className="text-gray-100 text-lg">Personaliza tu experiencia</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <div className="space-y-6">
                <div className="border-b border-gray-200 pb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Perfil</h3>
                  <p className="text-gray-600 mb-4">Configura tu información personal y preferencias</p>
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100 border-4 border-gray-200">
                        {student?.avatar_url ? (
                          <img src={student.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                            {student?.name?.charAt(0) || 'U'}
                          </div>
                        )}
                      </div>
                      <button 
                        onClick={() => window.location.href = `/profile/${student?.code}`}
                        className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors shadow-lg"
                        title="Cambiar foto de perfil"
                      >
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </button>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{student?.name || 'Usuario'}</h4>
                      <p className="text-sm text-gray-600">{student?.code || 'Código'}</p>
                      <button 
                        onClick={() => window.location.href = `/profile/${student?.code}`}
                        className="mt-2 inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        <span>Editar Perfil Completo</span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="border-b border-gray-200 pb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Notificaciones</h3>
                  <p className="text-gray-600">Gestiona cómo recibes las notificaciones</p>
                  <div className="mt-3 space-y-2">
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded text-blue-600" defaultChecked />
                      <span className="text-gray-700">Notificaciones por email</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded text-blue-600" defaultChecked />
                      <span className="text-gray-700">Notificaciones push</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded text-blue-600" />
                      <span className="text-gray-700">Notificaciones de eventos</span>
                    </label>
                  </div>
                </div>
                <div className="border-b border-gray-200 pb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Privacidad</h3>
                  <p className="text-gray-600">Controla tu privacidad en la plataforma</p>
                  <div className="mt-3 space-y-2">
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded text-blue-600" defaultChecked />
                      <span className="text-gray-700">Perfil público</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded text-blue-600" />
                      <span className="text-gray-700">Mostrar email</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded text-blue-600" defaultChecked />
                      <span className="text-gray-700">Permitir solicitudes de amistad</span>
                    </label>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Sistema</h3>
                  <p className="text-gray-600">Configuraciones del sistema y rendimiento</p>
                  <div className="mt-3 space-y-2">
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded text-blue-600" defaultChecked />
                      <span className="text-gray-700">Modo oscuro automático</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded text-blue-600" defaultChecked />
                      <span className="text-gray-700">Guardar preferencias</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'quick-actions':
        return (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-pink-600 to-pink-800 rounded-3xl p-8 text-white shadow-xl">
              <h1 className="text-4xl font-bold mb-2">Acciones Rápidas</h1>
              <p className="text-pink-100 text-lg">Trámites y servicios estudiantiles</p>
            </div>
            {/* QuickActions component removed as its functionality is now in DashboardPage */}
          </div>
        );
      default:
        return <DashboardPage onTabChange={setActiveTab} />;
    }
  };

  return (
    <main className="w-full">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      {renderContent()}
    </main>
  );
}