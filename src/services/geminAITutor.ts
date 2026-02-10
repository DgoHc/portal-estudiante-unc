/**
 * TUTOR IA INTELIGENTE - GEMINI API
 * Proporciona tutoría personalizada usando Google Gemini
 */

import { Competency, Difficulty } from '../data/questionBank';
import { LearningProfile } from './diagnosticEngine';

export interface TutorRequest {
  studentId: string;
  competency: Competency;
  topic: string;
  difficulty: Difficulty;
  studentLevel: Difficulty;
  previousErrors?: string[];
  questionAsked?: string;
}

export interface TutorResponse {
  explanation: string;
  stepByStep: string[];
  examples: Example[];
  tips: string[];
  relatedConcepts: string[];
  nextQuestion?: string;
  encouragement: string;
}

export interface Example {
  problem: string;
  solution: string;
  explanation: string;
}

export interface AITutoringSession {
  id: string;
  studentId: string;
  competency: Competency;
  startTime: number;
  messages: TutoringMessage[];
  ended: boolean;
}

export interface TutoringMessage {
  role: 'student' | 'tutor';
  content: string;
  timestamp: number;
  metadata?: {
    isCorrect?: boolean;
    conceptsTouched?: string[];
  };
}

export class GeminiAITutor {
  private apiKey: string;
  private apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';
  private sessions: Map<string, AITutoringSession> = new Map();

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.VITE_GEMINI_API_KEY || '';
    
    if (!this.apiKey) {
      console.warn('⚠️ GEMINI_API_KEY no configurada. Usando respuestas mock.');
    }
  }

  /**
   * CREAR SESIÓN DE TUTORÍA
   */
  createTutoringSession(
    studentId: string,
    competency: Competency,
    topic: string
  ): AITutoringSession {
    const sessionId = `session_${Date.now()}_${Math.random()}`;
    const session: AITutoringSession = {
      id: sessionId,
      studentId,
      competency,
      startTime: Date.now(),
      messages: [],
      ended: false,
    };

    this.sessions.set(sessionId, session);
    return session;
  }

  /**
   * OBTENER EXPLICACIÓN PERSONALIZADA
   */
  async getExplanation(request: TutorRequest): Promise<TutorResponse> {
    try {
      if (!this.apiKey) {
        return this.getMockExplanation(request);
      }

      const prompt = this.buildExplanationPrompt(request);
      const response = await this.callGeminiAPI(prompt);
      return this.parseExplanationResponse(response);
    } catch (error) {
      console.error('Error llamando Gemini API:', error);
      return this.getMockExplanation(request);
    }
  }

  /**
   * EVALUAR RESPUESTA DEL ESTUDIANTE
   */
  async evaluateStudentAnswer(
    studentId: string,
    competency: Competency,
    question: string,
    studentAnswer: string,
    correctAnswer: string,
    explanation: string
  ): Promise<{
    isCorrect: boolean;
    feedback: string;
    nextQuestion?: string;
    concepts: string[];
  }> {
    try {
      if (!this.apiKey) {
        return this.getMockFeedback(studentAnswer, correctAnswer);
      }

      const prompt = `
Eres un tutor educativo experto. Evalúa la respuesta de un estudiante:

Pregunta: ${question}
Respuesta Correcta: ${correctAnswer}
Respuesta del Estudiante: ${studentAnswer}
Explicación de la Respuesta: ${explanation}

Proporciona:
1. ¿La respuesta es correcta?
2. Feedback constructivo
3. Concepto clave involucrado

Responde en JSON con formato:
{
  "isCorrect": boolean,
  "feedback": "string",
  "concepts": ["string"]
}
`;

      const response = await this.callGeminiAPI(prompt);
      return JSON.parse(response);
    } catch (error) {
      console.error('Error evaluando respuesta:', error);
      return this.getMockFeedback(studentAnswer, correctAnswer);
    }
  }

  /**
   * GENERAR PREGUNTA SIGUIENTE
   */
  async generateNextQuestion(
    competency: Competency,
    difficulty: Difficulty,
    previousTopic: string,
    studentErrors: string[] = []
  ): Promise<{
    question: string;
    hint: string;
    difficulty: Difficulty;
  }> {
    try {
      if (!this.apiKey) {
        return this.getMockQuestion(competency, difficulty);
      }

      const errorContext = studentErrors.length > 0 
        ? `El estudiante ha cometido errores en: ${studentErrors.join(', ')}`
        : '';

      const prompt = `
Eres un profesor de matemática/comunicación para estudiantes de 1ro de secundaria en Perú.

Genera una pregunta de ${competency} nivel ${difficulty}
Tema anterior: ${previousTopic}
${errorContext}

Requisitos:
- Pregunta clara y en contexto peruano
- Nivel apropiado
- 4 opciones de respuesta
- Una opción correcta

Responde en JSON:
{
  "question": "string",
  "options": ["string", "string", "string", "string"],
  "correctAnswer": number (0-3),
  "hint": "string"
}
`;

      const response = await this.callGeminiAPI(prompt);
      const parsed = JSON.parse(response);
      
      return {
        question: parsed.question,
        hint: parsed.hint,
        difficulty,
      };
    } catch (error) {
      console.error('Error generando pregunta:', error);
      return this.getMockQuestion(competency, difficulty);
    }
  }

  /**
   * GENERAR PLAN DE ESTUDIO PERSONALIZADO
   */
  async generateStudyPlan(
    profile: LearningProfile
  ): Promise<{
    title: string;
    weeks: {
      week: number;
      focus: string[];
      dailyActivities: string[];
      goals: string[];
    }[];
  }> {
    try {
      if (!this.apiKey) {
        return this.getMockStudyPlan(profile);
      }

      const weaknesses = profile.weaknesses.join(', ');
      const strengths = profile.strengths.join(', ');

      const prompt = `
Eres un diseñador educativo experto. Crea un plan de estudio de 4 semanas para un estudiante de 1ro de secundaria.

Fortalezas: ${strengths}
Debilidades: ${weaknesses}
Ritmo sugerido: ${profile.suggestedPace}
Estilo de aprendizaje: ${profile.learningStyle}

Plan debe:
1. Enfocarse en debilidades
2. Reforzar fortalezas
3. Ser realista y motivador
4. Incluir actividades variadas

Responde en JSON:
{
  "title": "string",
  "weeks": [
    {
      "week": number,
      "focus": ["string"],
      "dailyActivities": ["string"],
      "goals": ["string"]
    }
  ]
}
`;

      const response = await this.callGeminiAPI(prompt);
      return JSON.parse(response);
    } catch (error) {
      console.error('Error generando plan:', error);
      return this.getMockStudyPlan(profile);
    }
  }

  /**
   * CHAT CON TUTOR IA
   */
  async chatWithTutor(
    sessionId: string,
    studentMessage: string
  ): Promise<string> {
    const session = this.sessions.get(sessionId);
    if (!session) throw new Error('Sesión no encontrada');

    // Agregar mensaje del estudiante
    session.messages.push({
      role: 'student',
      content: studentMessage,
      timestamp: Date.now(),
    });

    try {
      if (!this.apiKey) {
        return this.getMockTutorResponse(studentMessage, session);
      }

      const conversationContext = session.messages
        .slice(-5) // Últimos 5 mensajes para contexto
        .map(m => `${m.role === 'student' ? 'Estudiante' : 'Tutor'}: ${m.content}`)
        .join('\n');

      const prompt = `
Eres un tutor amable y paciente para un estudiante de 1ro de secundaria en Perú.
La competencia es: ${session.competency}

Historial:
${conversationContext}

Responde de manera:
- Clara y simple
- Motivadora
- Con ejemplos si es necesario
- En máximo 2-3 párrafos

Respuesta:
`;

      const response = await this.callGeminiAPI(prompt);

      // Agregar respuesta del tutor
      session.messages.push({
        role: 'tutor',
        content: response,
        timestamp: Date.now(),
      });

      return response;
    } catch (error) {
      console.error('Error en chat:', error);
      const mockResponse = this.getMockTutorResponse(studentMessage, session);
      session.messages.push({
        role: 'tutor',
        content: mockResponse,
        timestamp: Date.now(),
      });
      return mockResponse;
    }
  }

  /**
   * LLAMAR GEMINI API
   */
  private async callGeminiAPI(prompt: string): Promise<string> {
    if (!this.apiKey) {
      throw new Error('API Key not configured');
    }

    const response = await fetch(
      `${this.apiUrl}?key=${this.apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    const data = await response.json();
    const content = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    
    // Extraer JSON si está envuelto en markdown
    const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/) || content.match(/```\n([\s\S]*?)\n```/);
    return jsonMatch ? jsonMatch[1] : content;
  }

  /**
   * CONSTRUIR PROMPT DE EXPLICACIÓN
   */
  private buildExplanationPrompt(request: TutorRequest): string {
    const errorContext = request.previousErrors?.length
      ? `Errores previos: ${request.previousErrors.join(', ')}`
      : '';

    return `
Eres un tutor experto en ${request.competency} para estudiantes de 1ro de secundaria en Perú.

Tema: ${request.topic}
Nivel del Estudiante: ${request.studentLevel}
Nivel de la Pregunta: ${request.difficulty}
${errorContext}

Proporciona una explicación detallada que incluya:
1. Concepto fundamental
2. Pasos para resolver
3. Ejemplos prácticos
4. Tips y trucos
5. Conceptos relacionados

Responde en JSON:
{
  "explanation": "string",
  "stepByStep": ["string"],
  "examples": [
    {"problem": "string", "solution": "string", "explanation": "string"}
  ],
  "tips": ["string"],
  "relatedConcepts": ["string"],
  "encouragement": "string"
}
`;
  }

  /**
   * PARSEAR RESPUESTA DE EXPLICACIÓN
   */
  private parseExplanationResponse(response: string): TutorResponse {
    try {
      const parsed = JSON.parse(response);
      return {
        explanation: parsed.explanation || '',
        stepByStep: parsed.stepByStep || [],
        examples: parsed.examples || [],
        tips: parsed.tips || [],
        relatedConcepts: parsed.relatedConcepts || [],
        encouragement: parsed.encouragement || '',
      };
    } catch {
      return {
        explanation: response,
        stepByStep: [],
        examples: [],
        tips: [],
        relatedConcepts: [],
        encouragement: '¡Sigue intentando!',
      };
    }
  }

  // ============================================
  // RESPUESTAS MOCK (cuando no hay API Key)
  // ============================================

  private getMockExplanation(request: TutorRequest): TutorResponse {
    const explanations: { [key: string]: TutorResponse } = {
      cantidad: {
        explanation: 'Los números naturales son aquellos que usamos para contar. Empiezan en 1 y continúan infinitamente.',
        stepByStep: [
          'Identifica el tipo de número',
          'Realiza la operación',
          'Verifica tu respuesta',
        ],
        examples: [
          {
            problem: '5 + 3 = ?',
            solution: '8',
            explanation: 'Sumamos 5 y 3 para obtener 8',
          },
        ],
        tips: ['Usa tus dedos si necesitas', 'Practica todos los días'],
        relatedConcepts: ['Resta', 'Multiplicación'],
        encouragement: '¡Excelente esfuerzo!',
      },
      regularidad: {
        explanation: 'Un patrón es una secuencia que se repite de forma regular.',
        stepByStep: [
          'Observa los números',
          'Identifica la diferencia',
          'Continúa el patrón',
        ],
        examples: [
          {
            problem: '2, 4, 6, 8, ?',
            solution: '10',
            explanation: 'Cada número aumenta en 2',
          },
        ],
        tips: ['Busca la diferencia entre números', 'Dibuja si es necesario'],
        relatedConcepts: ['Sucesiones', 'Series'],
        encouragement: '¡Vas muy bien!',
      },
    };

    return explanations[request.competency] || {
      explanation: 'Entiendo que tienes dudas. Déjame ayudarte paso a paso.',
      stepByStep: ['Primero...', 'Luego...', 'Finalmente...'],
      examples: [],
      tips: ['Practica regularmente', 'No te desanimes'],
      relatedConcepts: [],
      encouragement: '¡Tú puedes!',
    };
  }

  private getMockFeedback(studentAnswer: string, correctAnswer: string) {
    return {
      isCorrect: studentAnswer === correctAnswer,
      feedback: studentAnswer === correctAnswer
        ? '¡Correcto! Excelente trabajo.'
        : `No es correcto. La respuesta es ${correctAnswer}. Practica más y lo lograrás.`,
      concepts: ['concepto_base'],
    };
  }

  private getMockQuestion(competency: Competency, difficulty: Difficulty) {
    return {
      question: `Pregunta sobre ${competency} (${difficulty})`,
      hint: 'Piensa cuidadosamente',
      difficulty,
    };
  }

  private getMockStudyPlan(profile: LearningProfile) {
    return {
      title: 'Tu Plan de Estudio Personalizado',
      weeks: [
        {
          week: 1,
          focus: profile.weaknesses,
          dailyActivities: ['Video educativo', 'Ejercicios prácticos', 'Revisión'],
          goals: ['Comprender conceptos básicos'],
        },
        {
          week: 2,
          focus: profile.weaknesses,
          dailyActivities: ['Problemas contextualizados', 'Trabajo colaborativo'],
          goals: ['Aplicar conceptos'],
        },
      ],
    };
  }

  private getMockTutorResponse(studentMessage: string, session: AITutoringSession): string {
    const responses: { [key: string]: string } = {
      ayuda: '¿En qué específicamente necesitas ayuda? Cuéntame más.',
      no_entiendo: 'No te preocupes, déjame explicar de otra forma. Imagina que...',
      más: 'Claro, voy a profundizar más en este tema.',
    };

    for (const [key, response] of Object.entries(responses)) {
      if (studentMessage.toLowerCase().includes(key)) {
        return response;
      }
    }

    return `Entiendo. Sobre ${session.competency}, es importante que recuerdes que... ¿Tienes alguna pregunta específica?`;
  }

  /**
   * FINALIZAR SESIÓN
   */
  endTutoringSession(sessionId: string): void {
    const session = this.sessions.get(sessionId);
    if (session) {
      session.ended = true;
    }
  }

  /**
   * OBTENER SESIÓN
   */
  getSession(sessionId: string): AITutoringSession | undefined {
    return this.sessions.get(sessionId);
  }
}

// Instancia global
export const geminiTutor = new GeminiAITutor();
