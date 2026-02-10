

import React from 'react';
import { PublicNavbar } from '../components/PublicNavbar';
import { HeroSection } from '../components/home/HeroSection';
import { DescriptionSection } from '../components/home/DescriptionSection';
import { FeaturesSection } from '../components/home/FeaturesSection';
import { TechnologySection } from '../components/home/TechnologySection';
import { TeamSection } from '../components/home/TeamSection';
import { CallToActionSection } from '../components/home/CallToActionSection';
import { FooterSection } from '../components/home/FooterSection';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Users, BookOpen, LogOut } from 'lucide-react';

const HomePage: React.FC = () => {
  const { isAuthenticated, userRole, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <PublicNavbar />
      <HeroSection />
      <DescriptionSection />
      <FeaturesSection />
      <TechnologySection />
      <TeamSection />
      {isAuthenticated ? (
        <div className="py-8 flex justify-center gap-4 flex-wrap items-center">
          {userRole === 'student' ? (
            <>
              <button 
                onClick={() => navigate('/dashboard')} 
                className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-semibold flex items-center gap-2 transition"
              >
                <BookOpen size={20} />
                Dashboard Estudiante
              </button>
            </>
          ) : userRole === 'teacher' ? (
            <>
              <button 
                onClick={() => navigate('/teacher')} 
                className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 font-semibold flex items-center gap-2 transition"
              >
                <Users size={20} />
                Panel Profesor
              </button>
            </>
          ) : null}
          
          <button 
            onClick={handleLogout}
            className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 font-semibold flex items-center gap-2 transition"
          >
            <LogOut size={20} />
            Cerrar Sesión
          </button>
        </div>
      ) : (
        <CallToActionSection />
      )}
      <FooterSection />
    </div>
  );
};

export default HomePage;
