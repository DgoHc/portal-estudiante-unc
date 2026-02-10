/**
 * MOTOR DE DIAGNÓSTICO Y GENERACIÓN DE PERFIL
 * Analiza resultados y crea perfil detallado del estudiante
 */

import { Difficulty, Competency } from '../data/questionBank';
import { AdaptiveState } from './adaptiveAssessment';

export interface CompetencyProfile {
  name: string;
  competency: Competency;
  subject: 'matemática' | 'comunicación';
  level: Difficulty;
  score: number; // 0-100
  strength: 'alto' | 'medio' | 'bajo';
  questionsCorrect: number;
  questionsTotal: number;
  recommendations: string[];
}

export interface LearningProfile {
  studentId: string;
  timestamp: number;
  overallScore: number; // 0-100
  overallLevel: Difficulty;
  mathematicsProfile: {
    level: Difficulty;
    competencies: CompetencyProfile[];
    overallScore: number;
  };
  communicationProfile: {
    level: Difficulty;
    competencies: CompetencyProfile[];
    overallScore: number;
  };
  strengths: string[];
  weaknesses: string[];
  learningStyle: 'visual' | 'auditivo' | 'kinestésico' | 'mixto';
  suggestedPace: 'rápido' | 'normal' | 'lento';
  personalizedPath: LearningPath[];
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  competency: Competency;
  difficulty: Difficulty;
  estimatedHours: number;
  priority: 'alta' | 'media' | 'baja';
  resources: {
    videos: number;
    exercises: number;
    quizzes: number;
    tutor: boolean;
  };
}

export class DiagnosticEngine {
  /**
   * GENERAR PERFIL COMPLETO DEL ESTUDIANTE
   */
  static generateLearningProfile(
    studentId: string,
    assessmentState: AdaptiveState
  ): LearningProfile {
    // Calcular perfiles por materia
    const mathCompetencies = this.generateSubjectCompetencies(
      assessmentState,
      'matemática'
    );
    const commCompetencies = this.generateSubjectCompetencies(
      assessmentState,
      'comunicación'
    );

    // Calcular scores
    const mathScore = this.calculateSubjectScore(mathCompetencies);
    const commScore = this.calculateSubjectScore(commCompetencies);
    const overallScore = (mathScore + commScore) / 2;

    // Determinar niveles
    const mathLevel = this.difficultyFromScore(mathScore);
    const commLevel = this.difficultyFromScore(commScore);
    const overallLevel = this.difficultyFromScore(overallScore);

    // Identificar fortalezas y debilidades
    const { strengths, weaknesses } = this.identifyStrengthsAndWeaknesses(
      mathCompetencies,
      commCompetencies
    );

    // Generar rutas personalizadas
    const personalizedPath = this.generatePersonalizedPath(
      mathCompetencies,
      commCompetencies,
      overallLevel
    );

    // Determinar estilo de aprendizaje y ritmo
    const learningStyle = this.determineLearningStyle(
      mathCompetencies,
      commCompetencies
    );
    const suggestedPace = this.suggestPace(overallScore);

    return {
      studentId,
      timestamp: Date.now(),
      overallScore: Math.round(overallScore),
      overallLevel,
      mathematicsProfile: {
        level: mathLevel,
        competencies: mathCompetencies,
        overallScore: Math.round(mathScore),
      },
      communicationProfile: {
        level: commLevel,
        competencies: commCompetencies,
        overallScore: Math.round(commScore),
      },
      strengths,
      weaknesses,
      learningStyle,
      suggestedPace,
      personalizedPath,
    };
  }

  /**
   * GENERAR COMPETENCIAS POR MATERIA
   */
  private static generateSubjectCompetencies(
    state: AdaptiveState,
    subject: 'matemática' | 'comunicación'
  ): CompetencyProfile[] {
    const competencyMap: { [key: string]: string } = {
      cantidad: 'Números y Operaciones',
      regularidad: 'Patrones y Álgebra',
      forma_movimiento: 'Geometría y Espacialidad',
      gestión_datos: 'Datos e Incertidumbre',
      comprensión_lectora: 'Comprensión Lectora',
      producción_textos: 'Producción de Textos',
      gramática_ortografía: 'Gramática y Ortografía',
      vocabulario: 'Vocabulario y Semántica',
    };

    const subjectCompetencies: Competency[] = subject === 'matemática'
      ? ['cantidad', 'regularidad', 'forma_movimiento', 'gestión_datos']
      : ['comprensión_lectora', 'producción_textos', 'gramática_ortografía', 'vocabulario'];

    return subjectCompetencies.map(competency => {
      const perf = state.competencyPerformance[competency];
      const score = perf.total > 0 ? (perf.correct / perf.total) * 100 : 0;
      const level = this.difficultyFromScore(score);
      const strength = this.strengthFromScore(score);

      return {
        name: competencyMap[competency],
        competency,
        subject,
        level,
        score: Math.round(score),
        strength,
        questionsCorrect: perf.correct,
        questionsTotal: perf.total,
        recommendations: this.generateCompetencyRecommendations(
          competency,
          level,
          strength
        ),
      };
    });
  }

  /**
   * GENERAR RECOMENDACIONES POR COMPETENCIA
   */
  private static generateCompetencyRecommendations(
    competency: Competency,
    level: Difficulty,
    strength: 'alto' | 'medio' | 'bajo'
  ): string[] {
    const recommendations: { [key in Competency]: { [key in 'bajo' | 'medio' | 'alto']: string[] } } = {
      cantidad: {
        bajo: [
          'Refuerza operaciones básicas con números enteros',
          'Practica suma y resta con material visual',
          'Usa la recta numérica para operaciones',
        ],
        medio: [
          'Trabaja con fracciones y decimales',
          'Aplica operaciones en problemas contextuales',
          'Practica conversiones entre fracciones y decimales',
        ],
        alto: [
          'Explora operaciones con números irracionales',
          'Resuelve problemas complejos de proporcionalidad',
          'Aplica conceptos en situaciones de la vida real',
        ],
      },
      regularidad: {
        bajo: [
          'Identifica patrones simples (sucesiones)',
          'Practica reconocimiento de secuencias',
          'Trabaja con tablas de valores',
        ],
        medio: [
          'Estudia relaciones algebraicas básicas',
          'Resuelve ecuaciones simples',
          'Analiza gráficas de funciones',
        ],
        alto: [
          'Resuelve sistemas de ecuaciones',
          'Analiza funciones cuadráticas',
          'Aplica conceptos de cambio y variación',
        ],
      },
      forma_movimiento: {
        bajo: [
          'Identifica figuras geométricas básicas',
          'Calcula perímetros de figuras simples',
          'Reconoce ángulos en objetos cotidianos',
        ],
        medio: [
          'Calcula áreas de triángulos y cuadriláteros',
          'Aplica propiedades de figuras geométricas',
          'Resuelve problemas de simetría',
        ],
        alto: [
          'Aplica el Teorema de Pitágoras',
          'Calcula volúmenes de sólidos',
          'Analiza transformaciones geométricas',
        ],
      },
      gestión_datos: {
        bajo: [
          'Interpreta datos en tablas simples',
          'Calcula promedios de conjuntos pequeños',
          'Lee gráficos de barras y pictogramas',
        ],
        medio: [
          'Analiza medidas de tendencia central',
          'Interpreta gráficos complejos',
          'Calcula probabilidades básicas',
        ],
        alto: [
          'Analiza distribuciones de datos',
          'Resuelve problemas de probabilidad avanzada',
          'Interpreta información estadística compleja',
        ],
      },
      comprensión_lectora: {
        bajo: [
          'Lee textos simples e identifica ideas principales',
          'Responde preguntas literales sobre el texto',
          'Practica con textos cortos del interés del estudiante',
        ],
        medio: [
          'Identifica ideas implícitas en textos',
          'Hace inferencias de información leída',
          'Analiza estructura de textos narrativos',
        ],
        alto: [
          'Análisis crítico de textos complejos',
          'Identifica intención del autor',
          'Compara perspectivas en diferentes textos',
        ],
      },
      producción_textos: {
        bajo: [
          'Escribe oraciones simples con estructura correcta',
          'Practica el orden de ideas',
          'Utiliza conectores básicos (y, pero, porque)',
        ],
        medio: [
          'Escribe párrafos coherentes',
          'Organiza ideas en introducción, desarrollo, conclusión',
          'Utiliza variedad de conectores',
        ],
        alto: [
          'Produce textos con propósitos variados',
          'Adapta estilo según audiencia',
          'Revisa y mejora textos propios',
        ],
      },
      gramática_ortografía: {
        bajo: [
          'Aprende reglas básicas de ortografía',
          'Practica concordancia sujeto-verbo',
          'Identifica partes de la oración',
        ],
        medio: [
          'Domina reglas ortográficas complejas',
          'Usa correctamente tiempos verbales',
          'Maneja puntuación adecuadamente',
        ],
        alto: [
          'Aplica reglas de acentuación avanzadas',
          'Domina uso de subjuntivo e imperativo',
          'Diferencia registros lingüísticos',
        ],
      },
      vocabulario: {
        bajo: [
          'Construye vocabulario básico del nivel',
          'Aprende palabras por campos semánticos',
          'Practica con palabras de uso frecuente',
        ],
        medio: [
          'Aprende sinónimos y antónimos',
          'Estudia palabras en contexto',
          'Expande vocabulario académico',
        ],
        alto: [
          'Domina vocabulario especializado',
          'Comprende palabras por etimología',
          'Usa palabras según registro del contexto',
        ],
      },
    };

    return recommendations[competency][strength];
  }

  /**
   * IDENTIFICAR FORTALEZAS Y DEBILIDADES
   */
  private static identifyStrengthsAndWeaknesses(
    mathComp: CompetencyProfile[],
    commComp: CompetencyProfile[]
  ): { strengths: string[]; weaknesses: string[] } {
    const allCompetencies = [...mathComp, ...commComp];
    allCompetencies.sort((a, b) => b.score - a.score);

    const strengths = allCompetencies
      .filter(c => c.strength === 'alto')
      .slice(0, 3)
      .map(c => `${c.name}: ${c.score}%`);

    const weaknesses = allCompetencies
      .filter(c => c.strength === 'bajo')
      .slice(0, 3)
      .map(c => `${c.name}: ${c.score}%`);

    return { strengths, weaknesses };
  }

  /**
   * GENERAR RUTA PERSONALIZADA DE APRENDIZAJE
   */
  private static generatePersonalizedPath(
    mathComp: CompetencyProfile[],
    commComp: CompetencyProfile[],
    overallLevel: Difficulty
  ): LearningPath[] {
    const allCompetencies = [...mathComp, ...commComp];
    const paths: LearningPath[] = [];

    // Priorizar competencias débiles
    allCompetencies
      .filter(c => c.strength === 'bajo' || c.strength === 'medio')
      .sort((a, b) => a.score - b.score)
      .forEach((comp, index) => {
        const path: LearningPath = {
          id: `path_${comp.competency}`,
          title: `Fortalece: ${comp.name}`,
          description: `Módulo personalizado para mejorar tu desempeño en ${comp.name}`,
          competency: comp.competency,
          difficulty: comp.level,
          estimatedHours: this.estimateHours(comp.level),
          priority: index === 0 ? 'alta' : index === 1 ? 'media' : 'baja',
          resources: {
            videos: this.resourceCount(comp.level).videos,
            exercises: this.resourceCount(comp.level).exercises,
            quizzes: this.resourceCount(comp.level).quizzes,
            tutor: comp.strength === 'bajo', // Tutor para áreas muy débiles
          },
        };
        paths.push(path);
      });

    // Agregar caminos de profundización para áreas fuertes
    allCompetencies
      .filter(c => c.strength === 'alto')
      .slice(0, 2)
      .forEach(comp => {
        const path: LearningPath = {
          id: `path_adv_${comp.competency}`,
          title: `Profundiza: ${comp.name}`,
          description: `Ejercicios avanzados para dominar ${comp.name}`,
          competency: comp.competency,
          difficulty: 'avanzado',
          estimatedHours: this.estimateHours('avanzado'),
          priority: 'media',
          resources: {
            videos: this.resourceCount('avanzado').videos,
            exercises: this.resourceCount('avanzado').exercises,
            quizzes: this.resourceCount('avanzado').quizzes,
            tutor: false,
          },
        };
        paths.push(path);
      });

    return paths;
  }

  /**
   * DETERMINAR ESTILO DE APRENDIZAJE
   */
  private static determineLearningStyle(
    mathComp: CompetencyProfile[],
    commComp: CompetencyProfile[]
  ): 'visual' | 'auditivo' | 'kinestésico' | 'mixto' {
    const mathAvg = mathComp.reduce((sum, c) => sum + c.score, 0) / mathComp.length;
    const commAvg = commComp.reduce((sum, c) => sum + c.score, 0) / commComp.length;

    // Si es equilibrado
    if (Math.abs(mathAvg - commAvg) < 15) return 'mixto';

    // Si destaca en matemática (espacial/visual)
    if (mathAvg > commAvg) return 'visual';

    // Si destaca en comunicación (auditivo/verbal)
    return 'auditivo';
  }

  /**
   * SUGERIR RITMO DE APRENDIZAJE
   */
  private static suggestPace(overallScore: number): 'rápido' | 'normal' | 'lento' {
    if (overallScore >= 80) return 'rápido';
    if (overallScore >= 50) return 'normal';
    return 'lento';
  }

  /**
   * CONVERTIR SCORE A DIFICULTAD
   */
  private static difficultyFromScore(score: number): Difficulty {
    if (score >= 80) return 'avanzado';
    if (score >= 50) return 'intermedio';
    return 'básico';
  }

  /**
   * CONVERTIR SCORE A FORTALEZA
   */
  private static strengthFromScore(score: number): 'alto' | 'medio' | 'bajo' {
    if (score >= 75) return 'alto';
    if (score >= 50) return 'medio';
    return 'bajo';
  }

  /**
   * CALCULAR SCORE DE MATERIA
   */
  private static calculateSubjectScore(competencies: CompetencyProfile[]): number {
    if (competencies.length === 0) return 0;
    return competencies.reduce((sum, c) => sum + c.score, 0) / competencies.length;
  }

  /**
   * ESTIMAR HORAS DE ESTUDIO
   */
  private static estimateHours(difficulty: Difficulty): number {
    const estimates = {
      básico: 5,
      intermedio: 10,
      avanzado: 15,
    };
    return estimates[difficulty];
  }

  /**
   * CONTAR RECURSOS NECESARIOS
   */
  private static resourceCount(
    difficulty: Difficulty
  ): { videos: number; exercises: number; quizzes: number } {
    const resources = {
      básico: { videos: 3, exercises: 10, quizzes: 2 },
      intermedio: { videos: 5, exercises: 15, quizzes: 3 },
      avanzado: { videos: 7, exercises: 20, quizzes: 4 },
    };
    return resources[difficulty];
  }
}
