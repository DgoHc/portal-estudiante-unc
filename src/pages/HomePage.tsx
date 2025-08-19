
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

const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <PublicNavbar />
      <HeroSection />
      <DescriptionSection />
      <FeaturesSection />
      <TechnologySection />
      <TeamSection />
      {isAuthenticated ? (
        <div className="py-8 flex justify-center">
          <button onClick={() => navigate('/dashboard')} className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700">Volver al Dashboard</button>
        </div>
      ) : (
        <CallToActionSection />
      )}
      <FooterSection />
    </div>
  );
};

export default HomePage;
