/**
 * SISTEMA ADAPTATIVO DE EVALUACIÓN
 * Selecciona preguntas dinámicamente según respuestas previas
 */

import { 
  Question, 
  questionBank, 
  Difficulty, 
  Subject,
  Competency,
  questionsByCompetency,
  questionsByDifficulty
} from '../data/questionBank';

export interface AdaptiveState {
  currentQuestion: Question;
  questionsAsked: Question[];
  answersHistory: {
    question: Question;
    selectedAnswer: number;
    isCorrect: boolean;
    timestamp: number;
  }[];
  currentDifficulty: Difficulty;
  currentSubject: Subject;
  streakCorrect: number;
  streakIncorrect: number;
  competencyPerformance: {
    [key in Competency]: {
      correct: number;
      total: number;
      difficulty: Difficulty;
    };
  };
}

export class AdaptiveAssessmentEngine {
  private state: AdaptiveState;
  private readonly QUESTIONS_TOTAL = 25; // Total de preguntas a hacer
  private readonly DIFFICULTY_UP_THRESHOLD = 2; // Aciertos seguidos para subir
  private readonly DIFFICULTY_DOWN_THRESHOLD = 2; // Fallos para bajar

  constructor() {
    this.state = this.initializeState();
  }

  private initializeState(): AdaptiveState {
    const competencies: Competency[] = [
      'cantidad',
      'regularidad',
      'forma_movimiento',
      'gestión_datos',
      'comprensión_lectora',
      'producción_textos',
      'gramática_ortografía',
      'vocabulario',
    ];

    const performanceInit = competencies.reduce((acc, comp) => {
      acc[comp] = { correct: 0, total: 0, difficulty: 'básico' };
      return acc;
    }, {} as AdaptiveState['competencyPerformance']);

    return {
      currentQuestion: null as any,
      questionsAsked: [],
      answersHistory: [],
      currentDifficulty: 'básico',
      currentSubject: 'matemática',
      streakCorrect: 0,
      streakIncorrect: 0,
      competencyPerformance: performanceInit,
    };
  }

  /**
   * OBTENER SIGUIENTE PREGUNTA
   * Estrategia adaptativa:
   * 1. Primero pregunta sobre Matemática básico
   * 2. Luego Comunicación básico
   * 3. Sube dificultad según desempeño
   * 4. Alterna entre competencias según necesidad
   */
  getNextQuestion(): Question {
    const questionsAsked = this.state.questionsAsked.length;

    // Si ya completó todas las preguntas
    if (questionsAsked >= this.QUESTIONS_TOTAL) {
      throw new Error('Assessment completado');
    }

    let nextQuestion: Question;

    // Estrategia por etapa
    if (questionsAsked < 5) {
      // Primeros 5: Matemática Básico
      nextQuestion = this.selectQuestionByCompetency('cantidad', 'básico');
    } else if (questionsAsked < 10) {
      // 6-10: Comunicación Básico
      nextQuestion = this.selectQuestionByCompetency('comprensión_lectora', 'básico');
    } else {
      // 11+: Adaptativo - sube dificultad según desempeño
      nextQuestion = this.selectAdaptiveQuestion();
    }

    // Validar que no repita pregunta
    while (this.state.questionsAsked.some(q => q.id === nextQuestion.id)) {
      nextQuestion = this.selectQuestionByCompetency(nextQuestion.competency, nextQuestion.difficulty);
    }

    this.state.currentQuestion = nextQuestion;
    return nextQuestion;
  }

  /**
   * SELECCIONAR PREGUNTA POR COMPETENCIA Y DIFICULTAD
   */
  private selectQuestionByCompetency(
    competency: Competency,
    difficulty: Difficulty
  ): Question {
    const candidates = Object.values(questionBank).filter(
      q => q.competency === competency && q.difficulty === difficulty
    );

    if (candidates.length === 0) {
      // Si no hay preguntas en esa dificultad, buscar en otra
      return Object.values(questionBank).find(
        q => q.competency === competency && q.difficulty !== difficulty
      ) || Object.values(questionBank)[0];
    }

    return candidates[Math.floor(Math.random() * candidates.length)];
  }

  /**
   * SELECCIONAR PREGUNTA ADAPTATIVA
   * Sube/baja dificultad según desempeño actual
   */
  private selectAdaptiveQuestion(): Question {
    // Determinar competencia a evaluar (alterna)
    const competencies: Competency[] = [
      'cantidad',
      'regularidad',
      'forma_movimiento',
      'gestión_datos',
      'comprensión_lectora',
      'producción_textos',
      'gramática_ortografía',
      'vocabulario',
    ];

    // Seleccionar competencia con menor puntuación
    const competencyWithLowestScore = competencies.reduce((lowest, current) => {
      const lowestScore = this.state.competencyPerformance[lowest].correct / 
                         Math.max(1, this.state.competencyPerformance[lowest].total);
      const currentScore = this.state.competencyPerformance[current].correct / 
                          Math.max(1, this.state.competencyPerformance[current].total);
      return currentScore < lowestScore ? current : lowest;
    });

    let difficulty = this.state.competencyPerformance[competencyWithLowestScore].difficulty;

    // Lógica para cambiar dificultad
    if (this.state.streakCorrect >= this.DIFFICULTY_UP_THRESHOLD) {
      // Subir dificultad
      if (difficulty === 'básico') difficulty = 'intermedio';
      else if (difficulty === 'intermedio') difficulty = 'avanzado';
      this.state.streakCorrect = 0;
    } else if (this.state.streakIncorrect >= this.DIFFICULTY_DOWN_THRESHOLD) {
      // Bajar dificultad
      if (difficulty === 'avanzado') difficulty = 'intermedio';
      else if (difficulty === 'intermedio') difficulty = 'básico';
      this.state.streakIncorrect = 0;
    }

    return this.selectQuestionByCompetency(competencyWithLowestScore, difficulty);
  }

  /**
   * REGISTRAR RESPUESTA DEL ESTUDIANTE
   */
  recordAnswer(selectedAnswerIndex: number): boolean {
    const question = this.state.currentQuestion;
    const isCorrect = selectedAnswerIndex === question.correctAnswer;

    // Registrar en historial
    this.state.answersHistory.push({
      question,
      selectedAnswer: selectedAnswerIndex,
      isCorrect,
      timestamp: Date.now(),
    });

    this.state.questionsAsked.push(question);

    // Actualizar racha
    if (isCorrect) {
      this.state.streakCorrect++;
      this.state.streakIncorrect = 0;
    } else {
      this.state.streakIncorrect++;
      this.state.streakCorrect = 0;
    }

    // Actualizar performance por competencia
    const comp = question.competency;
    this.state.competencyPerformance[comp].total++;
    if (isCorrect) {
      this.state.competencyPerformance[comp].correct++;
    }

    return isCorrect;
  }

  /**
   * OBTENER EXPLICACIÓN Y RETROALIMENTACIÓN
   */
  getExplanation(): {
    explanation: string;
    hints: string[];
    reinforcementQuestion?: Question;
  } {
    const question = this.state.currentQuestion;
    const lastAnswer = this.state.answersHistory[this.state.answersHistory.length - 1];

    const result = {
      explanation: question.explanation,
      hints: question.hints,
      reinforcementQuestion: undefined as Question | undefined,
    };

    // Si falló, proporcionar pregunta de refuerzo
    if (!lastAnswer.isCorrect) {
      // Buscar una pregunta más fácil de la misma competencia
      const easyQuestions = Object.values(questionBank).filter(
        q => q.competency === question.competency && q.difficulty === 'básico'
      );
      if (easyQuestions.length > 0) {
        result.reinforcementQuestion = easyQuestions[
          Math.floor(Math.random() * easyQuestions.length)
        ];
      }
    }

    return result;
  }

  /**
   * OBTENER ESTADO ACTUAL
   */
  getCurrentState(): AdaptiveState {
    return { ...this.state };
  }

  /**
   * CALCULAR DIFICULTAD FINAL POR COMPETENCIA
   */
  getFinalDifficulty(competency: Competency): Difficulty {
    const perf = this.state.competencyPerformance[competency];
    if (perf.total === 0) return 'básico';

    const percentage = (perf.correct / perf.total) * 100;

    if (percentage >= 80) return 'avanzado';
    if (percentage >= 50) return 'intermedio';
    return 'básico';
  }

  /**
   * ¿ASSESSMENT COMPLETADO?
   */
  isCompleted(): boolean {
    return this.state.questionsAsked.length >= this.QUESTIONS_TOTAL;
  }

  /**
   * PORCENTAJE DE PROGRESO
   */
  getProgressPercentage(): number {
    return (this.state.questionsAsked.length / this.QUESTIONS_TOTAL) * 100;
  }

  /**
   * OBTENER RESUMEN DE COMPETENCIAS
   */
  getCompetencySummary() {
    return Object.entries(this.state.competencyPerformance).map(
      ([competency, performance]) => ({
        competency: competency as Competency,
        correct: performance.correct,
        total: performance.total,
        percentage: performance.total > 0 ? (performance.correct / performance.total) * 100 : 0,
        difficulty: this.getFinalDifficulty(competency as Competency),
      })
    );
  }

  /**
   * OBTENER SCORE GENERAL
   */
  getOverallScore(): { percentage: number; difficulty: Difficulty } {
    const totalCorrect = this.state.answersHistory.filter(a => a.isCorrect).length;
    const totalQuestions = this.state.answersHistory.length;
    const percentage = (totalCorrect / totalQuestions) * 100;

    let difficulty: Difficulty = 'básico';
    if (percentage >= 80) difficulty = 'avanzado';
    else if (percentage >= 50) difficulty = 'intermedio';

    return { percentage, difficulty };
  }
}

// Instancia global (singleton)
export const assessmentEngine = new AdaptiveAssessmentEngine();
