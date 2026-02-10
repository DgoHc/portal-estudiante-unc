import { useState } from 'react';
import { GraduationCap, User, LogOut, Menu, X, Bell, Search } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function Header() {
  const { student, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);
  const toggleNotifications = () => setIsNotificationsOpen(!isNotificationsOpen);

  return (
    <header className="bg-gray-900 text-gray-100 shadow-lg border-b border-gray-800 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shadow-lg">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
            <div className="hidden md:block">
              <h1 className="text-xl font-bold text-white">ZahKiel</h1>
              <p className="text-sm text-gray-300 font-medium">Plataforma de Inteligencia Artificial</p>
            </div>
          </div>
          
          {/* User Section (always visible when authenticated) */}
          {student && (
            <div className="flex items-center space-x-4">
              {/* Search Icon */}
              <button 
                onClick={toggleSearch}
                className="p-2 text-gray-300 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
              >
                <Search className="w-5 h-5" />
              </button>
              
              {/* Notifications */}
              <button 
                onClick={toggleNotifications}
                className="relative p-2 text-gray-300 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* User Profile (Desktop) */}
              <div className="hidden md:flex items-center space-x-3 bg-gray-800 border border-gray-700 rounded-full px-4 py-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-100">{student.name}</p>
                  <p className="text-xs text-gray-300">{student.code}</p>
                </div>
              </div>

              {/* Logout Button (Desktop) */}
              <button 
                onClick={logout}
                className="hidden md:flex items-center space-x-2 px-4 py-2 text-red-300 hover:text-red-200 hover:bg-red-900/20 rounded-lg transition-all duration-200"
              >
                <LogOut className="w-4 h-4" />
                <span className="font-medium">Salir</span>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-gray-300 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Search Modal/Dropdown */}
      {isSearchOpen && (
        <div className="absolute top-20 left-0 w-full bg-gray-900 shadow-lg py-4 px-4 sm:px-6 lg:px-8 border-t border-gray-800 z-20">
          <input
            type="text"
            placeholder="Buscar cursos, profesores, etc."
            className="w-full p-3 bg-gray-800 text-gray-100 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-gray-400 text-sm mt-2">Funcionalidad de búsqueda en desarrollo...</p>
        </div>
      )}

      {/* Notifications Dropdown */}
      {isNotificationsOpen && (
        <div className="absolute top-20 right-4 md:right-8 bg-gray-900 shadow-lg rounded-lg w-72 p-4 border border-gray-800 z-20">
          <h3 className="font-semibold text-gray-100 mb-4">Notificaciones</h3>
          <ul className="space-y-2">
            <li className="text-gray-300 text-sm">No hay notificaciones nuevas.</li>
            {/* Example Notification: */}
            {/* <li className="text-gray-700 text-sm border-b border-gray-100 pb-2">Nueva nota disponible en Matemáticas I</li> */}
          </ul>
          <p className="text-gray-400 text-xs mt-4">Las notificaciones se actualizarán aquí.</p>
        </div>
      )}

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800">
          <div className="px-4 py-6 space-y-4">
            {student && (
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-100">{student.name}</p>
                    <p className="text-sm text-gray-300">{student.code} - {student.grade}</p>
                  </div>
                </div>
                <button 
                  onClick={logout}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 text-red-300 hover:text-red-200 hover:bg-red-900/20 rounded-lg transition-all duration-200"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="font-medium">Cerrar Sesión</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}