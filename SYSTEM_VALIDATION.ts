/**
 * CHECKLIST DE VALIDACIÓN
 * Verifica que todo esté funcionando correctamente
 */

import { 
  AdaptiveAssessmentEngine, 
  assessmentEngine 
} from './services/adaptiveAssessment';
import { DiagnosticEngine } from './services/diagnosticEngine';
import { ContentRecommendationEngine } from './services/contentRecommendation';
import { GeminiAITutor } from './services/geminAITutor';
import { questionBank } from './data/questionBank';

/**
 * TEST 1: Validar Banco de Preguntas
 */
export function testQuestionBank() {
  console.log('🧪 TEST 1: Validando banco de preguntas...');
  
  const questions = Object.values(questionBank);
  console.log(`  ✓ Total preguntas: ${questions.length}`);

  // Verificar estructura
  const errors: string[] = [];
  
  questions.forEach((q, i) => {
    if (!q.id) errors.push(`Pregunta ${i}: falta ID`);
    if (!q.question) errors.push(`Pregunta ${i}: falta pregunta`);
    if (q.options.length !== 4) errors.push(`Pregunta ${i}: debe tener 4 opciones`);
    if (q.correctAnswer < 0 || q.correctAnswer > 3) 
      errors.push(`Pregunta ${i}: respuesta correcta inválida`);
    if (!q.explanation) errors.push(`Pregunta ${i}: falta explicación`);
    if (q.hints.length === 0) errors.push(`Pregunta ${i}: falta pistas`);
  });

  if (errors.length > 0) {
    console.error('  ✗ Errores encontrados:');
    errors.forEach(e => console.error(`    - ${e}`));
    return false;
  }

  console.log('  ✓ Todas las preguntas son válidas');
  return true;
}

/**
 * TEST 2: Validar Motor Adaptativo
 */
export function testAdaptiveEngine() {
  console.log('\n🧪 TEST 2: Validando motor adaptativo...');
  
  const engine = new AdaptiveAssessmentEngine();
  const questionsAsked: string[] = [];

  try {
    // Simular 25 preguntas
    for (let i = 0; i < 25; i++) {
      const question = engine.getNextQuestion();
      
      if (!question) {
        console.error(`  ✗ No hay pregunta en posición ${i}`);
        return false;
      }

      if (questionsAsked.includes(question.id)) {
        console.error(`  ✗ Pregunta repetida: ${question.id}`);
        return false;
      }

      questionsAsked.push(question.id);

      // Simular respuesta aleatoria
      const answer = Math.floor(Math.random() * 4);
      engine.recordAnswer(answer);
    }

    console.log(`  ✓ 25 preguntas completadas sin repeticiones`);
    
    // Verificar estado final
    const state = engine.getCurrentState();
    if (state.answersHistory.length !== 25) {
      console.error(`  ✗ Historial incompleto: ${state.answersHistory.length}`);
      return false;
    }

    console.log(`  ✓ Motor adaptativo funcionando correctamente`);
    return true;
  } catch (error) {
    console.error(`  ✗ Error en motor adaptativo:`, error);
    return false;
  }
}

/**
 * TEST 3: Validar Diagnóstico
 */
export function testDiagnosticEngine() {
  console.log('\n🧪 TEST 3: Validando motor de diagnóstico...');

  try {
    const engine = new AdaptiveAssessmentEngine();

    // Simular respuestas
    for (let i = 0; i < 25; i++) {
      const question = engine.getNextQuestion();
      engine.recordAnswer(Math.floor(Math.random() * 4));
    }

    // Generar diagnóstico
    const state = engine.getCurrentState();
    const profile = DiagnosticEngine.generateLearningProfile('test_student', state);

    // Validaciones
    if (!profile.studentId) throw new Error('Falta studentId');
    if (profile.overallScore < 0 || profile.overallScore > 100) 
      throw new Error('Score inválido');
    if (!['básico', 'intermedio', 'avanzado'].includes(profile.overallLevel))
      throw new Error('Nivel inválido');
    if (!profile.mathematicsProfile) throw new Error('Falta perfil matemática');
    if (!profile.communicationProfile) throw new Error('Falta perfil comunicación');
    if (profile.strengths.length === 0) throw new Error('Sin fortalezas identificadas');
    if (profile.weaknesses.length === 0) throw new Error('Sin debilidades identificadas');
    if (!['visual', 'auditivo', 'kinestésico', 'mixto'].includes(profile.learningStyle))
      throw new Error('Estilo de aprendizaje inválido');
    if (!['rápido', 'normal', 'lento'].includes(profile.suggestedPace))
      throw new Error('Ritmo inválido');
    if (profile.personalizedPath.length === 0) throw new Error('Sin rutas personalizadas');

    console.log('  ✓ Diagnóstico generado correctamente');
    console.log(`    - Score: ${profile.overallScore}%`);
    console.log(`    - Nivel: ${profile.overallLevel}`);
    console.log(`    - Fortalezas: ${profile.strengths.length}`);
    console.log(`    - Debilidades: ${profile.weaknesses.length}`);
    console.log(`    - Rutas: ${profile.personalizedPath.length}`);

    return true;
  } catch (error) {
    console.error(`  ✗ Error en diagnóstico:`, error);
    return false;
  }
}

/**
 * TEST 4: Validar Recomendación de Contenido
 */
export function testContentRecommendation() {
  console.log('\n🧪 TEST 4: Validando recomendación de contenido...');

  try {
    const engine = new AdaptiveAssessmentEngine();

    // Simular evaluación
    for (let i = 0; i < 25; i++) {
      const question = engine.getNextQuestion();
      engine.recordAnswer(Math.floor(Math.random() * 4));
    }

    const state = engine.getCurrentState();
    const profile = DiagnosticEngine.generateLearningProfile('test_student', state);
    const contentPlan = ContentRecommendationEngine.generatePersonalizedPlan(profile);

    // Validaciones
    if (!contentPlan.studentId) throw new Error('Falta studentId en plan');
    if (!contentPlan.recommendedResources) throw new Error('Falta recursos recomendados');
    if (!contentPlan.weeklySchedule) throw new Error('Falta horario semanal');
    if (contentPlan.weeklySchedule.length !== 7) throw new Error('Horario debe tener 7 días');
    if (!contentPlan.tutoringSessions) throw new Error('Falta sesiones de tutoría');
    if (!contentPlan.milestones) throw new Error('Falta hitos');

    // Validar horario
    contentPlan.weeklySchedule.forEach((day, i) => {
      if (!day.day) throw new Error(`Día ${i}: falta nombre`);
      if (!day.competencies) throw new Error(`Día ${i}: falta competencias`);
      if (day.totalTime === 0) throw new Error(`Día ${i}: tiempo es 0`);
    });

    console.log('  ✓ Plan de contenido generado correctamente');
    console.log(`    - Recursos: ${contentPlan.recommendedResources.length}`);
    console.log(`    - Sesiones de tutoría: ${contentPlan.tutoringSessions.length}`);
    console.log(`    - Hitos: ${contentPlan.milestones.length}`);

    return true;
  } catch (error) {
    console.error(`  ✗ Error en recomendación:`, error);
    return false;
  }
}

/**
 * TEST 5: Validar Tutor IA
 */
export async function testGeminiAITutor() {
  console.log('\n🧪 TEST 5: Validando Tutor IA...');

  try {
    const tutor = new GeminiAITutor();

    // Crear sesión
    const session = tutor.createTutoringSession(
      'test_student',
      'cantidad',
      'Suma de fracciones'
    );

    if (!session.id) throw new Error('Falta ID de sesión');
    if (!session.messages) throw new Error('Falta array de mensajes');

    console.log('  ✓ Sesión de tutoría creada correctamente');

    // Obtener explicación
    const explanation = await tutor.getExplanation({
      studentId: 'test_student',
      competency: 'cantidad',
      topic: 'Suma de fracciones',
      difficulty: 'básico',
      studentLevel: 'básico',
    });

    if (!explanation.explanation) throw new Error('Falta explicación');
    if (!explanation.stepByStep) throw new Error('Falta pasos');
    if (!explanation.tips) throw new Error('Falta tips');

    console.log('  ✓ Explicación obtenida correctamente');

    // Chat
    const response = await tutor.chatWithTutor(
      session.id,
      '¿Cómo sumo 1/2 + 1/4?'
    );

    if (!response || response.length === 0) throw new Error('Respuesta vacía');

    console.log('  ✓ Chat con tutor funcionando');
    console.log(`    - Respuesta: "${response.substring(0, 50)}..."`);

    return true;
  } catch (error) {
    console.error(`  ✗ Error en Tutor IA:`, error);
    return false;
  }
}

/**
 * TEST 6: Validar Flujo Completo
 */
export async function testCompleteFlow() {
  console.log('\n🧪 TEST 6: Validando flujo completo...');

  try {
    // 1. Quiz
    console.log('  → Ejecutando quiz...');
    const engine = new AdaptiveAssessmentEngine();
    for (let i = 0; i < 25; i++) {
      const q = engine.getNextQuestion();
      engine.recordAnswer(Math.floor(Math.random() * 4));
    }
    console.log('    ✓ Quiz completado');

    // 2. Diagnóstico
    console.log('  → Generando diagnóstico...');
    const state = engine.getCurrentState();
    const profile = DiagnosticEngine.generateLearningProfile('test', state);
    console.log('    ✓ Diagnóstico generado');

    // 3. Contenido
    console.log('  → Recomendando contenido...');
    const contentPlan = ContentRecommendationEngine.generatePersonalizedPlan(profile);
    console.log('    ✓ Contenido recomendado');

    // 4. Tutor
    console.log('  → Iniciando tutor IA...');
    const tutor = new GeminiAITutor();
    const session = tutor.createTutoringSession('test', 'cantidad', 'Fracciones');
    console.log('    ✓ Tutor disponible');

    console.log('\n  ✓ FLUJO COMPLETO VALIDADO');
    return true;
  } catch (error) {
    console.error(`  ✗ Error en flujo completo:`, error);
    return false;
  }
}

/**
 * EJECUTAR TODOS LOS TESTS
 */
export async function runAllTests() {
  console.log('========================================');
  console.log('    VALIDACIÓN COMPLETA DEL SISTEMA');
  console.log('========================================\n');

  const results = {
    questionBank: testQuestionBank(),
    adaptiveEngine: testAdaptiveEngine(),
    diagnosticEngine: testDiagnosticEngine(),
    contentRecommendation: testContentRecommendation(),
  };

  // Tests async
  results.geminiAITutor = await testGeminiAITutor();
  results.completeFlow = await testCompleteFlow();

  // Resumen
  console.log('\n========================================');
  console.log('             RESUMEN DE TESTS');
  console.log('========================================\n');

  const passed = Object.values(results).filter(r => r).length;
  const total = Object.keys(results).length;

  Object.entries(results).forEach(([test, passed]) => {
    console.log(`${passed ? '✓' : '✗'} ${test}: ${passed ? 'PASÓ' : 'FALLÓ'}`);
  });

  console.log(`\nResultado: ${passed}/${total} tests pasaron\n`);

  if (passed === total) {
    console.log('🎉 ¡SISTEMA COMPLETAMENTE VALIDADO!');
    return true;
  } else {
    console.log('⚠️  Revisar los tests fallidos');
    return false;
  }
}

// Ejecutar si se importa este archivo
if (typeof window !== 'undefined' && (window as any).__TEST__) {
  runAllTests();
}

export default {
  testQuestionBank,
  testAdaptiveEngine,
  testDiagnosticEngine,
  testContentRecommendation,
  testGeminiAITutor,
  testCompleteFlow,
  runAllTests,
};
