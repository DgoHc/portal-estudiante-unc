# ❓ PREGUNTAS FRECUENTES Y SOLUCIÓN DE PROBLEMAS

## Instalación y Configuración

### P: ¿Necesito instalar dependencias adicionales?
**R:** No si tienes Tailwind, Framer Motion y Recharts. Si no:
```bash
npm install framer-motion recharts lucide-react
```

### P: ¿Necesito una API key de Gemini?
**R:** No es obligatorio. Sin API key:
- ✅ Quiz funciona 100%
- ✅ Diagnóstico funciona 100%
- ✅ Contenido personalizado funciona 100%
- ✅ Tutor IA da respuestas pre-programadas
- ❌ Tutor IA no es dinámico

Si quieres IA dinámica:
1. Obtén key en https://makersuite.google.com/app/apikey
2. Agrega a `.env.local`: `VITE_GEMINI_API_KEY=tu_key`

### P: ¿Puedo modificar las preguntas?
**R:** Sí! En `src/data/questionBank.ts`:
```typescript
const questionBank: QuestionSet[] = [
  {
    id: "new_q_1",
    question: "Tu pregunta aquí",
    options: ["Op1", "Op2", "Op3", "Op4"],
    correctAnswer: 0, // Índice de respuesta correcta
    explanation: "Por qué es correcta...",
    competency: "cantidad",
    difficulty: "básico",
    subject: "matemática",
    hints: ["Pista 1", "Pista 2"]
  },
  // ...
]
```

### P: ¿Cómo cambio los colores?
**R:** En cada componente, busca clases Tailwind:
- `bg-blue-500` → cambiar a `bg-purple-500`
- `text-orange-600` → cambiar a `text-red-600`
- `border-indigo-200` → cambiar a `border-cyan-200`

O modificar `tailwind.config.js` para toda la app.

---

## Funcionalidad del Quiz

### P: El quiz es muy fácil / muy difícil
**R:** La dificultad se adapta. Cambiar umbrales en `src/services/adaptiveAssessment.ts`:

```typescript
// Línea ~20
const DIFFICULTY_UP_THRESHOLD = 2;      // Cambiar de 2 a 1 para subir más rápido
const DIFFICULTY_DOWN_THRESHOLD = 2;    // Cambiar de 2 a 3 para bajar más lento
```

### P: ¿Por qué se repiten preguntas?
**R:** No se repiten. Si lo parece, puede ser:
- Misma pregunta con opciones en diferente orden (normal)
- Algo está fallando (ejecutar `SYSTEM_VALIDATION.ts`)

### P: Las preguntas no son relevantes para mi país
**R:** Personalizar en `questionBank.ts`:
- Cambiar contextos a realidad peruana
- Agregar autores peruanos
- Usar moneda peruana (soles, no dólares)
- Referenciar historia/geografía de Perú

### P: ¿Cuántas preguntas debería haber?
**R:** Actualmente 25 (configurable):

En `src/services/adaptiveAssessment.ts`:
```typescript
const QUESTIONS_TOTAL = 25;  // Cambiar según necesites
```

Nota: Menos preguntas = menos precisión. Mínimo 10.

---

## Diagnóstico

### P: El diagnóstico no se genera
**R:** Verificar:
1. ¿Completaste todas 25 preguntas? (Sí obligatorio)
2. ¿Hay errores en console? (F12 → Console)
3. ¿Los datos de respuestas son válidos? (0-3)
4. Ejecutar `SYSTEM_VALIDATION.ts` para diagnosticar

### P: ¿Por qué hay 8 competencias?
**R:** Basadas en curriculum peruano oficial:

**Matemática (4 competencias)**:
- Cantidad: números, operaciones
- Regularidad: patrones, secuencias
- Forma-Movimiento: geometría, ubicación
- Gestión de datos: estadística, probabilidad

**Comunicación (4 competencias)**:
- Comprensión lectora: entender textos
- Producción de textos: escribir
- Gramática-Ortografía: reglas
- Vocabulario: palabras, significados

### P: Las recomendaciones no son personalizadas
**R:** El motor **sí** personaliza por:
- Debilidades detectadas (prioridad #1)
- Ritmo de aprendizaje (rápido/normal/lento)
- Estilo de aprendizaje (visual/auditivo/kinestésico)
- Fortalezas (para no aburrirse)

Si parece genérico, es porque:
- Tienes buen desempeño en todo (menos recursos necesarios)
- Quiz fue muy corto (menos datos)

### P: ¿Puedo exportar el diagnóstico?
**R:** Agregable en `DiagnosticReport.tsx`:
```typescript
// Agregar botón
<button onClick={() => {
  const json = JSON.stringify(learningProfile, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `diagnostico_${studentId}.json`;
  a.click();
}}>
  Descargar JSON
</button>
```

---

## Contenido Personalizado

### P: Las rutas son demasiadas / pocas
**R:** Cambiar en `src/services/contentRecommendation.ts`:

```typescript
// Buscar generatePersonalizedPath() línea ~150
paths.push({
  // ... configuración de ruta
  estimatedHours: calculateHours(), // Ajustar aquí
  priority: priority,
});

// Limitar cantidad:
return paths.slice(0, 5); // Máximo 5 rutas (cambiar número)
```

### P: Los recursos recomendados no existen
**R:** Personalizar en `contentRecommendation.ts`:
- Cambiar URLs de videos
- Agregar recursos locales
- Conectar a tu biblioteca de videos
- Reemplazar con ejercicios internos

### P: El horario no es realista
**R:** Ajustar en `createWeeklySchedule()`:
```typescript
const dailyHoursAvailable = 2; // Cambiar según estudiante
const competenciesPerDay = 2;  // Cuántas competencias por día
```

---

## Tutor IA

### P: El tutor da respuestas tontas
**R:** Probablemente usando mock (sin API key):
1. Obtén API key: https://makersuite.google.com/app/apikey
2. Agrega a `.env.local`: `VITE_GEMINI_API_KEY=tu_key_aqui`
3. Reinicia servidor
4. Tutor IA será inteligente ✨

### P: El tutor no responde nada
**R:** Revisar console:
- Error de API? Validar API key
- Error de sintaxis? Revisar `GeminiAITutor.ts`
- Timeout? API lenta, retry automático ocurre

### P: ¿Cómo personalizar respuestas del tutor?
**R:** En `GeminiAITutor.ts`, modificar:

```typescript
// Mock responses (línea ~200)
const mockResponses: Record<string, string> = {
  'cantidad:fracciones': 'Una fracción representa... [CUSTOMIZAR]',
  // ...
};

// O el prompt para Gemini (línea ~250):
const prompt = `
Eres un tutor de educación peruana...
PERSONALIZAR AQUÍ TUS INSTRUCCIONES
`;
```

### P: El tutor no entiende el contexto
**R:** El tutor sí entiende pero puedes mejorar:
```typescript
// En GeminiAITutor.ts línea ~280
const context = `
Estudiante: ${studentId}
Competencia: ${competency}
Nivel: ${studentLevel}
Tema: ${topic}
Historial: ${session.messages.length} mensajes

INSTRUCTIONES PERSONALIZADAS AQUÍ
`;
```

---

## Performance y Errores

### P: La app es lenta
**R:** Optimizaciones:
1. Evitar renders innecesarios:
   ```typescript
   const MemoComponent = React.memo(YourComponent);
   ```

2. Lazy load componentes pesados:
   ```typescript
   const DiagnosticReport = lazy(() => import('./DiagnosticReport'));
   ```

3. Optimizar recharts (muchos datos):
   ```typescript
   <BarChart data={data.slice(0, 10)}> {/* Limitar datos */}
   ```

### P: Errores de memoria
**R:** Si la app usa mucho RAM:
1. Limpiar listeners en cleanup:
   ```typescript
   useEffect(() => {
     return () => {
       // Cleanup aquí
     };
   }, []);
   ```

2. No guardar datos enormes en state
3. Usar pagination para listas grandes

### P: Las animaciones se stutteran
**R:** En `framer-motion`:
```typescript
// Evitar:
<motion.div animate={{x: [0, 100, 0]}} /> {/* Muchos keyframes */}

// Preferir:
<motion.div animate={{opacity: 1}} transition={{duration: 0.3}} />
```

### P: El build falla
**R:** Soluciones comunes:
```bash
# 1. Limpiar node_modules
rm -rf node_modules package-lock.json
npm install

# 2. Verificar tipos
npx tsc --noEmit

# 3. Ver error específico
npm run build 2>&1 | head -50

# 4. Compilar en modo watch
npm run dev
```

---

## Integración

### P: ¿Cómo integro en mi app existente?
**R:** Ver `INTEGRATION_EXAMPLES.ts` para 7 ejemplos específicos:
1. Router-based
2. Conditional redirect
3. Dashboard embed
4. AI tutor usage
5. Data access
6. Custom hooks
7. Direct services

### P: ¿Afecta el código existente?
**R:** No:
- ✅ Nuevo archivo `DiagnosticAssessmentFlow.tsx`
- ✅ Nuevos servicios en `src/services/`
- ✅ Nuevas preguntas en `src/data/`
- ⚠️ Actualización en `AuthContext.tsx` (compatible hacia atrás)

### P: ¿Necesito cambiar mi BD?
**R:** Opcional:
- **Sin persistencia**: Todo en memoria (OK para testing)
- **Con persistencia**: Agregar 2 columnas (ver `DEPLOYMENT_CHECKLIST.md`)

### P: ¿Cómo importo en TypeScript?
**R:** 
```typescript
// Componentes
import { DiagnosticAssessmentFlow } from './components/DiagnosticAssessmentFlow';

// Servicios
import { DiagnosticEngine } from './services/diagnosticEngine';
import { AdaptiveAssessmentEngine } from './services/adaptiveAssessment';

// Hooks
import { useAdaptiveAssessment } from './hooks/useAdaptiveAssessment';

// Tipos
import type { LearningProfile } from './services/diagnosticEngine';
```

---

## Customización Avanzada

### P: ¿Cómo cambio el algoritmo adaptativo?
**R:** En `src/services/adaptiveAssessment.ts`:

```typescript
// Cambiar selección de preguntas (línea ~80)
private selectNextQuestion(): QuestionSet {
  // Actualmente: adapta por difficulty streak
  // Puedes cambiar a:
  // - Selección por competencia débil
  // - Balanceo de competencias
  // - Selección aleatoria pesada
}
```

### P: ¿Cómo añado nuevas competencias?
**R:** Proceso completo:
1. Agregar en `questionBank.ts`:
   ```typescript
   competency: "nuevaCompetencia",
   ```

2. Actualizar en `diagnosticEngine.ts`:
   ```typescript
   const competencies = [
     // ... existentes
     "nuevaCompetencia"
   ];
   ```

3. Agregar recomendaciones en `contentRecommendation.ts`

4. Actualizar UI en componentes

### P: ¿Cómo conecto una BD real?
**R:** Ejemplo con Supabase/Firebase:
```typescript
// En AuthContext.tsx
const updateDiagnosticProfile = async (profile, plan) => {
  // 1. localStorage (actual)
  localStorage.setItem('diagnosticProfile', JSON.stringify(profile));
  
  // 2. Agregar llamada a DB
  await supabase
    .from('students')
    .update({
      diagnostic_profile: profile,
      content_plan: plan,
      assessment_completed: true
    })
    .eq('id', studentId);
};
```

### P: ¿Cómo agrego análisis de datos?
**R:** Usar servicios ya existentes:
```typescript
// En tu dashboard analytics
import { AdaptiveAssessmentEngine } from './services/adaptiveAssessment';

const engine = new AdaptiveAssessmentEngine();
const state = engine.getCurrentState();

// state.competencyPerformance tiene todo lo necesario
const mathAverageScore = calculateAverage(
  state.competencyPerformance.filter(c => c.subject === 'matemática')
);
```

---

## Información Técnica

### Estructura de Datos Key

**AdaptiveState**:
```typescript
{
  currentQuestion: QuestionSet,
  questionsAsked: string[],
  answersHistory: number[],
  competencyPerformance: CompetencyPerformance[]
}
```

**LearningProfile**:
```typescript
{
  studentId: string,
  overallScore: number,
  overallLevel: 'básico' | 'intermedio' | 'avanzado',
  mathematicsProfile: CompetencyProfile,
  communicationProfile: CompetencyProfile,
  strengths: string[],
  weaknesses: string[],
  learningStyle: 'visual' | 'auditivo' | 'kinestésico' | 'mixto',
  suggestedPace: 'rápido' | 'normal' | 'lento',
  personalizedPath: LearningPath[]
}
```

**PersonalizedContentPlan**:
```typescript
{
  studentId: string,
  recommendedResources: ContentResource[],
  weeklySchedule: DailySchedule[],
  tutoringSessions: TutoringSession[],
  milestones: Milestone[]
}
```

---

## Próximos Pasos Recomendados

1. **Corto plazo** (esta semana):
   - [ ] Integrar en router
   - [ ] Testear flujo completo
   - [ ] Agregar API key de Gemini
   - [ ] Customizar preguntas

2. **Mediano plazo** (este mes):
   - [ ] Persistencia en BD
   - [ ] Agregar análisis de datos
   - [ ] Feedback de usuarios
   - [ ] Optimizaciones de performance

3. **Largo plazo** (este semestre):
   - [ ] Predicción de rendimiento futuro
   - [ ] Gamificación (badges, puntos)
   - [ ] Seguimiento del tutor IA
   - [ ] Integración con padres

¡Buena suerte! 🚀
