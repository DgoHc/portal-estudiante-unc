import React from 'react';
import { Github, Linkedin } from 'lucide-react'; // Assuming we might want social icons later

export const TeamSection: React.FC = () => {
  const teamMembers = [
    {
      name: 'Diego Hoyos',
      role: 'Desarrollo y control total de la Plataforma',
      description: 'Clave en la construcción de la infraestructura que conecta Zahkiel con los servicios del colegio.',
      image: 'https://randomuser.me/api/portraits/men/33.jpg', // Generic placeholder
    },
  ];

  return (
    <section id="team" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-gray-100">
          Conoce a Nuestro Equipo
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="flex flex-col items-center text-center p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700">
              <img src={member.image} alt={member.name} className="rounded-full w-32 h-32 mb-6 object-cover border-4 border-blue-200 dark:border-blue-700 shadow-md" />
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">{member.name}</h3>
              <p className="text-blue-600 dark:text-blue-400 font-medium mb-3 text-sm">{member.role}</p>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{member.description}</p>
              {/* Future: Add social media links/icons here if needed */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
