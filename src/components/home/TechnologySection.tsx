import React from 'react';
import { Brain, Code, Cloud } from 'lucide-react';

export const TechnologySection: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-gray-900 dark:text-gray-100">
          Tecnología y Metodología detrás de UNCiaBot
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="flex flex-col items-center p-6 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-md">
            <Brain className="w-16 h-16 text-purple-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Inteligencia Artificial</h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm">Motor de comprensión del lenguaje natural para respuestas precisas.</p>
          </div>
          <div className="flex flex-col items-center p-6 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-md">
            <Code className="w-16 h-16 text-orange-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">n8n y Automatización</h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm">Flujos de trabajo eficientes para tareas académicas y administrativas.</p>
          </div>
          <div className="flex flex-col items-center p-6 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-md">
            <Cloud className="w-16 h-16 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Integración de APIs</h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm">Conexión fluida con sistemas universitarios existentes.</p>
          </div>
        </div>
        <div className="max-w-3xl mx-auto text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          <p className="mb-4">
            UNCiaBot ha sido desarrollado con un enfoque en la eficiencia y la innovación, utilizando una combinación de herramientas potentes y de código abierto. Nuestro equipo ha apostado por un desarrollo remoto y colaborativo, logrando una solución impactante sin un presupuesto significativo, demostrando cómo los recursos gratuitos y la creatividad pueden generar valor real.
          </p>
          <p>
            Nuestro enfoque ágil nos ha permitido adaptarnos rápidamente y construir una herramienta robusta y escalable, preparada para las necesidades cambiantes de la comunidad universitaria.
          </p>
        </div>
        <div className="mt-12 text-center">
          <img src="https://via.placeholder.com/800x400?text=Innovation+and+Collaboration" alt="Innovation and Collaboration" className="mx-auto rounded-lg shadow-lg border border-gray-200 dark:border-gray-700" />
        </div>
      </div>
    </section>
  );
};
