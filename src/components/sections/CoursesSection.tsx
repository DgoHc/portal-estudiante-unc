import React from 'react';
import { Book, User, CalendarDays } from 'lucide-react';

interface Course {
  id: string;
  name: string;
  professor: string;
  code: string;
  credits: number;
  schedule: string;
}

export const CoursesSection: React.FC = () => {
  const courses: Course[] = [
    {
      id: 'c001',
      name: 'Algoritmos y Estructura de Datos',
      professor: 'Dr. Ana G. Robles',
      code: 'CS101',
      credits: 4,
      schedule: 'Lu/Mi/Vi 10:00 - 11:30',
    },
    {
      id: 'c002',
      name: 'Matemática Discreta',
      professor: 'Lic. Carlos M. Vega',
      code: 'MA203',
      credits: 3,
      schedule: 'Ma/Ju 08:00 - 09:30',
    },
    {
      id: 'c003',
      name: 'Programación Orientada a Objetos',
      professor: 'Ing. Laura F. Quispe',
      code: 'CS205',
      credits: 4,
      schedule: 'Lu/Mi/Vi 14:00 - 15:30',
    },
    {
      id: 'c004',
      name: 'Bases de Datos I',
      professor: 'Mg. Roberto P. Torres',
      code: 'DB301',
      credits: 3,
      schedule: 'Ma/Ju 16:00 - 17:30',
    },
  ];

  return (
    <div className="space-y-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Mis Cursos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <Book className="w-6 h-6 text-blue-600 mr-3" />
              <h3 className="text-xl font-semibold text-gray-900">{course.name}</h3>
            </div>
            <p className="text-gray-700 mb-2 flex items-center">
              <User className="w-4 h-4 mr-2 text-gray-500" />
              Profesor: {course.professor}
            </p>
            <p className="text-gray-700 mb-2 flex items-center">
              <CalendarDays className="w-4 h-4 mr-2 text-gray-500" />
              Horario: {course.schedule}
            </p>
            <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
              <span>Código: <span className="font-medium text-gray-800">{course.code}</span></span>
              <span>Créditos: <span className="font-medium text-gray-800">{course.credits}</span></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
