import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket } from 'lucide-react';

export const CallToActionSection: React.FC = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-700 to-purple-800 text-white text-center shadow-inner">
      <div className="max-w-4xl mx-auto">
        <Rocket className="w-24 h-24 mx-auto mb-6 text-white animate-pulse-slow" />
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-6 leading-tight">
          ¿Listo para Experimentar ZahKiel?
        </h2>
        <p className="text-xl sm:text-2xl font-light mb-10 opacity-90">
          Únete a la revolución académica y descubre cómo ZahKiel puede transformar a tu rendimiento académico.
        </p>
        <Link
          to="/login"
          className="inline-block bg-white text-blue-700 hover:bg-gray-100 hover:text-blue-800 font-bold py-4 px-12 rounded-full shadow-lg transform transition duration-300 hover:scale-105 uppercase tracking-wide text-lg"
        >
          ¡Comienza Ahora!
        </Link>
      </div>
    </section>
  );
};
