import React from 'react';
import { GraduationCap, Calendar, Book, Bell, CreditCard, LogOut, Home, FileText, Users, Settings, TrendingUp, MessageCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Sidebar() {
  const { student, logout } = useAuth();

  const menuItems = [
    { icon: Home, label: 'Dashboard', href: '#dashboard', color: 'from-blue-500 to-blue-600' },
    { icon: Calendar, label: 'Horario', href: '#schedule', color: 'from-green-500 to-green-600' },
    { icon: Book, label: 'Cursos', href: '#courses', color: 'from-purple-500 to-purple-600' },
    { icon: FileText, label: 'Anuncios', href: '#announcements', color: 'from-orange-500 to-orange-600' },
    { icon: CreditCard, label: 'Pagos', href: '#payments', color: 'from-red-500 to-red-600' },
    { icon: Users, label: 'Profesores', href: '#teachers', color: 'from-indigo-500 to-indigo-600' },
    { icon: MessageCircle, label: 'Comunidad', href: '#community', color: 'from-sky-500 to-sky-600' },
    { icon: Settings, label: 'Configuración', href: '#configuracion', color: 'from-gray-500 to-gray-600' },
  ];

  const handleClick = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const id = href.replace('#', '');
    
    // Si es dashboard, ir al inicio
    if (id === 'dashboard') {
      window.dispatchEvent(new CustomEvent('dashboard:navigate', { detail: 'dashboard' }));
      return;
    }
    
    // Para otras secciones, cambiar la pestaña activa
    window.dispatchEvent(new CustomEvent('dashboard:navigate', { detail: id }));
  };

  return (
    <aside className="hidden md:block w-64 h-screen bg-gray-900 text-gray-100 border-r border-gray-800 p-6 space-y-8 fixed top-0 left-0 pt-28 z-20 overflow-y-auto shadow-xl scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
      {/* User Profile Card */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl p-6 border border-gray-700">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center shadow-lg">
            <GraduationCap className="w-10 h-10 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-gray-100 text-lg">{student?.name}</h3>
            <p className="text-sm text-gray-300 font-medium">{student?.code}</p>
            <p className="text-xs text-gray-400 mt-1">{student?.career}</p>
          </div>
          <div className="w-full bg-gray-800 rounded-lg p-3 shadow-sm border border-gray-700">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-300">Semestre</span>
              <span className="text-sm font-bold text-blue-400">{student?.semester}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="space-y-2">
        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-2">
          Navegación
        </h4>
        {menuItems.map((item, index) => (
          <a
            key={index}
            href={item.href}
            onClick={handleClick(item.href)}
            className="group flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-200 hover:bg-gradient-to-r hover:from-gray-800 hover:to-gray-700 hover:text-white transition-all duration-200 hover:shadow-sm"
          >
            <div className={`w-10 h-10 bg-gradient-to-br ${item.color} rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-200`}>
              <item.icon className="w-5 h-5 text-white" />
            </div>
            <span className="font-medium group-hover:font-semibold transition-all duration-200">{item.label}</span>
          </a>
        ))}
      </nav>

      {/* Quick Stats */}
      <div className="space-y-3">
        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-2">
          Resumen
        </h4>
        <div className="bg-gradient-to-br from-green-900 to-emerald-900 rounded-xl p-4 border border-green-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-200">Promedio</p>
              <p className="text-2xl font-bold text-green-300">16.8</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-700 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-blue-900 to-indigo-900 rounded-xl p-4 border border-blue-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-200">Créditos</p>
              <p className="text-2xl font-bold text-blue-300">18</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <Book className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <div className="pt-4 border-t border-gray-800">
        <button
          onClick={logout}
          className="w-full flex items-center space-x-3 px-4 py-3 text-red-300 hover:text-red-200 hover:bg-red-900/20 rounded-xl transition-all duration-200 group"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-200">
            <LogOut className="w-5 h-5 text-white" />
          </div>
          <span className="font-medium">Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );
}