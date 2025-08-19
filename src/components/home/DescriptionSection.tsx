import React from 'react';
import { Info, Lightbulb } from 'lucide-react';

export const DescriptionSection: React.FC = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto text-center">
        <Info className="w-16 h-16 text-blue-500 mx-auto mb-6" />
        <h2 className="text-3xl sm:text-4xl font-bold mb-8">
          ¿Qué es UNCiaBot?
        </h2>
        <p className="text-lg leading-relaxed max-w-3xl mx-auto text-gray-700 dark:text-gray-300">
          UNCiaBot es un asistente virtual diseñado específicamente para la comunidad universitaria de la UNC. Su misión es centralizar y simplificar el acceso a la información académica y administrativa, así como automatizar tareas repetitivas. Desde responder tus dudas sobre horarios de clase hasta gestionar tus entregas, UNCiaBot está aquí para hacer tu vida universitaria más fácil y productiva.
        </p>
      </div>
    </section>
  );
};
