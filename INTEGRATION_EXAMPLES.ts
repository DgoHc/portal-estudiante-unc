/**
 * EJEMPLOS DE INTEGRACIÓN
 * Cómo usar el sistema en diferentes escenarios
 */

// ============================================
// EJEMPLO 1: Integración en Router Principal
// ============================================

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DiagnosticAssessmentFlow } from './components/DiagnosticAssessmentFlow';
import { StudentDashboardSimple } from './components/StudentDashboardSimple';
import { LoginForm } from './components/LoginForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        
        {/* Ruta de evaluación diagnóstica */}
        <Route path="/assessment" element={<DiagnosticAssessmentFlow />} />
        
        {/* Ruta de dashboard estudiante */}
        <Route path="/dashboard" element={<StudentDashboardSimple />} />
        
        {/* Ruta por defecto */}
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

// ============================================
// EJEMPLO 2: Redirección Inteligente
// ============================================

import { useAuth } from './contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function StudentRouter() {
  const { student, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // Si no completó evaluación → mostrar quiz
    if (!student?.assessmentCompleted) {
      navigate('/assessment');
    } else {
      // Si ya completó → mostrar dashboard
      navigate('/dashboard');
    }
  }, [student?.assessmentCompleted, isAuthenticated]);

  return null;
}

// ============================================
// EJEMPLO 3: Dashboard con Diagnóstico Integrado
// ============================================

function StudentDashboard() {
  const { student } = useAuth();

  // Si aún no se ha completado la evaluación
  if (!student?.assessmentCompleted) {
    return (
      <div>
        <h1>Bienvenido {student?.name}</h1>
        <p>Primero necesitamos conocer tu nivel actual</p>
        <DiagnosticAssessmentFlow />
      </div>
    );
  }

  // Si ya completó, mostrar resumen del diagnóstico
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-lg p-6">
        <h1>Dashboard - {student.name}</h1>
      </div>

      {/* Resumen de diagnóstico */}
      {student.diagnosticProfile && (
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <h3>Score General</h3>
            <p className="text-3xl font-bold">
              {student.diagnosticProfile.overallScore}%
            </p>
            <p className="text-sm text-gray-600">
              Nivel: {student.diagnosticProfile.overallLevel}
            </p>
          </div>

          <div className="bg-green-50 rounded-lg p-4">
            <h3>Matemática</h3>
            <p className="text-3xl font-bold">
              {student.diagnosticProfile.mathematicsProfile.overallScore}%
            </p>
            <p className="text-sm text-gray-600">
              {student.diagnosticProfile.mathematicsProfile.level}
            </p>
          </div>

          <div className="bg-indigo-50 rounded-lg p-4">
            <h3>Comunicación</h3>
            <p className="text-3xl font-bold">
              {student.diagnosticProfile.communicationProfile.overallScore}%
            </p>
            <p className="text-sm text-gray-600">
              {student.diagnosticProfile.communicationProfile.level}
            </p>
          </div>
        </div>
      )}

      {/* Rutas personalizadas */}
      {student.contentPlan && (
        <div>
          <h2>Tus Rutas de Aprendizaje</h2>
          <div className="grid grid-cols-2 gap-4">
            {student.contentPlan.personalizedPath.map(path => (
              <div key={path.id} className="bg-white rounded-lg p-4">
                <h3 className="font-bold">{path.title}</h3>
                <p className="text-sm text-gray-600">{path.description}</p>
                <p className="text-sm mt-2">
                  ⏱️ {path.estimatedHours} horas
                  📹 {path.resources.videos} videos
                  📝 {path.resources.exercises} ejercicios
                </p>
                <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded">
                  Comenzar
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================
// EJEMPLO 4: Usar Tutor IA
// ============================================

import { useState } from 'react';
import { geminiTutor } from './services/geminAITutor';

function TutorChat({ studentId }) {
  const [messages, setMessages] = useState<Array<{
    role: 'student' | 'tutor';
    content: string;
  }>>([]);
  const [input, setInput] = useState('');
  const [sessionId, setSessionId] = useState<string | null>(null);

  const handleStartSession = () => {
    const newSession = geminiTutor.createTutoringSession(
      studentId,
      'cantidad',
      'Suma de fracciones'
    );
    setSessionId(newSession.id);
    setMessages([{
      role: 'tutor',
      content: 'Hola! Soy tu tutor de IA. ¿Qué tema necesitas reforzar?'
    }]);
  };

  const handleSendMessage = async () => {
    if (!input.trim() || !sessionId) return;

    // Agregar mensaje del estudiante
    setMessages(prev => [...prev, { role: 'student', content: input }]);
    
    try {
      // Obtener respuesta del tutor
      const response = await geminiTutor.chatWithTutor(sessionId, input);
      
      // Agregar respuesta
      setMessages(prev => [...prev, { role: 'tutor', content: response }]);
    } catch (error) {
      console.error('Error:', error);
    }

    setInput('');
  };

  return (
    <div className="space-y-4">
      {!sessionId ? (
        <button
          onClick={handleStartSession}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Iniciar Chat con Tutor IA
        </button>
      ) : (
        <>
          <div className="bg-white rounded-lg h-96 overflow-y-auto p-4">
            {messages.map((msg, i) => (
              <div key={i} className={`mb-4 ${
                msg.role === 'student' ? 'text-right' : 'text-left'
              }`}>
                <div className={`inline-block max-w-xs p-3 rounded-lg ${
                  msg.role === 'student'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-900'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Escribe tu pregunta..."
              className="flex-1 border rounded-lg p-2"
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Enviar
            </button>
          </div>
        </>
      )}
    </div>
  );
}

// ============================================
// EJEMPLO 5: Acceder a Datos del Diagnóstico
// ============================================

function AnalyticsPage() {
  const { student } = useAuth();

  if (!student?.diagnosticProfile) {
    return <div>No hay datos de diagnóstico</div>;
  }

  const profile = student.diagnosticProfile;

  return (
    <div className="space-y-6">
      <h1>Tu Análisis Completo</h1>

      {/* Score General */}
      <div className="bg-white rounded-lg p-6">
        <h2>Score General</h2>
        <div className="text-5xl font-bold text-blue-600">
          {profile.overallScore}%
        </div>
        <p>Nivel: {profile.overallLevel}</p>
      </div>

      {/* Fortalezas */}
      <div className="bg-white rounded-lg p-6">
        <h2>🌟 Tus Fortalezas</h2>
        <ul className="space-y-2">
          {profile.strengths.map((strength, i) => (
            <li key={i} className="text-green-600">
              ✓ {strength}
            </li>
          ))}
        </ul>
      </div>

      {/* Debilidades */}
      <div className="bg-white rounded-lg p-6">
        <h2>📈 Áreas para Mejorar</h2>
        <ul className="space-y-2">
          {profile.weaknesses.map((weakness, i) => (
            <li key={i} className="text-red-600">
              • {weakness}
            </li>
          ))}
        </ul>
      </div>

      {/* Detalle por Competencia */}
      <div className="bg-white rounded-lg p-6">
        <h2>Análisis por Competencia</h2>
        
        <h3 className="font-bold mt-4 mb-2">Matemática</h3>
        {profile.mathematicsProfile.competencies.map(comp => (
          <div key={comp.competency} className="mb-3">
            <div className="flex justify-between">
              <span>{comp.name}</span>
              <span className="font-bold">{comp.score}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: `${comp.score}%` }}
              ></div>
            </div>
          </div>
        ))}

        <h3 className="font-bold mt-6 mb-2">Comunicación</h3>
        {profile.communicationProfile.competencies.map(comp => (
          <div key={comp.competency} className="mb-3">
            <div className="flex justify-between">
              <span>{comp.name}</span>
              <span className="font-bold">{comp.score}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-indigo-600 h-2 rounded-full"
                style={{ width: `${comp.score}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Plan Personalizado */}
      <div className="bg-white rounded-lg p-6">
        <h2>Tu Plan Personalizado</h2>
        <p className="mb-4">
          Estilo de aprendizaje: <strong>{profile.learningStyle}</strong>
        </p>
        <p className="mb-4">
          Ritmo sugerido: <strong>{profile.suggestedPace}</strong>
        </p>
        <p>
          Tienes <strong>{profile.personalizedPath.length}</strong> rutas de aprendizaje
        </p>
      </div>
    </div>
  );
}

// ============================================
// EJEMPLO 6: Hook Personalizado
// ============================================

import { useAdaptiveAssessment } from './hooks/useAdaptiveAssessment';

function MyCustomComponent() {
  const { state, assessmentEngine, completeQuiz, viewPersonalizedContent } =
    useAdaptiveAssessment('student_123');

  return (
    <div>
      <h1>Estado del Assessment: {state.stage}</h1>

      {state.stage === 'quiz' && (
        <div>
          <p>Pregunta: {assessmentEngine.getProgressPercentage()}%</p>
          <button onClick={() => {
            const question = assessmentEngine.getNextQuestion();
            // Mostrar pregunta
          }}>
            Cargar Pregunta
          </button>
        </div>
      )}

      {state.stage === 'diagnostic' && state.diagnosticProfile && (
        <div>
          <p>Score: {state.diagnosticProfile.overallScore}%</p>
          <button onClick={viewPersonalizedContent}>
            Ver Contenido Personalizado
          </button>
        </div>
      )}

      {state.isLoading && <p>Cargando...</p>}
      {state.error && <p className="text-red-600">{state.error}</p>}
    </div>
  );
}

// ============================================
// EJEMPLO 7: Llamar Servicios Directamente
// ============================================

import { AdaptiveAssessmentEngine } from './services/adaptiveAssessment';
import { DiagnosticEngine } from './services/diagnosticEngine';
import { ContentRecommendationEngine } from './services/contentRecommendation';

async function CompleteFlow(studentId: string) {
  // 1. Crear motor adaptativo
  const engine = new AdaptiveAssessmentEngine();

  // 2. Simular respuestas
  while (!engine.isCompleted()) {
    const question = engine.getNextQuestion();
    console.log(question.question);
    
    // Simular respuesta aleatoria
    const response = Math.floor(Math.random() * 4);
    engine.recordAnswer(response);
  }

  // 3. Obtener estado
  const state = engine.getCurrentState();

  // 4. Generar diagnóstico
  const profile = DiagnosticEngine.generateLearningProfile(studentId, state);
  console.log('Diagnóstico:', profile);

  // 5. Generar plan de contenido
  const contentPlan = ContentRecommendationEngine.generatePersonalizedPlan(profile);
  console.log('Plan:', contentPlan);

  return { profile, contentPlan };
}

// ============================================
// EXPORTAR TODOS LOS EJEMPLOS
// ============================================

export {
  StudentRouter,
  StudentDashboard,
  TutorChat,
  AnalyticsPage,
  MyCustomComponent,
  CompleteFlow,
};
