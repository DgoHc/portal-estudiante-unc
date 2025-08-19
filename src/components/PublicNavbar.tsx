import React, { useState } from 'react';
import { GraduationCap, Menu, X, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { useAuth } from '../contexts/AuthContext';

export function PublicNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  return (
    <header className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shadow-lg">
                <GraduationCap className="w-7 h-7 text-white" />
              </div>
              <div className="hidden md:block">
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                  UNCiaBot
                </h1>
                <p className="text-sm text-gray-600 font-medium">Asistente Universitario</p>
              </div>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <HashLink smooth to="/#top" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
              Inicio
            </HashLink>
            <HashLink smooth to="/#features" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
              Funcionalidades
            </HashLink>
            <HashLink smooth to="/#team" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
              Equipo
            </HashLink>
            {isAuthenticated ? (
              <Link to="/dashboard" className="inline-flex items-center space-x-2 px-5 py-2 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-md">
                <span>Ir al dashboard</span>
              </Link>
            ) : (
              <Link to="/login" className="inline-flex items-center space-x-2 px-5 py-2 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-md">
                <LogIn className="w-5 h-5" />
                <span>Acceder</span>
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-6 space-y-4">
            <nav className="flex flex-col space-y-3">
              <HashLink smooth to="/#top" className="text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors duration-200">
                Inicio
              </HashLink>
              <HashLink smooth to="/#features" className="text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors duration-200">
                Funcionalidades
              </HashLink>
              <HashLink smooth to="/#team" className="text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors duration-200">
                Equipo
              </HashLink>
              {isAuthenticated ? (
                <Link to="/dashboard" className="flex items-center space-x-2 px-4 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors duration-200">
                  <span>Ir al dashboard</span>
                </Link>
              ) : (
                <Link to="/login" className="flex items-center space-x-2 px-4 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors duration-200">
                  <LogIn className="w-5 h-5" />
                  <span>Acceder</span>
                </Link>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
