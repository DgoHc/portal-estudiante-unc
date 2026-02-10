import React, { useState } from 'react';
import { Calculator, BookOpen, Target, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export function MathematicsSection() {
  const { student } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);

  const generateLessonWithAI = async (lessonTitle: string) => {
    setLoading(true);
    setGeneratedContent(null);
    setModalOpen(true);

    // Simular llamada a IA
    setTimeout(() => {
      let content = '';
      if (lessonTitle === 'Introducción a las Ecuaciones') {
        content = `Lección generada por IA: Las ecuaciones son igualdades matemáticas. Ejemplo: 2x + 3 = 7. Para resolver, resta 3: 2x = 4, divide por 2: x = 2. Practica con más ejemplos.`;
      } else if (lessonTitle === 'Geometría Plana') {
        content = `Lección generada por IA: La geometría plana estudia figuras en 2D. Área de rectángulo: base × altura. Área de triángulo: (base × altura)/2. Dibuja y calcula áreas.`;
      } else {
        content = `Lección generada por IA sobre ${lessonTitle}: Contenido adaptado a tu nivel ${student?.mathLevel}. Incluye explicaciones y ejercicios prácticos.`;
      }
      setGeneratedContent(content);
      setLoading(false);
    }, 2000);
  };

  const allExercises = [
    {
      title: 'Álgebra Básica',
      description: 'Ejercicios de ecuaciones lineales',
      level: 'básico',
      completed: 8,
      total: 10
    },
    {
      title: 'Geometría',
      description: 'Figuras geométricas y áreas',
      level: 'intermedio',
      completed: 5,
      total: 12
    },
    {
      title: 'Estadística',
      description: 'Media, mediana y moda',
      level: 'avanzado',
      completed: 0,
      total: 8
    },
    {
      title: 'Números Enteros',
      description: 'Operaciones con números enteros',
      level: 'básico',
      completed: 10,
      total: 10
    },
    {
      title: 'Fracciones',
      description: 'Operaciones con fracciones',
      level: 'intermedio',
      completed: 3,
      total: 10
    },
    {
      title: 'Cálculo Diferencial',
      description: 'Introducción al cálculo',
      level: 'avanzado',
      completed: 0,
      total: 15
    }
  ];

  // Filter exercises based on student's level
  const levelOrder = { 'básico': 1, 'intermedio': 2, 'avanzado': 3 };
  const studentLevelNum = levelOrder[student?.mathLevel || 'básico'];
  const exercises = allExercises.filter(ex => levelOrder[ex.level] <= studentLevelNum);

  return (
    <>
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl p-8 text-white shadow-xl">
        <h1 className="text-4xl font-bold mb-2">Matemática</h1>
        <p className="text-blue-100 text-lg">Ejercicios y lecciones adaptadas a tu nivel: {student?.mathLevel}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exercises.map((exercise, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-br ${exercise.level === 'básico' ? 'from-green-500 to-green-600' : exercise.level === 'intermedio' ? 'from-yellow-500 to-yellow-600' : 'from-red-500 to-red-600'} rounded-xl flex items-center justify-center`}>
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <span className={`text-sm font-medium px-3 py-1 rounded-full ${exercise.level === 'básico' ? 'bg-green-100 text-green-800' : exercise.level === 'intermedio' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                {exercise.level}
              </span>
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-2">{exercise.title}</h3>
            <p className="text-gray-600 mb-4">{exercise.description}</p>
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Progreso</span>
                <span>{exercise.completed}/{exercise.total}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${(exercise.completed / exercise.total) * 100}%` }}
                ></div>
              </div>
            </div>
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium">
              {exercise.completed === 0 ? 'Comenzar' : 'Continuar'}
            </button>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="font-bold text-gray-900 text-xl mb-4">Lecciones Teóricas</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <BookOpen className="w-8 h-8 text-blue-600" />
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900">Introducción a las Ecuaciones</h4>
              <p className="text-gray-600">Conceptos básicos de álgebra</p>
            </div>
            <button 
              onClick={() => generateLessonWithAI('Introducción a las Ecuaciones')}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Leer
            </button>
          </div>
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <Target className="w-8 h-8 text-green-600" />
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900">Geometría Plana</h4>
              <p className="text-gray-600">Figuras y sus propiedades</p>
            </div>
            <button 
              onClick={() => generateLessonWithAI('Geometría Plana')}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Leer
            </button>
          </div>
        </div>
      </div>

      {/* Modal para contenido generado por IA */}
    {modalOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-900">Lección Generada por IA</h3>
            <button 
              onClick={() => setModalOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-2 text-gray-600">Generando contenido...</span>
            </div>
          ) : (
            <div className="prose max-w-none">
              <p className="text-gray-700 whitespace-pre-line">{generatedContent}</p>
            </div>
          )}
        </div>
      </div>
    )}
    </>
  );
};