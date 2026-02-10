/**
 * COMPONENTE: Flujo Completo de Evaluación Diagnóstica
 * Integra Quiz → Diagnóstico → Contenido Personalizado
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AdaptiveAssessmentQuiz } from './AdaptiveAssessmentQuiz';
import { DiagnosticReport } from './DiagnosticReport';
import { PersonalizedContent } from './PersonalizedContent';
import { useAuth } from '../contexts/AuthContext';
import { useAdaptiveAssessment } from '../hooks/useAdaptiveAssessment';
import { DiagnosticEngine, LearningProfile } from '../services/diagnosticEngine';
import {
  ContentRecommendationEngine,
  PersonalizedContentPlan,
} from '../services/contentRecommendation';
import { ContentResource } from '../services/contentRecommendation';

export function DiagnosticAssessmentFlow() {
  const { student, updateDiagnosticProfile } = useAuth();
  const [assessmentState, setAssessmentState] = useState<
    'quiz' | 'diagnostic' | 'content' | 'completed'
  >('quiz');
  const [diagnosticProfile, setDiagnosticProfile] = useState<
    LearningProfile | undefined
  >();
  const [contentPlan, setContentPlan] = useState<
    PersonalizedContentPlan | undefined
  >();
  const [isLoading, setIsLoading] = useState(false);

  if (!student) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-gray-900">Error</h1>
          <p className="text-gray-600 mt-4">
            Debes estar autenticado para acceder a la evaluación.
          </p>
        </div>
      </div>
    );
  }

  // Si ya completó la evaluación
  if (student.assessmentCompleted && student.diagnosticProfile) {
    return (
      <PersonalizedContent
        profile={student.diagnosticProfile}
        contentPlan={student.contentPlan!}
        onSelectResource={(resource: ContentResource) => {
          console.log('Selected resource:', resource);
          // Implementar navegación a recurso
        }}
        onStartTutoring={() => {
          console.log('Start tutoring');
          // Implementar inicio de tutoría
        }}
      />
    );
  }

  const handleQuizComplete = async (results: any) => {
    setIsLoading(true);
    try {
      // Generar diagnóstico
      const profile = DiagnosticEngine.generateLearningProfile(
        student.id,
        results.state
      );
      setDiagnosticProfile(profile);

      // Generar plan de contenido
      const plan = ContentRecommendationEngine.generatePersonalizedPlan(profile);
      setContentPlan(plan);

      // Guardar en context
      updateDiagnosticProfile(profile, plan);

      setAssessmentState('diagnostic');
    } catch (error) {
      console.error('Error generating diagnostic:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewContent = () => {
    setAssessmentState('content');
  };

  const handleSelectResource = (resource: ContentResource) => {
    console.log('Selected resource:', resource);
    // Implementar redirección a recurso
  };

  const handleStartTutoring = () => {
    console.log('Start tutoring session');
    // Implementar sesión de tutoría
  };

  return (
    <AnimatePresence mode="wait">
      {assessmentState === 'quiz' && (
        <motion.div
          key="quiz"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <AdaptiveAssessmentQuiz
            onComplete={handleQuizComplete}
            studentId={student.id}
          />
        </motion.div>
      )}

      {assessmentState === 'diagnostic' && diagnosticProfile && (
        <motion.div
          key="diagnostic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <DiagnosticReport
            profile={diagnosticProfile}
            onContinue={handleViewContent}
          />
        </motion.div>
      )}

      {assessmentState === 'content' &&
        diagnosticProfile &&
        contentPlan && (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <PersonalizedContent
              profile={diagnosticProfile}
              contentPlan={contentPlan}
              onSelectResource={handleSelectResource}
              onStartTutoring={handleStartTutoring}
            />
          </motion.div>
        )}

      {/* Loading overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 text-center">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h2 className="text-xl font-bold text-gray-900">
              Generando tu perfil personalizado...
            </h2>
            <p className="text-gray-600 text-sm mt-2">
              Esto puede tomar algunos momentos
            </p>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
