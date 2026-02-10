import React from 'react';
import { Link } from 'react-router-dom';
import { Brain } from 'lucide-react'; // Cambiado de Robot a Brain

export const HeroSection: React.FC = () => {
  return (
    <section id="top" className="relative bg-gradient-to-r from-blue-600 to-purple-700 text-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background blobs / shapes */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      <div className="max-w-7xl mx-auto text-center relative z-10">
        <div className="flex flex-col items-center justify-center mb-6">
          <Brain className="w-24 h-24 text-white mb-4 animate-bounce-slow" /> {/* Icono de Brain */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight mb-4 tracking-tight">
            Zahkiel la plataforma adaptada a tu mejor desarrollo
          </h1>
        </div>
        <p className="text-xl sm:text-2xl font-light mb-10 max-w-4xl mx-auto opacity-90">
          Simplificando la vida académica para estudiantes y docentes de Angelitos de Dios con el poder de la Inteligencia Artificial.
        </p>
        <Link
          to="/login"
          className="inline-block bg-white text-blue-600 hover:bg-gray-100 hover:text-blue-700 font-bold py-4 px-10 rounded-full shadow-xl transform transition duration-300 hover:scale-105 uppercase tracking-wide"
        >
          Prueba el Prototipo Ahora
        </Link>
      </div>
    </section>
  );
};
