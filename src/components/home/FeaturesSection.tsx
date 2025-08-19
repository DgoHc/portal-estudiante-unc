import React from 'react';
import { BookOpen, Bell, Calendar, DollarSign, ListTodo, Library, GraduationCap, Users } from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: BookOpen,
      title: 'Consultas Académicas',
      description: 'Resuelve dudas sobre cursos, horarios, profesores y planes de estudio al instante.',
      color: 'text-blue-500',
    },
    {
      icon: ListTodo,
      title: 'Gestión de Tareas',
      description: 'Organiza tus entregas, exámenes y actividades con recordatorios personalizados.',
      color: 'text-green-500',
    },
    {
      icon: Bell,
      title: 'Notificaciones y Anuncios',
      description: 'Mantente al día con anuncios importantes, eventos y cambios en el campus.',
      color: 'text-yellow-500',
    },
    {
      icon: Calendar,
      title: 'Calendario Académico',
      description: 'Accede rápidamente a las fechas clave del ciclo académico.',
      color: 'text-red-500',
    },
    {
      icon: DollarSign,
      title: 'Gestión de Pagos',
      description: 'Consulta estados de cuenta y recordatorios de pagos.',
      color: 'text-purple-500',
    },
    {
      icon: Library,
      title: 'Recursos de Biblioteca',
      description: 'Encuentra libros, artículos y recursos digitales disponibles en la biblioteca.',
      color: 'text-teal-500',
    },
  ];

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-gray-100">
          Funcionalidades Clave de UNCiaBot
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700">
              <div className={`w-20 h-20 flex items-center justify-center rounded-full ${feature.color} bg-opacity-10 mb-6`}>
                <feature.icon className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-gray-100">{feature.title}</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
