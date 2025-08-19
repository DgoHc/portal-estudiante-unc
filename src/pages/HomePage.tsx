
import React from 'react';
import { PublicNavbar } from '../components/PublicNavbar';
import { HeroSection } from '../components/home/HeroSection';
import { DescriptionSection } from '../components/home/DescriptionSection';
import { FeaturesSection } from '../components/home/FeaturesSection';
import { TechnologySection } from '../components/home/TechnologySection';
import { TeamSection } from '../components/home/TeamSection';
import { CallToActionSection } from '../components/home/CallToActionSection';
import { FooterSection } from '../components/home/FooterSection';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <PublicNavbar />
      <HeroSection />
      <DescriptionSection />
      <FeaturesSection />
      <TechnologySection />
      <TeamSection />
      <CallToActionSection />
      <FooterSection />
    </div>
  );
};

export default HomePage;
