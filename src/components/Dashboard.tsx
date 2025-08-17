import React from 'react';
import { AcademicSection } from './sections/AcademicSection';
import { AnnouncementsSection } from './sections/AnnouncementsSection';
import { QuickActions } from './sections/QuickActions';
import { ScheduleSection } from './sections/ScheduleSection';
import { PaymentsSection } from './sections/PaymentsSection';
import { EventsSection } from './sections/EventsSection';
import { LibrarySection } from './sections/LibrarySection';
import { TrendingUp, Calendar, BookOpen, Bell, CreditCard, Users, Award } from 'lucide-react';

export function Dashboard() {
  const stats = [
    {
      title: 'Promedio General',
      value: '16.8',
      change: '+0.3',
      icon: TrendingUp,
      color: 'from-green-500 to-green-600',
      bgColor: 'from-green-50 to-emerald-50'
    },
    {
      title: 'Créditos Aprobados',
      value: '18',
      change: '+3',
      icon: BookOpen,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'from-blue-50 to-indigo-50'
    },
    {
      title: 'Próximas Clases',
      value: '3',
      change: 'Hoy',
      icon: Calendar,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'from-purple-50 to-violet-50'
    },
    {
      title: 'Anuncios Nuevos',
      value: '5',
      change: '+2',
      icon: Bell,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'from-orange-50 to-amber-50'
    }
  ];

  return (
    <main className="w-full">
      {/* Welcome Section */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl p-8 text-white shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">¡Bienvenido de vuelta!</h1>
              <p className="text-blue-100 text-lg">Aquí tienes un resumen completo de tu actividad académica</p>
            </div>
            <div className="hidden md:block">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                <BookOpen className="w-10 h-10" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className={`bg-gradient-to-br ${stat.bgColor} rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200`}>
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-sm`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
                {stat.change}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 space-y-8">
          <AcademicSection />
          <ScheduleSection />
          <PaymentsSection />
          <EventsSection />
          <LibrarySection />
        </div>
        <div className="lg:col-span-1 space-y-8">
          <QuickActions />
          <AnnouncementsSection />
        </div>
      </div>
    </main>
  );
}