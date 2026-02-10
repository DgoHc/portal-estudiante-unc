import React from 'react';
import { User, Mail, GraduationCap } from 'lucide-react';

interface Teacher {
  id: string;
  name: string;
  department: string;
  email: string;
  courses: string[];
}

export const TeachersSection: React.FC = () => {
  const teachers: Teacher[] = [
    {
      id: 't001',
      name: 'Dr. Ana G. Robles',
      department: 'Ciencias de la Computación',
      email: 'ana.robles@colegio.edu.pe',
      courses: ['Algoritmos y Estructura de Datos', 'Diseño de Compiladores'],
    },
    {
      id: 't002',
      name: 'Prof. Carlos M. Vega',
      department: 'Matemática',
      email: 'carlos.vega@colegio.edu.pe',
      courses: ['Álgebra Básica', 'Aritmética'],
    },
    {
      id: 't003',
      name: 'Prof. Laura F. Quispe',
      department: 'Matemática',
      email: 'laura.quispe@colegio.edu.pe',
      courses: ['Álgebra', 'Geometría'],
    },
    {
      id: 't004',
      name: 'Prof. Roberto P. Torres',
      department: 'Comunicación',
      email: 'roberto.torres@colegio.edu.pe',
      courses: ['Literatura', 'Redacción'],
    },
  ];

  return (
    <div className="space-y-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">Nuestros Profesores</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teachers.map((teacher) => (
          <div key={teacher.id} className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <User className="w-6 h-6 text-green-500 mr-3" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{teacher.name}</h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-2 flex items-center">
              <GraduationCap className="w-4 h-4 mr-2 text-gray-500" />
              Departamento: {teacher.department}
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-2 flex items-center">
              <Mail className="w-4 h-4 mr-2 text-gray-500" />
              Email: <a href={`mailto:${teacher.email}`} className="text-blue-500 hover:underline">{teacher.email}</a>
            </p>
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-800 dark:text-gray-200">Cursos:</p>
              <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 ml-4">
                {teacher.courses.map((course, idx) => (
                  <li key={idx}>{course}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
