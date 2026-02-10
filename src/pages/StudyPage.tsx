import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Calculator, MessageSquare, Brain, MessageCircle, Eye, Loader } from 'lucide-react';

export default function StudyPage() {
  const { student } = useAuth();
  const [loading, setLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);

  const generateContentWithAI = async (type: string, area: string) => {
    setLoading(true);
    setGeneratedContent(null);

    // Simular llamada a IA
    setTimeout(() => {
      let content = '';
      if (type === 'exercise') {
        if (area === 'Matemática') {
          content = `Pregunta generada por IA: Resuelve la ecuación 3x + 5 = 17. (Respuesta: x = 4)`;
        } else if (area === 'Comunicación') {
          content = `Pregunta generada por IA: ¿Cuál es el sinónimo de "alegre"? (Respuesta: Feliz)`;
        } else {
          content = `Pregunta generada por IA en ${area}: Ejercicio personalizado basado en tu nivel.`;
        }
      } else if (type === 'lesson') {
        content = `Lección generada por IA: Conceptos básicos de ${area} adaptados a tu nivel ${student?.mathLevel || 'básico'}. Incluye ejemplos prácticos y ejercicios.`;
      }
      setGeneratedContent(content);
      setLoading(false);
    }, 2000); // Simular delay de IA
  };

  const getWeakAreas = () => {
    const areas = [];
    if (student?.mathLevel === 'básico') areas.push({ name: 'Matemática', icon: Calculator, description: 'Ejercicios de aritmética y álgebra básica', level: 'básico' });
    if (student?.communicationLevel === 'básico') areas.push({ name: 'Comunicación', icon: MessageSquare, description: 'Lectura y escritura básica', level: 'básico' });
    if (student?.logicLevel === 'básico') areas.push({ name: 'Razonamiento Lógico', icon: Brain, description: 'Patrones y series numéricas', level: 'básico' });
    if (student?.verbalLevel === 'básico') areas.push({ name: 'Razonamiento Verbal', icon: MessageCircle, description: 'Analogías y comprensión lectora', level: 'básico' });
    if (student?.spatialLevel === 'básico') areas.push({ name: 'Razonamiento Espacial', icon: Eye, description: 'Figuras y relaciones espaciales', level: 'básico' });

    // Si no hay débiles, mostrar todas como intermedio
    if (areas.length === 0) {
      areas.push(
        { name: 'Matemática', icon: Calculator, description: 'Ejercicios de geometría y ecuaciones', level: 'intermedio' },
        { name: 'Comunicación', icon: MessageSquare, description: 'Análisis literario y gramática', level: 'intermedio' },
        { name: 'Razonamiento Lógico', icon: Brain, description: 'Problemas lógicos avanzados', level: 'intermedio' },
        { name: 'Razonamiento Verbal', icon: MessageCircle, description: 'Inferencias y argumentación', level: 'intermedio' },
        { name: 'Razonamiento Espacial', icon: Eye, description: 'Rotaciones y perspectivas', level: 'intermedio' }
      );
    }

    return areas;
  };

  const weakAreas = getWeakAreas();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">¡Bienvenido a tu Plan de Estudio Personalizado!</h1>
          <p className="text-xl text-gray-600">Basado en tu evaluación, hemos preparado contenido adaptado a tus necesidades. Comienza con las áreas que necesitas mejorar.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {weakAreas.map((area, index) => {
            const Icon = area.icon;
            return (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${area.level === 'básico' ? 'from-green-500 to-green-600' : 'from-blue-500 to-blue-600'} rounded-xl flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className={`text-sm font-medium px-3 py-1 rounded-full ${area.level === 'básico' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                    {area.level}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{area.name}</h3>
                <p className="text-gray-600 mb-4">{area.description}</p>
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  Comenzar Práctica
                </button>
              </div>
            );
          })}
        </div>

        <div className="mt-12 bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Contenido Generado por IA</h2>
          <p className="text-gray-600 mb-6">
            Nuestro sistema de IA ha analizado tus respuestas y creado ejercicios personalizados para reforzar tus conocimientos.
            Cada ejercicio se adapta en tiempo real a tu progreso.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Ejercicios Interactivos</h3>
              <p className="text-gray-600">Práctica con retroalimentación inmediata.</p>
              <button 
                onClick={() => generateContentWithAI('exercise', 'Matemática')}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                disabled={loading}
              >
                {loading ? 'Generando...' : 'Generar Ejercicio'}
              </button>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Lecciones Adaptativas</h3>
              <p className="text-gray-600">Contenido que se ajusta a tu ritmo de aprendizaje.</p>
              <button 
                onClick={() => generateContentWithAI('lesson', 'Comunicación')}
                className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                disabled={loading}
              >
                {loading ? 'Generando...' : 'Ver Lección'}
              </button>
            </div>
          </div>
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-blue-800">
              <strong>IA en acción:</strong> Basado en tu nivel básico en Comunicación, se generó una lección sobre "Figuras Retóricas" con ejemplos personalizados.
            </p>
          </div>
          {loading && (
            <div className="mt-6 p-4 bg-yellow-50 rounded-lg flex items-center">
              <Loader className="w-5 h-5 animate-spin mr-2" />
              <p className="text-yellow-800">Generando contenido con IA...</p>
            </div>
          )}
          {generatedContent && (
            <div className="mt-6 p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">Contenido Generado:</h4>
              <p className="text-green-800">{generatedContent}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}