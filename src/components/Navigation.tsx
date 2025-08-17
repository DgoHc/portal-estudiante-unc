import React from 'react';
import { Home, BookOpen, Calendar, CreditCard, Bell, Users, Award, Library, Settings } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  const tabs = [
    {
      id: 'dashboard',
      name: 'Dashboard',
      icon: Home,
      color: 'from-blue-500 to-blue-600',
      description: 'Resumen general'
    },
    {
      id: 'academic',
      name: 'Académico',
      icon: BookOpen,
      color: 'from-green-500 to-green-600',
      description: 'Notas y progreso'
    },
    {
      id: 'schedule',
      name: 'Horario',
      icon: Calendar,
      color: 'from-purple-500 to-purple-600',
      description: 'Clases y eventos'
    },
    {
      id: 'payments',
      name: 'Pagos',
      icon: CreditCard,
      color: 'from-orange-500 to-orange-600',
      description: 'Estado de pensiones'
    },
    {
      id: 'announcements',
      name: 'Anuncios',
      icon: Bell,
      color: 'from-red-500 to-red-600',
      description: 'Notificaciones'
    },
    {
      id: 'events',
      name: 'Eventos',
      icon: Users,
      color: 'from-indigo-500 to-indigo-600',
      description: 'Actividades'
    },
    {
      id: 'library',
      name: 'Biblioteca',
      icon: Library,
      color: 'from-teal-500 to-teal-600',
      description: 'Recursos'
    },
    {
      id: 'quick-actions',
      name: 'Acciones',
      icon: Award,
      color: 'from-pink-500 to-pink-600',
      description: 'Trámites rápidos'
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 mb-8">
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? `bg-gradient-to-r ${tab.color} text-white shadow-lg transform scale-105`
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100 hover:shadow-md'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{tab.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
