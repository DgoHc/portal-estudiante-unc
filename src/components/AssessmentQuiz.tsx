import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface Question {
  id: number;
  subject: 'math' | 'communication';
  question: string;
  options: string[];
  correctAnswer: number;
}

const questions: Question[] = [
  // Matemática - Básico
  { id: 1, subject: 'math', question: '¿Cuánto es 15 + 27?', options: ['42', '43', '41', '40'], correctAnswer: 0 },
  { id: 2, subject: 'math', question: '¿Cuánto es 3/4 + 1/4?', options: ['1', '1/2', '3/8', '1/4'], correctAnswer: 0 },
  // Matemática - Intermedio
  { id: 3, subject: 'math', question: 'Resuelve: 2x + 3 = 7', options: ['x = 2', 'x = 3', 'x = 4', 'x = 1'], correctAnswer: 0 },
  { id: 4, subject: 'math', question: '¿Cuál es el área de un triángulo con base 6 cm y altura 4 cm?', options: ['12 cm²', '10 cm²', '24 cm²', '8 cm²'], correctAnswer: 0 },
  // Matemática - Avanzado
  { id: 5, subject: 'math', question: '¿Cuánto es √(144)?', options: ['12', '14', '16', '10'], correctAnswer: 0 },
  { id: 6, subject: 'math', question: 'En un triángulo rectángulo, si los catetos miden 3 y 4, ¿cuánto mide la hipotenusa?', options: ['5', '6', '7', '8'], correctAnswer: 0 },
  // Comunicación - Básico
  { id: 7, subject: 'communication', question: '¿Cuál es la palabra correcta: "El niño juega con su pelota en el parque"?', options: ['Correcta', 'Incorrecta (debe ser "niño juega")'], correctAnswer: 0 },
  { id: 8, subject: 'communication', question: '¿Qué significa "efímero"?', options: ['Duradero', 'Temporal', 'Grande', 'Pequeño'], correctAnswer: 1 },
  // Comunicación - Intermedio
  { id: 9, subject: 'communication', question: 'Identifica la metáfora: "El sol es una bola de fuego"', options: ['Comparación directa', 'Figura retórica', 'Hipérbole', 'Ironía'], correctAnswer: 1 },
  { id: 10, subject: 'communication', question: '¿Qué tipo de oración es: "¿Qué hora es?"?', options: ['Declarativa', 'Interrogativa', 'Exclamativa', 'Imperativa'], correctAnswer: 1 },
  // Comunicación - Avanzado
  { id: 11, subject: 'communication', question: '¿Cuál es el antónimo de "benevolente"?', options: ['Malévolo', 'Generoso', 'Amable', 'Bondadoso'], correctAnswer: 0 },
  { id: 12, subject: 'communication', question: 'Analiza: "El viento susurraba secretos al oído de los árboles". ¿Qué figura retórica predomina?', options: ['Metáfora', 'Personificación', 'Hipérbole', 'Símil'], correctAnswer: 1 },
  // Razonamiento Lógico - Básico
  { id: 13, subject: 'logic', question: '¿Qué número continúa la serie: 2, 4, 6, 8, ...?', options: ['10', '12', '9', '11'], correctAnswer: 0 },
  { id: 14, subject: 'logic', question: 'Si A es padre de B, y B es padre de C, entonces A es:', options: ['Hermano de C', 'Abuelo de C', 'Padre de C', 'Tío de C'], correctAnswer: 1 },
  // Razonamiento Verbal - Básico
  { id: 15, subject: 'verbal', question: 'Completa: "El perro ladró toda la noche porque _____"', options: ['estaba feliz', 'tenía hambre', 'vio un gato', 'estaba cansado'], correctAnswer: 2 },
  { id: 16, subject: 'verbal', question: '¿Cuál es la analogía: Perro : Ladrar :: Gato : ?', options: ['Maullar', 'Correr', 'Saltar', 'Dormir'], correctAnswer: 0 },
  // Razonamiento Espacial - Básico
  { id: 17, subject: 'spatial', question: '¿Cuál de las siguientes figuras es diferente?', options: ['Cuadrado', 'Triángulo', 'Círculo', 'Rectángulo'], correctAnswer: 2 }, // Asumiendo que círculo es diferente si los otros son poligonales, pero ajustar
  { id: 18, subject: 'spatial', question: 'Si giras un cuadrado 90 grados, ¿qué forma mantiene?', options: ['Cambia', 'Mantiene forma', 'Se vuelve círculo', 'Desaparece'], correctAnswer: 1 },
];

export default function AssessmentQuiz() {
  const { student, logout, updateAssessment } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [completed, setCompleted] = useState(false);

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers, answerIndex];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calcular niveles
      const mathAnswers = newAnswers.slice(0, 6);
      const commAnswers = newAnswers.slice(6, 12);
      const logicAnswers = newAnswers.slice(12, 14);
      const verbalAnswers = newAnswers.slice(14, 16);
      const spatialAnswers = newAnswers.slice(16, 18);

      const mathCorrect = mathAnswers.filter((ans, idx) => ans === questions[idx].correctAnswer).length;
      const commCorrect = commAnswers.filter((ans, idx) => ans === questions[idx + 6].correctAnswer).length;
      const logicCorrect = logicAnswers.filter((ans, idx) => ans === questions[idx + 12].correctAnswer).length;
      const verbalCorrect = verbalAnswers.filter((ans, idx) => ans === questions[idx + 14].correctAnswer).length;
      const spatialCorrect = spatialAnswers.filter((ans, idx) => ans === questions[idx + 16].correctAnswer).length;

      const getLevel = (correct: number, total: number) => {
        if (correct >= total * 0.8) return 'avanzado';
        if (correct >= total * 0.5) return 'intermedio';
        return 'básico';
      };

      const mathLevel = getLevel(mathCorrect, 6);
      const commLevel = getLevel(commCorrect, 6);
      const logicLevel = getLevel(logicCorrect, 2);
      const verbalLevel = getLevel(verbalCorrect, 2);
      const spatialLevel = getLevel(spatialCorrect, 2);

      // Actualizar estudiante
      updateAssessment(mathLevel, commLevel, logicLevel, verbalLevel, spatialLevel);
      setCompleted(true);
    }
  };

  if (completed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">¡Evaluación Completada!</h1>
          <p className="text-gray-600 mb-6">Tu contenido personalizado está listo. Haz clic en continuar para acceder al dashboard.</p>
          <button
            onClick={() => window.location.href = '/study'}
            className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors"
          >
            Empezar a Estudiar
          </button>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-xl p-8 max-w-2xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Evaluación Inicial</h1>
          <p className="text-gray-600">Pregunta {currentQuestion + 1} de {questions.length}</p>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">{question.question}</h2>
          <div className="grid grid-cols-1 gap-4">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                className="p-4 bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-xl text-left transition-colors"
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={logout}
            className="text-gray-500 hover:text-gray-700 font-medium"
          >
            Salir
          </button>
          <span className="text-sm text-gray-500">
            {question.subject === 'math' ? 'Matemática' : question.subject === 'communication' ? 'Comunicación' : question.subject === 'logic' ? 'Razonamiento Lógico' : question.subject === 'verbal' ? 'Razonamiento Verbal' : 'Razonamiento Espacial'}
          </span>
        </div>
      </div>
    </div>
  );
}