/**
 * HOOK: useAdaptiveAssessment
 * Integra todo el flujo de evaluación diagnóstica adaptativa
 */

import { useState, useCallback } from 'react';
import { AdaptiveAssessmentEngine } from '../services/adaptiveAssessment';
import { DiagnosticEngine, LearningProfile } from '../services/diagnosticEngine';
import {
  ContentRecommendationEngine,
  PersonalizedContentPlan,
} from '../services/contentRecommendation';
import { GeminiAITutor } from '../services/geminAITutor';

export interface AssessmentState {
  stage: 'quiz' | 'diagnostic' | 'content' | 'completed';
  quizResults?: any;
  diagnosticProfile?: LearningProfile;
  contentPlan?: PersonalizedContentPlan;
  isLoading: boolean;
  error?: string;
}

export function useAdaptiveAssessment(studentId: string) {
  const [state, setState] = useState<AssessmentState>({
    stage: 'quiz',
    isLoading: false,
  });

  const [assessmentEngine] = useState(() => new AdaptiveAssessmentEngine());
  const [geminiTutor] = useState(() => new GeminiAITutor());

  /**
   * INICIAR QUIZ ADAPTATIVO
   */
  const startQuiz = useCallback(() => {
    setState({
      stage: 'quiz',
      isLoading: false,
    });
  }, []);

  /**
   * COMPLETAR QUIZ Y GENERAR DIAGNÓSTICO
   */
  const completeQuiz = useCallback(async (quizResults: any) => {
    setState(prev => ({
      ...prev,
      isLoading: true,
      quizResults,
    }));

    try {
      // Generar perfil diagnóstico
      const diagnosticProfile = DiagnosticEngine.generateLearningProfile(
        studentId,
        quizResults.state
      );

      // Generar plan de contenido personalizado
      const contentPlan =
        ContentRecommendationEngine.generatePersonalizedPlan(diagnosticProfile);

      setState(prev => ({
        ...prev,
        stage: 'diagnostic',
        diagnosticProfile,
        contentPlan,
        isLoading: false,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: 'Error al generar diagnóstico',
        isLoading: false,
      }));
    }
  }, [studentId]);

  /**
   * PASAR A CONTENIDO PERSONALIZADO
   */
  const viewPersonalizedContent = useCallback(() => {
    if (state.diagnosticProfile && state.contentPlan) {
      setState(prev => ({
        ...prev,
        stage: 'content',
      }));
    }
  }, [state.diagnosticProfile, state.contentPlan]);

  /**
   * COMPLETAR ASSESSMENT
   */
  const completeAssessment = useCallback(() => {
    setState(prev => ({
      ...prev,
      stage: 'completed',
    }));
  }, []);

  /**
   * OBTENER TUTOR IA
   */
  const getTutor = useCallback(() => {
    return geminiTutor;
  }, []);

  return {
    state,
    assessmentEngine,
    geminiTutor,
    startQuiz,
    completeQuiz,
    viewPersonalizedContent,
    completeAssessment,
    getTutor,
  };
}
