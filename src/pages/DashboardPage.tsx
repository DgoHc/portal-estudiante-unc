import React from 'react';
import { TrendingUp, Calendar, BookOpen, Bell, Users, Award, Clock, CheckCircle, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface DashboardPageProps {
  onTabChange: (tab: string) => void;
}

export function DashboardPage({ onTabChange }: DashboardPageProps) {
  const navigate = useNavigate();

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

  const quickActions = [
    {
      title: 'Ver Horario',
      description: 'Consulta tu horario de clases',
      icon: Calendar,
      color: 'from-blue-500 to-blue-600',
      action: () => onTabChange('schedule')
    },
    {
      title: 'Estado de Pagos',
      description: 'Revisa tus pensiones',
      icon: CreditCard,
      color: 'from-green-500 to-green-600',
      action: () => onTabChange('payments')
    },
    {
      title: 'Descargar Certificado',
      description: 'Obtén tu certificado de estudios',
      icon: Award,
      color: 'from-purple-500 to-purple-600',
      action: () => {
        console.log('Descargar certificado');
        // Aquí iría la lógica para descargar el certificado
      }
    },
    {
      title: 'Contactar Asesor',
      description: 'Habla con tu asesor académico',
      icon: Users,
      color: 'from-orange-500 to-orange-600',
      action: () => {
        console.log('Contactar asesor');
        // Aquí iría la lógica para abrir un chat o formulario de contacto
      }
    }
  ];

  const recentActivity = [
    {
      type: 'class',
      title: 'Clase de Programación Web',
      time: 'Hace 2 horas',
      status: 'Completada',
      icon: CheckCircle,
      color: 'text-green-600'
    },
    {
      type: 'payment',
      title: 'Pago de pensión realizado',
      time: 'Hace 1 día',
      status: 'Confirmado',
      icon: CreditCard,
      color: 'text-blue-600'
    },
    {
      type: 'announcement',
      title: 'Nuevo anuncio: Cambio de horario',
      time: 'Hace 2 días',
      status: 'Importante',
      icon: Bell,
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section with Image */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
        
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">¡Bienvenido de vuelta!</h1>
            <p className="text-blue-100 text-xl mb-6">Aquí tienes un resumen completo de tu actividad académica</p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full">
                <Clock className="w-5 h-5" />
                <span>Última sesión: Hace 2 horas</span>
              </div>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center">
              <BookOpen className="w-16 h-16" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className={`bg-gradient-to-br ${stat.bgColor} rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200`}>
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-sm`}>
                  <Icon className="w-6 h-6 text-white" />
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
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Acciones Rápidas</h2>
          <p className="text-gray-600">Accede a las funciones más utilizadas</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <button
                  key={index}
                  onClick={action.action}
                  className="group p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl hover:shadow-lg transition-all duration-200 border border-gray-200 hover:border-gray-300"
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${action.color} rounded-xl flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition-transform duration-200`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">{action.title}</h3>
                  <p className="text-gray-600 text-sm">{action.description}</p>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Actividad Reciente</h2>
          <p className="text-gray-600">Últimas actividades en tu cuenta</p>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentActivity.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                  <div className={`w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm`}>
                    <Icon className={`w-5 h-5 ${activity.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{activity.title}</h3>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                  <span className="text-sm font-medium text-gray-600 bg-white px-3 py-1 rounded-full border">
                    {activity.status}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
