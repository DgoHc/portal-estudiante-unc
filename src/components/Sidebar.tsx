import React from 'react';
import { GraduationCap, Calendar, Book, Bell, CreditCard, LogOut, Home, FileText, Users, Settings, TrendingUp } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Sidebar() {
  const { student, logout } = useAuth();

  const menuItems = [
    { icon: Home, label: 'Dashboard', href: '#dashboard', color: 'from-blue-500 to-blue-600' },
    { icon: Calendar, label: 'Horario', href: '#horario', color: 'from-green-500 to-green-600' },
    { icon: Book, label: 'Notas', href: '#notas', color: 'from-purple-500 to-purple-600' },
    { icon: FileText, label: 'Anuncios', href: '#anuncios', color: 'from-orange-500 to-orange-600' },
    { icon: CreditCard, label: 'Pagos', href: '#pagos', color: 'from-red-500 to-red-600' },
    { icon: Users, label: 'Profesores', href: '#profesores', color: 'from-indigo-500 to-indigo-600' },
    { icon: Settings, label: 'Configuración', href: '#configuracion', color: 'from-gray-500 to-gray-600' },
  ];

  return (
    <aside className="hidden md:block w-64 h-screen bg-white border-r border-gray-100 p-6 space-y-8 fixed top-0 left-0 pt-28 z-20 overflow-y-auto shadow-lg">
      {/* User Profile Card */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center shadow-lg">
            <GraduationCap className="w-10 h-10 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-lg">{student?.name}</h3>
            <p className="text-sm text-gray-600 font-medium">{student?.code}</p>
            <p className="text-xs text-gray-500 mt-1">{student?.career}</p>
          </div>
          <div className="w-full bg-white rounded-lg p-3 shadow-sm">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-600">Semestre</span>
              <span className="text-sm font-bold text-blue-600">{student?.semester}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="space-y-2">
        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-2">
          Navegación
        </h4>
        {menuItems.map((item, index) => (
          <a
            key={index}
            href={item.href}
            className="group flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 hover:text-blue-700 transition-all duration-200 hover:shadow-sm"
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
        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-2">
          Resumen
        </h4>
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-700">Promedio</p>
              <p className="text-2xl font-bold text-green-600">16.8</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-700">Créditos</p>
              <p className="text-2xl font-bold text-blue-600">18</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Book className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <div className="pt-4 border-t border-gray-100">
        <button
          onClick={logout}
          className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all duration-200 group"
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