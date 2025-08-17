import React, { useState } from 'react';
import { Navigation } from './Navigation';
import { DashboardPage } from '../pages/DashboardPage';
import { AcademicPage } from '../pages/AcademicPage';
import { ScheduleSection } from './sections/ScheduleSection';
import { PaymentsSection } from './sections/PaymentsSection';
import { AnnouncementsSection } from './sections/AnnouncementsSection';
import { EventsSection } from './sections/EventsSection';
import { LibrarySection } from './sections/LibrarySection';
import { QuickActions } from './sections/QuickActions';

export function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardPage />;
      case 'academic':
        return <AcademicPage />;
      case 'schedule':
        return (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-3xl p-8 text-white shadow-xl">
              <h1 className="text-4xl font-bold mb-2">Horario de Clases</h1>
              <p className="text-purple-100 text-lg">Programación semanal de tus clases</p>
            </div>
            <ScheduleSection />
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
            <AnnouncementsSection />
          </div>
        );
      case 'events':
        return (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-3xl p-8 text-white shadow-xl">
              <h1 className="text-4xl font-bold mb-2">Eventos y Actividades</h1>
              <p className="text-indigo-100 text-lg">Actividades extracurriculares y eventos académicos</p>
            </div>
            <EventsSection />
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
      case 'quick-actions':
        return (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-pink-600 to-pink-800 rounded-3xl p-8 text-white shadow-xl">
              <h1 className="text-4xl font-bold mb-2">Acciones Rápidas</h1>
              <p className="text-pink-100 text-lg">Trámites y servicios estudiantiles</p>
            </div>
            <QuickActions />
          </div>
        );
      default:
        return <DashboardPage />;
    }
  };

  return (
    <main className="w-full">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      {renderContent()}
    </main>
  );
}