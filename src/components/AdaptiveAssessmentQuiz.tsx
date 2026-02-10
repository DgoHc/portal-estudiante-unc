/**
 * COMPONENTE: CUESTIONARIO ADAPTATIVO
 * Interfaz visual para el examen diagnóstico adaptativo
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Zap, BookOpen } from 'lucide-react';
import { AdaptiveAssessmentEngine } from '../services/adaptiveAssessment';
import { Question } from '../data/questionBank';

interface AdaptiveAssessmentQuizProps {
  onComplete: (results: any) => void;
  studentId: string;
}

export function AdaptiveAssessmentQuiz({
  onComplete,
  studentId,
}: AdaptiveAssessmentQuizProps) {
  const [engine] = useState(() => new AdaptiveAssessmentEngine());
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [feedback, setFeedback] = useState<{
    isCorrect: boolean;
    explanation: string;
    hints: string[];
    reinforcementQuestion?: Question;
  } | null>(null);
  const [answeringReinforcement, setAnsweringReinforcement] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showingReinforcement, setShowingReinforcement] = useState(false);

  // Cargar primera pregunta
  useEffect(() => {
    loadNextQuestion();
  }, []);

  const loadNextQuestion = () => {
    if (engine.isCompleted()) {
      // Completado
      const profile = engine.getCurrentState();
      const competencySummary = engine.getCompetencySummary();
      const overallScore = engine.getOverallScore();

      onComplete({
        studentId,
        competencySummary,
        overallScore,
        state: profile,
        timestamp: Date.now(),
      });
      return;
    }

    try {
      const next = engine.getNextQuestion();
      setCurrentQuestion(next);
      setSelectedAnswer(null);
      setAnswered(false);
      setFeedback(null);
      setShowingReinforcement(false);
      setAnsweringReinforcement(false);
      setProgress(engine.getProgressPercentage());
    } catch (error) {
      console.error('Error loading question:', error);
      onComplete({
        studentId,
        competencySummary: engine.getCompetencySummary(),
        overallScore: engine.getOverallScore(),
        state: engine.getCurrentState(),
        timestamp: Date.now(),
      });
    }
  };

  const handleAnswerSelect = (optionIndex: number) => {
    if (answered || answeringReinforcement) return;
    setSelectedAnswer(optionIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null || answered) return;

    const isCorrect = engine.recordAnswer(selectedAnswer);
    const explanation = engine.getExplanation();

    setAnswered(true);
    setFeedback({
      isCorrect,
      explanation: explanation.explanation,
      hints: explanation.hints,
      reinforcementQuestion: explanation.reinforcementQuestion,
    });
  };

  const handleContinue = () => {
    if (feedback?.reinforcementQuestion && !answeringReinforcement) {
      // Mostrar pregunta de refuerzo si falló
      setShowingReinforcement(true);
      setAnsweringReinforcement(true);
    } else {
      loadNextQuestion();
    }
  };

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="inline-block p-4 bg-blue-100 rounded-full mb-4">
            <Zap className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Preparando tu evaluación...
          </h1>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header con progreso */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Evaluación Adaptativa
              </h1>
              <p className="text-gray-600 text-sm">
                Pregunta {Math.floor(progress / 4) + 1} de 25
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-600">
                {Math.round(progress)}%
              </div>
              <p className="text-gray-600 text-sm">Progreso</p>
            </div>
          </div>

          {/* Barra de progreso */}
          <div className="w-full bg-gray-300 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            ></motion.div>
          </div>
        </div>

        {/* Competencia actual */}
        <div className="mb-6 flex items-center gap-2 text-sm">
          <BookOpen className="w-4 h-4 text-blue-600" />
          <span className="text-gray-700 font-medium">
            {currentQuestion.competency.replace('_', ' ').toUpperCase()}
          </span>
          <span className="text-gray-500">
            • Nivel: {currentQuestion.difficulty}
          </span>
        </div>

        {/* Pregunta */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-3xl shadow-xl p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              {currentQuestion.question}
            </h2>

            {/* Opciones de respuesta */}
            <div className="space-y-4 mb-8">
              {currentQuestion.options.map((option, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={answered}
                  whileHover={{ scale: answered ? 1 : 1.02 }}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    selectedAnswer === index
                      ? 'border-blue-500 bg-blue-50'
                      : answered
                      ? index === currentQuestion.correctAnswer
                        ? 'border-green-500 bg-green-50'
                        : selectedAnswer === index
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-200 bg-gray-50'
                      : 'border-gray-200 hover:border-blue-300 bg-white'
                  } ${answered ? 'cursor-default' : 'cursor-pointer'}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-gray-900 font-medium">{option}</span>
                    {answered && (
                      <>
                        {index === currentQuestion.correctAnswer && (
                          <CheckCircle className="w-6 h-6 text-green-500" />
                        )}
                        {selectedAnswer === index &&
                          index !== currentQuestion.correctAnswer && (
                            <XCircle className="w-6 h-6 text-red-500" />
                          )}
                      </>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Botón responder */}
            {!answered && (
              <button
                onClick={handleSubmitAnswer}
                disabled={selectedAnswer === null}
                className={`w-full py-3 px-6 rounded-xl font-bold text-white transition-all ${
                  selectedAnswer === null
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-lg'
                }`}
              >
                Responder
              </button>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Retroalimentación */}
        {answered && feedback && !showingReinforcement && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`rounded-3xl shadow-xl p-8 mb-8 border-l-4 ${
              feedback.isCorrect
                ? 'bg-green-50 border-green-500'
                : 'bg-orange-50 border-orange-500'
            }`}
          >
            {/* Resultado */}
            <div className="flex items-center gap-3 mb-4">
              {feedback.isCorrect ? (
                <>
                  <CheckCircle className="w-8 h-8 text-green-600" />
                  <h3 className="text-2xl font-bold text-green-900">
                    ¡Correcto!
                  </h3>
                </>
              ) : (
                <>
                  <XCircle className="w-8 h-8 text-orange-600" />
                  <h3 className="text-2xl font-bold text-orange-900">
                    No es correcto
                  </h3>
                </>
              )}
            </div>

            {/* Explicación */}
            <p className="text-gray-800 mb-4">{feedback.explanation}</p>

            {/* Pistas */}
            {feedback.hints.length > 0 && (
              <div className="mb-4 bg-white bg-opacity-50 rounded-lg p-4">
                <p className="text-sm font-bold text-gray-700 mb-2">Pistas:</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  {feedback.hints.map((hint, i) => (
                    <li key={i}>• {hint}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Botón continuar */}
            <button
              onClick={handleContinue}
              className="w-full py-3 px-6 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-lg transition-all"
            >
              {feedback.reinforcementQuestion
                ? 'Pregunta de Refuerzo'
                : 'Siguiente Pregunta'}
            </button>
          </motion.div>
        )}

        {/* Pregunta de Refuerzo */}
        {showingReinforcement && feedback?.reinforcementQuestion && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-yellow-50 rounded-3xl shadow-xl p-8 border-l-4 border-yellow-500"
          >
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-6 h-6 text-yellow-600" />
              <h3 className="text-lg font-bold text-yellow-900">
                Pregunta de Refuerzo
              </h3>
            </div>

            <p className="text-gray-800 mb-6 font-medium">
              {feedback.reinforcementQuestion.question}
            </p>

            <div className="space-y-3">
              {feedback.reinforcementQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (index === feedback.reinforcementQuestion?.correctAnswer) {
                      setAnsweringReinforcement(false);
                      loadNextQuestion();
                    }
                  }}
                  className="w-full p-3 rounded-lg border-2 border-yellow-300 bg-white hover:bg-yellow-100 text-left text-gray-900 font-medium transition-all"
                >
                  {option}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
