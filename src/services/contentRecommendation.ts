/**
 * SISTEMA DE RECOMENDACIÓN DE CONTENIDO PERSONALIZADO
 * Sugiere recursos, ejercicios y rutas según el perfil del estudiante
 */

import { LearningProfile, LearningPath, CompetencyProfile } from './diagnosticEngine';
import { Competency, Difficulty } from '../data/questionBank';

export interface ContentResource {
  id: string;
  title: string;
  type: 'video' | 'ejercicio' | 'lectura' | 'interactivo' | 'cuestionario';
  competency: Competency;
  difficulty: Difficulty;
  duration: number; // en minutos
  description: string;
  url?: string;
  tags: string[];
  rating: number; // 1-5
  downloads: number;
}

export interface PersonalizedContentPlan {
  studentId: string;
  generatedAt: number;
  weeklySchedule: DailySchedule[];
  recommendedResources: ContentResource[];
  tutoringSessions: TutoringSession[];
  milestones: Milestone[];
}

export interface DailySchedule {
  day: string;
  competencies: {
    competency: Competency;
    duration: number; // minutos
    activities: string[];
  }[];
  totalTime: number;
}

export interface TutoringSession {
  id: string;
  competency: Competency;
  topic: string;
  difficulty: Difficulty;
  duration: number;
  objectives: string[];
  requiredBefore: string[]; // IDs de recursos previos
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  competency: Competency;
  targetScore: number; // 0-100
  estimatedDays: number;
  reward: string;
}

// BASE DE RECURSOS DE CONTENIDO
const contentLibrary: ContentResource[] = [
  // MATEMÁTICA - CANTIDAD - BÁSICO
  {
    id: 'res_mat_cant_bas_001',
    title: 'Suma y Resta: Lo Básico',
    type: 'video',
    competency: 'cantidad',
    difficulty: 'básico',
    duration: 12,
    description: 'Comprende las operaciones fundamentales de suma y resta con números enteros',
    url: 'https://example.com/videos/suma-resta-basico',
    tags: ['aritmética', 'números', 'operaciones'],
    rating: 4.8,
    downloads: 15420,
  },
  {
    id: 'res_mat_cant_bas_002',
    title: 'Ejercicios: Suma de Números Positivos',
    type: 'ejercicio',
    competency: 'cantidad',
    difficulty: 'básico',
    duration: 20,
    description: '50 ejercicios progresivos de suma',
    url: 'https://example.com/ejercicios/suma-basico',
    tags: ['práctica', 'suma', 'números'],
    rating: 4.5,
    downloads: 12000,
  },
  {
    id: 'res_mat_cant_bas_003',
    title: 'Fracciones Simples Explicadas',
    type: 'video',
    competency: 'cantidad',
    difficulty: 'básico',
    duration: 15,
    description: 'Introducción a fracciones con ejemplos visuales',
    url: 'https://example.com/videos/fracciones-basico',
    tags: ['fracciones', 'números racionales'],
    rating: 4.7,
    downloads: 9800,
  },
  {
    id: 'res_mat_cant_int_001',
    title: 'Operaciones con Fracciones',
    type: 'video',
    competency: 'cantidad',
    difficulty: 'intermedio',
    duration: 18,
    description: 'Suma, resta, multiplicación de fracciones',
    url: 'https://example.com/videos/fracciones-intermedio',
    tags: ['fracciones', 'operaciones', 'álgebra'],
    rating: 4.6,
    downloads: 7500,
  },
  {
    id: 'res_mat_cant_int_002',
    title: 'Problemas de Porcentajes',
    type: 'ejercicio',
    competency: 'cantidad',
    difficulty: 'intermedio',
    duration: 30,
    description: 'Resuelve 40 problemas contextualizados de porcentajes',
    url: 'https://example.com/ejercicios/porcentajes',
    tags: ['porcentajes', 'aplicaciones', 'contexto'],
    rating: 4.4,
    downloads: 6200,
  },

  // MATEMÁTICA - REGULARIDAD - BÁSICO
  {
    id: 'res_mat_reg_bas_001',
    title: 'Patrones Numéricos',
    type: 'video',
    competency: 'regularidad',
    difficulty: 'básico',
    duration: 14,
    description: 'Identifica y continúa secuencias simples',
    url: 'https://example.com/videos/patrones-basico',
    tags: ['patrones', 'sucesiones', 'lógica'],
    rating: 4.6,
    downloads: 8900,
  },
  {
    id: 'res_mat_reg_bas_002',
    title: 'Ejercicios de Secuencias',
    type: 'ejercicio',
    competency: 'regularidad',
    difficulty: 'básico',
    duration: 25,
    description: 'Práctica: Completa 60 secuencias numéricas',
    url: 'https://example.com/ejercicios/secuencias',
    tags: ['práctica', 'patrones'],
    rating: 4.5,
    downloads: 7100,
  },
  {
    id: 'res_mat_reg_int_001',
    title: 'Ecuaciones Simples',
    type: 'video',
    competency: 'regularidad',
    difficulty: 'intermedio',
    duration: 16,
    description: 'Resuelve ecuaciones lineales paso a paso',
    url: 'https://example.com/videos/ecuaciones-basico',
    tags: ['álgebra', 'ecuaciones', 'incógnitas'],
    rating: 4.7,
    downloads: 10200,
  },

  // MATEMÁTICA - FORMA - BÁSICO
  {
    id: 'res_mat_forma_bas_001',
    title: 'Geometría Básica: Figuras',
    type: 'video',
    competency: 'forma_movimiento',
    difficulty: 'básico',
    duration: 13,
    description: 'Reconoce y nombra figuras geométricas básicas',
    url: 'https://example.com/videos/figuras-basico',
    tags: ['geometría', 'figuras', 'formas'],
    rating: 4.8,
    downloads: 11300,
  },
  {
    id: 'res_mat_forma_bas_002',
    title: 'Perímetro y Área: Fórmulas',
    type: 'video',
    competency: 'forma_movimiento',
    difficulty: 'básico',
    duration: 17,
    description: 'Calcula perímetro y área de figuras básicas',
    url: 'https://example.com/videos/perimetro-area',
    tags: ['medición', 'área', 'perímetro'],
    rating: 4.6,
    downloads: 9600,
  },
  {
    id: 'res_mat_forma_int_001',
    title: 'Teorema de Pitágoras',
    type: 'video',
    competency: 'forma_movimiento',
    difficulty: 'intermedio',
    duration: 19,
    description: 'Comprende y aplica el Teorema de Pitágoras',
    url: 'https://example.com/videos/pitagoras',
    tags: ['triángulos', 'hipotenusa', 'geometría'],
    rating: 4.9,
    downloads: 14500,
  },

  // COMUNICACIÓN - COMPRENSIÓN LECTORA - BÁSICO
  {
    id: 'res_com_compr_bas_001',
    title: 'Comprensión Lectora: Niveles Básicos',
    type: 'video',
    competency: 'comprensión_lectora',
    difficulty: 'básico',
    duration: 11,
    description: 'Aprende a identificar ideas principales en textos simples',
    url: 'https://example.com/videos/comprension-basico',
    tags: ['lectura', 'comprensión', 'análisis'],
    rating: 4.7,
    downloads: 13200,
  },
  {
    id: 'res_com_compr_bas_002',
    title: 'Lecturas Guiadas para Principiantes',
    type: 'lectura',
    competency: 'comprensión_lectora',
    difficulty: 'básico',
    duration: 30,
    description: '10 textos cortos con preguntas de comprensión',
    url: 'https://example.com/lecturas/basico',
    tags: ['textos', 'práctica', 'comprensión'],
    rating: 4.5,
    downloads: 8700,
  },
  {
    id: 'res_com_compr_int_001',
    title: 'Inferencias y Lectura Crítica',
    type: 'video',
    competency: 'comprensión_lectora',
    difficulty: 'intermedio',
    duration: 16,
    description: 'Haz inferencias y analiza textos más complejos',
    url: 'https://example.com/videos/inferencias',
    tags: ['análisis', 'inferencia', 'crítica'],
    rating: 4.8,
    downloads: 9400,
  },

  // COMUNICACIÓN - PRODUCCIÓN DE TEXTOS - BÁSICO
  {
    id: 'res_com_prod_bas_001',
    title: 'Estructura de Oraciones Simples',
    type: 'video',
    competency: 'producción_textos',
    difficulty: 'básico',
    duration: 12,
    description: 'Aprende sujeto, verbo y predicado',
    url: 'https://example.com/videos/oraciones-basico',
    tags: ['gramática', 'oraciones', 'estructura'],
    rating: 4.6,
    downloads: 10100,
  },
  {
    id: 'res_com_prod_bas_002',
    title: 'Ejercicios de Escritura Básica',
    type: 'ejercicio',
    competency: 'producción_textos',
    difficulty: 'básico',
    duration: 35,
    description: 'Escribe 20 oraciones correctas según instrucciones',
    url: 'https://example.com/ejercicios/escritura-basico',
    tags: ['escritura', 'práctica', 'corrección'],
    rating: 4.4,
    downloads: 6800,
  },
  {
    id: 'res_com_prod_int_001',
    title: 'Párrafos Coherentes',
    type: 'video',
    competency: 'producción_textos',
    difficulty: 'intermedio',
    duration: 15,
    description: 'Estructura párrafos con introducción y conclusión',
    url: 'https://example.com/videos/parrafos',
    tags: ['párrafos', 'coherencia', 'estructura'],
    rating: 4.7,
    downloads: 8200,
  },

  // COMUNICACIÓN - GRAMÁTICA Y ORTOGRAFÍA - BÁSICO
  {
    id: 'res_com_gram_bas_001',
    title: 'Ortografía Fundamental',
    type: 'video',
    competency: 'gramática_ortografía',
    difficulty: 'básico',
    duration: 13,
    description: 'Reglas básicas de acentuación y escritura',
    url: 'https://example.com/videos/ortografia-basico',
    tags: ['ortografía', 'acentos', 'escritura'],
    rating: 4.5,
    downloads: 11500,
  },
  {
    id: 'res_com_gram_bas_002',
    title: 'Cuestionario de Ortografía',
    type: 'cuestionario',
    competency: 'gramática_ortografía',
    difficulty: 'básico',
    duration: 20,
    description: '100 palabras para escribir correctamente',
    url: 'https://example.com/quizzes/ortografia',
    tags: ['ortografía', 'práctica', 'evaluación'],
    rating: 4.3,
    downloads: 7900,
  },

  // COMUNICACIÓN - VOCABULARIO - BÁSICO
  {
    id: 'res_com_vocab_bas_001',
    title: 'Sinónimos y Antónimos Básicos',
    type: 'video',
    competency: 'vocabulario',
    difficulty: 'básico',
    duration: 11,
    description: 'Aprende palabras con significados similares y opuestos',
    url: 'https://example.com/videos/sinonimos-basico',
    tags: ['vocabulario', 'sinónimos', 'antónimos'],
    rating: 4.6,
    downloads: 9200,
  },
  {
    id: 'res_com_vocab_bas_002',
    title: 'Juego de Palabras Interactivo',
    type: 'interactivo',
    competency: 'vocabulario',
    difficulty: 'básico',
    duration: 25,
    description: 'Aprende 200 palabras nuevas jugando',
    url: 'https://example.com/games/vocabulario',
    tags: ['vocabulario', 'juego', 'práctica'],
    rating: 4.7,
    downloads: 12300,
  },
];

export class ContentRecommendationEngine {
  /**
   * GENERAR PLAN DE CONTENIDO PERSONALIZADO
   */
  static generatePersonalizedPlan(
    profile: LearningProfile
  ): PersonalizedContentPlan {
    const recommendedResources = this.selectResources(profile);
    const weeklySchedule = this.createWeeklySchedule(profile);
    const tutoringSessions = this.generateTutoringSessions(profile);
    const milestones = this.createMilestones(profile);

    return {
      studentId: profile.studentId,
      generatedAt: Date.now(),
      weeklySchedule,
      recommendedResources,
      tutoringSessions,
      milestones,
    };
  }

  /**
   * SELECCIONAR RECURSOS PERSONALIZADOS
   */
  private static selectResources(profile: LearningProfile): ContentResource[] {
    const selected: ContentResource[] = [];
    const usedIds = new Set<string>();

    // Priorizar recursos para áreas débiles
    for (const competency of profile.mathematicsProfile.competencies) {
      if (competency.strength === 'bajo' || competency.strength === 'medio') {
        const resources = contentLibrary.filter(
          r => r.competency === competency.competency &&
                r.difficulty === competency.level &&
                !usedIds.has(r.id)
        );

        // Seleccionar por tipo: video + ejercicio + cuestionario
        const video = resources.find(r => r.type === 'video');
        const exercise = resources.find(r => r.type === 'ejercicio');
        const quiz = resources.find(r => r.type === 'cuestionario');

        [video, exercise, quiz].forEach(r => {
          if (r && !usedIds.has(r.id)) {
            selected.push(r);
            usedIds.add(r.id);
          }
        });
      }
    }

    for (const competency of profile.communicationProfile.competencies) {
      if (competency.strength === 'bajo' || competency.strength === 'medio') {
        const resources = contentLibrary.filter(
          r => r.competency === competency.competency &&
                r.difficulty === competency.level &&
                !usedIds.has(r.id)
        );

        const video = resources.find(r => r.type === 'video');
        const exercise = resources.find(r => r.type === 'ejercicio' || r.type === 'lectura');
        const quiz = resources.find(r => r.type === 'cuestionario');

        [video, exercise, quiz].forEach(r => {
          if (r && !usedIds.has(r.id)) {
            selected.push(r);
            usedIds.add(r.id);
          }
        });
      }
    }

    // Agregar recursos de profundización para áreas fuertes
    for (const competency of [...profile.mathematicsProfile.competencies, 
                               ...profile.communicationProfile.competencies]) {
      if (competency.strength === 'alto') {
        const advancedResources = contentLibrary.filter(
          r => r.competency === competency.competency &&
                r.difficulty === 'avanzado' &&
                !usedIds.has(r.id)
        );

        if (advancedResources.length > 0) {
          selected.push(advancedResources[0]);
          usedIds.add(advancedResources[0].id);
        }
      }
    }

    return selected.slice(0, 15); // Máximo 15 recursos
  }

  /**
   * CREAR HORARIO SEMANAL PERSONALIZADO
   */
  private static createWeeklySchedule(profile: LearningProfile): DailySchedule[] {
    const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    const schedule: DailySchedule[] = [];

    // Distribuir competencias débiles entre semana
    const weakCompetencies = [
      ...profile.mathematicsProfile.competencies.filter(c => c.strength === 'bajo' || c.strength === 'medio'),
      ...profile.communicationProfile.competencies.filter(c => c.strength === 'bajo' || c.strength === 'medio'),
    ];

    const dailyDuration = profile.suggestedPace === 'rápido' ? 90 : 
                          profile.suggestedPace === 'normal' ? 60 : 45;

    for (let i = 0; i < 7; i++) {
      const competencyIndex = i % weakCompetencies.length;
      const comp = weakCompetencies[competencyIndex];

      schedule.push({
        day: days[i],
        competencies: [
          {
            competency: comp.competency,
            duration: dailyDuration,
            activities: [
              `Video: ${comp.name}`,
              `Ejercicios prácticos`,
              `Revisión`,
            ],
          },
        ],
        totalTime: dailyDuration,
      });
    }

    return schedule;
  }

  /**
   * GENERAR SESIONES DE TUTORÍA CON IA
   */
  private static generateTutoringSessions(profile: LearningProfile): TutoringSession[] {
    const sessions: TutoringSession[] = [];

    // Crear sesiones para competencias débiles
    const weakCompetencies = [
      ...profile.mathematicsProfile.competencies.filter(c => c.strength === 'bajo'),
      ...profile.communicationProfile.competencies.filter(c => c.strength === 'bajo'),
    ];

    weakCompetencies.slice(0, 3).forEach((comp, index) => {
      sessions.push({
        id: `tutor_${index}`,
        competency: comp.competency,
        topic: `Fundamentos de ${comp.name}`,
        difficulty: 'básico',
        duration: 30,
        objectives: comp.recommendations.slice(0, 2),
        requiredBefore: [],
      });
    });

    return sessions;
  }

  /**
   * CREAR HITOS Y OBJETIVOS
   */
  private static createMilestones(profile: LearningProfile): Milestone[] {
    const milestones: Milestone[] = [];

    // Hito 1: Mejorar áreas débiles
    if (profile.weaknesses.length > 0) {
      milestones.push({
        id: 'milestone_1',
        title: 'Supera tus puntos débiles',
        description: `Mejora tu desempeño en: ${profile.weaknesses.join(', ')}`,
        competency: 'cantidad',
        targetScore: 75,
        estimatedDays: 14,
        reward: 'Insignia "Persistencia"',
      });
    }

    // Hito 2: Domina una competencia
    if (profile.strengths.length > 0) {
      milestones.push({
        id: 'milestone_2',
        title: 'Domina una competencia completa',
        description: `Alcanza 90% en ${profile.strengths[0].split(':')[0]}`,
        competency: 'cantidad',
        targetScore: 90,
        estimatedDays: 21,
        reward: 'Insignia "Experto"',
      });
    }

    // Hito 3: Completa la ruta personalizada
    milestones.push({
      id: 'milestone_3',
      title: 'Completa tu ruta personalizada',
      description: 'Termina todos los módulos recomendados',
      competency: 'cantidad',
      targetScore: 75,
      estimatedDays: 30,
      reward: 'Certificado de Completitud',
    });

    return milestones;
  }

  /**
   * OBTENER RECURSOS POR COMPETENCIA
   */
  static getResourcesByCompetency(
    competency: Competency,
    difficulty: Difficulty,
    limit: number = 5
  ): ContentResource[] {
    return contentLibrary
      .filter(r => r.competency === competency && r.difficulty === difficulty)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit);
  }

  /**
   * OBTENER RECURSOS RECOMENDADOS
   */
  static getTrendingResources(limit: number = 10): ContentResource[] {
    return contentLibrary
      .sort((a, b) => b.downloads - a.downloads)
      .slice(0, limit);
  }

  /**
   * BUSCAR RECURSOS
   */
  static searchResources(query: string): ContentResource[] {
    const lowerQuery = query.toLowerCase();
    return contentLibrary.filter(
      r => r.title.toLowerCase().includes(lowerQuery) ||
           r.description.toLowerCase().includes(lowerQuery) ||
           r.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  }
}
