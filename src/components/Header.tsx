import React, { useState } from 'react';
import { GraduationCap, User, LogOut, Menu, X, Bell, Search } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function Header() {
  const { student, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shadow-lg">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
            <div className="hidden md:block">
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Universidad Nacional de Cajamarca
              </h1>
              <p className="text-sm text-gray-600 font-medium">Facultad de Ingeniería de Sistemas</p>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#dashboard" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
              Dashboard
            </a>
            <a href="#horario" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
              Horario
            </a>
            <a href="#notas" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
              Notas
            </a>
            <a href="#anuncios" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
              Anuncios
            </a>
            <a href="#eventos" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
              Eventos
            </a>
          </nav>

          {/* User Section */}
          {student && (
            <div className="flex items-center space-x-4">
              {/* Search Icon */}
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200">
                <Search className="w-5 h-5" />
              </button>
              
              {/* Notifications */}
              <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* User Profile */}
              <div className="hidden md:flex items-center space-x-3 bg-gray-50 rounded-full px-4 py-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">{student.name}</p>
                  <p className="text-xs text-gray-500">{student.code}</p>
                </div>
              </div>

              {/* Logout Button */}
              <button 
                onClick={logout}
                className="hidden md:flex items-center space-x-2 px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200"
              >
                <LogOut className="w-4 h-4" />
                <span className="font-medium">Salir</span>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-6 space-y-4">
            <nav className="flex flex-col space-y-3">
              <a href="#dashboard" className="text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors duration-200">
                Dashboard
              </a>
              <a href="#horario" className="text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors duration-200">
                Horario
              </a>
              <a href="#notas" className="text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors duration-200">
                Notas
              </a>
              <a href="#anuncios" className="text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors duration-200">
                Anuncios
              </a>
              <a href="#eventos" className="text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors duration-200">
                Eventos
              </a>
            </nav>
            
            {student && (
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{student.name}</p>
                    <p className="text-sm text-gray-500">{student.code} - {student.career}</p>
                  </div>
                </div>
                <button 
                  onClick={logout}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200"
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